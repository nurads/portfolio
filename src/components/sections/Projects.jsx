import { RevealOnScroll } from "../RevealOnScroll";
import { useState } from "react";

const projects = [
  {
    title: "Dabbaal Tour and Travels",
    description: "A comprehensive tourism and travel management platform for Ethiopia's premier tour operator. Features include tour package management, booking system, and a beautiful showcase of Ethiopia's diverse tourist destinations including historical sites, wildlife safaris, and cultural experiences.",
    image: "/projects/61897b084c95aa68778a64ff7d9fba2474a4245b.png", // You'll need to add this image
    technologies: ["React", "Node.js", "MongoDB", "AWS", "TailwindCSS", "GraphQL"],
    liveLink: "https://dabbaaltourandtravel.com",
    githubLink: null,
    features: [
      "Tour package management system",
      "Real-time booking platform",
      "Content Management System",
      "Responsive design for all devices",
      "Secure payment integration",
      "Interactive destination gallery",
    ]
  },
  {
    title: "Adero.tech",
    description: "An innovative enterprise software platform that streamlines business operations through advanced automation, real-time analytics, and seamless integration capabilities. Built with modern technologies to deliver scalable and efficient solutions for complex business needs.",
    image: "/projects/a91b22cd369f9860004e169bdb8077d0bf7ca479.png",
    technologies: ["Node.js", "React", "GraphQL", "MongoDB", "AWS", "Docker", "Kubernetes"],
    liveLink: "https://adero.tech",
    githubLink: null,
    features: [
      "Responsive Design",
      "Content Management System",
      
    
    ]
  },
  {
    title: "Temarico.com",
    description: "A comprehensive web platform for managing and optimizing business operations, featuring real-time analytics, automated workflows, and seamless integration capabilities.",
    image: "/projects/1ffb9211103a5f491d205c97c7ff3dc343351b59.png", // You'll need to add these images
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    liveLink: "https://temarico.com",
    githubLink: null,
    features: [
      "Content Management System",
      "Responsive Design",
      "Advanced security features"
    ]
  },
  {
    title: "Temarico Mobile App",
    description: "A powerful mobile application that extends Temarico's capabilities to iOS and Android devices, enabling on-the-go business management and real-time collaboration.",
    image: "/projects/temarico-mobile.png",
    technologies: ["Flutter", "Django", "Posgres", "AWS Lambda", "AWS"],
    liveLink: "https://play.google.com/store/apps/details?id=com.temarico.app", // Update with actual app store links
    githubLink: null,
    features: [
      "Cross-platform compatibility",
      "Offline functionality",
      "Push notifications",
      "Scheduling",
      "Real time Questions and Answers"
    ]
  },
  {
    title: "Azcare.ai",
    description: "An innovative healthcare platform leveraging artificial intelligence to provide personalized patient care, predictive analytics, and automated healthcare management solutions.",
    image: "/projects/azcare.png",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    liveLink: "https://azcare.ai",
    githubLink: null,
    features: [
      "AI-powered Search",
      "Realtime Timeslots for Appointments",
      "Location Based Services",
      "Healthcare data integration",
      "HIPAA Compliant"
    ]
  }
];

export const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen py-20 relative overflow-hidden gradient-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl -top-16 -right-16 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl -bottom-32 -left-32 animate-pulse delay-1000" />
      </div>

      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my recent work, demonstrating expertise in full-stack development,
              mobile applications, and AI integration.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="modern-card group"
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-3 gradient-text">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>
                      
                      {/* Features List */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-accent mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-400">
                              <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary py-1 px-3 rounded-full text-sm hover:bg-primary/20 
                            hover:shadow-[0_2px_8px_rgba(99,102,241,0.1)] transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                      >
                        <span>View Project</span>
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
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                      >
                        <span>Source Code</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-y-0.5 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
