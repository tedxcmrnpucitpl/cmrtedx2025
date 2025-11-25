import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertSupportTicketSchema, type InsertSupportTicket } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";

export default function Support() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertSupportTicket>({
    resolver: zodResolver(insertSupportTicketSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertSupportTicket) => {
      return await apiRequest("POST", "/api/support", data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSupportTicket) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help! Submit your query and we'll get back to you soon.
          </p>
        </div>

        {isSuccess ? (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              We've received your message. Our team will respond to you via email within 24-48 hours.
            </p>
            <Button onClick={() => setIsSuccess(false)} data-testid="button-submit-another-ticket">
              Submit Another Query
            </Button>
          </Card>
        ) : (
          <Card className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} data-testid="input-support-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} data-testid="input-support-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help you?" {...field} data-testid="input-subject" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your query in detail..."
                          className="min-h-32"
                          {...field}
                          data-testid="input-support-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg"
                  disabled={mutation.isPending}
                  data-testid="button-submit-support"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Query"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-bold mb-4">Other Ways to Reach Us</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: ccacoordinator.puitpl@cmr.ac.in</p>
                <p>Phone: 8277715578 | 9591887905</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
