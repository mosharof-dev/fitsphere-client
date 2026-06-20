"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { BiUser, BiEnvelope, BiLockAlt, BiImageAdd } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  
  const [isVisible, setIsVisible] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.fullName,
      image: user.photoURL,
      email: user.email,
      password: user.password,
      role: user.role,
      callbackURL: "/login",
    });
    if (error) {
      toast.error(
        `Registration Failed: ${error.message || "Something went wrong!"}`,
      );
      console.log("Error details:", error);
      return;
    }
    if (data) {
      toast.success("Registration Successful! 🎉 Please login to continue.");
      await authClient.signOut();

      // 4. Redirect to login page
      router.push("/login");
    }

    console.log(data, error);
  };

  const signinWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      // idToken: { token: idToken, accessToken },
    });
  };

  return (
    <div className="flex py-8 w-full items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Header section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-normal tracking-tight text-gray-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Start your adventure with Wanderlust
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-md border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Full Name */}
            <TextField
              isRequired
              name="fullName"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label className="mb-1 text-sm font-medium text-gray-900">
                Full Name
              </Label>
              <InputGroup className="rounded-md bg-gray-50/50">
                <InputGroup.Prefix className="pl-3">
                  <BiUser className="size-5 text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your name"
                  className="bg-transparent py-2.5 text-sm"
                />
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Photo URL Field */}
            <TextField
              isRequired
              name="photoURL"
              type="file"
              
            >
              <Label className="mb-1 text-sm font-medium text-gray-900">
                Photo URL
              </Label>
              <InputGroup className="rounded-md bg-gray-50/50">
                <InputGroup.Prefix className="pl-3">
                  <BiImageAdd className="size-5 text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Choose your profile image"
                  className="bg-transparent py-2.5 text-sm"
                />
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Email Address */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="mb-1 text-sm font-medium text-gray-900">
                Email Address
              </Label>
              <InputGroup className="rounded-md bg-gray-50/50">
                <InputGroup.Prefix className="pl-3">
                  <BiEnvelope className="size-5 text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your email"
                  className="bg-transparent py-2.5 text-sm"
                />
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              className="w-full "
              isRequired
              name="password"
              onChange={(value) => setPassword(value)}
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <InputGroup className="rounded-md bg-gray-50/50">
                <InputGroup.Prefix className="pl-3">
                  <BiLockAlt className="size-5 text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Create a password"
                  className="bg-transparent py-2.5 text-sm"
                  type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pr-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <BsEye className="size-4" />
                    ) : (
                      <BsEyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-2 w-full rounded-md bg-[#13a5c0] py-3 text-sm font-medium text-white transition-colors hover:bg-[#108fa6]"
            >
              Create Account
            </Button>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Sign Up */}
          <Button
            onClick={signinWithGoogle}
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <FcGoogle className="size-5" />
            Sign Up With Google
          </Button>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#13a5c0] hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
