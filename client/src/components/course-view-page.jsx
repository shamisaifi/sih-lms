import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Send,
  FileText,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCourseTranscript } from "@/hooks/use-course-transcript";
import { FormattedSummary } from "./formatted-summary";

// Mock data for course content
const courseContent = [
  {
    id: 1,
    title: "Introduction to the Course",
    type: "video",
    url: "https://www.youtube.com/watch?v=-mJFZp84TIY&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=1",
    duration: "16:50",
  },
  {
    id: 2,
    title: "Setting Up Your Development Environment",
    type: "video",
    url: "https://www.youtube.com/watch?v=-mJFZp84TIY&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=1",
    duration: "16:50",
  },
  {
    id: 3,
    title: "Basic Concepts",
    type: "video",
    url: "https://www.youtube.com/watch?v=-mJFZp84TIY&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=1",
    duration: "16:50",
  },
  {
    id: 4,
    title: "Course Resources",
    type: "document",
    url: "https://www.youtube.com/watch?v=-mJFZp84TIY&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=1",
  },
  {
    id: 5,
    title: "Advanced Techniques",
    type: "video",
    url: "https://www.youtube.com/watch?v=-mJFZp84TIY&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=1",
    duration: "16:50",
  },
];

// Mock data for comments
const comments = [
  {
    id: 1,
    user: "Alice",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "Great explanation! This really helped me understand the concept.",
    likes: 5,
    replies: [],
  },
  {
    id: 2,
    user: "Bob",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "I have a question about the implementation. Can you clarify how...",
    likes: 2,
    replies: [
      {
        id: 3,
        user: "Instructor",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "The implementation works by...",
      },
    ],
  },
];

