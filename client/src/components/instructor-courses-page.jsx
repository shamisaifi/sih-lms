import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Search, MoreVertical, Eye, Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const courses = [
  { id: 1, title: "React Fundamentals", students: 120, revenue: 6000, status: "Published" },
  { id: 2, title: "Advanced JavaScript", students: 85, revenue: 4250, status: "Published" },
  { id: 3, title: "Node.js Mastery", students: 50, revenue: 2500, status: "Draft" },
  { id: 4, title: "Python for Beginners", students: 200, revenue: 10000, status: "Published" },
  { id: 5, title: "Data Science Essentials", students: 75, revenue: 3750, status: "Draft" },
]

export function InstructorCoursesPage() {

  const navigate = useNavigate()

  return (
    (<div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button onClick={() => navigate("create-course")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search courses..." className="max-w-sm" />
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <CourseList courses={courses} />
        </TabsContent>
        <TabsContent value="published">
          <CourseList courses={courses.filter(course => course.status === "Published")} />
        </TabsContent>
        <TabsContent value="draft">
          <CourseList courses={courses.filter(course => course.status === "Draft")} />
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Course Statistics</CardTitle>
          <CardDescription>Overview of your course performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Courses" value={courses.length} />
            <StatCard
              title="Published Courses"
              value={courses.filter(c => c.status === "Published").length} />
            <StatCard
              title="Total Students"
              value={courses.reduce((sum, course) => sum + course.students, 0)} />
            <StatCard
              title="Total Revenue"
              value={`$${courses.reduce((sum, course) => sum + course.revenue, 0)}`} />
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}

function CourseList({ courses }) {
  return (
    (<ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>Status: {course.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{course.students} students enrolled</span>
                <span>${course.revenue} earned</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Button variant="outline" size="sm" className="mr-2">
                  <Eye className="mr-2 h-4 w-4" /> View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>)
  );
}

function StatCard({ title, value }) {
  return (
    (<Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>)
  );
}