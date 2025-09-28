import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import goiLogo from '@/assets/goi-logo.png';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('email'); // 'email', 'password', 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, verifyOtp } = useAuth();
  const navigate = useNavigate();

  // Validate MCA email
  const validateMcaEmail = (email) => {
    return email.toLowerCase().endsWith('@mca.gov.in');
  };

  // Step 1: Email validation
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!validateMcaEmail(email)) {
      toast({
        title: "Access Denied",
        description: "Only MCA government officials can access this portal. Please use an @mca.gov.in email address.",
        variant: "destructive",
      });
      return;
    }

    setStep('password');
    toast({
      title: "Email Verified",
      description: "Please enter your password to continue",
    });
  };

  // Step 2: Password validation
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive",
      });
      return;
    }

    // Test credentials for development
    if (email.toLowerCase() === 'savants@mca.gov.in' && password === 'Syntax@123') {
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your email for verification",
      });
      setStep('otp');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials. Please check your password.",
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your email for verification",
      });
      setStep('otp');
      setLoading(false);
    }
  };

  // Step 3: OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP code",
        variant: "destructive",
      });
      return;
    }

    // Use dummy OTP for testing
    if (otp === '123456') {
      toast({
        title: "Success",
        description: "Admin access granted successfully!",
      });
      navigate('/');
      return;
    }

    setLoading(true);
    const { error } = await verifyOtp(email, otp);
    
    if (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Admin access granted successfully!",
      });
      navigate('/');
    }
    setLoading(false);
  };

  // Reset form
  const handleReset = () => {
    setStep('email');
    setEmail('');
    setPassword('');
    setOtp('');
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* GOI Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <img src={goiLogo} alt="Government of India" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Secure Sign In</h1>
          <p className="text-sm text-gray-600">Enter your official credentials to access the portal</p>
        </div>

        <Card className="w-full">
          <CardContent className="p-6">
            {/* Step 1: Email */}
            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your @mca.gov.in email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Test email: savants@mca.gov.in
                  </p>
                </div>
                <Button type="submit" className="w-full bg-gov-blue hover:bg-gov-blue-dark">
                  Continue
                </Button>
              </form>
            )}

            {/* Step 2: Password */}
            {step === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Test credentials: savants@mca.gov.in / Syntax@123
                  </p>
                </div>
                <Button type="submit" className="w-full bg-gov-blue hover:bg-gov-blue-dark" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign In
                </Button>
                <div className="text-center">
                  <a href="#" className="text-sm text-gov-blue hover:underline">Forgot Password?</a>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleReset}
                >
                  Back to Email
                </Button>
              </form>
            )}

            {/* Step 3: OTP */}
            {step === 'otp' && (
              <form onSubmit={handleOtpVerification} className="space-y-4">
                <div className="text-center mb-4">
                  <Shield className="h-12 w-12 mx-auto text-gov-blue mb-2" />
                  <h3 className="text-lg font-semibold text-gray-800">OTP Verification</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    An OTP has been sent to <br />
                    <span className="font-medium">{email}</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-sm font-semibold text-gray-700">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-wider"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    Demo: Use 123456 as OTP
                  </p>
                </div>
                <Button type="submit" className="w-full bg-gov-blue hover:bg-gov-blue-dark" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Verify & Sign In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleReset}
                >
                  Back to Email
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Quick Government Portals */}
        <div className="mt-8 text-center">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Government Portals</h3>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gov-blue">
            <a href="#" className="hover:underline">PMO India</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Ministry of Corporate Affairs</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">President of India</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">MyGov</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:underline">Public Grievance Portal</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;