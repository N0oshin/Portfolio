import React from "react";

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "Whether you build applications using Node.js, Express, React, FastAPI, Spring Boot, or .NET, chances are NGINX sits in front of your application handling incoming traffic.",
      "This article explains NGINX from first principles using real-world analogies, practical examples, and production use cases. By the end, you'll understand not only what NGINX is, but why almost every professional backend architecture relies on it.",
    ],
  },
  {
    title: "What Problem Does NGINX Solve?",
    paragraphs: [
      "Imagine you own a busy restaurant.",
      "Customers arrive and immediately walk into the kitchen to place orders directly with the chef.",
      "At first, this works.",
      "When 10 customers arrive, the chef manages.",
      "When 100 customers arrive, the chef struggles.",
      "When 1000 customers arrive, chaos begins.",
      "The chef should focus on cooking, not managing customers.",
      "A receptionist solves this problem.",
    ],
    list: [
      "Receives customers",
      "Directs them appropriately",
      "Manages queues",
      "Handles basic requests",
      "Protects the kitchen from overload",
    ],
    closing: "NGINX is that receptionist.",
    diagram: ["User", "  ↓", "NGINX", "  ↓", "Node.js Application"],
    callout: "This simple architectural decision improves scalability, security, and performance.",
  },
  {
    title: "What Exactly Is NGINX?",
    paragraphs: [
      "NGINX is a high-performance web server commonly used as:",
    ],
    list: [
      "Reverse Proxy",
      "Load Balancer",
      "API Gateway",
      "Static File Server",
      "SSL Terminator",
    ],
    closing:
      "In modern systems, NGINX rarely serves only as a web server. Most teams use it as the traffic controller that sits in front of applications and microservices.",
  },
  
  {
    title: "Why Not Expose Node.js Directly?",
    paragraphs: [
      "Node.js excels at business logic: authentication, database operations, order processing, and payment handling.",
      "NGINX excels at traffic management: request routing, HTTPS handling, static file delivery, and load balancing.",
    ],
    callout: [
    "Node.js = Chef.",
    "NGINX = Receptionist.",
    "The chef should cook.",
    "The receptionist should manage customers."
    ],
  },
  {
    title: "Serving Static Files Efficiently",
    paragraphs: [
      "Consider a React application. After building the project, you'll have files like index.html, main.js, styles.css, and logo.png.",
      "Many beginners allow Node.js to serve these files. That means every image request goes through the application.",
      "A better approach is to let NGINX serve static content directly, which reduces load on your backend and improves response times.",
    ],
    diagram: ["User", " ↓", "Node.js", " ↓", "Image", "","", "A beeter Approach is:", "", "User", " ↓", "NGINX", " ↓", "Image"],

  },
  {
    title: "HTTPS and SSL Certificates",
    paragraphs: [
      "Modern websites use HTTPS. Without HTTPS, user data can potentially be intercepted. With HTTPS, the data remains secure.",
      "In production environments, NGINX commonly handles SSL certificates and encryption, so your application often receives already-secured traffic from NGINX.",
    ],
    codeBlocks: [ "Without HTTPS: User Password → Internet", "With HTTPS: Encrypted Password → Internet"],
  },
  {
    title: "Load Balancing Explained",
    paragraphs: [
      "As your application grows, one server may not be enough. You might run multiple application instances. The question becomes: who decides which server handles each request? NGINX does.",
      "Think of a supermarket with three cashiers. Customers arrive continuously, and a manager directs them to available cashiers. The manager is NGINX.",
    ],
    diagram: ["User", " ↓", "NGINX", " ↓", "App 1", "App 2", "App 3"],
    list: ["Better performance", "Higher availability", "Easier scaling", "Fault tolerance"],
  },
  {
    title: "Load Balancing Strategies",
    subsections: [
      {
        heading: "Round Robin",
        paragraphs: ["Default behavior. Traffic is distributed equally."],
        codeBlocks: ["Request 1 → App1\nRequest 2 → App2\nRequest 3 → App3\nRequest 4 → App1"],
      },
      {
        heading: "Least Connections",
        paragraphs: [
          "NGINX sends traffic to the server with the fewest active connections. Useful when requests vary in complexity.",
        ],
        codeBlocks: ["App1 = 100 users\nApp2 = 20 users\n\nSend to App2"],
      },
      {
        heading: "IP Hash",
        paragraphs: [
          "With IP Hash, NGINX remembers which server a user was assigned to and keeps sending that user to the same server. The user's information may not be available on every server.",
        ],
        codeBlocks: ["User A → App1\nUser A → App1\nUser A → App1", "User B → App2\nUser B → App2\nUser B → App2"],
      },
      {
        heading: "Weighted Distribution",
        paragraphs: ["Some servers are more powerful, so they should receive more traffic."],
        codeBlocks: ["App1 Weight = 3\nApp2 Weight = 1\n\n75% → App1\n25% → App2"],
      },
    ],
  },
  {
    title: "Understanding API Gateway",
    paragraphs: [
      "As applications evolve, they often become microservices instead of one large monolith.you have,User Service, Product Service, Order Service, Payment Service etc.",
      "Without an API Gateway, the frontend must know every service location, which creates complexity. With NGINX, requests are routed cleanly through public paths like /users, /orders, /products, and /payments.",
      "NGINX handles service discovery and routing, which is one of the most common enterprise patterns.",
    ],
    codeBlocks: ["Frontend\n     ↓\n   NGINX\n     ↓\nServices", "Routes become:\n/users\n/orders\n/products\n/payments"],
  },
  {
    title: "WebSocket Support",
    paragraphs: [
      "Traditional HTTP is request-response and then the connection closes. WebSockets keep the connection open.",
      "They are used for chat applications, live notifications, trading platforms, and multiplayer games.",
      "NGINX supports WebSocket upgrades and routing in production environments.",
    ],
    codeBlocks: ["Client\n   ↔\nNGINX\n   ↔\nBackend"],
  },
  {
    title: "Rate Limiting",
    paragraphs: [
      "Imagine a malicious user sends 10,000 requests per second to your login endpoint. Without protection, the server can crash.",
      "With NGINX, you can allow only a limited number of requests per second and block the rest. It is like a security guard controlling entry into a building.",
    ],
    list: ["Prevent abuse", "Reduce DDoS impact", "Protect APIs", "Improve stability"],
  },
  {
    title: "Caching",
    paragraphs: [
      "Suppose an API endpoint returns public product data. Without caching, every request goes from User to NGINX to Node.js to Database.",
      "With caching, the first request goes to the backend, but the second request can be served from cache. The backend is never contacted again for that cached response.",
    ],
    list: ["Faster responses", "Reduced database load", "Lower infrastructure costs"],
  },
  {
    title: "Gzip Compression",
    paragraphs: [
      "Imagine sending a large suitcase through shipping. Before shipping, you compress it. Same contents, less space.",
      "NGINX does this for responses. A 100KB JSON payload can become a much smaller compressed response, improving bandwidth usage and page loads.",
    ],
    list: ["Faster page loads", "Reduced bandwidth usage", "Better mobile performance"],
  },
  {
    title: "NGINX in a Real Production Environment",
    paragraphs: [
      "Consider a modern e-commerce platform. NGINX sits in front of React, Node.js APIs, PostgreSQL, and later multiple services as traffic grows.",
      "This is remarkably close to how many real-world systems operate.",
    ],
    diagrams: [
      ["Architecture :\n","Internet Users", "        │", "        ▼", "      NGINX", "        │", " ┌──────┴──────┐", " ▼             ▼", "React      Node.js API", "Frontend", "                 │", "                 ▼", "            PostgreSQL"],
      ["As traffic grows:\n","Internet Users", "        │", "        ▼", "      NGINX", "        │", " ┌──────┼──────┐", " ▼      ▼      ▼", "API1   API2   API3", "        │", "        ▼", "    PostgreSQL"],
      ["As the business scales further:\n","Internet Users", "        │", "        ▼", "      NGINX", "        │", " ┌─────────┼──────────┬──────────┐", " ▼         ▼          ▼          ▼", "Users    Products    Orders    Payments", "Service  Service     Service    Service"],
    ],
  },
  {
    title: "NGINX + Docker",
    paragraphs: [
      "A common deployment setup is NGINX Container → Node.js Container → PostgreSQL Container.",
      "NGINX becomes the public entry point while applications communicate internally through Docker networking.",
    ],
    list: ["Better security", "Cleaner architecture", "Easier scaling", "Container isolation"],
  },
  {
    title: "The Request Lifecycle",
    paragraphs: [
      "Let's follow a request from start to finish. A user opens https://myshop.com/products.",
      "The journey is Browser → DNS Lookup → NGINX → Node.js API → PostgreSQL → Node.js → NGINX → Browser.",
      "Every request passes through NGINX first, which is why it becomes such a critical component in production environments.",
    ],
  },
  {
    title: "Key Takeaways",
    subsections: [
      {
        heading: "1. NGINX sits in front of applications.",
        paragraphs: ["User → NGINX → Backend"],
      },
      {
        heading: "2. NGINX acts as a Reverse Proxy.",
        paragraphs: ["It receives requests and forwards them to backend services."],
      },
      {
        heading: "3. NGINX acts as a Load Balancer.",
        paragraphs: ["It distributes traffic across multiple application instances."],
      },
      {
        heading: "4. NGINX handles HTTPS.",
        paragraphs: ["It manages SSL certificates and encrypted communication."],
      },
      {
        heading: "5. NGINX acts as an API Gateway.",
        paragraphs: ["It routes requests to different microservices in large-scale systems."],
      },
    ],
  },
  {
    title: "Final Thoughts",
    paragraphs: [
      "NGINX is not just another web server. It is the traffic controller that makes modern applications scalable, secure, and production-ready.",
      "Whether you're deploying a small Node.js application, a Dockerized platform, or a full microservice architecture, understanding NGINX gives you a much clearer picture of how real systems operate beyond local development.",
      "For backend developers, learning NGINX is one of the fastest ways to bridge the gap between writing code and understanding production infrastructure.",
    ],
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

export default function NginxBlogPage() {
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
      `}</style>

      <main className="blogPage__inner">
        <header className="blogPage__heading-wrap">
          <span className="blogPage__section-label">01 — Technical Architecture</span>
          <h2 className="blogPage__heading">
            <span className="blogPage__tag">&lt;/</span>NGINX Explained <span className="blogPage__tag">&gt;</span>
          </h2>
          <p className="blogPage__lead">
            When I first heard about NGINX, I assumed it was just another web server. After working with modern web applications, Docker containers, APIs, and microservices, I realized NGINX is one of the most important components in a production environment.
          </p>
          <div className="blogPage__meta">
            <span className="blogPage__pill">Backend • DevOps • Production</span>
            <span className="blogPage__pill">NGINX • Node.js • Docker</span>
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
            last updated: 22 June 2026
          </footer>
         
        </article>
      </main>
    </div>
  );
}