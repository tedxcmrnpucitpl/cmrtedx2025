import { useEffect, useRef } from "react";

export default function Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let scrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.7 ? "#DC143C" : "#FFFFFF";
      }

      update(scroll: number) {
        this.y += this.speedY + scroll * 0.1;
        this.x += this.speedX;
        this.z -= 1 + scroll * 0.5;

        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.z < 0) this.z = 1000;
      }

      draw() {
        const scale = 1000 / (1000 - this.z);
        if (!isFinite(scale) || scale <= 0) return;
        
        const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = this.size * scale;

        if (!isFinite(x) || !isFinite(y) || !isFinite(size) || size <= 0) return;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        gradient.addColorStop(0, `${this.color}40`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(scrollY);
        particle.draw();
      });

      scrollY *= 0.95;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (scrollRef.current) {
        scrollY = scrollRef.current.scrollTop * 0.01;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    scrollRef.current?.addEventListener("scroll", handleScroll);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      scrollRef.current?.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={scrollRef} className="fixed inset-0 overflow-y-auto bg-black" data-testid="page-experience">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      />
      
      <div className="relative z-10 min-h-[400vh]">
        <section className="h-screen flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto animate-in fade-in duration-1000">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
              Ideas Worth Spreading
            </h1>
            <p className="text-xl md:text-2xl text-white/80">
              Explore the infinite possibilities of innovation
            </p>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Think Different
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              TEDx brings together the brightest minds to share transformative ideas that challenge 
              the status quo and inspire change.
            </p>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-primary">
              Discover
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              From technology to art, science to philosophy - immerse yourself in a world of 
              groundbreaking concepts and visionary thinking.
            </p>
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Connect
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12">
              Join a community of innovators, dreamers, and changemakers who believe in the 
              power of ideas to transform our world.
            </p>
            <a href="/registration" className="inline-block">
              <button className="px-12 py-4 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-lg transition-all hover:scale-105">
                Join Us December 6, 2025
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
