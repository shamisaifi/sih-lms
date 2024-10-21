import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from deepgram import Deepgram
from dotenv import load_dotenv
import yt_dlp
import time
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
import uuid
import shutil

# Set up logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize Deepgram client
deepgram = Deepgram(os.getenv("DEEPGRAM_API_KEY"))

# Initialize Google Gemini
genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

TEMP_DIR = "temp_audio_files"
os.makedirs(TEMP_DIR, exist_ok=True)


class TranscriptionRequest(BaseModel):
    youtube_url: str


class TranscriptionResponse(BaseModel):
    transcript: list
    confidence: float


class SummaryRequest(BaseModel):
    transcript: list
    start_time: float
    end_time: float


class SummaryResponse(BaseModel):
    summary: str


def get_unique_filename(extension):
    return f"{uuid.uuid4()}.{extension}"


async def download_youtube_audio(url: str) -> str:
    logger.info(f"Starting download of audio from {url}")
    unique_id = str(uuid.uuid4())
    output_dir = os.path.join(TEMP_DIR, unique_id)
    os.makedirs(output_dir, exist_ok=True)

    output_template = os.path.join(output_dir, '%(title)s.%(ext)s')

    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'outtmpl': output_template,
        'progress_hooks': [ydl_progress_hook],
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        for file in os.listdir(output_dir):
            if file.endswith(".wav"):
                audio_file = os.path.join(output_dir, file)
                logger.info(f"Successfully downloaded audio : {audio_file}")
                return audio_file

        raise Exception("No audio file found in the download directory")

    except Exception as e:
        logger.error(f"Error downloading audio: {str(e)}", exc_info=True)
        raise


def ydl_progress_hook(d):
    if d['status'] == 'downloading':
        logger.info(
            f"Downloading: {d['_percent_str']} of {d['_total_bytes_str']} at {d['_speed_str']}")
    elif d['status'] == 'finished':
        logger.info(f"Download finished. Converting to WAV.")


async def transcribe_audio(file_path: str):
    logger.info(f"Starting transcription of {file_path}")
    try:
        with open(file_path, 'rb') as audio:
            source = {'buffer': audio, 'mimetype': 'audio/wav'}
            start_time = time.time()
            response = await deepgram.transcription.prerecorded(source, {
                'punctuate': True,
                'model': 'general',
                'diarize': True,
                'utterances': True
            })
            end_time = time.time()
            logger.info(
                f"Transcription completed in {end_time - start_time:.2f} seconds")
        return response
    except Exception as e:
        logger.error(f"Error during transcription: {str(e)}", exc_info=True)
        raise


@app.post("/transcribe/", response_model=TranscriptionResponse)
async def transcribe_youtube_video(request: TranscriptionRequest):
    audio_file = None
    try:
        # Download YouTube audio
        audio_file = await download_youtube_audio(request.youtube_url)

        # Check file size
        file_size = os.path.getsize(audio_file)
        logger.info(f"Audio file size: {file_size / (1024 * 1024):.2f} MB")

        # Transcribe the audio
        response = await transcribe_audio(audio_file)

        # Extract the transcript with timestamps
        transcript = []
        for utterance in response["results"]["utterances"]:
            transcript.append({
                "start": utterance["start"],
                "end": utterance["end"],
                "text": utterance["transcript"]
            })

        # Calculate overall confidence
        confidence = response["results"]["channels"][0]["alternatives"][0]["confidence"]

        logger.info(
            f"Transcription completed successfully. Confidence: {confidence}")

        # Return the transcription result
        return TranscriptionResponse(transcript=transcript, confidence=confidence)

    except Exception as e:
        logger.error(
            f"Error in transcription pipeline: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Clean up the temporary files
        if audio_file:
            try:
                os.remove(audio_file)
                logger.info(f"Deleted temporary audio file: {audio_file}")

                parent_dir = os.path.dirname(audio_file)
                if not os.listdir(parent_dir):
                    os.rmdir(parent_dir)
                    logger.info(f"Deleted temporary directory: {parent_dir}")

            except Exception as e:
                logger.error(
                    f"Error deleting temporary files: {str(e)}", exc_info=True)


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Cleaning up temporary audio files")
    try:
        shutil.rmtree(TEMP_DIR)
        logger.info("Temporary files cleaned up successfully")
    except Exception as e:
        logger.error(
            f"Error cleaning up temporary files: {str(e)}", exc_info=True)


@app.post("/summarize/", response_model=SummaryResponse)
async def summarize_segment(request: SummaryRequest):
    try:
        # Filter the transcript for the specified time range
        segment_transcript = [
            utterance["text"] for utterance in request.transcript
            if utterance["start"] >= request.start_time and utterance["end"] <= request.end_time
        ]

        # Join the filtered transcript into a single string
        full_text = " ".join(segment_transcript)

        logger.info(
            f"Generating summary for segment from {request.start_time} to {request.end_time}")

        # Generate summary using Google Gemini with special formatting
        prompt = """
        Please summarize the following transcript segment, focusing on the main points and any important facts or information. Use the following special characters for formatting:

        - Use '##' for main headings
        - Use '@@' for subheadings
        - Use '••' for bullet points of important facts or key points
        - Use '!!' to highlight particularly important or noteworthy information within the text
        - Use '¶¶' to separate paragraphs

        Here's the transcript to summarize:

        {full_text}

        Please provide a well-structured summary using these formatting characters.
        """

        safety_settings = [
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]

        response = model.generate_content(
            prompt,
            safety_settings=safety_settings,
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,
                top_p=0.8,
                top_k=40
            )
        )

        if response.prompt_feedback.block_reason:
            logger.warning(
                f"Content blocked: {response.prompt_feedback.block_reason}")
            return SummaryResponse(summary="Unable to generate summary due to content restrictions.")

        if not response.text:
            logger.warning("No summary generated")
            return SummaryResponse(summary="Unable to generate summary. Please try with a different segment.")

        summary = response.text.strip()

        logger.info("Summary generated successfully")

        return SummaryResponse(summary=summary)

    except Exception as e:
        logger.error(f"Error in summary generation: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
