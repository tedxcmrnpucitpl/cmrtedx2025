import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { LogOut, Users, MessageSquare, Mic, Plus, Trash2, Send } from "lucide-react";
import type { Registration, SupportTicket, Speaker } from "@shared/schema";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAddSpeakerOpen, setIsAddSpeakerOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const { data: session, isLoading: sessionLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/session"],
  });

  useEffect(() => {
    if (!sessionLoading && (!session || !session.isAdmin)) {
      sessionStorage.removeItem("adminAuth");
      setLocation("/admin/login");
    }
  }, [session, sessionLoading, setLocation]);

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout", {}),
    onSuccess: () => {
      sessionStorage.removeItem("adminAuth");
      setLocation("/admin/login");
      toast({ title: "Logged out successfully" });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const { data: registrations, isLoading: loadingRegistrations } = useQuery<Registration[]>({
    queryKey: ["/api/registrations"],
  });

  const { data: tickets, isLoading: loadingTickets } = useQuery<SupportTicket[]>({
    queryKey: ["/api/support"],
  });

  const { data: speakers, isLoading: loadingSpeakers } = useQuery<Speaker[]>({
    queryKey: ["/api/speakers"],
  });

  const deleteSpeakerMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/speakers/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speakers"] });
      toast({ title: "Speaker deleted successfully" });
    },
  });

  const replyMutation = useMutation({
    mutationFn: ({ id, reply }: { id: number; reply: string }) =>
      apiRequest("POST", `/api/support/${id}/reply`, { reply }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/support"] });
      setReplyingTo(null);
      toast({ title: "Reply sent successfully" });
    },
  });

  const speakerForm = useForm({
    defaultValues: { name: "", title: "", bio: "", imageUrl: "", order: "0" },
  });

  const [speakerImageFile, setSpeakerImageFile] = useState<File | null>(null);

  const addSpeakerMutation = useMutation({
    mutationFn: async (formData: any) => {
      let imageUrl = formData.imageUrl;
      if (speakerImageFile) {
        imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result);
          reader.readAsDataURL(speakerImageFile);
        });
      }
      return apiRequest("POST", "/api/speakers", { ...formData, imageUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speakers"] });
      setIsAddSpeakerOpen(false);
      setSpeakerImageFile(null);
      speakerForm.reset();
      toast({ title: "Speaker added successfully" });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">TEDx</span> Admin Panel
          </h1>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-3xl">
            <TabsTrigger value="registrations" data-testid="tab-registrations">
              <Users className="h-4 w-4 mr-2" />
              Registrations
            </TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <MessageSquare className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="support" data-testid="tab-support">
              <MessageSquare className="h-4 w-4 mr-2" />
              Support
            </TabsTrigger>
            <TabsTrigger value="speakers" data-testid="tab-speakers">
              <Mic className="h-4 w-4 mr-2" />
              Speakers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registrations">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Registrations ({registrations?.length || 0})</h2>
                <Button onClick={() => {
                  if (!registrations) return;
                  const csv = [
                    ["Name", "Email", "Phone", "College", "Year", "Department", "Status", "Date"].join(","),
                    ...registrations.map(r => [r.name, r.email, r.phone, r.college, r.year, r.department, r.paymentStatus, r.createdAt].map(v => `"${v}"`).join(","))
                  ].join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                }} data-testid="button-export-registrations">
                  Download CSV
                </Button>
              </div>
              <h2 className="text-2xl font-bold mb-6">Event Registrations ({registrations?.length || 0})</h2>
              {loadingRegistrations ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !registrations?.length ? (
                <p className="text-muted-foreground text-center py-8">No registrations yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>College</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Payment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((reg) => (
                        <TableRow key={reg.id} data-testid={`row-registration-${reg.id}`}>
                          <TableCell className="font-medium">{reg.name}</TableCell>
                          <TableCell>{reg.email}</TableCell>
                          <TableCell>{reg.phone}</TableCell>
                          <TableCell>{reg.college}</TableCell>
                          <TableCell>{reg.year}</TableCell>
                          <TableCell>{reg.department}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs ${reg.paymentStatus === "completed" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}`}>
                              {reg.paymentStatus}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Support Tickets ({tickets?.length || 0})</h2>
              {loadingTickets ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !tickets?.length ? (
                <p className="text-muted-foreground text-center py-8">No support tickets</p>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <Card key={ticket.id} className="p-4" data-testid={`card-ticket-${ticket.id}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold">{ticket.subject}</h3>
                          <p className="text-sm text-muted-foreground">{ticket.name} - {ticket.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${ticket.status === "closed" ? "bg-green-500/20 text-green-500" : "bg-blue-500/20 text-blue-500"}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-sm mb-4">{ticket.message}</p>
                      {ticket.adminReply && (
                        <div className="bg-primary/5 p-3 rounded mb-2">
                          <p className="text-sm font-medium mb-1">Admin Reply:</p>
                          <p className="text-sm text-muted-foreground">{ticket.adminReply}</p>
                        </div>
                      )}
                      {replyingTo === ticket.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Type your reply..."
                            id={`reply-${ticket.id}`}
                            data-testid={`input-reply-${ticket.id}`}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                const reply = (document.getElementById(`reply-${ticket.id}`) as HTMLTextAreaElement)?.value;
                                if (reply) replyMutation.mutate({ id: ticket.id, reply });
                              }}
                              data-testid={`button-send-reply-${ticket.id}`}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => setReplyingTo(ticket.id)} data-testid={`button-reply-${ticket.id}`}>
                          Reply
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="speakers">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Speakers ({speakers?.length || 0})</h2>
                <Dialog open={isAddSpeakerOpen} onOpenChange={setIsAddSpeakerOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-speaker">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Speaker
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Speaker</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={speakerForm.handleSubmit((data) => addSpeakerMutation.mutate({ ...data, order: parseInt(data.order) }))} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input {...speakerForm.register("name")} id="name" required data-testid="input-speaker-name" />
                      </div>
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input {...speakerForm.register("title")} id="title" required data-testid="input-speaker-title" />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio *</Label>
                        <Textarea {...speakerForm.register("bio")} id="bio" required data-testid="input-speaker-bio" />
                      </div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL *</Label>
                        <Input {...speakerForm.register("imageUrl")} id="imageUrl" required data-testid="input-speaker-image" />
                      </div>
                      <div>
                        <Label htmlFor="order">Display Order</Label>
                        <Input {...speakerForm.register("order")} id="order" type="number" data-testid="input-speaker-order" />
                      </div>
                      <DialogFooter>
                        <Button type="submit" data-testid="button-save-speaker">Save Speaker</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {loadingSpeakers ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !speakers?.length ? (
                <p className="text-muted-foreground text-center py-8">No speakers added yet</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {speakers.map((speaker) => (
                    <Card key={speaker.id} className="p-4 flex items-start gap-4" data-testid={`card-admin-speaker-${speaker.id}`}>
                      <img src={speaker.imageUrl} alt={speaker.name} className="w-20 h-20 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="font-bold">{speaker.name}</h3>
                        <p className="text-sm text-primary mb-1">{speaker.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{speaker.bio}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteSpeakerMutation.mutate(speaker.id)}
                        data-testid={`button-delete-speaker-${speaker.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
