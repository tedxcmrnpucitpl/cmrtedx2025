import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertSponsorSchema, type InsertSponsor } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle2, Handshake, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Sponsors() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertSponsor>({
    resolver: zodResolver(insertSponsorSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      tier: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertSponsor) => {
      return await apiRequest("POST", "/api/sponsors", data);
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

  const onSubmit = (data: InsertSponsor) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Handshake className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Sponsor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with us to support ideas worth spreading and gain visibility among our community of innovators and thought leaders.
          </p>
        </div>

        {isSuccess ? (
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              We've received your sponsorship inquiry. Our team will contact you shortly to discuss partnership opportunities.
            </p>
            <Button onClick={() => setIsSuccess(false)} data-testid="button-submit-another">
              Submit Another Inquiry
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Why Sponsor TEDx CMRNPUC ITPL?</h2>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Brand Visibility</h3>
                <p className="text-muted-foreground">
                  Gain exposure to a diverse audience of students, professionals, and thought leaders.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Community Impact</h3>
                <p className="text-muted-foreground">
                  Support education and innovation while making a lasting impact on our community.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Networking</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded organizations and individuals passionate about ideas.
                </p>
              </Card>

              <div className="p-6 border border-primary/20 rounded-lg bg-primary/5">
                <h3 className="font-bold mb-2">Sponsorship Tiers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Platinum:</strong> Premium branding and speaking opportunities</li>
                  <li>• <strong>Gold:</strong> Prominent logo placement and networking access</li>
                  <li>• <strong>Silver:</strong> Logo inclusion and event recognition</li>
                  <li>• <strong>Bronze:</strong> Supporting partner acknowledgment</li>
                </ul>
              </div>
            </div>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Sponsorship Inquiry</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company/Organization Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corporation" {...field} data-testid="input-company" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} data-testid="input-contact-person" />
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
                          <Input type="email" placeholder="contact@company.com" {...field} data-testid="input-sponsor-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} data-testid="input-sponsor-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interested Sponsorship Tier *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-tier">
                              <SelectValue placeholder="Select tier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Platinum">Platinum</SelectItem>
                            <SelectItem value="Gold">Gold</SelectItem>
                            <SelectItem value="Silver">Silver</SelectItem>
                            <SelectItem value="Bronze">Bronze</SelectItem>
                            <SelectItem value="Custom">Custom Package</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your sponsorship goals..."
                            className="min-h-24"
                            {...field}
                            data-testid="input-sponsor-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={mutation.isPending}
                    data-testid="button-submit-sponsor"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
