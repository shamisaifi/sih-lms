import { useState } from 'react'
import ReactPlayer from 'react-player'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ChevronRight, MessageSquare, ThumbsUp, Send, FileText } from "lucide-react";

// Mock data for course content
const courseContent = [
  { id: 1, title: "Introduction to the Course", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "10:30" },
  { id: 2, title: "Setting Up Your Development Environment", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "15:45" },
  { id: 3, title: "Basic Concepts", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "20:15" },
  { id: 4, title: "Course Resources", type: "document", url: "/course-resources.pdf" },
  { id: 5, title: "Advanced Techniques", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "25:00" },
  { id: 6, title: "Project Guidelines", type: "document", url: "/project-guidelines.pdf" },
]

// Mock data for comments
const comments = [
  { id: 1, user: "Alice", avatar: "/placeholder.svg?height=32&width=32", content: "Great explanation! This really helped me understand the concept.", likes: 5, replies: [] },
  { id: 2, user: "Bob", avatar: "/placeholder.svg?height=32&width=32", content: "I have a question about the implementation. Can you clarify how...", likes: 2, replies: [
    { id: 3, user: "Instructor", avatar: "/placeholder.svg?height=32&width=32", content: "The implementation works by..." },
  ]},
]

// Mock data for attachments
const attachments = [
  { id: 1, title: "Course Syllabus", type: "pdf", url: "/course-syllabus.pdf" },
  { id: 2, title: "Supplementary Reading", type: "pdf", url: "/supplementary-reading.pdf" },
  { id: 3, title: "Code Samples", type: "zip", url: "/code-samples.zip" },
  { id: 4, title: "Lecture Notes", type: "pdf", url: "/lecture-notes.pdf" },
]

export function CourseViewPage() {
  const [currentContent, setCurrentContent] = useState(courseContent[0])
  const [newComment, setNewComment] = useState("")
  const [aiMessage, setAiMessage] = useState("")
  const [aiChat, setAiChat] = useState([])

  const handleContentSelect = (content) => {
    setCurrentContent(content)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log("New comment:", newComment)
    setNewComment("")
    // Here you would typically send the comment to your backend
  }

  const handleAiChatSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the message to your AI backend and get a response
    const userMessage = { role: 'user', content: aiMessage }
    const aiResponse = { role: 'assistant', content: `Here's a response about "${currentContent.title}": ${aiMessage}` }
    setAiChat([...aiChat, userMessage, aiResponse])
    setAiMessage("")
  }

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Course Title</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {currentContent.type === 'video' ? (
                <div className="aspect-video">
                  <ReactPlayer url={currentContent.url} width="100%" height="100%" controls />
                </div>
              ) : (
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{currentContent.title}</h2>
                  <p>Document: <a
                    href={currentContent.url}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer">View {currentContent.title}</a></p>
                </div>
              )}
            </CardContent>
          </Card>
          <Tabs defaultValue="comments" className="mt-6">
            <TabsList>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="ai-chat">Chat with AI</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <Card>
                <CardContent className="p-2">
                  <form onSubmit={handleCommentSubmit} className="mb-4">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2" />
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
                            <AvatarImage src={comment.avatar} alt={comment.user} />
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
                          <div key={reply.id} className="ml-8 mt-2 flex items-start space-x-3">
                            <Avatar>
                              <AvatarImage src={reply.avatar} alt={reply.user} />
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
                        className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div
                          className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <form
                    onSubmit={handleAiChatSubmit}
                    className="mt-4 flex items-center space-x-2">
                    <Input
                      placeholder="Ask the AI about this topic..."
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)} />
                    <Button type="submit">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
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
                          className={`w-full justify-start ${currentContent.id === content.id ? 'bg-muted' : ''}`}
                          onClick={() => handleContentSelect(content)}>
                          <div className="flex items-center w-full">
                            <div className="mr-2 font-semibold">{index + 1}.</div>
                            <div className="flex-1 text-left">
                              <div>{content.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {content.type === 'video' ? `${content.duration} • Video` : 'Document'}
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
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer">
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
              <p className="text-sm text-muted-foreground mt-2">2 of 6 lessons completed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>)
  );
}