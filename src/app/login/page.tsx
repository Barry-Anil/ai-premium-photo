"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Magic link sent! Check your email.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">VisualForge</h1>
          <p className="text-muted-foreground mt-2 text-sm uppercase tracking-widest font-semibold">AI Pipeline Engine</p>
        </div>

        <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pt-8">
            <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your email to receive an access link.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-8 px-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="h-12 bg-background/50"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base transition-all active:scale-95" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <>
                    Send OTP Magic Link <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border/50 py-4 bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Don't have an account? <span className="text-primary font-medium hover:underline cursor-pointer">Request access</span>
            </p>
          </CardFooter>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-4 opacity-50">
          <span>Privacy Policy</span>
          <span>&bull;</span>
          <span>Terms of Service</span>
          <span>&bull;</span>
          <span>v2.4.0</span>
        </div>
      </motion.div>
    </div>
  );
}
