import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Gift, TreePine, Music, VolumeX, LogOut, Clock, Sparkles, Heart, User as UserIcon, Mail, Building, Briefcase, Snowflake, Star, ExternalLink, Users } from 'lucide-react';
import type { User, Team, Designation } from '../App';

interface UserDashboardProps {
  user: User;
  users: User[];
  teams: Team[];
  designations: Designation[];
  secretSantaRecipient: User | null;
  isPairingComplete: boolean;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;
  updateGiftStatus: (userId: string, field: 'giftSent' | 'giftReceived', value: boolean) => void;
  onLogout: () => void;
}

export function UserDashboard({ 
  user, 
  users,
  teams,
  designations,
  secretSantaRecipient, 
  isPairingComplete,
  isMusicPlaying,
  setIsMusicPlaying,
  updateGiftStatus,
  onLogout 
}: UserDashboardProps) {
    const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date('2024-12-25T00:00:00');
      const now = new Date();
      const difference = christmas.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const greetings = [
    "Ho ho ho! 🎅",
    "Merry Christmas! 🎄",
    "Happy Holidays! ⭐",
    "Jingle all the way! 🔔",
    "Deck the halls! 🎊"
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 via-white to-green-50 relative overflow-hidden">
      {/* Animated background elements - Fewer and smaller */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Snowflake className="absolute top-8 left-8 text-blue-200/20 w-6 h-6 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <Star className="absolute top-16 right-16 text-yellow-300/30 w-4 h-4 animate-pulse" style={{ animationDelay: '1s' }} />
        <TreePine className="absolute bottom-16 left-16 text-green-300/20 w-6 h-6 animate-pulse" style={{ animationDelay: '2s' }} />
        <Gift className="absolute bottom-8 right-8 text-red-300/30 w-5 h-5 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
      </div>

      <div className="relative z-10 p-2 sm:p-3 h-full overflow-y-auto">
        {/* Header - More Compact */}
        <div className="max-w-6xl mx-auto mb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-md border gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900">Secret Santa Dashboard</h1>
                <p className="text-xs text-gray-600">Welcome, {user.fullName}!</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                className="flex items-center gap-1 text-xs px-2 py-1"
              >
                {isMusicPlaying ? <VolumeX className="w-3 h-3" /> : <Music className="w-3 h-3" />}
                <span className="hidden sm:inline">{isMusicPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              
              {/* Profile Card with Hover */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow p-1">
                    <div className="flex items-center gap-1">
                      <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                        <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                          {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block">
                        <p className="text-xs font-medium">{user.fullName}</p>
                        <p className="text-xs text-muted-foreground">{user.designation}</p>
                      </div>
                    </div>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-red-100 text-red-600 text-lg">
                          {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{user.fullName}</h4>
                        <p className="text-sm text-muted-foreground">{user.designation}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{user.team} Team</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span>{user.designation}</span>
                      </div>
                      {user.isAdmin && (
                        <div className="flex items-center gap-2 text-sm">
                          <UserIcon className="w-4 h-4 text-muted-foreground" />
                          <Badge className="bg-red-100 text-red-800">Administrator</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center gap-1 text-xs px-2 py-1"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Compact Christmas Countdown */}
        <div className="max-w-6xl mx-auto mb-3">
          <Card className="bg-gradient-to-r from-red-600 via-red-500 to-green-600 text-white border-0 shadow-lg relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1 left-1 animate-pulse">
                <Snowflake className="w-3 h-3" />
              </div>
              <div className="absolute top-1 right-1 animate-bounce" style={{ animationDelay: '1s' }}>
                <Star className="w-2 h-2" />
              </div>
              <div className="absolute bottom-1 left-2 animate-pulse" style={{ animationDelay: '2s' }}>
                <TreePine className="w-3 h-3" />
              </div>
              <div className="absolute bottom-1 right-2 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Gift className="w-3 h-3" />
              </div>
            </div>
            
            <CardHeader className="text-center py-2 relative z-10">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <CardTitle className="text-base sm:text-lg">Christmas Countdown</CardTitle>
                <TreePine className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </CardHeader>
            
            <CardContent className="pb-2 relative z-10">
              <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded p-2 text-center border border-white/30">
                  <div className="text-lg sm:text-xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-red-100">Days</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded p-2 text-center border border-white/30">
                  <div className="text-lg sm:text-xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-red-100">Hours</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded p-2 text-center border border-white/30">
                  <div className="text-lg sm:text-xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-red-100">Minutes</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded p-2 text-center border border-white/30">
                  <div className="text-lg sm:text-xl font-bold animate-pulse">{timeLeft.seconds}</div>
                  <div className="text-xs text-red-100">Seconds</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Compact Single Page Layout */}
        <div className="max-w-6xl mx-auto space-y-3">
          {/* Secret Santa Assignment - Compact */}
          <Card className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white border-0 shadow-lg relative overflow-hidden">
            {/* Magical background effects */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-1 left-1 animate-pulse">
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </div>
              <div className="absolute top-1 right-1" style={{ animationDelay: '1s' }}>
                <Star className="w-2 h-2 text-yellow-400" />
              </div>
              <div className="absolute bottom-1 left-1 animate-pulse" style={{ animationDelay: '2s' }}>
                <Heart className="w-2 h-2 text-pink-300" />
              </div>
              <div className="absolute bottom-1 right-1" style={{ animationDelay: '0.5s' }}>
                <Gift className="w-3 h-3 text-yellow-300" />
              </div>
            </div>
            
            <CardHeader className="text-center py-2 relative z-10">
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                <CardTitle className="text-base sm:text-lg bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  Your Secret Santa Assignment
                </CardTitle>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <p className="text-pink-100 text-xs sm:text-sm">{randomGreeting}</p>
            </CardHeader>
            
            <CardContent className="text-center relative z-10 pb-3">
              {isPairingComplete && secretSantaRecipient ? (
                <div className="space-y-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/30">
                    <div className="text-2xl sm:text-3xl mb-2">🎁</div>
                    <div className="text-base sm:text-lg font-bold mb-1 text-yellow-100">{secretSantaRecipient.fullName}</div>
                    <div className="space-y-0.5 text-pink-100">
                      <p className="text-xs sm:text-sm">{secretSantaRecipient.designation}</p>
                      <p className="text-xs sm:text-sm">{secretSantaRecipient.team} Team</p>
                    </div>
                  </div>
                  
                  {/* Gift Action Buttons */}
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={() => updateGiftStatus(user.id, 'giftSent', !user.giftSent)}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs transition-all duration-300 ${
                        user.giftSent 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      <Gift className="w-3 h-3" />
                      <span>{user.giftSent ? 'Gift Sent ✓' : 'Mark Sent'}</span>
                    </Button>
                    <Button 
                      onClick={() => updateGiftStatus(user.id, 'giftReceived', !user.giftReceived)}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs transition-all duration-300 ${
                        user.giftReceived 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-blue-500 hover:bg-blue-600 animate-pulse'
                      }`}
                      style={{ animationDuration: '2s' }}
                    >
                      <Heart className="w-3 h-3" />
                      <span>{user.giftReceived ? 'Gift Received ✓' : 'Mark Received'}</span>
                    </Button>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-md p-2 border border-white/20">
                    <p className="text-pink-100 text-xs">
                      🤫 Keep it secret • 💰 Budget: $10-50 • 📅 Exchange: Dec 25th
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <div className="text-2xl sm:text-3xl mb-2 animate-spin" style={{ animationDuration: '3s' }}>⏳</div>
                  <div className="text-sm sm:text-base font-bold mb-2 text-yellow-100">Assignments Not Ready Yet!</div>
                  <p className="text-pink-100 text-xs">
                    Admin needs to initiate the Secret Santa pairing process.<br />
                    Check back soon to discover your special assignment! ✨
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bottom Row - Gift Ideas and Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Holiday Gift Ideas - Ultra Compact */}
            <Card 
              className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white border-0 shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden"
              onClick={() => window.open('https://www.amazon.com/gift-ideas', '_blank')}
            >
              <div className="absolute top-1 right-1">
                <ExternalLink className="w-3 h-3 text-white/80" />
              </div>
              
              <CardHeader className="py-2">
                <CardTitle className="flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Gift Ideas
                </CardTitle>
              </CardHeader>
              
              <CardContent className="py-1">
                <div className="space-y-1">
                  <div className="bg-white/20 rounded px-1.5 py-1">
                    <p className="text-xs">🍫 Treats</p>
                  </div>
                  <div className="bg-white/20 rounded px-1.5 py-1">
                    <p className="text-xs">☕ Cozy</p>
                  </div>
                  <div className="bg-white/20 rounded px-1.5 py-1">
                    <p className="text-xs">🎁 Cards</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats - Updated with Total Users, Teams, Designations */}
            <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border shadow-md md:col-span-3">
              <CardHeader className="py-2">
                <CardTitle className="flex items-center gap-2 text-gray-800 text-sm">
                  <Users className="w-4 h-4 text-blue-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              
              <CardContent className="py-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 bg-blue-100 rounded-lg border border-blue-300">
                    <Users className="w-5 h-5 text-blue-700 mb-1" />
                    <span className="text-xs text-gray-700 mb-0.5">Total Users</span>
                    <span className="font-bold text-sm text-blue-900">{users.length}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-green-100 rounded-lg border border-green-300">
                    <Building className="w-5 h-5 text-green-700 mb-1" />
                    <span className="text-xs text-gray-700 mb-0.5">Active Teams</span>
                    <span className="font-bold text-sm text-green-900">{teams.length}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-purple-100 rounded-lg border border-purple-300">
                    <Briefcase className="w-5 h-5 text-purple-700 mb-1" />
                    <span className="text-xs text-gray-700 mb-0.5">Designations</span>
                    <span className="font-bold text-sm text-purple-900">{designations.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Music indicator - Compact */}
      {isMusicPlaying && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-1 animate-pulse border border-white/20 backdrop-blur-sm z-50">
          <Music className="w-4 h-4" />
          <span className="text-xs font-medium">🎵 Playing...</span>
        </div>
      )}
    </div>
  );
}