"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Checkbox,
  FieldError,
  Form,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (error) {
      toast.error(`Login Failed: ${error.message || "Invalid credentials!"}`);
      console.log("Login Error:", error);
    } else if (data) {
      // Login success hole
      toast.success("Welcome back! Login Successful. 🎉");
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Resume your adventure with Wanderlust
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-md border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
              <Label className="mb-1 text-sm font-semibold text-gray-900">
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
              isRequired
              name="password"
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
              <Label className="mb-1 text-sm font-semibold text-gray-900">
                Password
              </Label>
              <InputGroup className="rounded-md bg-gray-50/50">
                <InputGroup.Prefix className="pl-3">
                  <BiLockAlt className="size-5 text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your password"
                  className="bg-transparent py-2.5 text-sm"
                  type={isVisible ? "text" : "password"}
                />
                <InputGroup.Suffix className="pr-1">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? <BsEye /> : <BsEyeSlash />}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError />
            </TextField>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Checkbox name="remember" size="sm" className="text-gray-500">
                Remember me
              </Checkbox>
              <a
                href="#"
                className="text-sm font-medium text-[#13a5c0] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="mt-2 w-full rounded-md bg-[#13a5c0] py-3 text-sm font-medium text-white transition-colors hover:bg-[#108fa6]"
            >
              Sign In
            </Button>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            onClick={signinWithGoogle}
            variant="bordered"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle className="size-5" />
            Sign Up With Google
          </Button>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-[#13a5c0] hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;