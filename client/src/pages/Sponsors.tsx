import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Handshake, Loader2 } from "lucide-react";
import type { Sponsor } from "@shared/schema";

export default function Sponsors() {
  const { data: sponsors, isLoading } = useQuery<Sponsor[]>({
    queryKey: ["/api/sponsors"],
  });

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Handshake className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Sponsors</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the organizations supporting ideas worth spreading and making this event possible.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !sponsors || sponsors.length === 0 ? (
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              Sponsor details will be announced soon. Stay tuned!
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id} className="overflow-hidden hover-elevate" data-testid={`card-sponsor-${sponsor.id}`}>
                <img src={sponsor.imageUrl} alt={sponsor.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{sponsor.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{sponsor.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
