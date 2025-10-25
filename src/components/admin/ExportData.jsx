import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Download, FileSpreadsheet, Users, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function ExportData({ users }) {
  const [isExporting, setIsExporting] = useState(false);
  const [lastExportTime, setLastExportTime] = useState(null);

  const exportToCSV = async () => {
    setIsExporting(true);
    
    // Simulate export processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Prepare CSV data
      const headers = ['Full Name', 'Email', 'Team', 'Designation', 'Admin Status'];
      const csvData = [
        headers.join(','),
        ...users.map(user => [
          `"${user.fullName}"`,
          `"${user.email}"`,
          `"${user.team}"`,
          `"${user.designation}"`,
          user.isAdmin ? 'Yes' : 'No'
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `secret-santa-users-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setLastExportTime(new Date().toLocaleString());
      toast.success('User data exported successfully!');
    } catch (error) {
      toast.error('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getFileSize = () => {
    // Estimate file size based on user data
    const avgRowSize = 100; // Approximate bytes per row
    const headerSize = 50;
    const estimatedSize = (users.length * avgRowSize + headerSize);
    
    if (estimatedSize < 1024) {
      return `${estimatedSize} bytes`;
    } else if (estimatedSize < 1024 * 1024) {
      return `${(estimatedSize / 1024).toFixed(1)} KB`;
    } else {
      return `${(estimatedSize / (1024 * 1024)).toFixed(1)} MB`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Users to Export</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Estimated Size</p>
                <p className="text-2xl font-bold">{getFileSize()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Last Export</p>
                <p className="text-sm font-bold">
                  {lastExportTime ? lastExportTime.split(',')[0] : 'Never'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export User Data
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No Users to Export</h3>
              <p className="text-muted-foreground">
                There are no users in the system to export.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Export Details</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Format: CSV (Comma Separated Values)</li>
                  <li>• Includes: Full Name, Email, Team, Designation, Admin Status</li>
                  <li>• Compatible with Excel, Google Sheets, and other spreadsheet applications</li>
                  <li>• Data is exported as of the current moment</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded">
                    <FileSpreadsheet className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">User Data Export</h4>
                    <p className="text-sm text-muted-foreground">
                      CSV file with all user information
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={exportToCSV}
                  disabled={isExporting}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? 'Exporting...' : 'Export CSV'}
                </Button>
              </div>

              {lastExportTime && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800">
                    Last exported on {lastExportTime}
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Preview */}
      {users.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Preview</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Preview of the first {Math.min(5, users.length)} users that will be exported:
              </p>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Team</span>
                    <span>Designation</span>
                    <span>Admin</span>
                  </div>
                </div>
                
                <div className="divide-y">
                  {users.slice(0, 5).map((user, index) => (
                    <div key={index} className="px-4 py-3">
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <span className="font-medium">{user.fullName}</span>
                        <span className="text-muted-foreground">{user.email}</span>
                        <Badge variant="outline">{user.team}</Badge>
                        <span>{user.designation}</span>
                        <span>
                          {user.isAdmin && (
                            <Badge className="bg-red-100 text-red-800">Admin</Badge>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {users.length > 5 && (
                  <div className="px-4 py-2 bg-gray-50 text-center">
                    <span className="text-sm text-muted-foreground">
                      ... and {users.length - 5} more users
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Privacy Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-yellow-100 rounded">
              <Download className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-yellow-900 mb-1">Privacy & Security Notice</h4>
              <p className="text-sm text-yellow-800">
                The exported file contains personal information including names and email addresses. 
                Please handle this data responsibly and in accordance with your organization's privacy policies. 
                Do not share this file with unauthorized personnel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}