import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Gift, Snowflake, Star, TreePine } from 'lucide-react';
import { toast } from 'sonner';
import type { Team, Designation } from '../App';

interface LandingPageProps {
  onLogin: (email: string, password: string) => boolean;
  onRegister: (userData: { fullName: string; email: string; password: string; team: string; designation: string }) => boolean;
  teams: Team[];
  designations: Designation[];
}

export function LandingPage({ onLogin, onRegister, teams, designations }: LandingPageProps) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    team: '',
    designation: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onLogin(loginForm.email, loginForm.password);
    if (!success) {
      toast.error('Invalid credentials. Please try again.');
    } else {
      toast.success('Welcome back!');
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!registerForm.fullName || !registerForm.email || !registerForm.password || !registerForm.team || !registerForm.designation) {
      toast.error('Please fill in all fields.');
      return;
    }
    
    if (!registerForm.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    if (registerForm.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onRegister(registerForm);
    if (success) {
      toast.success('Registration successful! Welcome to Secret Santa!');
    } else {
      toast.error('Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Snowflake className="absolute top-10 left-10 text-blue-200 w-6 h-6 animate-pulse" />
        <Star className="absolute top-20 right-20 text-yellow-300 w-5 h-5 animate-ping" />
        <TreePine className="absolute bottom-20 left-20 text-green-300 w-8 h-8 animate-bounce" />
        <Gift className="absolute bottom-10 right-10 text-red-300 w-6 h-6 animate-pulse" />
        <Snowflake className="absolute top-1/2 left-1/4 text-blue-100 w-4 h-4 animate-spin" />
        <Star className="absolute bottom-1/3 right-1/3 text-yellow-200 w-3 h-3 animate-pulse" />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              Secret Santa
            </h1>
            <TreePine className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-muted-foreground">
            Join the festive fun with your colleagues!
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
              Welcome Back!
            </CardTitle>
            <CardDescription>
              Sign in to your account or create a new one to participate
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Demo credentials: admin@company.com / any password
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Choose a secure password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-team">Team</Label>
                      <Select onValueChange={(value) => setRegisterForm(prev => ({ ...prev, team: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.id} value={team.name}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-designation">Designation</Label>
                      <Select onValueChange={(value) => setRegisterForm(prev => ({ ...prev, designation: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {designations.map((designation) => (
                            <SelectItem key={designation.id} value={designation.name}>
                              {designation.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>🎄 Spread joy this holiday season! 🎁</p>
        </div>
      </div>
    </div>
  );
}