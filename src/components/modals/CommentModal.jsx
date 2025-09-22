import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CommentModal = ({ isOpen, onClose, onSuccess }: CommentModalProps) => {
  const [step, setStep] = useState<'confirm' | 'details' | 'otp'>('confirm');
  const [userType, setUserType] = useState('individual');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    organization: ''
  });
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const handleConfirm = () => {
    setStep('details');
  };

  const handleSendOTP = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    setStep('otp');
    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to +91 ${formData.phone.slice(-6)}...`
    });
  };

  const handleVerifySubmit = () => {
    if (otp.length === 6) {
      onSuccess();
      onClose();
      setStep('confirm');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        organization: ''
      });
      setOtp('');
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    onClose();
    setStep('confirm');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      organization: ''
    });
    setOtp('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'confirm' && 'Confirm Submission'}
            {step === 'details' && 'User Details'}
            {step === 'otp' && 'OTP Verification'}
          </DialogTitle>
        </DialogHeader>

        {step === 'confirm' && (
          <div className="space-y-4">
            <p>Are you sure you want to submit? Comments cannot be edited after submission.</p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter your address"
              />
            </div>

            <div>
              <Label>Submitting as:</Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Individual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="organization" id="organization" />
                  <Label htmlFor="organization">Organization</Label>
                </div>
              </RadioGroup>
            </div>

            {userType === 'organization' && (
              <div>
                <Label htmlFor="organization">Organization Name *</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="Enter organization name"
                />
              </div>
            )}

            <Button onClick={handleSendOTP} className="w-full">Send OTP</Button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              An OTP has been sent to +91 {formData.phone.slice(-6)}...
            </p>
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </div>
            <Button onClick={handleVerifySubmit} className="w-full">Verify & Submit</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};