// Mock data for attachments
const attachments = [
  { id: 1, title: "Course Syllabus", type: "pdf", url: "/course-syllabus.pdf" },
  {
    id: 2,
    title: "Supplementary Reading",
    type: "pdf",
    url: "/supplementary-reading.pdf",
  },
  { id: 3, title: "Code Samples", type: "zip", url: "/code-samples.zip" },
  { id: 4, title: "Lecture Notes", type: "pdf", url: "/lecture-notes.pdf" },
];

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function CourseViewPage() {
  const [currentContent, setCurrentContent] = useState(courseContent[4]);
  const [newComment, setNewComment] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [aiChat, setAiChat] = useState([]);
  const [segments, setSegments] = useState([]);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(null);
  const videoRef = useRef(null);

  const navigate = useNavigate();
  const {
    isGeneratingTranscript,
    error,
    generateTranscript,
    generateSummary,
  } = useCourseTranscript();

  useEffect(() => {
    if(currentContent.type === "video") {
      generateTranscript(currentContent.url);
    }
  }, [currentContent, generateTranscript])

  const handleContentSelect = (content) => {
    setCurrentContent(content);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("New comment:", newComment);
    setNewComment("");
    // Here you would typically send the comment to your backend
  };

  const handleAiChatSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your AI backend and get a response
    const userMessage = { role: "user", content: aiMessage };
    const aiResponse = {
      role: "assistant",
      content: `Here's a response about "${currentContent.title}": ${aiMessage}`,
    };
    setAiChat([...aiChat, userMessage, aiResponse]);
    setAiMessage("");
  };

  const startHighlighting = () => {
    setIsHighlighting(true);
    setCurrentSegment({
      start: videoRef.current?.getCurrentTime() || 0,
      end: 0,
      summary: "",
    });
  };

  const endHighlighting = async () => {
    if (currentSegment && videoRef.current) {
      const endTime = videoRef.current.getCurrentTime();
      const updatedSegment = { ...currentSegment, end: endTime };

      // Here you would call your API to generate the summary
      const summary = await generateSummary(
        updatedSegment.start,
        updatedSegment.end
      );

      if (summary) {
        setSegments([...segments, { ...updatedSegment, summary }]);
      }

      setIsHighlighting(false);
      setCurrentSegment(null);
    }
  };

  return (
    <>
      <button>
        <ArrowLeft onClick={() => navigate(-1)} />
      </button>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Course Title</h1>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isGeneratingTranscript && (
          <Alert className="mb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertTitle>Generating Transcript</AlertTitle>
            <AlertDescription>
              Please wait while we generate the transcript for this video.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {currentContent.type === "video" ? (
                  <div className="aspect-video">
                    <ReactPlayer
                      ref={videoRef}
                      url={currentContent.url}
                      width="100%"
                      height="100%"
                      controls
                    />
                  </div>
                ) : (
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {currentContent.title}
                    </h2>
                    <p>
                      Document:{" "}
                      <a
                        href={currentContent.url}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View {currentContent.title}
                      </a>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Tabs defaultValue="comments" className="mt-6">
              <TabsList>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="ai-chat">Chat with AI</TabsTrigger>
                <TabsTrigger value="highlight">Highlight Segment</TabsTrigger>
              </TabsList>
              <TabsContent value="comments">
                <Card>
                  <CardContent className="p-2">
                    <form onSubmit={handleCommentSubmit} className="mb-4">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-2"
                      />
                      <Button type="submit">
                        Post Comment
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4">
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={comment.avatar}
                                alt={comment.user}
                              />
                              <AvatarFallback>{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold">{comment.user}</p>
                              <p>{comment.content}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  {comment.likes}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="ml-8 mt-2 flex items-start space-x-3"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={reply.avatar}
                                  alt={reply.user}
                                />
                                <AvatarFallback>{reply.user[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{reply.user}</p>
                                <p>{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ai-chat">
                <Card>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4 py-2">
                      {aiChat.map((message, index) => (
                        <div
                          key={index}
                          className={`mb-4 ${
                            message.role === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          <div
                            className={`inline-block p-2 rounded-lg ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <form
                      onSubmit={handleAiChatSubmit}
                      className="mt-4 flex items-center space-x-2"
                    >
                      <Input
                        placeholder="Ask the AI about this topic..."
                        value={aiMessage}
                        onChange={(e) => setAiMessage(e.target.value)}
                      />
                      <Button type="submit">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="highlight">
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Highlight Segment
                    </h2>
                    <div className="flex justify-between mb-4">
                      <Button
                        onClick={startHighlighting}
                        disabled={isHighlighting}
                      >
                        Start Highlighting
                      </Button>
                      <Button
                        onClick={endHighlighting}
                        disabled={!isHighlighting}
                      >
                        End Highlighting
                      </Button>
                    </div>
                    <ScrollArea className="h-[300px] pr-4">
                      {segments.map((segment, index) => (
                        <Card key={index} className="p-4 mb-4">
                          <h3 className="font-bold">Segment {index + 1}</h3>
                          <p>
                            Time: {formatTime(segment.start)} -{" "}
                            {formatTime(segment.end)}
                          </p>
                          <p className="mt-2">
                            <FormattedSummary summary={segment.summary} />
                          </p>
                        </Card>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <Card>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      {courseContent.map((content, index) => (
                        <div key={content.id}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${
                              currentContent.id === content.id ? "bg-muted" : ""
                            }`}
                            onClick={() => handleContentSelect(content)}
                          >
                            <div className="flex items-center w-full">
                              <div className="mr-2 font-semibold">
                                {index + 1}.
                              </div>
                              <div className="flex-1 text-left">
                                <div>{content.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {content.type === "video"
                                    ? `${content.duration} • Video`
                                    : "Document"}
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </div>
                          </Button>
                          {index < courseContent.length - 1 && <Separator />}
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="attachments">
                <Card>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      {attachments.map((attachment, index) => (
                        <div key={attachment.id}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            asChild
                          >
                            <a
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex items-center w-full">
                                <FileText className="mr-2 h-4 w-4" />
                                <div className="flex-1 text-left">
                                  <div>{attachment.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {attachment.type.toUpperCase()}
                                  </div>
                                </div>
                                <ChevronRight className="h-4 w-4 ml-2" />
                              </div>
                            </a>
                          </Button>
                          {index < attachments.length - 1 && <Separator />}
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={33} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  2 of 6 lessons completed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
