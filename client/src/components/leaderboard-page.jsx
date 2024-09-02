

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronUp, ChevronDown } from "lucide-react";

// Mock data for leaderboard
const leaderboardData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  points: Math.floor(Math.random() * 10000),
  avatar: `/placeholder.svg?height=40&width=40`,
  league: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'][Math.floor(Math.random() * 5)],
  rank: i + 1,
  rankChange: Math.floor(Math.random() * 5) - 2, // Random number between -2 and 2
}))

// Sort leaderboard data by points
leaderboardData.sort((a, b) => b.points - a.points)

// Assign ranks after sorting
leaderboardData.forEach((user, index) => {
  user.rank = index + 1
})

const currentUserId = 42 // Assuming the current user's ID is 42

export function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(leaderboardData)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = leaderboard.find(u => u.id === currentUserId)
    setCurrentUser(user)
  }, [])

  const getLeagueColor = (league) => {
    switch (league) {
      case 'Bronze': return 'bg-amber-600'
      case 'Silver': return 'bg-gray-400'
      case 'Gold': return 'bg-yellow-400'
      case 'Platinum': return 'bg-cyan-400'
      case 'Diamond': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const renderLeaderboardItem = (user, index) => (
    <div
      key={user.id}
      className={`flex items-center space-x-4 p-4 ${user.id === currentUserId ? 'bg-primary/10 rounded-lg' : ''}`}>
      <div className="flex-none w-8 text-center font-bold">{user.rank}</div>
      <Avatar className="flex-none">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <div className="font-semibold">{user.name}</div>
        <div className="text-sm text-muted-foreground">{user.points.toLocaleString()} points</div>
      </div>
      <Badge className={`flex-none ${getLeagueColor(user.league)} text-white`}>
        {user.league}
      </Badge>
      <div className="flex-none w-6 text-center">
        {user.rankChange > 0 ? (
          <ChevronUp className="inline text-green-500" />
        ) : user.rankChange < 0 ? (
          <ChevronDown className="inline text-red-500" />
        ) : null}
        {user.rankChange !== 0 && Math.abs(user.rankChange)}
      </div>
    </div>
  )

  return (
    (<div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Leaderboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {leaderboard.slice(0, 15).map(renderLeaderboardItem)}
              {currentUser && currentUser.rank > 15 && (
                <>
                  <div className="py-2 px-4 bg-muted text-center text-sm">
                    • • •
                  </div>
                  {renderLeaderboardItem(currentUser)}
                </>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-center">Your Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{currentUser?.rank}</div>
                <div className="text-xl">out of {leaderboard.length} students</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>League System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500 text-white">Diamond</Badge>
                  <span>Top 1-3 for 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-cyan-400 text-white">Platinum</Badge>
                  <span>Top 4-5 for 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-400 text-white">Gold</Badge>
                  <span>Top 6-7 for 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gray-400 text-white">Silver</Badge>
                  <span>Top 8-15 for 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-amber-600 text-white">Bronze</Badge>
                  <span>Below top 15</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Points</span>
                  <span className="font-bold">{currentUser?.points.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current League</span>
                  <Badge className={`${getLeagueColor(currentUser?.league)} text-white`}>
                    {currentUser?.league}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rank Change</span>
                  <span
                    className={currentUser?.rankChange > 0 ? 'text-green-500' : currentUser?.rankChange < 0 ? 'text-red-500' : ''}>
                    {currentUser?.rankChange > 0 ? '+' : ''}{currentUser?.rankChange}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>)
  );
}