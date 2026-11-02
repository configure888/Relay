"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./lab.module.css";

const FleetScene = dynamic(() => import("./FleetScene"), { ssr: false });
const markets = ["United States", "Canada", "United Kingdom", "Nigeria", "Global"];
const niches = ["Music & entertainment", "Business & finance", "Lifestyle", "Gaming", "Education", "Food & hospitality"];
const platforms = ["YouTube Shorts", "TikTok", "Instagram Reels"];

function normalizeSource(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^@[a-zA-Z0-9._-]{2,40}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return "";
    const host = url.hostname.toLowerCase();
    if (!["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"].includes(host)) return "";
    return url.toString();
  } catch { return ""; }
}

export default function CampaignLab() {
  const [source, setSource] = useState("");
  const [market, setMarket] = useState(markets[0]);
  const [niche, setNiche] = useState(niches[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [quantity, setQuantity] = useState(24);
  const [sourceClips, setSourceClips] = useState(8);
  const [monthlyPosts, setMonthlyPosts] = useState(30);
  const [objective, setObjective] = useState("Consistent distribution");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);
  const [motion, setMotion] = useState(true);
  const validSource = useMemo(() => normalizeSource(source), [source]);
  const variants = Math.max(1, Math.min(5, Math.ceil(monthlyPosts / Math.max(1, sourceClips))));
  const plannedOutput = Math.min(1000, sourceClips * variants);
  const gap = Math.max(0, monthlyPosts - plannedOutput);
  const suggestedSlots = Math.min(100, Math.max(8, Math.ceil(monthlyPosts / 20) * 4));
  const stages = ["Source and rights review", "Creative variants proposed", "Authorized channels verified", "Publishing capacity scoped", "QA and reporting agreed"];
  return <main className={styles.page}>
    <header className={styles.nav}><Link href="/" className={styles.brand}>100x<span>REACH</span></Link><span className={styles.navTag}>THE DISTRIBUTION LAB / CONCEPT 01</span><Link href="/#contact" className={styles.navCta}>Discuss a campaign ↗</Link></header>
    <section className={styles.intro}><div className={styles.eyebrow}>A MORE TANGIBLE WAY TO PLAN REACH <span>● INTERACTIVE CONCEPT</span></div><h1>FROM ONE SOURCE.<br/><em>TO AN ENTIRE SYSTEM.</em></h1><p>Enter a creator handle or YouTube link. Choose a market and a niche. See how a managed distribution campaign could be structured across authorized accounts and device sessions.</p></section>
    <section className={styles.workbench} aria-label="Interactive campaign configurator">
      <div className={styles.controls}>
        <div className={styles.controlHeader}><span>01 / YOUR CAMPAIGN</span><span className={styles.demo}>SANDBOX PREVIEW</span></div>
        <label htmlFor="source">CREATOR HANDLE OR YOUTUBE URL</label><input id="source" value={source} onChange={e=>{setSource(e.target.value);setStarted(false);}} placeholder="@yourbrand or https://youtube.com/..." maxLength={500} autoComplete="off"/>
        <div className={styles.pair}><div><label htmlFor="market">TARGET MARKET</label><select id="market" value={market} onChange={e=>setMarket(e.target.value)}>{markets.map(x=><option key={x}>{x}</option>)}</select></div><div><label htmlFor="niche">CONTENT NICHE</label><select id="niche" value={niche} onChange={e=>setNiche(e.target.value)}>{niches.map(x=><option key={x}>{x}</option>)}</select></div></div>
        <label htmlFor="platform">PRIMARY CHANNEL</label><select id="platform" value={platform} onChange={e=>setPlatform(e.target.value)}>{platforms.map(x=><option key={x}>{x}</option>)}</select>
        <div className={styles.pair}><div><label htmlFor="clips">SOURCE CLIPS PER MONTH</label><input id="clips" type="number" min="1" max="500" value={sourceClips} onChange={e=>setSourceClips(Math.min(500,Math.max(1,Number(e.target.value)||1)))}/></div><div><label htmlFor="posts">TARGET POSTS PER MONTH</label><input id="posts" type="number" min="1" max="10000" value={monthlyPosts} onChange={e=>setMonthlyPosts(Math.min(10000,Math.max(1,Number(e.target.value)||1)))}/></div></div>
        <label htmlFor="objective">PRIMARY BUSINESS OBJECTIVE</label><select id="objective" value={objective} onChange={e=>setObjective(e.target.value)}>{["Consistent distribution","Launch awareness","Qualified inbound enquiries","Test creative hooks"].map(x=><option key={x}>{x}</option>)}</select>
        <div className={styles.rangeHeading}><label htmlFor="accounts">ILLUSTRATIVE ACCOUNT CAPACITY</label><strong>{quantity} <small>slots</small></strong></div><input id="accounts" type="range" min="8" max="100" step="4" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}/>
        <p className={styles.hint}>Planning model: {variants} variant(s) per source, up to {plannedOutput} proposed monthly assets. {gap>0?`${gap} additional posts require more source material or a revised content plan.`:"Source volume covers the stated posting target under this illustrative model."} Suggested planning capacity: {suggestedSlots} slots, subject to authorization and operational review.</p>
        <button className={styles.launch} disabled={!validSource} onClick={()=>setStarted(true)}>{started?"RECONFIGURE VISUALIZATION ↗":"VISUALIZE THE CAMPAIGN ↗"}</button>
        <p className={styles.hint}>{source && !validSource ? "Enter a valid @handle or HTTPS YouTube link." : "A planning visualization only. No accounts are created, no devices are controlled, and no content is published."}</p>
      </div>
      <div className={styles.visual}>
        <div className={styles.visualTop}><span>SWITCHBOARD / FLEET TOPOLOGY</span><button onClick={()=>setMotion(v=>!v)} aria-pressed={!motion}>{motion?"REDUCE MOTION":"ENABLE MOTION"}</button></div>
        <div className={styles.scene}>{motion ? <FleetScene count={quantity} active={started} /> : <div className={styles.staticFleet} aria-label={`${quantity} illustrative account slots`}>{Array.from({length:quantity},(_,i)=><span key={i} className={started?styles.activeSlot:""} />)}</div>}<div className={styles.sceneOverlay}><span>CAMPAIGN ARCHITECTURE</span><strong>{started ? "CONFIGURATION READY" : "AWAITING INPUT"}</strong><small>{started ? `${quantity} illustrative slots · ${market}` : "No connection to live Switchboard devices"}</small></div></div>
        <div className={styles.metrics}><div><span>MARKET</span><b>{market}</b></div><div><span>NICHE</span><b>{niche}</b></div><div><span>CHANNEL</span><b>{platform}</b></div></div>
      </div>
    </section>
    <section className={styles.workflow}><div><span className={styles.eyebrow}>03 / YOUR COMMERCIAL BRIEF</span><h2>TAKE THE PLAN<br/><em>TO PRODUCTION.</em></h2><p>Review the proposed scope and request a tailored quote. We confirm authorized channels, production capacity, pricing and timing before accepting an order.</p><label htmlFor="quote-email">CONTACT EMAIL (OPTIONAL)</label><input id="quote-email" type="email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} style={{display:"block",width:"100%",maxWidth:420,padding:14,margin:"14px 0",background:"#171829",border:"1px solid #55516e",color:"white"}}/><a className={styles.bottomCta} href={`mailto:support@relaydigital.agency?subject=${encodeURIComponent("100xReach campaign quote request")}&body=${encodeURIComponent(`Please quote the following proposed campaign.\nSource: ${validSource || "Not provided"}\nMarket: ${market}\nNiche: ${niche}\nChannel: ${platform}\nObjective: ${objective}\nMonthly source clips: ${sourceClips}\nMonthly target posts: ${monthlyPosts}\nIllustrative variants per clip: ${variants}\nIllustrative asset capacity: ${plannedOutput}\nVisualization slots: ${quantity}\nContact: ${email}\n\nPlease confirm scope, account authorization, pricing, capacity and launch timing.`)}`}>REQUEST A TAILORED QUOTE ↗</a><p className={styles.hint}>Opens your email application with this configuration. No submission or payment is recorded automatically.</p></div><div><span className={styles.eyebrow}>02 / WHAT THE OPERATION INVOLVES</span><h2>THE MAGIC IS IN<br/>THE <em>WORKFLOW.</em></h2><p>Real deployments require account ownership or authorization, platform-compliant publishing, device capacity, content approval and operational QA.</p><Link href="/#contact" className={styles.bottomCta}>Build this with Relay Digital ↗</Link></div><ol>{stages.map((stage,i)=><li key={stage}><span>0{i+1}</span><strong>{stage}</strong><small>{started ? "PLANNED / DEMO" : "PENDING CONFIGURATION"}</small></li>)}</ol></section>
    <footer className={styles.footer}><span>100xREACH / RELAY DIGITAL</span><span>CONCEPT VISUALIZATION — NOT A LIVE PROVISIONING INTERFACE</span></footer>
  </main>;
}
