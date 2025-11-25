import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { Speaker } from "@shared/schema";
import { Sparkles } from "lucide-react";

export default function Speakers() {
  const { data: speakers, isLoading } = useQuery<Speaker[]>({
    queryKey: ["/api/speakers"],
  });

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Speakers</h1>
          <p className="text-lg text-muted-foreground">
            Meet the brilliant minds who will share their ideas worth spreading
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                <Skeleton className="h-20 w-full" />
              </Card>
            ))}
          </div>
        ) : !speakers || speakers.length === 0 ? (
          <Card className="p-16 text-center bg-gradient-to-br from-card to-primary/5">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              We're curating an exceptional lineup of speakers. Stay tuned for announcements!
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
              <Card key={speaker.id} className="p-6 hover-elevate" data-testid={`card-speaker-${speaker.id}`}>
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={speaker.imageUrl} alt={speaker.name} />
                  <AvatarFallback className="text-2xl">{speaker.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-center mb-1" data-testid={`text-speaker-name-${speaker.id}`}>
                  {speaker.name}
                </h3>
                <p className="text-sm text-primary text-center mb-4">{speaker.title}</p>
                <p className="text-sm text-muted-foreground text-center">{speaker.bio}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
