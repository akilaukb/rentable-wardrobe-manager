import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Shirt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps = {}) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    if (!emailOrUsername.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your username or email address",
        variant: "destructive",
      });
      return false;
    }

    if (!password.trim()) {
      toast({
        title: "Validation Error", 
        description: "Please enter your password",
        variant: "destructive",
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement Supabase authentication
      console.log('Login attempt:', { emailOrUsername, password });
      
      // Simulate login for now
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Login Successful",
          description: "Welcome to the Clothing Rental Management System",
        });
        
        // Set authentication tokens
        localStorage.setItem('auth_token', 'authenticated_user');
        localStorage.setItem('user_role', 'admin');
        
        // Trigger parent component to update authentication state
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          // Fallback - force page reload to trigger auth check
          window.location.reload();
        }
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fashion-inspired background */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200" />
        
        {/* Fabric texture pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.15'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        {/* Blurred clothing items effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23475569' stroke-width='2' opacity='0.3'%3E%3Crect x='20' y='30' width='40' height='60' rx='5' /%3E%3Crect x='80' y='25' width='38' height='65' rx='5' /%3E%3Crect x='140' y='35' width='42' height='55' rx='5' /%3E%3Crect x='50' y='110' width='36' height='70' rx='5' /%3E%3Crect x='110' y='105' width='44' height='75' rx='5' /%3E%3C/g%3E%3C/svg%3E")`,
            filter: 'blur(2px)'
          }}
        />
        
        {/* Navy accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/5 via-transparent to-burgundy-900/5" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 relative z-10 backdrop-blur-sm bg-white/95 shadow-2xl border-0 ring-1 ring-gray-200/50">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-navy-600 to-navy-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Shirt className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
            Clothing Rental Co.
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Internal Management System
          </p>
        </CardHeader>
        
        <CardContent className="pt-2">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="emailOrUsername" className="text-sm font-medium text-gray-700">
                Username or Email
              </Label>
              <Input
                id="emailOrUsername"
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter username or email"
                required
                className="h-11 bg-white border-gray-300 focus:border-navy-500 focus:ring-navy-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-11 pr-10 bg-white border-gray-300 focus:border-navy-500 focus:ring-navy-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 text-white font-medium shadow-lg transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Log In'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Access restricted to authorized personnel only.<br />
              For support, contact your system administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
