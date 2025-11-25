import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Lightbulb, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About TEDx CMRNPUC ITPL</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events 
            that bring people together to share a TED-like experience.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-8">Event Information</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover-elevate">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Date</h3>
                <p className="text-muted-foreground">December 6, 2025</p>
              </Card>

              <Card className="p-6 hover-elevate">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Time</h3>
                <p className="text-muted-foreground">10:00 AM onwards</p>
              </Card>

              <Card className="p-6 hover-elevate">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Venue</h3>
                <p className="text-muted-foreground">CMRNPUC ITPL, Bangalore</p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">What is TEDx?</h2>
            <Card className="p-8">
              <p className="text-muted-foreground mb-4">
                TEDx was created in the spirit of TED's mission, "ideas worth spreading." It supports independent 
                organizers who want to create a TED-like event in their own community.
              </p>
              <p className="text-muted-foreground mb-4">
                At TEDx events, a screening of TED Talks videos—or a combination of live presenters and TED Talks 
                videos—sparks deep conversation and connections at the local level.
              </p>
              <p className="text-muted-foreground">
                TEDx events are fully planned and coordinated independently, on a community-by-community basis. 
                The content and design of each TEDx event is unique and developed independently, but all of them 
                have features in common.
              </p>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">Why Attend?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Get Inspired</h3>
                <p className="text-muted-foreground">
                  Listen to brilliant speakers share innovative ideas and unique perspectives
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Network</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded individuals who are passionate about ideas
                </p>
              </Card>

              <Card className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discover</h3>
                <p className="text-muted-foreground">
                  Explore groundbreaking concepts that challenge conventional thinking
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">Venue Location</h2>
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">CMRNPUC ITPL</h3>
                <p className="text-muted-foreground">
                  CMR National PU College, ITPL Campus, Bangalore
                </p>
              </div>
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7326876534447!2d77.7203!3d12.9897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU5JzIzLjAiTiA3N8KwNDMnMTMuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue Location"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/EMa4vx4eKTPkd1Vz5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary hover:underline"
                data-testid="link-google-maps"
              >
                Open in Google Maps →
              </a>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
