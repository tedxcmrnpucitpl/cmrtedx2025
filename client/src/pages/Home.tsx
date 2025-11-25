import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const eventDate = new Date("2025-12-06T09:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-black to-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,20,60,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="text-primary">TEDx</span>
                <span className="text-foreground"> CMRNPUC ITPL</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Ideas Worth Spreading
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto my-12">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur border-primary/20">
                  <div className="text-4xl md:text-5xl font-black text-primary" data-testid={`countdown-${item.label.toLowerCase()}`}>
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mt-2">{item.label}</div>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/registration">
                <Button size="lg" className="text-lg px-8 min-h-12" data-testid="button-register-hero">
                  Register Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/experience">
                <Button size="lg" variant="outline" className="text-lg px-8 min-h-12" data-testid="button-experience">
                  Explore the Experience
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Event Details</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center hover-elevate">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Date</h3>
              <p className="text-muted-foreground">December 6, 2025</p>
            </Card>

            <Card className="p-8 text-center hover-elevate">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Time</h3>
              <p className="text-muted-foreground">9:00 AM onwards</p>
            </Card>

            <Card className="p-8 text-center hover-elevate">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Venue</h3>
              <p className="text-muted-foreground">CMRNPUC ITPL, Bangalore</p>
              <a 
                href="https://maps.app.goo.gl/EMa4vx4eKTPkd1Vz5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm mt-2 inline-block hover:underline"
                data-testid="link-venue-map"
              >
                View on Map
              </a>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Why Attend?</h2>
            <p className="text-lg text-muted-foreground">
              TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. 
              Our event is called TEDxCMRNPUC ITPL, where x = independently organized TED event.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { title: "Inspiring Talks", description: "Listen to brilliant speakers share their ideas" },
                { title: "Networking", description: "Connect with like-minded individuals" },
                { title: "Innovation", description: "Discover groundbreaking concepts and perspectives" },
              ].map((item, index) => (
                <div key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
