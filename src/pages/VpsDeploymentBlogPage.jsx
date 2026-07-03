import React from "react";

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "Whether you're deploying a Next.js app, a React SPA, a Django API, or a Spring Boot service, at some point your code stops living on localhost and has to run on a real server that strangers on the internet can reach.",
      "This article explains how that actually works, from first principles, using real-world analogies and the same handful of tools that show up behind almost every production deployment: DNS, a reverse proxy, a process manager, and SSL certificates.",
    ],
  },
  {
    title: "What Problem Are We Actually Solving?",
    paragraphs: [
      "Imagine you rent one apartment in a large building.",
      "The building has a single street address. Your apartment has its own door, somewhere down a hallway nobody outside can see.",
      "If a visitor only knows the building's street address, they can't find you directly — someone at the front desk needs to know which door to send them to.",
      "A single server works the same way. It has one public IP address, but it might run several completely unrelated apps, each tucked behind its own internal door.",
    ],
    list: [
      "Reads which name the visitor asked for",
      "Decides which app should handle the request",
      "Forwards traffic to the right internal door",
      "Serves files directly when there's no app needed at all",
    ],
    closing: "That front desk is a reverse proxy — and on most Linux servers, it's NGINX.",
    diagram: ["Visitor", "  ↓", "NGINX", "  ↓", "Your Application"],
    callout: "One server, one IP address, many apps — because NGINX reads the requested domain and routes accordingly.",
  },
  {
    title: "DNS: The Internet's Phone Book",
    paragraphs: [
      "Before any of this happens, the visitor's browser needs to know where to even send the request.",
      "You don't memorize your friend's home address — you save their name in your contacts, and your phone looks it up for you. DNS does exactly this for domains: it translates a human name like example.com into a machine address like 192.0.2.10.",
    ],
    list: [
      "A record — domain → IPv4 address",
      "AAAA record — domain → IPv6 address",
      "CNAME record — domain → another domain name",
      "NS records — who's in charge of answering DNS questions for this domain at all",
    ],
    closing: "Almost every deployment issue starts with the same question: does DNS actually point where I think it does?",
    codeBlocks: ["dig example.com +short"],
  },
  {
    title: "The Proxy Layer: A Middleman In Front of Your Server",
    paragraphs: [
      "Many teams put a service like Cloudflare in front of their domain, on top of their own server.",
      "Picture a security company that convinces every tenant in the building to route deliveries through their own sorting facility first. Packages get scanned, frequently-requested items get cached for speed, and the building's real address is never exposed publicly — everything is quietly forwarded to the real door behind the scenes.",
    ],
    list: [
      "Hosting the DNS — being the phone book",
      "Proxying traffic — sitting between visitors and the server, encrypting at the edge, hiding the real IP",
    ],
    callout: [
      "DNS only = requests go straight to your server.",
      "Proxied = requests go through the middleman first.",
      "Both can look identical to a visitor.",
      "Only one of them lets a certificate tool talk to your server directly.",
    ],
  },
  {
    title: "Why This Breaks SSL Certificate Setup",
    paragraphs: [
      "Free certificate tools like Let's Encrypt verify you actually own a domain with a simple trick: they ask your server to serve a specific file at a specific URL, over plain HTTP, and then check it directly.",
      "If a proxy is sitting in front of your server, that verification request may never actually reach your machine — it gets intercepted, redirected, or cached by the middleman instead. The result is a confusing failure, even though your server's own configuration is completely correct.",
    ],
    diagram: ["Certificate Authority", "        ↓", "     Proxy  ← request stops here", "        ↓", "  Your Server (never sees it)"],
    closing: "The fix is either temporarily bypassing the proxy while issuing the certificate, or using a DNS-based verification method that works regardless of any proxy layer.",
  },
  {
    title: "Every App Needs Its Own Door Number",
    paragraphs: [
      "Back to the apartment building — port numbers are door numbers.",
      "Two apps can't use the same door at the same time. Whichever one tries to start second simply fails.",
    ],
    codeBlocks: ["sudo ss -tulpn | grep LISTEN"],
    closing: "The reverse proxy listens on the public-facing doors — 80 for plain traffic, 443 for encrypted traffic — and silently routes each request to the correct internal door based on which domain was requested.",
  },
  {
    title: "Two Fundamentally Different Deployment Patterns",
    paragraphs: [
      "This is the single most important distinction to get right — mixing these up causes some of the most confusing deployment bugs.",
    ],
  },
  {
    title: "Pattern A — Server-Rendered Apps",
    paragraphs: [
      "Frameworks that render pages on the server, or expose live API routes, need a persistent running process. The app is a program that stays alive and answers each request in real time.",
    ],
    diagram: ["NGINX", "  ↓", "Running app process on an internal port", "  (kept alive by a process manager)"],
    codeBlocks: ["location / {\n    proxy_pass http://localhost:3001;\n    proxy_http_version 1.1;\n    proxy_set_header Host $host;\n}"],
  },
  {
    title: "Pattern B — Static Sites",
    paragraphs: [
      "Frameworks that compile down to plain HTML, CSS, and JavaScript at build time produce a folder of files that need no running process at all.",
      "The reverse proxy just hands these files to the browser directly — like a librarian retrieving a book from a shelf, not calling someone to write a new one on demand.",
    ],
    diagram: ["NGINX", "  ↓", "Reads files directly from disk", "  ↓", "Sends to browser"],
    codeBlocks: ["root /var/www/myapp/dist;\nindex index.html;\nlocation / {\n    try_files $uri /index.html;\n}"],
    callout: "Running a static build through a process manager as if it were a live server either fails outright or does nothing useful — there's simply no server to keep alive.",
  },
  {
    title: "Why try_files Matters",
    paragraphs: [
      "Single-page apps handle routing entirely in the browser using JavaScript. If a visitor directly loads example.com/dashboard, there's no real file on disk called dashboard.",
      "The try_files fallback tells the server: if you can't find a matching file, just serve index.html anyway, and let the app's own router take over from there. Without this line, refreshing any page other than the homepage returns a 404.",
    ],
  },
  {
    title: "Keeping Server-Rendered Apps Alive",
    paragraphs: [
      "A process manager is like a building manager who checks on a tenant periodically. If the tenant collapses, the manager immediately moves a fresh one into the same spot, so the apartment is never empty for long.",
    ],
    codeBlocks: ["pm2 start npm --name \"myapp\" -- start\npm2 list\npm2 save\npm2 startup"],
    list: [
      "Restarts the app automatically if it crashes",
      "Keeps a saved process list",
      "Survives a full server reboot once configured",
    ],
    closing: "A telltale sign of trouble is a process that restarts immediately after starting, over and over — worth investigating with the process manager's logs rather than ignoring.",
  },
  {
    title: "SSL Certificates: Proving a Site Is What It Claims to Be",
    paragraphs: [
      "An SSL certificate is like a wax seal on a letter, proving it genuinely came from who it claims to. Without encryption, anyone on the network path between visitor and server could theoretically read the traffic.",
    ],
    codeBlocks: ["Without HTTPS: Password → plain text → Internet", "With HTTPS: Password → encrypted → Internet"],
    closing: "In production, the reverse proxy commonly terminates SSL — meaning your application often receives already-decrypted, already-secured traffic, and doesn't need to think about encryption itself.",
  },
  {
    title: "A Debugging Checklist Worth Keeping",
    paragraphs: [
      "Almost every deployment issue can be narrowed down with the same handful of checks, run in this order.",
    ],
    list: [
      "dig example.com +short — does DNS even point where you think it does?",
      "curl -I https://example.com — what's actually responding? The Server header alone often tells you which layer answered.",
      "nginx -t — is the configuration even valid, before worrying about anything downstream?",
      "Check the process manager's status — is the app actually alive and stable, not crash-looping?",
      "Read the actual config file directly — don't assume what's in it. Small copy-paste artifacts can silently break things that look fine at a glance.",
    ],
  },
  {
    title: "Putting It All Together",
    subsections: [
      {
        heading: "Server-rendered app, end to end",
        codeBlocks: ["Clone repo → install dependencies → build\n  → start as a managed background process on a chosen port\n  → reverse proxy forwards to that port\n  → issue and attach an SSL certificate"],
      },
      {
        heading: "Static app, end to end",
        codeBlocks: ["Clone repo → install dependencies → build\n  → (no background process needed)\n  → reverse proxy points directly at the build output folder\n  → issue and attach an SSL certificate"],
      },
    ],
  },
  {
    title: "Final Thoughts",
    paragraphs: [
      "None of this is exotic — it's the same small set of moving parts, recombined slightly differently, behind almost every app running on the internet today.",
      "Once the pattern clicks, a brand-new stack or framework stops being intimidating. It's just a question of which of these two patterns it falls into — and the rest follows.",
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

export default function VpsDeploymentBlogPage() {
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
          <span className="blogPage__section-label">02 — Backend Infrastructure</span>
          <h2 className="blogPage__heading">
            <span className="blogPage__tag">&lt;/</span>Deploying to a Real Server <span className="blogPage__tag">&gt;</span>
          </h2>
          <p className="blogPage__lead">
            The first time you deploy an app outside of localhost, it can feel like a black box — you run a dozen commands and it either works or it doesn't. In reality, it's a small number of simple, reusable ideas. This is the mental model I wish I'd had from the start.
          </p>
          <div className="blogPage__meta">
            <span className="blogPage__pill">DevOps • DNS • SSL</span>
            <span className="blogPage__pill">NGINX • Reverse Proxy • Process Management</span>
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
            last updated: 3 July 2026
          </footer>
        </article>
      </main>
    </div>
  );
}
