import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span className="text-primary">TEDx</span>
              <span className="text-foreground"> CMRNPUC ITPL</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Ideas worth spreading. Join us for an inspiring event on December 6, 2025.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="/speakers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Speakers</a>
              <a href="/registration" className="text-sm text-muted-foreground hover:text-primary transition-colors">Register</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:ccacoordinator.puitpl@cmr.ac.in" className="hover:text-primary transition-colors">
                  ccacoordinator.puitpl@cmr.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>8277715578 | 9591887905</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>CMRNPUC ITPL, Bangalore</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 CMRNPUC ITPL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
