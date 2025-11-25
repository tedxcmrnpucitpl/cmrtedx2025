import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/speakers", label: "Speakers" },
    { path: "/sponsors", label: "Sponsors" },
    { path: "/support", label: "Support" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-black tracking-tight">
              <span className="text-primary">TEDx</span>
              <span className="text-foreground"> CMRNPUC</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === item.path ? "text-primary" : "text-foreground"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/registration">
              <Button size="default" data-testid="button-register-nav">
                Register Now
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`block text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === item.path ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/registration">
              <Button className="w-full" onClick={() => setMobileMenuOpen(false)} data-testid="button-register-mobile">
                Register Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
