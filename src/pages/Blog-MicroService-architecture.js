import React from "react";

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "Microservice architecture is a way of building a backend as a set of small services instead of one large application.",
      "Each service owns one business capability, such as users, orders, payments, inventory, or notifications.",
      "In real systems, this style is popular because different parts of the business can change, scale, and fail independently.",
    ],
    callout:
      "Think of a monolith as one large kitchen where everyone does everything. Think of microservices as a restaurant where each station has one job: grill, salad, drinks, billing, and delivery.",
  },
  {
    title: "What Problem Do Microservices Solve?",
    paragraphs: [
      "Imagine a growing e-commerce system built as one giant application.",
      "At the beginning, one codebase is easy to build, easy to test, and easy to deploy.",
      "But as the product grows, the same application starts carrying too many responsibilities.",
      "A small change in payments may accidentally affect orders, and a bug in notifications may slow down the entire system.",
      "Microservices solve this by splitting responsibilities into smaller units that can evolve on their own.",
    ],
    list: [
      "Smaller codebases",
      "Independent deployments",
      "Better fault isolation",
      "Independent scaling",
      "Clear ownership by business domain",
    ],
    diagram: ["One Big App  →   Users + Orders + Payments + Inventory + Notifications"],
  },
  {
    title: "Monolith vs Microservices",
    paragraphs: [
      "A monolith is not bad. It is often the right starting point.",
      "The difference is not about modern or old. The difference is about how responsibilities are organized.",
    
    ],
    subsections: [
      {
        heading: "Monolith",
        paragraphs: [
          "One application, one deployment unit, one shared runtime.",
          "Good for small teams and early-stage products because the moving parts are fewer.",
        ],
        codeBlocks: ["Frontend → One Backend → One Database"],
      },
      {
        heading: "Microservices",
        paragraphs: [
          "Many small services, each deployed independently.",
          "Good when the system becomes large enough that different domains must move at different speeds.",
        ],
        codeBlocks: ["Frontend → API Gateway → User Service / Order Service / Payment Service / Inventory Service"],
      },
    ],
    callout:
      "The question is not 'Should everything be microservices?' The real question is 'Has the system become complex enough to justify the operational cost?'",
  },
  {
    title: "How to Split Services Correctly",
    paragraphs: [
      "The best microservice boundaries come from business capability, not from technical layers.",
      "Do not create services like controller service, database service, or utility service. Those are technical buckets, not business boundaries.",
      "Instead, split by what the business does: customer management, catalog, cart, order, payment, shipping, and notifications.",
      "This is similar to a company organogram. Sales, finance, and operations each have different responsibilities, even though they all work for the same company.",
    ],
    list: [
      "One service = one clear responsibility",
      "High cohesion inside the service",
      "Low coupling between services",
      "Business ownership, not technical ownership",
    ],
  },
  {
    title: "Service Ownership and Data",
    paragraphs: [
      "A true microservice usually owns its own data.",
      "That means the order service stores order data, the payment service stores payment data, and the inventory service stores stock data.",
      "Other services should not read those tables directly. They should go through APIs or events.",
      "This rule keeps services independent. Otherwise, the architecture slowly turns into a distributed monolith, which looks like microservices but behaves like one tightly coupled system.",
    ],
    callout:
      "If two services constantly reach into the same tables, they are not independent. They are only separated by code, not by architecture.",
    codeBlocks: ["Order DB = order data\nPayment DB = payment data\nInventory DB = stock data"],
  },
  {
    title: "REST APIs in Microservices",
    paragraphs: [
      "REST is best when the caller needs an immediate answer.",
      "For example, the order service may call the inventory service to check whether an item is available before placing an order.",
      "This is a synchronous conversation. The caller waits for the response.",
      "Use REST for lookups, validations, and short business checks where the answer is needed right away.",
    ],
    subsections: [
      {
        heading: "Professional tools used for REST in production",
        paragraphs: [
          "API frameworks: Express, FastAPI, Spring Boot, .NET Web API",
          "Reverse proxy and gateway layer: NGINX, Kong, Traefik, AWS API Gateway, Apigee",
          "HTTP client resilience: retries, timeouts, circuit breakers, and bulkheads",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Keep APIs versioned and predictable.",
          "Use timeouts so one slow service does not freeze the whole request.",
          "Add retries only for safe operations, not blindly for every request.",
          "Return clear error messages so consumers can react correctly.",
        ],
      },
    ],
    codeBlocks: ["Order Service → GET /inventory/items/123 → Inventory Service\n\nIf stock is enough, continue. Otherwise, stop."],
  },
  {
    title: "Event-Driven Architecture in Microservices",
    paragraphs: [
      "Your company also uses event-driven architecture, which is the right choice when immediate answers are not needed.",
      "Think of an event as a business announcement. Something already happened, and other services may react to it.",
      "For example, when payment succeeds, the payment service can publish a PaymentCompleted event.",
      "Notification, analytics, loyalty, and audit services can each listen and act independently.",
      "This is like posting a notice on a board instead of calling every department one by one.",
    ],
    subsections: [
      {
        heading: "Professional tools used for events",
        paragraphs: [
          "Message brokers and event platforms: Kafka, RabbitMQ, AWS SNS/SQS, Google Pub/Sub, Azure Service Bus",
          "Event schema tools: Avro, JSON Schema, Protobuf",
          "Consumer safety tools: idempotency keys, dead-letter queues, replay support",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Publish events only after the business action is committed.",
          "Make consumers idempotent so the same event does not create duplicate work.",
          "Keep event names business-focused, such as OrderCreated, PaymentCompleted, or ShipmentDelayed.",
          "Do not make every tiny internal action an event. Publish meaningful business facts only.",
        ],
      },
    ],
    diagram: ["     Payment Service", "            ↓", "   PaymentCompleted Event", "   ↙            ↓        ↘", "Notification  Analytics    Audit"],
  },
  {
    title: "When to Use REST and When to Use Events",
    paragraphs: [
      "This is one of the most important design decisions in microservices.",
      "Use REST when the caller needs an immediate response and cannot continue without it.",
      "Use events when the caller only needs to announce something and move on.",
      "In simple terms: REST is a question-and-answer conversation. Events are a broadcast message.",
    ],
    list: [
      "REST for immediate validation",
      "REST for fetching current state",
      "Events for downstream side effects",
      "Events for notifications, analytics, and auditing",
    ],
    codeBlocks: ["Need an answer now? → REST\nNeed to inform others only? → Event"],
  },
  {
    title: "API Gateway Explained",
    paragraphs: [
      "In a microservice system, the frontend should not know the location of every service.",
      "That would create too much coupling. Instead, requests go through an API gateway.",
      "An API gateway is the front door of the backend. It receives traffic, applies common rules, and forwards requests to the right service.",
      "It is like a hotel reception desk. Guests do not walk into every room looking for help. They talk to reception first.",
    ],
    subsections: [
      {
        heading: "Professional tools used as API gateways",
        paragraphs: [
          "Kong",
          "NGINX",
          "Traefik",
          "AWS API Gateway",
          "Apigee",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Route requests by path, method, or header.",
          "Centralize auth checks, rate limiting, request logging, and TLS termination.",
          "Do not let the gateway contain business logic. It should route and protect, not make product decisions.",
          "Keep the gateway thin and let real business logic live inside services.",
        ],
      },
    ],
    diagram: ["Browser / Mobile App", "        ↓", "     API Gateway", "   ↙     ↓      ↘", "User   Order   Payment"],
  },
  {
    title: "Service Discovery and Routing",
    paragraphs: [
      "When services run separately, they need a way to find each other.",
      "In small systems, environment variables or internal DNS may be enough.",
      "In larger systems, service discovery helps services locate healthy instances dynamically.",
      "Think of it like a company directory that tells you which extension to call instead of writing phone numbers on sticky notes.",
    ],
    subsections: [
      {
        heading: "Professional tools used for discovery",
        paragraphs: [
          "Consul",
          "Eureka",
          "Kubernetes service discovery",
          "Internal DNS and load balancers",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Register services when they start and remove them when they die.",
          "Use health checks so traffic only goes to healthy instances.",
          "Keep service names stable even if instances change.",
        ],
      },
    ],
    codeBlocks: ["order-service.internal → 10.0.2.15:8080\npayment-service.internal → 10.0.2.16:8080"],
  },
  {
    title: "Load Balancing",
    paragraphs: [
      "As traffic grows, one instance is not enough.",
      "Load balancing spreads requests across multiple instances so no single machine becomes the bottleneck.",
      "It is like a traffic manager directing cars to different lanes so the road does not collapse under one queue.",
    ],
    subsections: [
      {
        heading: "Professional tools used for load balancing",
        paragraphs: [
          "NGINX",
          "HAProxy",
          "AWS Application Load Balancer",
          "Cloud Load Balancers in Azure and GCP",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Use health checks.",
          "Use round robin for simple equal traffic.",
          "Use least connections for uneven request duration.",
          "Keep sessions stateless whenever possible so any instance can serve the request.",
        ],
      },
    ],
    diagram: ["Users", "  ↓", "Load Balancer", "↙   ↓   ↘", "Svc A", "Svc B", "Svc C"],
  },
  {
    title: "Observability",
    paragraphs: [
      "Microservices make debugging harder because one user request can move through many services.",
      "Observability means being able to understand what happened from logs, metrics, and traces.",
      "Logs tell you what happened. Metrics tell you how much and how often. Tracing tells you where the request traveled.",
      "This is the flashlight that keeps the system understandable in production.",
    ],
    subsections: [
      {
        heading: "Professional tools used for observability",
        paragraphs: [
          "Logs: ELK Stack, OpenSearch, Loki",
          "Metrics: Prometheus, Grafana, Datadog, New Relic",
          "Tracing: Jaeger, Zipkin, OpenTelemetry",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Add a correlation ID to every request.",
          "Log important business actions, not noisy debug spam.",
          "Track latency, error rate, traffic, and saturation.",
          "Trace requests across service boundaries so you can see the full journey.",
        ],
      },
    ],
    codeBlocks: ["Request ID: abc-123 → Gateway → Order Service → Payment Service → Notification Service"],
  },
  {
    title: "Failure Handling and Resilience",
    paragraphs: [
      "In microservices, failure is normal. A network call can fail even when the code is correct.",
      "Because services depend on each other, you must design for failure from the beginning.",
      "The goal is not to eliminate failure. The goal is to stop one failure from destroying the entire system.",
      "This is similar to a train system where one delayed station should not freeze every other route.",
    ],
    subsections: [
      {
        heading: "Professional patterns used in production",
        paragraphs: [
          "Timeouts",
          "Retries with backoff",
          "Circuit breaker",
          "Bulkhead isolation",
          "Fallback responses",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Use short timeouts for internal service calls.",
          "Retry only when the operation is safe to repeat.",
          "Open a circuit breaker when a dependency is failing too often.",
          "Return graceful failure instead of hanging forever.",
        ],
      },
    ],
    callout:
      "A resilient system does not pretend services never fail. It assumes they will fail and prepares a controlled response.",
  },
  {
    title: "Eventual Consistency",
    paragraphs: [
      "In a monolith, one database transaction can update many things together.",
      "In microservices, data lives in different places, so perfect instant consistency is harder.",
      "Often, one service updates first and other services catch up shortly after through events.",
      "This is called eventual consistency. The system may not match everywhere for a short period, but it becomes correct over time.",
      "Think of a bank transfer where the sender balance, receiver balance, and notification system may not update at the exact same millisecond, but the final state must converge correctly.",
    ],
    codeBlocks: ["Order Created → Payment Completed → Inventory Reserved → Shipment Scheduled"],
  },
  {
    title: "Saga Pattern",
    paragraphs: [
      "Some business flows cross multiple services and cannot be handled in one local database transaction.",
      "The Saga pattern breaks the flow into steps and, if a later step fails, compensates for earlier steps.",
      "For example, if payment succeeds but inventory reservation fails, the system may need to refund the payment.",
      "A saga is like planning a road trip where every checkpoint has a backup plan if the next checkpoint breaks down.",
    ],
    subsections: [
      {
        heading: "Professional tools and approaches",
        paragraphs: [
          "Orchestration using workflow engines or a central saga coordinator",
          "Choreography using events between services",
          "Workflow tools such as Temporal, Camunda, or similar orchestration engines",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Define compensation steps before implementation.",
          "Make each step independent and idempotent.",
          "Keep business rules explicit so rollback logic does not become guesswork.",
        ],
      },
    ],
    diagram: ["Step 1: Reserve Inventory", "   ↓", "Step 2: Charge Payment", "   ↓", "Step 3: Create Shipment", "If Step 3 fails → compensate Step 2"],
  },
  {
    title: "Security in Microservices",
    paragraphs: [
      "Security becomes more important when systems are split into many services.",
      "Instead of trusting the network, each service should verify what it receives.",
      "A gateway may authenticate the user, but internal services should still validate tokens or trusted identity information.",
      "This is like a building with reception, floor access cards, and room-level locks. One checkpoint is not enough.",
    ],
    subsections: [
      {
        heading: "Professional tools used for security",
        paragraphs: [
          "JWT, OAuth2, OpenID Connect",
          "API Gateway policies",
          "mTLS between services",
          "Secrets managers such as Vault or cloud secret stores",
        ],
      },
      {
        heading: "How to achieve it well",
        paragraphs: [
          "Use the principle of least privilege.",
          "Never trust a request just because it came from inside the network.",
          "Protect service-to-service communication, not only public endpoints.",
        ],
      },
    ],
  },
  {
    title: "A Real Request Flow",
    paragraphs: [
      "Here is a simple production-style flow for an order placement request.",
      "The frontend sends a request to the API gateway.",
      "The gateway routes it to the order service.",
      "The order service may call inventory through REST to validate stock.",
      "If the order is accepted, the order service publishes an OrderCreated event.",
      "Notification, analytics, and shipping services react independently.",
    ],
    codeBlocks: [
      "Browser → API Gateway → Order Service → Inventory Service\n\nIf successful:\nOrder Service → OrderCreated Event → Notification / Analytics / Shipping",
    ],
  },
  {
    title: "Common Mistakes",
    paragraphs: [
      "Many teams adopt microservices too early and create unnecessary complexity.",
      "Others split services but still share databases and deploy everything together.",
      "Some overuse events and make simple request-response flows harder than they need to be.",
      "A good architecture is not about using every pattern. It is about choosing the simplest pattern that fits the business need.",
    ],
    list: [
      "Too many tiny services",
      "Shared database ownership",
      "No observability",
      "No timeouts or retries",
      "Using events where REST is enough",
      "Using REST where async would be better",
    ],
  },
  {
    title: "Key Takeaways",
    subsections: [
      {
        heading: "1. Microservices are about business boundaries.",
        paragraphs: ["Split by domain responsibility, not by technical layer."],
      },
      {
        heading: "2. REST and events solve different problems.",
        paragraphs: ["Use REST for immediate answers and events for business announcements."],
      },
      {
        heading: "3. Each service should own its data.",
        paragraphs: ["Independence is the main reason microservices work."],
      },
      {
        heading: "4. Gateways, discovery, load balancing, and observability are essential.",
        paragraphs: ["Microservices are not only about code. They are also about system operation."],
      },
      {
        heading: "5. Resilience matters as much as correctness.",
        paragraphs: ["Assume services will fail and design for controlled recovery."],
      },
    ],
  },
  {
    title: "Final Thoughts",
    paragraphs: [
      "Microservices are not magic, and they are not automatically better than a monolith.",
      "They are a scaling strategy for teams, codebases, and business complexity.",
      "When used well, they let different parts of the system move independently, fail safely, and grow cleanly.",
      "When used poorly, they create a distributed monolith with extra network calls and extra pain.",
      "The strongest engineers do not blindly choose microservices. They choose the right boundary, the right communication style, and the right operational controls for the problem in front of them.",
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

export default function MicroserviceArchitectureBlogPage() {
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
          <span className="blogPage__section-label">02 — Backend Architecture</span>
          <h2 className="blogPage__heading">
            <span className="blogPage__tag">&lt;/</span>Microservice Architecture Explained <span className="blogPage__tag">&gt;</span>
          </h2>
          <p className="blogPage__lead">
            A practical guide to microservices for backend developers: what they are, why companies use them, how REST and events fit together, and how production systems stay observable, resilient, and understandable.
          </p>
          <div className="blogPage__meta">
            <span className="blogPage__pill">Backend • Architecture • Distributed Systems</span>
            <span className="blogPage__pill">REST • Events • API Gateway</span>
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
            last updated: 23 June 2026
          </footer>
        </article>
      </main>
    </div>
  );
}
