import React from "react";

const sections = [
  {
    title: "Every Computer Has Two Parts",
    paragraphs: [
      "Every computing device you've ever used, from a smartwatch to a cloud server consists of two major components: hardware and software. Neither is useful without the other.",
      "Think of buying a brand new laptop. When you first remove it from the box, you're holding a collection of physical electronic components:",
    ],
    list: [
      "Motherboard",
      "CPU",
      "RAM",
      "SSD",
      "Display",
      "Keyboard",
      "Battery",
    ],
    closing:
      "These physical components are collectively known as hardware. Hardware is everything you can physically touch. Without software, however, this expensive collection of electronics is incapable of performing meaningful tasks.",
  },
  {
    title: "Hardware: The Physical Foundation",
    paragraphs: [
      "Hardware is not \"smart.\" A processor doesn't know what a browser is. RAM doesn't understand JavaScript. An SSD doesn't recognize photos or videos.",
      "Hardware only understands electrical signals and machine instructions. Its responsibilities include:",
    ],
    list: [
      "Performing calculations (CPU)",
      "Temporarily storing active data (RAM)",
      "Permanently storing information (SSD/HDD)",
      "Displaying graphics (GPU + Monitor)",
      "Receiving input (Keyboard, Mouse)",
      "Sending network packets (Network Interface Card)",
    ],
    closing:
      "Each component performs one specialized function. By itself, hardware has no understanding of applications or user intent.",
  },
  {
    title: "Software: Instructions That Give Hardware Purpose",
    paragraphs: [
      "Software is simply a set of instructions. Every application you've ever installed exists solely to instruct hardware what to do. Examples include:",
    ],
    list: [
      "Google Chrome",
      "Visual Studio Code",
      "Docker",
      "Git",
      "PostgreSQL",
    ],
    paragraphsAfter: [
      "Unlike hardware, software cannot be physically touched. Instead, software is stored as data on storage devices and loaded into memory when executed.",
      "Once running, software continually communicates with the operating system, which in turn communicates with the hardware.",
    ],
    callout: ["Hardware performs work.", "Software decides what work should be performed."],
  },
  {
    title: "The Operating System: The Manager of the Hardware",
    paragraphs: [
      "If hardware is the workforce and applications are employees, the operating system is the manager.",
      "Imagine every application attempting to control the processor directly. Chrome requests CPU time. VS Code requests CPU time. Node.js requests CPU time. Spotify requests CPU time. Without coordination, chaos would follow.",
      "The operating system exists to solve exactly this problem. Its responsibilities include:",
    ],
    list: [
      "Scheduling CPU execution",
      "Managing RAM allocation",
      "Managing files and storage",
      "Handling networking",
      "Managing connected devices",
      "Providing security boundaries",
      "Running multiple applications simultaneously",
    ],
    diagram: ["Application", "  ↓", "Operating System", "  ↓", "Hardware"],
    closing:
      "Applications almost never communicate directly with hardware. This separation allows applications to remain portable across different hardware configurations.",
  },
  {
    title: "Linux Is Not Ubuntu",
    paragraphs: [
      "One of the most common misconceptions among developers is treating Linux and Ubuntu as interchangeable terms. They are not.",
      "Linux is a kernel. Ubuntu is an operating system distribution built around the Linux kernel.",
      "The kernel is the component responsible for interacting directly with hardware. Everything else—the desktop environment, package manager, system utilities, networking tools, and command-line applications is built around that kernel.",
      "Think of the kernel as the engine inside a car. Two different cars may use engines built on the same architecture while having entirely different designs, features, and user experiences.",
      "Similarly:",
    ],
    list: [
      "Ubuntu uses the Linux kernel.",
      "Debian uses the Linux kernel.",
      "Android also uses the Linux kernel.",
    ],
    closing:
      "Windows, on the other hand, does not use Linux. It uses Microsoft's own Windows NT kernel. Likewise, macOS uses Apple's XNU kernel. The operating system may appear to be a single piece of software, but internally it is composed of many layers, with the kernel sitting at its core.",
  },
  {
    title: "What Exactly Is a Server?",
    paragraphs: [
      "This is perhaps the most misunderstood term in software engineering. Many developers imagine a server as a large machine inside a data center.",
      "A server is defined by its role, not its hardware.",
    ],
    callout: "A computer, or even a program that provides services to other computers or programs.",

  },
  {
    title: "Clients and Servers: A Conversation",
    paragraphs: [
      "Every networked application consists of clients and servers. A client requests. A server responds. ",
    ],
    codeBlocks: [
      "Client               Server\n-----------------   -----------------\nChrome               Google Search\nMobile Banking App   Bank API\nPostman              Your Express API\nReact Frontend       Node.js Backend",
    ],
    closing:
      "This relationship is temporary. A computer can act as both a client and a server depending on the situation. For example, your backend application may receive requests from browsers while simultaneously acting as a client when querying another API. Roles are determined by communication, not hardware. Examples include:",
  },
  {
    title: "The Complete Request Journey",
    paragraphs: ["Suppose a user visits:  https://example.com"] ,
    list: [
      "The browser sends an HTTP request.",
      "DNS resolves the domain to an IP address.",
      "The request reaches a machine running Linux or another operating system.",
      "Nginx receives the request.",
      "Nginx forwards the request to a Node.js application.",
      "Node.js executes business logic.",
      "The application queries a database if necessary.",
      "A response is generated.",
      "The response travels back through Nginx to the browser.",
    ],
    closing: "At every stage, software is executing instructions on top of hardware. No component exists in isolation.",
  },
  {
    title: "Why This Matters",
    paragraphs: [
      "Understanding these concepts changes how you debug systems. Instead of thinking: \"The server is broken.\", you begin thinking in layers. When a system fails, you ask questions like:",
    ],
   
    list: [
      "Is the hardware healthy?",
      "Is the operating system functioning?",
      "Is the process running?",
      "Is the network reachable?",
      "Is the reverse proxy forwarding requests?",
      "Is the application responding?",
      "Is the database available?",
    ],
    closing: "This layered thinking is what separates writing code from understanding systems.",
  },
  
];

