import Typewriter from "./typewriter";

export default function Home() {
  return (
    <>
      <header>
        <div className="container">
          <a href="#" className="logo">
            Deepthought Labs
          </a>
          <a href="#contact" className="cta-button">
            Join Waitlist
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>
              Your Expertise, Amplified.
              <br />
              Your Data, Sovereign.
            </h1>
            <Typewriter text="We build high-fidelity digital partners, transforming generalist AI into specialized collaborators that respect your privacy and amplify your unique knowledge." />
            <a href="#contact" className="cta-button">
              Join the Waitlist
            </a>
          </div>
        </section>

        <section id="problem">
          <div className="container section-content">
            <h2>Beyond Generic AI</h2>
            <Typewriter text={`Today's AI is an "amnesiac master craftsman"—possessing vast skill but no specific context. Low-context prompts lead to generic "AI slop," while centralized platforms create a new "digital serfdom," holding your data hostage. This is not a partnership; it's a limitation.`} />
          </div>
        </section>

        <section id="solution" style={{ backgroundColor: "var(--bg-pane)" }}>
          <div className="container">
            <h2>The Deepthought Paradigm</h2>
            <div className="grid grid-3">
              <div className="card">
                <h3>Persona</h3>
                <p>
                  We give the AI a clear identity and role. This provides
                  powerful, implicit instructions on its expected reasoning,
                  knowledge base, and professional tone.
                </p>
              </div>
              <div className="card">
                <h3>Charter</h3>
                <p>
                  We instill the AI with your core philosophy and guiding
                  principles. This teaches it *how to think*, fostering
                  resilience and enabling autonomous, aligned decisions.
                </p>
              </div>
              <div className="card">
                <h3>Plan</h3>
                <p>
                  We provide the AI with a clear, actionable mission. This
                  ensures its execution is not just technically correct, but
                  strategically aligned with your ultimate goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="foundation">
          <div className="container">
            <h2>An Architecture of Trust</h2>
            <div className="grid grid-4">
              <div className="card icon-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <h3>Local-First</h3>
                <p>
                  Your data and intelligence live on your machine, under your
                  control. Always.
                </p>
              </div>
              <div className="card icon-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <h3>Agentic Architecture</h3>
                <p>
                  Our V4 framework enables complex, cyclical reasoning and
                  self-correction.
                </p>
              </div>
              <div className="card icon-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <h3>Systemic Observability</h3>
                <p>
                  A "glass box" approach provides deep insight into the AI's
                  thought process.
                </p>
              </div>
              <div className="card icon-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <h3>Sovereign Audit Trail</h3>
                <p>
                  Human-readable logs ensure full transparency and
                  accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="audiences" style={{ backgroundColor: "var(--bg-pane)" }}>
          <div className="container">
            <h2>For Those Who Build Intelligence</h2>
            <div className="grid grid-3">
              <div className="card">
                <h3>The Sovereign Individual</h3>
                <p>
                  For developers, researchers, and knowledge workers seeking
                  tools for thought that respect privacy, enhance workflow, and
                  provide ultimate control.
                </p>
              </div>
              <div className="card">
                <h3>The Visionary Educator</h3>
                <p>
                  For teachers and academic institutions who need scalable,
                  personalized learning tools that capture and amplify their
                  unique pedagogical expertise.
                </p>
              </div>
              <div className="card">
                <h3>The Strategic Director</h3>
                <p>
                  For enterprise leaders and R&D heads who require reliable,
                  secure, and auditable AI systems that can be trusted with
                  high-stakes, complex tasks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ethos">
          <div className="container section-content">
            <h2>From Our Charter</h2>
            <blockquote>
              <Typewriter text={`"Quality enables Velocity."`} />
            </blockquote>
            <blockquote>
              <Typewriter text={`"The UI Must Serve the 'Flow State.' The primary feature of a tool for thought is the absence of friction."`} />
            </blockquote>
            <blockquote>
              <Typewriter text={`"Inference over Instruction. The user's primary task is not to write instructions, but to define an identity and provide the grounding knowledge."`} />
            </blockquote>
          </div>
        </section>

        <section id="contact">
          <div className="container section-content">
            <h2>Build Your Sovereign Intelligence.</h2>
            <p>
              Ready to move beyond generic tools and build a true digital
              partner? Join the waitlist to get early access, development
              updates, and to request a consultation.
            </p>
            <br />
            <a href="mailto:example@example.com" className="cta-button">
              Join the Waitlist
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 Deepthought Labs. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}