import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Shuffle, Users, Gift, CheckCircle, AlertTriangle, ArrowRight, Download, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import type { User, Pairing } from '../../App';

interface PairingControlProps {
  users: User[];
  pairings: Pairing[];
  isPairingComplete: boolean;
  onInitiatePairing: () => void;
}

export function PairingControl({ users, pairings, isPairingComplete, onInitiatePairing }: PairingControlProps) {
  const [isInitiating, setIsInitiating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isReshuffling, setIsReshuffling] = useState(false);

  const handleInitiatePairing = async () => {
    setIsInitiating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onInitiatePairing();
    setIsInitiating(false);
    toast.success('Secret Santa pairing completed successfully!');
  };

  const handleReshufflePairing = async () => {
    setIsReshuffling(true);
    
    // Simulate reshuffling process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onInitiatePairing(); // Re-run the pairing algorithm
    setIsReshuffling(false);
    toast.success('Secret Santa pairings have been reshuffled successfully!');
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : 'Unknown User';
  };

  const exportPairings = async () => {
    setIsExporting(true);
    
    // Simulate export processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Prepare CSV data
      const headers = ['Giver Name', 'Giver Email', 'Receiver Name', 'Receiver Email'];
      const csvData = [
        headers.join(','),
        ...pairings.map(pairing => {
          const giver = users.find(u => u.id === pairing.giver);
          const receiver = users.find(u => u.id === pairing.receiver);
          return [
            `"${giver?.fullName || 'Unknown'}"`,
            `"${giver?.email || 'Unknown'}"`,
            `"${receiver?.fullName || 'Unknown'}"`,
            `"${receiver?.email || 'Unknown'}"`
          ].join(',');
        })
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `secret-santa-pairings-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Pairings exported successfully!');
    } catch (error) {
      toast.error('Failed to export pairings. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const canInitiatePairing = users.length >= 2;

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pairings Created</p>
                <p className="text-2xl font-bold">{pairings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {isPairingComplete ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              )}
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={isPairingComplete ? "default" : "secondary"} className="mt-1">
                  {isPairingComplete ? "Complete" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Initiate Pairing - Simplified */}
      {!isPairingComplete && (
        <Card>
          <CardContent className="p-6">
            {!canInitiatePairing ? (
              <div className="text-center py-4">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-orange-500" />
                <h3 className="text-lg font-semibold mb-2">Insufficient Participants</h3>
                <p className="text-muted-foreground mb-3">
                  You need at least 2 users to create Secret Santa pairings.
                </p>
                <p className="text-sm text-muted-foreground">
                  Current participants: {users.length}
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Create Pairings</h3>
                  <p className="text-muted-foreground">
                    {users.length} users are ready to be paired for Secret Santa.
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      disabled={isInitiating}
                    >
                      <Shuffle className="w-5 h-5" />
                      {isInitiating ? 'Creating Pairings...' : 'Initiate Pairing'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Create Secret Santa Pairings?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will randomly assign each user someone to give a gift to. 
                        Once created, users will be able to see their assignments in their dashboard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleInitiatePairing}
                        disabled={isInitiating}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isInitiating ? 'Creating...' : 'Create Pairings'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Current Pairings (Admin View) */}
      {isPairingComplete && pairings.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Current Pairings (Admin View Only)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleReshufflePairing}
                disabled={isReshuffling}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                {isReshuffling ? 'Re-shuffling...' : 'Re-Shuffle Pairing'}
              </Button>
              <Button
                onClick={exportPairings}
                disabled={isExporting}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exporting...' : 'Export Pairings'}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="font-medium text-red-900">Confidential Information</span>
              </div>
              <p className="text-sm text-red-800">
                This information is only visible to administrators. 
                Do not share these pairings with users to maintain the surprise!
              </p>
            </div>
            
            <Accordion type="single" collapsible defaultValue="pairings" className="w-full">
              <AccordionItem value="pairings">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span>View Secret Santa Pairings</span>
                    <Badge variant="secondary">{pairings.length} pairs</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-4">
                    {pairings.map((pairing, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{getUserName(pairing.giver)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-sm">gives gift to</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{getUserName(pairing.receiver)}</span>
                          <Gift className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}