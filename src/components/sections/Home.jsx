import { RevealOnScroll } from "../RevealOnScroll";
import { useEffect, useState } from "react";

export const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleOpenPdf = () => {
    window.open("/murad-usman.pdf", "_blank");
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl -top-32 -left-32 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl -bottom-32 -right-32 animate-pulse delay-1000" />
      </div>

      {/* Mouse follower effect */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none transition-transform duration-200 ease-out"
        style={{
          background: `radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)`,
          transform: `translate(${mousePosition.x - 192}px, ${
            mousePosition.y - 192
          }px)`,
          opacity: isHovering ? 0.8 : 0.4,
        }}
      />

      <RevealOnScroll>
        <div
          className="text-center z-10 px-4 relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="mb-8">
            <span className="text-accent font-mono text-sm md:text-base tracking-wider">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Hi, I'm Murad
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            A Backend Engineer and System Engineer with extensive experience in
            designing, developing, and optimizing scalable backend systems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#projects"
              className="group modern-card px-8 py-4 w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Projects
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>

            <button
              onClick={handleOpenPdf}
              className="group hover-link px-8 py-4 w-full sm:w-auto text-center border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Download Resume
                <svg
                  className="w-5 h-5 transform group-hover:translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Social links */}
          <div className="mt-12 flex justify-center gap-6">
            <a
              href="https://github.com/nurads"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link text-gray-400 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/murad-usman"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link text-gray-400 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
