import React from "react";

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "Whether you're deploying a Next.js app, a React SPA, a Django API, or a Spring Boot service, at some point your code stops living on localhost and has to run on a real server that strangers on the internet can reach.",
      "That journey involves a small, fixed set of building blocks: DNS routes visitors to your server, a proxy layer often sits in front of it, a reverse proxy on the server itself decides which app should answer, and SSL keeps the whole conversation private.",
      "This article walks through that journey in order. The way a request actually travels.",
    ],
  },
  {
    title: "Step 1: DNS — Getting the Visitor to the Right Building",
    paragraphs: [
      "Before anything else happens, a browser needs to know where to even send a request.",
      "You don't memorize your friend's home address, you save their name in your contacts, and your phone looks it up for you. DNS does exactly this for domains: it translates a human-friendly name like example.com into a machine address (an IP) like 192.0.2.10.",
      "Without DNS, every visitor would need to type a raw IP address to reach your app, which is exactly why DNS exists as the first step of every request.",
    ],
    subsections: [
      {
        heading: "The record types that matter most",
        paragraphs: [
          "A record — domain → IPv4 address",
          "AAAA record — domain → IPv6 address",
          "CNAME record — domain → another domain name",
          "NS records — who's in charge of answering DNS questions for this domain at all",
        ],
      },
    ],
  },
  {
    title: "Step 2: The Proxy Layer — An Optional Middleman In Front of DNS",
    paragraphs: [
      "Many teams add a service like Cloudflare on top of their domain, sitting between visitors and the actual server.",
      "Picture a security company that convinces every tenant in a building to route deliveries through their own sorting facility first. Packages get scanned, frequently-requested items get cached for speed, and the building's real address is never exposed publicly, everything is quietly forwarded to the real door behind the scenes.",
      "This is optional, not a requirement of DNS itself, a domain can point straight at a server with no middleman at all.",
    ],
    list: [
      "Hosting the DNS — being the phone book",
      "Proxying traffic — sitting between visitors and the server, encrypting at the edge, hiding the real IP, caching static content",
    ],
    callout: [
      "DNS only = requests go straight to your server.",
      "Proxied = requests go through the middleman first.",
      "Both look identical to a regular visitor.",
      "The difference only matters once you start issuing certificates or debugging why something isn't reaching your server.",
    ],
  },
  {
    title: "Step 3: Arriving at the Server — Ports and the Reverse Proxy",
    paragraphs: [
      "Once DNS resolves and the request reaches the actual server, a new problem appears: one server has a single IP address, but it might run many unrelated apps at once, each tucked behind its own internal port.",
      "Port numbers work like door numbers in an apartment building. Two apps can't use the same door at the same time, and something needs to greet each visitor and send them down the right hallway.",
      "That something is a reverse proxy, and on most Linux servers it's NGINX. It listens on the public-facing doors (port 80 for plain traffic, port 443 for encrypted traffic) reads which domain was requested, and routes accordingly.",
    ],
    diagram: ["Visitor", "  ↓", "Reverse Proxy (port 80/443)", "  ↓", "Correct app on its internal port"],
    codeBlocks: ["sudo ss -tulpn | grep LISTEN"],
  },
  {
    title: "Step 4: What the Reverse Proxy Actually Forwards To",
    paragraphs: [
      "This is where the specific technology stack starts to matter, because not every app needs the same kind of destination behind the reverse proxy.",
    ],
    subsections: [
      {
        heading: "Pattern A — Server-rendered apps",
        paragraphs: [
          "Frameworks that render pages on the server, or expose live API routes, need a persistent running process. The app is a program that stays alive and answers each request in real time.",
          "The reverse proxy forwards traffic to that process's internal port.",
        ],
        codeBlocks: ["location / {\n    proxy_pass http://localhost:3001;\n    proxy_http_version 1.1;\n    proxy_set_header Host $host;\n}"],
      },
      {
        heading: "Pattern B — Static sites",
        paragraphs: [
          "Frameworks that compile down to plain HTML, CSS, and JavaScript at build time produce a folder of files that need no running process at all.",
          "The reverse proxy just hands these files to the browser directly, like a librarian retrieving a book from a shelf, not calling someone to write a new one on demand.",
        ],
        codeBlocks: ["root /var/www/myapp/dist;\nindex index.html;\nlocation / {\n    try_files $uri /index.html;\n}"],
      },
    ],
  },
  {
    title: "Keeping Server-Rendered Apps Alive",
    paragraphs: [
      "For Pattern A apps, something needs to keep that process running long-term, restart it if it crashes, and bring it back after a server reboot.",
      "A process manager does this job — like a building manager who checks on a tenant periodically. If the tenant collapses, the manager immediately moves a fresh one into the same spot, so the apartment is never empty for long.",
    ],
    codeBlocks: ["pm2 start npm --name \"myapp\" -- start\npm2 list\npm2 save\npm2 startup"],
    list: [
      "Restarts the app automatically if it crashes",
      "Keeps a saved process list",
      "Survives a full server reboot once configured",
    ],
  },
  {
    title: "Step 5: SSL — Making the Connection Private",
    paragraphs: [
      "At this point, requests can successfully reach the right app — but by default, that conversation happens in plain text. Anyone on the network path between visitor and server could theoretically read it.",
      "An SSL certificate is like a wax seal on a letter, proving a site genuinely is who it claims to be, and encrypting everything sent back and forth so it can't be read in transit.",
    ],
    codeBlocks: ["Without HTTPS: Password → plain text → Internet", "With HTTPS: Password → encrypted → Internet"],
  },
  {
    title: "How SSL Certificates Actually Get Issued",
    paragraphs: [
      "Free certificate authorities like Let's Encrypt issue certificates automatically, using a simple ownership check called the HTTP-01 challenge.",
      "The tool temporarily places a specific file at a specific URL on your server. The certificate authority then requests that exact file over plain HTTP, directly. If the content matches what's expected, ownership is proven, and a certificate is issued.",
    ],
    list: [
      "Once the certificate is issued and installed, the reverse proxy uses it to encrypt all future traffic on port 443",
    ],
    codeBlocks: ["sudo certbot                     # interactive setup\nsudo certbot certificates        # list everything currently issued\nsudo certbot renew --dry-run     # confirm renewal will work later"],
    closing: "Certificates typically last 90 days and renew automatically in the background, as long as the same conditions that allowed the first issuance still hold true at renewal time.",
  },
  {
    title: "Step 6: The Full Request Lifecycle, End to End",
    paragraphs: [
      "With every piece now covered, here's the complete journey a single request takes in a fully deployed, production-ready setup.",
    ],
    diagram: [
      "Browser types example.com",
      "        ↓",
      "DNS resolves the domain to an IP",
      "        ↓",
      "(optional) Proxy layer receives the request first",
      "        ↓",
      "Request reaches the server on port 443",
      "        ↓",
      "Reverse proxy decrypts via the installed SSL certificate",
      "        ↓",
      "Reverse proxy routes to the correct app",
      "        ↓",
      "Static files served directly, or a running app process answers",
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
    title: "A Debugging Checklist Worth Keeping",
    paragraphs: [
      "Almost every deployment issue can be narrowed down with the same handful of checks, run in this order, following the exact path a request takes.",
    ],
    list: [
      "dig example.com +short — does DNS even point where you think it does?",
      "curl -I https://example.com — what's actually responding? The Server header alone often tells you which layer answered.",
      "nginx -t — is the reverse proxy configuration even valid, before worrying about anything downstream?",
      "Check the process manager's status — is the app actually alive and stable, not crash-looping?",
      "Read the actual config file directly — don't assume what's in it. Small copy-paste artifacts can silently break things that look fine at a glance.",
    ],
  },
  {
    title: "Key Takeaways",
    subsections: [
      {
        heading: "1. DNS decides where a request goes first.",
        paragraphs: ["Nothing else in this chain matters if DNS doesn't point at your server."],
      },
      {
        heading: "2. A proxy layer is optional, and sits before your server.",
        paragraphs: ["Know whether your domain is DNS-only or actively proxied — it changes how certificate issuance behaves."],
      },
      {
        heading: "3. The reverse proxy on your server decides which app answers.",
        paragraphs: ["One server, one IP, many apps — routed by requested domain."],
      },
      {
        heading: "4. Static and server-rendered apps deploy differently.",
        paragraphs: ["One needs a running process kept alive by a process manager; the other just needs files on disk."],
      },
      {
        heading: "5. SSL is usually issued and terminated at the reverse proxy.",
        paragraphs: ["Your application often never sees unencrypted traffic at all."],
      },
    ],
  },
  {
    title: "Final Thoughts",
    paragraphs: [
      "None of this is exotic, it's the same small set of moving parts, in the same order, behind almost every app running on the internet today.",
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
          max-width: 820px;
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
          font-size: 1.05rem;
          line-height: 1.8;
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
          line-height: 1.85;
          color: #333;
          margin-bottom: 1.1rem;
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
          line-height: 1.55;
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
          <span className="blogPage__section-label">03 — Backend Infrastructure</span>
          <h2 className="blogPage__heading">
            <span className="blogPage__tag">&lt;/</span>Deploying to a Server <span className="blogPage__tag">&gt;</span>
          </h2>
          <p className="blogPage__lead">
            A full journey from typing a domain into a browser to a running app answering.
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
