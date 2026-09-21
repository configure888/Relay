"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });
gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    no: "01",
    eyebrow: "CLIPPING",
    title: "CREATIVE VERSIONING",
    copy: "Send the source. We find the moments, rebuild the openings, tighten the pacing, caption for the platform and turn one idea into multiple cuts worth testing.",
    meta: "HOOKS / CUTS / CAPTIONS / VARIANTS",
  },
  {
    no: "02",
    eyebrow: "MASS POSTING",
    title: "MANAGED DISTRIBUTION",
    copy: "Approved creative becomes a publishing operation: cadence, account mix, posting, QA, tracking and the next batch. More attempts without another team for you to manage.",
    meta: "CADENCE / POSTING / QA / REPORTING",
  },
  {
    no: "03",
    eyebrow: "PHONE FARM CAMPAIGNS",
    title: "MANAGED DEVICE OPS",
    copy: "When the workflow needs real devices or app-native sessions, we manage the hardware and approved account layer as part of the campaign — scoped, monitored and accountable.",
    meta: "DEVICES / SESSIONS / QA / CONTROL",
  },
];

const offers = [
  {
    tag: "CLIP LAB",
    title: "MORE WINNING CUTS FROM THE CONTENT YOU ALREADY HAVE.",
    copy: "For brands, founders and shows that already have distribution but need a stronger creative pipeline.",
    items: ["Source mining", "Hook rewrites", "Platform-native edits", "Creative variants", "Delivery-ready assets"],
    cta: "Build my clip system",
  },
  {
    tag: "DISTRIBUTION DESK",
    title: "YOUR CONTENT EXISTS. IT JUST ISN'T SHIPPING ENOUGH.",
    copy: "For teams that want mass posting without building an internal posting operation.",
    items: ["Publishing cadence", "Approved account mix", "Posting + QA", "Performance tracking", "Iteration briefs"],
    cta: "Plan mass posting",
  },
  {
    tag: "FULL REACH",
    title: "ONE OPERATOR FROM RAW FOOTAGE TO LIVE DISTRIBUTION.",
    copy: "For launches and always-on campaigns that need clipping, publishing and managed device operations under one workflow.",
    items: ["Clipping + versioning", "High-volume publishing", "Managed device ops", "Campaign controls", "Reporting + iteration"],
    cta: "Build the full system",
  },
];

const faqs = [
  ["What exactly do you mean by clipping?", "We turn existing source material into platform-native short-form: selecting the moment, rebuilding the opening, tightening pacing, adding captions, reframing for vertical and creating variants worth testing."],
  ["What do you mean by mass posting?", "High-volume publishing across an agreed mix of authorized accounts. We handle cadence, asset rotation, posting QA, tracking and the feedback loop so volume does not become random repetition."],
  ["What is a phone farm campaign?", "Some teams use “phone farm” as shorthand for operating many real devices. Our service is managed device operations: approved devices, approved accounts, campaign-scoped sessions, manual QA and controlled publishing workflows."],
  ["Is this bots or fake engagement?", "No. We do not sell bot views, purchased engagement or fake activity. Distribution is run through authorized accounts and campaign-approved publishing workflows."],
  ["Can you guarantee views?", "No credible operator can guarantee organic reach. Platforms decide distribution. We commit to the agreed production volume, publishing scope, quality control, reporting and iteration cadence."],
  ["What happens when something works?", "We do not blindly repost the same asset. We study the signal, preserve what is working and build new openings, cuts, angles or formats around the winning idea."],
];

