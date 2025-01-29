import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import toast from "react-hot-toast";
import { validateEmail } from "../utils/validation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "", // Added OTP field
  });
  const [errors, setErrors] = useState({
    email: "",
    otp: "", // Added OTP error
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null); // Store generated OTP

  // Hardcoded OTP for validation
  const hardcodedOtp = "123456"; // Replace with your desired OTP

  const validateForm = (): boolean => {
    const newErrors = {
      email: validateEmail(formData.email) || "",
      otp: otpSent && !formData.otp ? "OTP is required" : "", // OTP validation
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleGenerateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate OTP generation (hardcoded OTP)
      setGeneratedOtp(hardcodedOtp);

      toast.success("OTP sent successfully to your email");

      // Mark OTP as sent
      setOtpSent(true);
    } catch (error: any) {
      toast.error("Failed to generate OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleValidateOTP = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if OTP entered by the user matches the generated OTP
    if (formData.otp === generatedOtp) {
      toast.success("OTP validated successfully.");
      navigate("/welcome"); // Navigate to the welcome page after successful validation
    } else {
      // Display an error message if the OTP does not match
      setErrors({ ...errors, otp: "Invalid OTP. Please try again." });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate("/")}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {otpSent ? "OTP Validation" : "Login"}
            </h1>
            <p className="mt-1 text-gray-600">
              {otpSent
                ? "Enter the OTP sent to your email."
                : "Enter your email to receive an OTP"}
            </p>
          </div>
        </div>

        <form
          onSubmit={otpSent ? handleValidateOTP : handleGenerateOTP}
          className="space-y-4"
        >
          <Input
            icon={Mail}
            label="Email ID"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
            disabled={otpSent} // Disable Email input after OTP is sent
          />

          {otpSent && (
            <Input
              icon={Mail}
              label="OTP"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              error={errors.otp}
              required
            />
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending OTP..." : otpSent ? "Validate OTP" : "Generate OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
