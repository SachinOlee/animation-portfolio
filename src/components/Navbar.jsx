import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-fade",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power2.out" }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60 bg-gray-950/80"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="nav-fade font-semibold tracking-tight">
          My Motion
        </a>
        <nav className="flex gap-6 text-sm text-gray-300">
          <a
            className="nav-fade hover:text-white transition-colors"
            href="#work"
          >
            Work
          </a>
          <a
            className="nav-fade hover:text-white transition-colors"
            href="#about"
          >
            About
          </a>
          <a
            className="nav-fade hover:text-white transition-colors"
            href="#blog"
          >
            Blog
          </a>
          <a
            className="nav-fade hover:text-white transition-colors"
            href="#contact"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
