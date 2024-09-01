import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { CalendarIcon, BookOpenIcon, AwardIcon, ClockIcon, FlameIcon } from 'lucide-react'

// Mock data (replace with actual data from your backend)
const courseProgress = [
  { name: 'React Basics', progress: 80 },
  { name: 'JavaScript Fundamentals', progress: 100 },
  { name: 'CSS Mastery', progress: 60 },
  { name: 'Node.js Essentials', progress: 40 },
  { name: 'Database Design', progress: 20 },
]

const weeklyActivity = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 3 },
  { day: 'Sun', hours: 1 },
]

const skillTimeline = [
  { skill: 'HTML Basics', date: '2023-01-15', progress: 100 },
  { skill: 'CSS Fundamentals', date: '2023-02-01', progress: 100 },
  { skill: 'JavaScript Basics', date: '2023-02-15', progress: 100 },
  { skill: 'React Introduction', date: '2023-03-01', progress: 80 },
  { skill: 'State Management', date: '2023-03-15', progress: 60 },
  { skill: 'API Integration', date: '2023-04-01', progress: 40 },
  { skill: 'Testing', date: '2023-04-15', progress: 20 },
  { skill: 'Deployment', date: '2023-05-01', progress: 0 },
]

export default function StudenDashboard() {
  const totalProgress = courseProgress.reduce((sum, course) => sum + course.progress, 0) / courseProgress.length
  const streak = 7 // Mock streak data
  const estimatedCompletionDate = new Date('2023-06-15') // Mock completion date

  return (
    <div className="space-y-6 bg-transparent">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProgress.toFixed(0)}%</div>
            <Progress value={totalProgress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
            <FlameIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <AwardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseProgress.length}</div>
            <p className="text-xs text-muted-foreground">Across various topics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Completion</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estimatedCompletionDate.toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">Keep up the pace!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your progress in each enrolled course</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Hours spent learning this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hours" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Acquisition Timeline</CardTitle>
          <CardDescription>Your learning journey and future milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-8">
              {skillTimeline.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 w-12 text-sm">{new Date(skill.date).toLocaleDateString()}</div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center">
                      <div className="text-sm font-medium">{skill.skill}</div>
                      <Badge variant={skill.progress === 100 ? "default" : "secondary"} className="ml-2">
                        {skill.progress === 100 ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <Progress value={skill.progress} className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}