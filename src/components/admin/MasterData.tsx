import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Building2, Briefcase, Plus, Users, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { toast } from 'sonner';
import type { Team, Designation } from '../../App';

interface MasterDataProps {
  teams: Team[];
  designations: Designation[];
  onAddTeam: (name: string) => void;
  onDeleteTeam: (teamId: string) => void;
  onAddDesignation: (name: string) => void;
  onDeleteDesignation: (designationId: string) => void;
}

export function MasterData({ teams, designations, onAddTeam, onDeleteTeam, onAddDesignation, onDeleteDesignation }: MasterDataProps) {
  const [newTeamName, setNewTeamName] = useState('');
  const [newDesignationName, setNewDesignationName] = useState('');
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isDesignationDialogOpen, setIsDesignationDialogOpen] = useState(false);

  const handleAddTeam = () => {
    if (!newTeamName.trim()) {
      toast.error('Please enter a team name.');
      return;
    }

    if (teams.some(team => team.name.toLowerCase() === newTeamName.toLowerCase())) {
      toast.error('A team with this name already exists.');
      return;
    }

    onAddTeam(newTeamName.trim());
    setNewTeamName('');
    setIsTeamDialogOpen(false);
    toast.success('Team added successfully!');
  };

  const handleAddDesignation = () => {
    if (!newDesignationName.trim()) {
      toast.error('Please enter a designation name.');
      return;
    }

    if (designations.some(designation => designation.name.toLowerCase() === newDesignationName.toLowerCase())) {
      toast.error('A designation with this name already exists.');
      return;
    }

    onAddDesignation(newDesignationName.trim());
    setNewDesignationName('');
    setIsDesignationDialogOpen(false);
    toast.success('Designation added successfully!');
  };

  const handleDeleteTeam = (teamId: string, teamName: string) => {
    onDeleteTeam(teamId);
    toast.success(`Team "${teamName}" has been deleted.`);
  };

  const handleDeleteDesignation = (designationId: string, designationName: string) => {
    onDeleteDesignation(designationId);
    toast.success(`Designation "${designationName}" has been deleted.`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Teams</p>
                <p className="text-3xl font-bold">{teams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Designations</p>
                <p className="text-3xl font-bold">{designations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Teams Management
          </CardTitle>
          
          <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Team</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="Enter team name (e.g., Engineering, Design)"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsTeamDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTeam}>
                  Add Team
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent>
          {teams.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No teams created yet.</p>
              <p className="text-sm">Add your first team to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {teams.map((team) => (
                <Card key={team.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded">
                        <Building2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Team ID: {team.id}
                        </p>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Team</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the team "{team.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTeam(team.id, team.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Designations Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Designations Management
          </CardTitle>
          
          <Dialog open={isDesignationDialogOpen} onOpenChange={setIsDesignationDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Designation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Designation</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="designation-name">Designation Name</Label>
                  <Input
                    id="designation-name"
                    placeholder="Enter designation (e.g., Senior Developer, Manager)"
                    value={newDesignationName}
                    onChange={(e) => setNewDesignationName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddDesignation()}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsDesignationDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDesignation}>
                  Add Designation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent>
          {designations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No designations created yet.</p>
              <p className="text-sm">Add your first designation to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {designations.map((designation) => (
                <Card key={designation.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded">
                        <Briefcase className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{designation.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Role ID: {designation.id}
                        </p>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Designation</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the designation "{designation.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteDesignation(designation.id, designation.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-dashed">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Master Data Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Teams help organize users by their work groups (Engineering, Design, etc.)</li>
                <li>• Designations represent job roles and hierarchy levels</li>
                <li>• Both teams and designations are used in user registration and analytics</li>
                <li>• Consider your organization structure when creating these categories</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}