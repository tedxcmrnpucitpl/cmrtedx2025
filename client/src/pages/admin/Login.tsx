import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      username: "cmr",
      password:  "cmr@2026",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      return await apiRequest("POST", "/api/admin/login", data);
    },
    onSuccess: () => {
      sessionStorage.setItem("adminAuth", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
      setLocation("/admin/dashboard");
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-br from-black via-background to-primary/10">
      <Card className="max-w-md w-full p-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
        <p className="text-center text-muted-foreground mb-8">
          Access the TEDx CMRNPUC ITPL admin panel
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...form.register("username")}
              placeholder="Enter username"
              data-testid="input-admin-username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
              placeholder="Enter password"
              data-testid="input-admin-password"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loginMutation.isPending}
            data-testid="button-admin-login"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          For authorized personnel only
        </p>
      </Card>
    </div>
  );
}
