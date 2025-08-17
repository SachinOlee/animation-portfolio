import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import {
  WorkSection,
  AboutSection,
  ContactSection,
} from "./components/Sections";
import { BlogSection } from "./components/Blog";

export default function App() {
  const appRef = useRef(null);

  useEffect(() => {
    if (!appRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: "power2.out" }
      );
    }, appRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="min-h-dvh scroll-smooth" id="home">
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
      </main>
      <footer className="container mx-auto px-6 py-10 text-sm text-gray-400">
        © {new Date().getFullYear()} Sachin Oli
      </footer>
    </div>
  );
}
