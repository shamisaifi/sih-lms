import { useState, useCallback } from 'react';
import axios from 'axios';

export const useCourseTranscript = () => {
  const [transcript, setTranscript] = useState(null);
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false);
  const [error, setError] = useState(null);

  const generateTranscript = useCallback(async (youtubeUrl) => {
    setIsGeneratingTranscript(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/transcribe/', { youtube_url: youtubeUrl });
      setTranscript(response.data);
    } catch (err) {
      setError('Failed to generate transcript. Please try again.');
      console.error('Error generating transcript:', err);
    } finally {
      setIsGeneratingTranscript(false);
    }
  }, []);

  const generateSummary = useCallback(async (start, end) => {
    if (!transcript) {
      setError('Transcript not available. Please generate a transcript first.');
      return null;
    }
    try {
      const response = await axios.post('http://localhost:8000/summarize/', {
        transcript: transcript.transcript,
        start_time: start,
        end_time: end
      });
      return response.data.summary;
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error('Error generating summary:', err);
      return null;
    }
  }, [transcript]);

  return {
    transcript,
    isGeneratingTranscript,
    error,
    generateTranscript,
    generateSummary
  };
};