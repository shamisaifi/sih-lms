'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, TrendingUpIcon, UsersIcon, DollarSignIcon } from 'lucide-react'

// Mock data (replace with actual data from your backend)
const purchaseData = [
  { name: 'Jan', students: 40, revenue: 2000 },
  { name: 'Feb', students: 30, revenue: 1500 },
  { name: 'Mar', students: 60, revenue: 3000 },
  { name: 'Apr', students: 40, revenue: 2000 },
  { name: 'May', students: 70, revenue: 3500 },
  { name: 'Jun', students: 90, revenue: 4500 },
]

const feedbackData = [
  { name: '5 Stars', value: 60 },
  { name: '4 Stars', value: 30 },
  { name: '3 Stars', value: 7 },
  { name: '2 Stars', value: 2 },
  { name: '1 Star', value: 1 },
]

const courseData = [
  { name: 'React Basics', students: 120, rating: 4.5, revenue: 6000, completion: 85 },
  { name: 'Advanced JavaScript', students: 80, rating: 4.7, revenue: 4800, completion: 92 },
  { name: 'Node.js Masterclass', students: 60, rating: 4.2, revenue: 3600, completion: 78 },
  { name: 'Python for Beginners', students: 150, rating: 4.8, revenue: 7500, completion: 88 },
  { name: 'Data Science Fundamentals', students: 100, rating: 4.6, revenue: 6000, completion: 82 },
]

const studentEngagementData = [
  { subject: 'Video Completion', A: 120, B: 110, fullMark: 150 },
  { subject: 'Quiz Participation', A: 98, B: 130, fullMark: 150 },
  { subject: 'Assignment Submission', A: 86, B: 130, fullMark: 150 },
  { subject: 'Discussion Posts', A: 99, B: 100, fullMark: 150 },
  { subject: 'Live Session Attendance', A: 85, B: 90, fullMark: 150 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000']

export function InstructorDashboard() {
  return (
    (<div className="space-y-6 bg-transparent">
      <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$52,000</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Purchases & Revenue</CardTitle>
            <CardDescription>Number of students and revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={purchaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="#8884d8"
                  yAxisId="left" />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  fillOpacity={0.3}
                  fill="#82ca9d"
                  yAxisId="right" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Distribution</CardTitle>
            <CardDescription>Overall rating distribution across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={feedbackData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {feedbackData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Course Analysis</CardTitle>
          <CardDescription>Individual performance of each course</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-8">
              {courseData.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-semibold flex-grow">{course.name}</span>
                    <Badge variant="secondary">{course.students} students</Badge>
                  </div>
                  <Progress value={course.rating * 20} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Rating: {course.rating}/5</span>
                    <span>Revenue: ${course.revenue}</span>
                    <span>Completion: {course.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
            <CardDescription>Comparison of engagement metrics across courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={studentEngagementData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="Course A"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6} />
                <Radar
                  name="Course B"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Popularity</CardTitle>
            <CardDescription>Number of students enrolled in each course</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Live Student Activity</CardTitle>
          <CardDescription>Real-time view of student engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="studying">
            <TabsList>
              <TabsTrigger value="studying">Studying</TabsTrigger>
              <TabsTrigger value="purchasing">Purchasing</TabsTrigger>
            </TabsList>
            <TabsContent value="studying">
              <div className="text-2xl font-bold">42 students</div>
              <p className="text-sm text-muted-foreground">Currently active in courses</p>
              <Progress value={42} max={100} className="mt-2" />
            </TabsContent>
            <TabsContent value="purchasing">
              <div className="text-2xl font-bold">3 students</div>
              <p className="text-sm text-muted-foreground">In the process of buying a course</p>
              <Progress value={3} max={10} className="mt-2" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>)
  );
}