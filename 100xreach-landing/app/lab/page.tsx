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
  const [started, setStarted] = useState(false);
  const [motion, setMotion] = useState(true);
  const validSource = useMemo(() => normalizeSource(source), [source]);
  const stages = ["Source analyzed", "Creative variants mapped", "Authorized accounts planned", "Device sessions assigned", "Publishing QA queued"];
  return <main className={styles.page}>
    <header className={styles.nav}><Link href="/" className={styles.brand}>100x<span>REACH</span></Link><span className={styles.navTag}>THE DISTRIBUTION LAB / CONCEPT 01</span><Link href="/#contact" className={styles.navCta}>Discuss a campaign ↗</Link></header>
    <section className={styles.intro}><div className={styles.eyebrow}>A MORE TANGIBLE WAY TO PLAN REACH <span>● INTERACTIVE CONCEPT</span></div><h1>FROM ONE SOURCE.<br/><em>TO AN ENTIRE SYSTEM.</em></h1><p>Enter a creator handle or YouTube link. Choose a market and a niche. See how a managed distribution campaign could be structured across authorized accounts and device sessions.</p></section>
    <section className={styles.workbench} aria-label="Interactive campaign configurator">
      <div className={styles.controls}>
        <div className={styles.controlHeader}><span>01 / YOUR CAMPAIGN</span><span className={styles.demo}>SANDBOX PREVIEW</span></div>
        <label htmlFor="source">CREATOR HANDLE OR YOUTUBE URL</label><input id="source" value={source} onChange={e=>{setSource(e.target.value);setStarted(false);}} placeholder="@yourbrand or https://youtube.com/..." maxLength={500} autoComplete="off"/>
        <div className={styles.pair}><div><label htmlFor="market">TARGET MARKET</label><select id="market" value={market} onChange={e=>setMarket(e.target.value)}>{markets.map(x=><option key={x}>{x}</option>)}</select></div><div><label htmlFor="niche">CONTENT NICHE</label><select id="niche" value={niche} onChange={e=>setNiche(e.target.value)}>{niches.map(x=><option key={x}>{x}</option>)}</select></div></div>
        <label htmlFor="platform">PRIMARY CHANNEL</label><select id="platform" value={platform} onChange={e=>setPlatform(e.target.value)}>{platforms.map(x=><option key={x}>{x}</option>)}</select>
        <div className={styles.rangeHeading}><label htmlFor="accounts">ILLUSTRATIVE ACCOUNT CAPACITY</label><strong>{quantity} <small>slots</small></strong></div><input id="accounts" type="range" min="8" max="100" step="4" value={quantity} onChange={e=>setQuantity(Number(e.target.value))}/>
        <button className={styles.launch} disabled={!validSource} onClick={()=>setStarted(true)}>{started?"RECONFIGURE VISUALIZATION ↗":"VISUALIZE THE CAMPAIGN ↗"}</button>
        <p className={styles.hint}>{source && !validSource ? "Enter a valid @handle or HTTPS YouTube link." : "A planning visualization only. No accounts are created, no devices are controlled, and no content is published."}</p>
      </div>
      <div className={styles.visual}>
        <div className={styles.visualTop}><span>SWITCHBOARD / FLEET TOPOLOGY</span><button onClick={()=>setMotion(v=>!v)} aria-pressed={!motion}>{motion?"REDUCE MOTION":"ENABLE MOTION"}</button></div>
        <div className={styles.scene}>{motion ? <FleetScene count={quantity} active={started} /> : <div className={styles.staticFleet} aria-label={`${quantity} illustrative account slots`}>{Array.from({length:quantity},(_,i)=><span key={i} className={started?styles.activeSlot:""} />)}</div>}<div className={styles.sceneOverlay}><span>CAMPAIGN ARCHITECTURE</span><strong>{started ? "CONFIGURATION READY" : "AWAITING INPUT"}</strong><small>{started ? `${quantity} illustrative slots · ${market}` : "No connection to live Switchboard devices"}</small></div></div>
        <div className={styles.metrics}><div><span>MARKET</span><b>{market}</b></div><div><span>NICHE</span><b>{niche}</b></div><div><span>CHANNEL</span><b>{platform}</b></div></div>
      </div>
    </section>
    <section className={styles.workflow}><div><span className={styles.eyebrow}>02 / WHAT THE OPERATION INVOLVES</span><h2>THE MAGIC IS IN<br/>THE <em>WORKFLOW.</em></h2><p>Real deployments require account ownership or authorization, platform-compliant publishing, device capacity, content approval and operational QA.</p><Link href="/#contact" className={styles.bottomCta}>Build this with Relay Digital ↗</Link></div><ol>{stages.map((stage,i)=><li key={stage}><span>0{i+1}</span><strong>{stage}</strong><small>{started ? "PLANNED / DEMO" : "PENDING CONFIGURATION"}</small></li>)}</ol></section>
    <footer className={styles.footer}><span>100xREACH / RELAY DIGITAL</span><span>CONCEPT VISUALIZATION — NOT A LIVE PROVISIONING INTERFACE</span></footer>
  </main>;
}
