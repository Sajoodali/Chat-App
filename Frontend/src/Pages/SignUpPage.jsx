import React from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { MessageSquare } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, isSigningup } = useAuthStore();

  const validateForm = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* left side */}
        <div className="flex flex-col justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* logo */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-all duration-300"
                >
                  <MessageSquare className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Create an account</h1>
                <p className="text-base-content/70">
                  Get Started With Your Free Account
                </p>
              </div>
            </div>

            {/* form */}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