const phones = Array.from({ length: 28 }, (_, i) => ({
  label: ["HOOK A", "HOOK B", "CUT 03", "UGC 07", "ANGLE 04", "V06"][i % 6],
  stat: ["V01", "V02", "V03", "V04", "V05", "V06"][i % 6],
  tilt: ((i % 7) - 3) * 1.3,
}));

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [service, setService] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const track = (event: string, payload: Record<string, unknown> = {}) => {
    if (typeof window === "undefined") return;
    const win = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
    win.dataLayer?.push({ event, ...payload });
    window.dispatchEvent(new CustomEvent("reach:conversion", { detail: { event, ...payload } }));
  };

  const formCta = service.includes("Clipping")
    ? "Get my clipping plan"
    : service.includes("Mass posting")
      ? "Get my distribution plan"
      : service.includes("Phone farm")
        ? "Get my device campaign plan"
        : "Get my campaign plan";

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-in", { y: 42, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power4.out" });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 46,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.to(".ticker-track", { xPercent: -50, duration: 18, ease: "none", repeat: -1 });
      gsap.fromTo(
        ".phone",
        { y: 150, rotateX: 22, scale: 0.72, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          stagger: { each: 0.025, from: "center" },
          scrollTrigger: { trigger: ".phone-stage", start: "top 85%", end: "center 48%", scrub: 1 },
        }
      );
      gsap.to(".phone-wall", {
        rotateX: -6,
        rotateY: 4,
        yPercent: -7,
        scrollTrigger: { trigger: ".phone-stage", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      root.current?.style.setProperty("--x", `${e.clientX}px`);
      root.current?.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={root} className="site">
      <div className="cursor-glow" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="nav">
        <a className="brand" href="#top" aria-label="100xReach home">
          <b>100x</b><span>REACH</span>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#offers">Offers</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href="#contact" onClick={() => track("cta_click", { placement: "nav" })}>Get a plan ↗</a>
      </header>

      <main>
        <section id="top" className="hero">
          <div className="hero-grid" />
          <div className="hero-scene"><HeroScene /></div>
          <div className="hero-copy">
            <p className="kicker hero-in">SHORT-FORM DISTRIBUTION / CLIPPING / DEVICE OPS</p>
            <h1>
              <span className="hero-in">ONE GOOD CLIP</span>
              <span className="hero-in">SHOULDN'T GET</span>
              <span className="gradient hero-in">ONE CHANCE.</span>
            </h1>
            <p className="lede hero-in">
              We turn existing content into platform-native short-form, then run the publishing operation across approved accounts and device fleets.
            </p>
            <div className="hero-actions hero-in">
              <a className="btn primary" href="#contact" onClick={() => track("cta_click", { placement: "hero" })}>Get a campaign plan <b>↗</b></a>
              <a className="btn ghost" href="#services">See the system</a>
            </div>
            <p className="trust hero-in">HUMAN-LED EDITING / AUTHORIZED ACCOUNTS / MEASURED POST BY POST</p>
          </div>
          <div className="hero-corner mono">100X/26<br/>MORE ATTEMPTS.<br/>BETTER SIGNAL.</div>
        </section>

        <section className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 2 }).flatMap((_, pass) =>
              ["FIND THE MOMENT", "BUILD THE HOOK", "VERSION THE CUT", "PUBLISH NATIVE", "READ THE SIGNAL", "RUN IT AGAIN"].map((x, i) => (
                <span key={`${pass}-${i}`}><i>✦</i>{x}</span>
              ))
            )}
          </div>
        </section>

        <section id="services" className="section services">
          <div className="section-head reveal">
            <p className="eyebrow">THE OPERATING SYSTEM / 01</p>
            <h2>MAKE THE CONTENT.<br/><span>WE MAKE IT TRAVEL.</span></h2>
            <p>Clipping, mass posting and managed phone-farm campaigns — built as one feedback loop instead of three disconnected vendors.</p>
          </div>
          <div className="service-list">
            {services.map((s) => (
              <article className="service reveal" key={s.no}>
                <span className="service-no">{s.no}</span>
                <div><p className="eyebrow">{s.eyebrow}</p><h3>{s.title}</h3></div>
                <p>{s.copy}</p>
                <span className="service-meta">{s.meta}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="phone-stage">
          <div className="phone-stage-copy reveal">
            <p className="eyebrow">DISTRIBUTION / 02</p>
            <h2>THE FEED ISN'T<br/><span>A SINGLE SHOT.</span></h2>
            <p>Every useful idea gets multiple openings, cuts and publishing contexts. The point is not to manufacture activity. It is to create more legitimate chances to learn what the market responds to.</p>
          </div>
          <div className="phone-wall">
            {phones.map((p, i) => (
              <div className="phone" key={i} style={{ "--tilt": `${p.tilt}deg` } as React.CSSProperties}>
                <div className="speaker" />
                <div className={`screen screen-${i % 4}`}>
                  <span className="screen-tag">{p.label}</span>
                  <strong>{p.stat}</strong>
                  <div className="screen-lines"><i/><i/><i/></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="offers" className="section offers">
          <div className="section-head reveal">
            <p className="eyebrow">CHOOSE THE JOB / 03</p>
            <h2>BUY THE LAYER<br/><span>YOU ACTUALLY NEED.</span></h2>
            <p>Start with the bottleneck. Expand only when the operating model proves it should.</p>
          </div>
          <div className="offer-grid">
            {offers.map((o, i) => (
              <article className={`offer reveal ${i === 2 ? "featured" : ""}`} key={o.tag}>
                <div className="offer-top"><span>{o.tag}</span><b>0{i + 1}</b></div>
                <h3>{o.title}</h3>
                <p>{o.copy}</p>
                <ul>{o.items.map((x) => <li key={x}>↳ {x}</li>)}</ul>
                <a href="#contact" onClick={() => { setService(i === 0 ? "Clipping + creative versioning" : i === 1 ? "Mass posting / managed distribution" : "Full system — clipping + distribution"); track("cta_click", { placement: "offer", offer: o.tag }); }}>{o.cta} ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-inner reveal">
            <p className="eyebrow">WHY 100XREACH</p>
            <h2>EDITORS GIVE YOU ASSETS.<br/>POSTING TEAMS GIVE YOU VOLUME.<br/><span>WE OWN THE LOOP.</span></h2>
            <div className="manifesto-copy">
              <p>The same operation sees the source, the variants, the publishing context and the signal that should shape what gets made next.</p>
              <p>That is the difference between “more posts” and a distribution system that gets smarter as it runs.</p>
            </div>
          </div>
        </section>

        <section className="section process">
          <div className="section-head reveal">
            <p className="eyebrow">FROM BRIEF TO FEED / 04</p>
            <h2>ONE HANDOFF.<br/><span>WE RUN THE LOOP.</span></h2>
          </div>
          <div className="process-grid">
            {[
              ["01", "BRIEF", "Content, platforms, goal, output and the accounts or devices we are authorized to operate."],
              ["02", "BUILD", "Mine the strongest moments, rewrite openings and create enough variation to test rather than guess."],
              ["03", "RUN", "Publish through the agreed account mix, including managed device operations where the workflow calls for it."],
              ["04", "LEARN", "Read the signal, keep the useful patterns and send a smarter next batch back into market."],
            ].map(([n, t, c]) => <article className="process-card reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}
          </div>
        </section>

        <section className="section qualify">
          <div className="qualify-grid reveal">
            <div>
              <p className="eyebrow">GOOD FIT</p>
              <h3>You already make content and want a repeatable distribution operation.</h3>
              <p>You care about quality, cadence, measurement and using publishing signal to improve the next batch.</p>
            </div>
            <div>
              <p className="eyebrow">NOT A FIT</p>
              <h3>You want bot views, fake engagement or a guaranteed viral post.</h3>
              <p>We operate approved accounts and devices. We do not manufacture fake social proof or promise platform outcomes we do not control.</p>
            </div>
          </div>
          <div className="risk reveal">
            <p className="eyebrow">SCOPE BEFORE RETAINER</p>
            <h3>Know what we're running before you pay for a vague “growth package.”</h3>
            <p>We map the source material, platform mix, output target, approvals, account/device requirements and reporting loop first.</p>
            <a href="#contact">Get the campaign plan ↗</a>
          </div>
        </section>

        <section id="faq" className="section faq">
          <div className="section-head reveal">
            <p className="eyebrow">BEFORE WE START / 05</p>
            <h2>THE QUESTIONS<br/><span>THAT ACTUALLY MATTER.</span></h2>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <details className="faq-item reveal" key={q}>
                <summary><span>0{i + 1}</span><strong>{q}</strong><i>+</i></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">START A CAMPAIGN / 06</p>
            <h2>TELL US THE JOB.<br/><span>WE'LL MAP THE OPERATION.</span></h2>
            <p>Tell us what content you have, where you want it distributed and how much output you actually need. We will recommend the smallest operating model that can do the job.</p>
            <div className="contact-meta">CLIPPING / MASS POSTING / DEVICE OPS / REPORTING</div>
          </div>

          <form className="lead-form reveal" onSubmit={async (e) => {
            e.preventDefault();
            if (state === "sending") return;
            const form = e.currentTarget;
            const payload = Object.fromEntries(new FormData(form).entries());
            setState("sending");
            track("lead_submit", { service: payload.service, volume: payload.volume });
            try {
              const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
              if (!res.ok) throw new Error("submit");
              setState("sent");
              track("lead_success", { service: payload.service });
              form.reset();
              setService("");
            } catch {
              setState("error");
              track("lead_error");
            }
          }}>
            <div className="form-head"><span>CAMPAIGN BRIEF</span><span>100X/26</span></div>
            <label className="hp"><span>Website</span><input name="companyWebsite" tabIndex={-1} autoComplete="off"/></label>
            <label><span>Name</span><input required name="name" placeholder="Your name" autoComplete="name"/></label>
            <label><span>Work email</span><input required name="email" type="email" placeholder="you@company.com" autoComplete="email"/></label>
            <div className="form-two">
              <label><span>What do you need?</span><select required name="service" value={service} onChange={(e) => setService(e.target.value)}>
                <option value="" disabled>Choose the closest fit</option>
                <option>Clipping + creative versioning</option>
                <option>Mass posting / managed distribution</option>
                <option>Phone farm / managed device campaign</option>
                <option>Full system — clipping + distribution</option>
              </select></label>
              <label><span>Monthly output</span><select required name="volume" defaultValue="">
                <option value="" disabled>Select a range</option>
                <option>30–100 posts / month</option>
                <option>100–500 posts / month</option>
                <option>500–2,000 posts / month</option>
                <option>2,000+ posts / month</option>
              </select></label>
            </div>
            <label><span>Main goal</span><select required name="goal" defaultValue="">
              <option value="" disabled>What are we trying to move?</option>
              <option>More content from what we already make</option>
              <option>More distribution / posting volume</option>
              <option>Launch a product, creator or campaign</option>
              <option>Build an always-on content operation</option>
            </select></label>
            <label><span>Anything we should know? <em>Optional</em></span><textarea name="brief" rows={3} placeholder="Content source, platforms, current bottleneck…"/></label>
            <button className="submit" type="submit"><span>{state === "sending" ? "Sending…" : state === "sent" ? "Brief sent" : formCta}</span><b>{state === "sent" ? "✓" : "↗"}</b></button>
            {state === "sent" && <p className="status ok">Brief received. We have the scope inputs.</p>}
            {state === "error" && <p className="status bad">Could not send. Check the lead webhook configuration and try again.</p>}
            <p className="form-note">APPROVED ACCOUNTS ONLY / NO BOT VIEWS / NO PURCHASED ENGAGEMENT / SCOPE FIRST</p>
          </form>
        </section>
      </main>

      <a className="sticky-cta" href="#contact" onClick={() => track("cta_click", { placement: "mobile_sticky" })}>Get campaign plan <b>↗</b></a>

      <footer>
        <div className="brand"><b>100x</b><span>REACH</span></div>
        <p>Clipping, mass posting and managed device campaigns for approved accounts.</p>
        <p>© 2026 / ONE POST ISN'T A VERDICT</p>
      </footer>
    </div>
  );
}
