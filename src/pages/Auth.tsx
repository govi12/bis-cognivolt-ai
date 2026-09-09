import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import { ArrowRight, Loader2, Mail, UserX, Sparkles } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      console.error("Guest login error:", error);
      setError(
        `Failed to sign in as guest: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-bg min-h-screen flex flex-col relative">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-72 h-72 rounded-full bg-[oklch(0.82_0.08_260)] opacity-35 blur-[80px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[15%] w-64 h-64 rounded-full bg-[oklch(0.85_0.06_220)] opacity-30 blur-[70px] animate-float-medium" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="flex items-center justify-center h-full flex-col">
          <div className="glass-card min-w-[360px] max-w-[400px] rounded-2xl overflow-hidden">
            {step === "signIn" ? (
              <>
                {/* Header */}
                <div className="text-center px-6 pt-8 pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="glass-panel rounded-2xl p-3">
                      <img
                        src={logo}
                        alt="Cognivolt AI"
                        width={48}
                        height={48}
                        className="rounded-xl cursor-pointer"
                        onClick={() => navigate("/")}
                      />
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 mb-4">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      Cognivolt AI
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-foreground">
                    Get Started
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Enter your email to log in or sign up
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleEmailSubmit}>
                  <div className="px-6 py-5">
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="email"
                          placeholder="name@example.com"
                          type="email"
                          className="glass-input pl-9 border-0 bg-transparent h-11"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="outline"
                        size="icon"
                        disabled={isLoading}
                        className="glass-input border-0 h-11 w-11 flex-shrink-0 cursor-pointer"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}

                    <div className="mt-5">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border/40" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-transparent px-3 text-muted-foreground">
                            Or
                          </span>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-4 glass-input border-0 hover:bg-white/40 cursor-pointer"
                        onClick={handleGuestLogin}
                        disabled={isLoading}
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Continue as Guest
                      </Button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* OTP Header */}
                <div className="text-center px-6 pt-8 pb-2">
                  <h1 className="text-xl font-bold text-foreground">
                    Check your email
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    We've sent a code to{" "}
                    <span className="font-medium text-foreground">
                      {step.email}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit}>
                  <div className="px-6 py-5">
                    <input type="hidden" name="email" value={step.email} />
                    <input type="hidden" name="code" value={otp} />

                    <div className="flex justify-center">
                      <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}
                        disabled={isLoading}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            otp.length === 6 &&
                            !isLoading
                          ) {
                            const form = (
                              e.target as HTMLElement
                            ).closest("form");
                            if (form) form.requestSubmit();
                          }
                        }}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {error && (
                      <p className="mt-3 text-sm text-red-500 text-center">
                        {error}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Didn't receive a code?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary cursor-pointer"
                        onClick={() => setStep("signIn")}
                      >
                        Try again
                      </Button>
                    </p>
                  </div>
                  <div className="px-6 pb-4 space-y-2">
                    <Button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold cursor-pointer"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify code
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep("signIn")}
                      disabled={isLoading}
                      className="w-full cursor-pointer"
                    >
                      Use different email
                    </Button>
                  </div>
                </form>
              </>
            )}

            {/* Footer */}
            <div className="py-4 px-6 text-xs text-center text-muted-foreground border-t border-border/30">
              Secured by{" "}
              <a
                href="https://freebuff.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                freebuff.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
