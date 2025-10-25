import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Users, TrendingUp } from 'lucide-react';
import type { User, Team, Designation } from '../../App';

interface AnalyticsProps {
  users: User[];
  teams: Team[];
  designations: Designation[];
}

export function Analytics({ users, teams, designations }: AnalyticsProps) {
  // Prepare data for team distribution chart
  const teamData = teams.map(team => ({
    name: team.name,
    count: users.filter(user => user.team === team.name).length,
    percentage: ((users.filter(user => user.team === team.name).length / users.length) * 100).toFixed(1)
  })).filter(item => item.count > 0);

  // Prepare data for designation distribution chart
  const designationData = designations.map(designation => ({
    name: designation.name,
    count: users.filter(user => user.designation === designation.name).length,
    percentage: ((users.filter(user => user.designation === designation.name).length / users.length) * 100).toFixed(1)
  })).filter(item => item.count > 0);

  // Colors for charts
  const COLORS = ['#c41e3a', '#2d8659', '#ffd700', '#6f42c1', '#fd7e14', '#20c997', '#6610f2', '#d63384'];

  // Calculate statistics
  const totalUsers = users.length;
  const totalTeams = teamData.length;
  const totalDesignations = designationData.length;
  const averageUsersPerTeam = totalTeams > 0 ? (totalUsers / totalTeams).toFixed(1) : '0';

  const largestTeam = teamData.length > 0 ? teamData.reduce((max, team) => team.count > max.count ? team : max) : null;
  const mostCommonDesignation = designationData.length > 0 ? designationData.reduce((max, designation) => designation.count > max.count ? designation : max) : null;

  // User role statistics
  const adminCount = users.filter(u => u.isAdmin).length;
  const regularUsersCount = totalUsers - adminCount;
  const adminPercentage = totalUsers > 0 ? ((adminCount / totalUsers) * 100).toFixed(1) : '0';

  // Diversity metrics
  const teamDiversityScore = totalTeams > 0 ? (totalUsers / totalTeams).toFixed(2) : '0';
  const roleDiversityScore = totalDesignations > 0 ? (totalUsers / totalDesignations).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      {/* Overview Statistics - Matching Screenshot Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-blue-600 mb-3" />
              <p className="text-sm text-gray-600 mb-2">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
              <p className="text-sm text-gray-600 mb-2">Active Teams</p>
              <p className="text-3xl font-bold text-gray-900">{totalTeams}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <PieChartIcon className="w-8 h-8 text-purple-600 mb-3" />
              <p className="text-sm text-gray-600 mb-2">Designations</p>
              <p className="text-3xl font-bold text-gray-900">{totalDesignations}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Distribution Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Users by Team
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {teamData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>No team data available</p>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} users`, 'Count']}
                      labelFormatter={(label) => `Team: ${label}`}
                    />
                    <Bar dataKey="count" fill="#c41e3a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Designation Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Designation Distribution
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {designationData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <PieChartIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>No designation data available</p>
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={designationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {designationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} users`, 'Count']}
                    />
                    <Legend 
                      formatter={(value, entry: any) => `${value} (${entry.payload.percentage}%)`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Team Insights</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {largestTeam ? (
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm text-blue-700 font-medium">Largest Team</p>
                <p className="text-lg font-bold text-blue-900">
                  {largestTeam.name} ({largestTeam.count} users)
                </p>
              </div>
            ) : (
              <p className="text-blue-700">No team data available</p>
            )}
            
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-blue-700 font-medium">Team Balance</p>
              <p className="text-sm text-blue-800">
                {totalTeams > 0 ? (
                  `${averageUsersPerTeam} users per team on average`
                ) : (
                  'No teams created yet'
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Role Insights</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {mostCommonDesignation ? (
              <div className="p-3 bg-white rounded-lg">
                <p className="text-sm text-green-700 font-medium">Most Common Role</p>
                <p className="text-lg font-bold text-green-900">
                  {mostCommonDesignation.name} ({mostCommonDesignation.count} users)
                </p>
              </div>
            ) : (
              <p className="text-green-700">No designation data available</p>
            )}
            
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-green-700 font-medium">Diversity</p>
              <p className="text-sm text-green-800">
                {totalDesignations > 0 ? (
                  `${totalDesignations} different roles represented`
                ) : (
                  'No designations created yet'
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-900">User Roles</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-red-700 font-medium">Admin Users</p>
              <p className="text-lg font-bold text-red-900">
                {adminCount} ({adminPercentage}%)
              </p>
            </div>
            
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-red-700 font-medium">Regular Users</p>
              <p className="text-sm text-red-800">
                {regularUsersCount} users ({((regularUsersCount / totalUsers) * 100).toFixed(1)}%)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Summary Table */}
      {(teamData.length > 0 || designationData.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Team Summary</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {teamData.map((team, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{team.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{team.count} users</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {team.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {designationData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Designation Summary</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {designationData.map((designation, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{designation.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{designation.count} users</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {designation.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}