function CodeBlock({ children }) {
  return <pre className="blogPage__codeBlock"><code>{children}</code></pre>;
}

function Diagram({ lines }) {
  return (
    <pre className="blogPage__diagramBlock">
      <code>{lines.join("\n")}</code>
    </pre>
  );
}

export default function HardwareSoftwareServersBlogPage() {
  return (
    <div className="blogPage">
      <style>{`
        .blogPage {
          padding: 6rem 5vw;
          background: var(--white);
          border-top: 1px solid var(--mid);
          color: var(--dark);
          font-family: var(--sans);
        }

        .blogPage__inner {
          max-width: 780px;
          margin: 0 auto;
        }

        .blogPage__heading-wrap {
          margin-bottom: 3.5rem;
          border-bottom: 1px solid var(--mid);
          padding-bottom: 2rem;
        }

        .blogPage__section-label {
          font-family: var(--mono);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
          display: block;
          margin-bottom: 0.75rem;
        }

        .blogPage__heading {
          font-family: var(--mono);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: var(--dark);
          line-height: 1.3;
        }

        .blogPage__tag { color: #bbb; font-weight: 400; }

        .blogPage__lead {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #444;
          margin-bottom: 1.5rem;
        }

        .blogPage__meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .blogPage__pill {
          font-family: var(--mono);
          font-size: 0.68rem;
          background: var(--light);
          color: #555;
          padding: 0.25rem 0.65rem;
          border: 1px solid var(--mid);
        }

        .blogPage__content h2 {
          font-family: var(--mono);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--dark);
          margin-top: 3rem;
          margin-bottom: 1rem;
        }

        .blogPage__content p {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 1.2rem;
        }

        .blogPage__content ul {
          margin: 0 0 1.5rem 1.2rem;
          padding: 0;
        }

        .blogPage__content li {
          font-size: 0.95rem;
          color: #333;
          margin-bottom: 0.5rem;
          list-style-type: square;
        }

        .blogPage__callout {
          border-left: 3px solid var(--dark);
          background: var(--light);
          padding: 1rem 1.2rem;
          font-family: var(--sans);
          font-size: 0.92rem;
          color: #222;
          margin: 1.5rem 0;
        }

        .blogPage__codeBlock, .blogPage__diagramBlock {
          background: var(--light);
          border: 1px solid var(--mid);
          padding: 1.2rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          color: var(--dark);
          font-family: var(--mono);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .blogPage__subsectionCard {
          border: 1px solid var(--mid);
          background: var(--white);
          padding: 1.5rem;
          margin: 1.5rem 0;
        }

        .blogPage__tinyLabel {
          font-family: var(--mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 0.8rem;
        }

        .blogPage__divider {
          height: 1px;
          background: var(--mid);
          margin: 3rem 0 1.5rem 0;
        }

        .blogPage__footer-note {
          font-family: var(--sans);
          font-size: 0.85rem;
          color: #b3b3b3;
          line-height: 1.6;
        }

        @media (min-width: 769px) {
          .blogPage__section-label { font-size: 0.9rem; }
          .blogPage__heading { font-size: clamp(1.95rem, 4vw, 2.95rem); }
          .blogPage__lead { font-size: 1.25rem; }
          .blogPage__pill { font-size: 0.83rem; }
          .blogPage__content h2 { font-size: 1.5rem; }
          .blogPage__content p { font-size: 1.1rem; }
          .blogPage__content li { font-size: 1.1rem; }
          .blogPage__callout { font-size: 1.07rem; }
          .blogPage__codeBlock, .blogPage__diagramBlock { font-size: 1rem; }
          .blogPage__tinyLabel { font-size: 1rem; }
          .blogPage__footer-note { font-size: 1rem; }
        }
      `}</style>

      <main className="blogPage__inner">
        <header className="blogPage__heading-wrap">
          <span className="blogPage__section-label">04 — Fundamentals</span>
          <h2 className="blogPage__heading">
            <span className="blogPage__tag">&lt;/</span>Hardware, Software & Servers<span className="blogPage__tag">&gt;</span>
          </h2>
          <p className="blogPage__lead">
            If you've been building applications for years but still find yourself casually saying "the server is down" or "Linux is the operating system" without thinking about what those terms actually mean, this article is for you.
          </p>
          <p className="blogPage__lead">
            As developers, we spend most of our time writing code, debugging APIs, deploying applications, and configuring infrastructure. Yet many of us begin our careers without ever being taught one of the most fundamental concepts in computing: what exactly are hardware, software, and servers? These terms are everywhere, in job interviews, documentation, cloud platforms, DevOps, and system architecture. This article breaks these concepts down from first principles.
          </p>
          <div className="blogPage__meta">
            <span className="blogPage__pill">Fundamentals • Systems • DevOps</span>
            <span className="blogPage__pill">Hardware • Operating Systems • Servers</span>
          </div>
        </header>

        <article className="blogPage__content">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2>{section.title}</h2>

              {section.paragraphs?.map((text, pIdx) => (
                <p key={pIdx}>{text}</p>
              ))}

              {section.list && (
                <ul>
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.closing && <p>{section.closing}</p>}

              {section.callout && (
                <div className="blogPage__callout">
                {Array.isArray(section.callout) ? (
                    section.callout.map((line, i) => <div key={i}>{line}</div>)
                ) : (
                    section.callout
                )}
                </div>
               )}

              {section.diagram && <Diagram lines={section.diagram} />}

              {section.diagrams && section.diagrams.map((d, i) => <Diagram key={i} lines={d} />)}

              {section.codeBlocks && section.codeBlocks.map((block, i) => <CodeBlock key={i}>{block}</CodeBlock>)}

              {section.paragraphsAfter?.map((text, pIdx) => (
                <p key={`after-${pIdx}`}>{text}</p>
              ))}

              {section.subsections?.map((sub, sIdx) => (
                <div className="blogPage__subsectionCard" key={sIdx}>
                  <div className="blogPage__tinyLabel">{sub.heading}</div>
                  {sub.paragraphs?.map((text, pIdx) => (
                    <p key={pIdx}>{text}</p>
                  ))}
                  {sub.list && (
                    <ul>
                      {sub.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {sub.codeBlocks?.map((block, i) => <CodeBlock key={i}>{block}</CodeBlock>)}
                </div>
              ))}
            </section>
          ))}

          <div className="blogPage__divider" />

          <footer className="blogPage__footer-note">
            last updated: 29 July 2026
          </footer>

        </article>
      </main>
    </div>
  );
}
