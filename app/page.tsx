"use client"
import Image from "next/image";
import logo from "@/public/logo.png";
import coins from "@/public/coins.png";
import cridetCard from "@/public/cridet card.png";
import "./Home.css";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="home-container">
      {/* Floating Stars */}
      <div className="stars-container">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 1 + 2; 
          const top = Math.random() * 100;
          const left = Math.random() * 100; 
          const delay = Math.random() * 5000;

          return (
            <div
              key={i}
              className="star"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}ms`,
              }}
            />
          );
        })}
      </div>

      {/* Dark overlay with spotlight cutouts */}
      <div className="overlay">
        <div className="spotlight-main"></div>
        <div className="spotlight-secondary"></div>
        <div className="vignette"></div>
      </div>

      {/* Background gradient */}
      <div className="background-gradient"></div>

      <header className="header">
        <div className="logo-container">
          <Image src={logo} alt="Logo" width={80} height={70} className="logo" />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li>
              <Link href="/AddPayment" className="nav-link">Creat Payment</Link>
            </li>
            <li>
              <Link href="/AllPayments" className="nav-link">Show Payments</Link>
            </li>
          </ul>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
          <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button className="get-started-btn">
          <span className="get-started-text">Get Started →</span>
          <span className="get-started-text-mobile">Start</span>
        </button>
      </header>

      <nav className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li>
            <Link href="/AddPayment" className="nav-link" style={{color: "white"}} onClick={() => setMobileOpen(false)}>Creat Payment</Link>
          </li>
          <li>
            <Link href="/AllPayments" className="nav-link" style={{color: "white"}} onClick={() => setMobileOpen(false)}>Show Payments</Link>
          </li>
        </ul>
      </nav>
      
      <section className="main-section">
        {/* Content Section */}
        <div className="content-section">
          <div className="badge">
            <span className="badge-text">[ 150+ organizations ]</span>
          </div>
          
          <h1 className="main-title">
            Investing with us
            <br />
            <span className="title-gradient">
              Beyond Boundaries
            </span>
            <br />
            <span className="title-brand">
              X pay
            </span>
          </h1>
          
          <p className="description">
            Simplified Asset Fractionalization with
            <br className="description-break" />
            Unrivaled Market Access via ChainFund
          </p>
          
          <button className="cta-button">
            Get Started →
          </button>
        </div>
        
        {/* Cards Section */}
        <div className="cards-section">
          {/* Mobile/Tablet Layout */}
          <div className="mobile-cards">
            <div className="mobile-cards-container">
              {/* Card 1 */}
              <div className="card-wrapper card-1">
                <div className="card card-blue">
                  <div className="card-inner card-inner-blue">
                    <Image src={logo} alt="Investment Portfolio" width={60} height={45} className="card-image" />
                  </div>
                  <div className="card-glow card-glow-blue"></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card-wrapper card-2">
                <div className="card card-purple">
                  <div className="card-inner card-inner-purple">
                    <Image src={cridetCard} alt="Credit Solutions" width={60} height={45} className="card-image" />
                  </div>
                  <div className="card-glow card-glow-purple"></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="card-wrapper card-3">
                <div className="card card-green">
                  <div className="card-inner card-inner-green">
                    <Image src={coins} alt="Digital Assets" width={60} height={45} className="card-image" />
                  </div>
                  <div className="card-glow card-glow-green"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="desktop-cards">
            {/* Top floating card */}
            <div className="floating-card floating-card-top">
              <div className="card card-blue-desktop">
                <div className="card-inner card-inner-blue-desktop">
                  <Image src={logo} alt="Investment Portfolio" width={70} height={52} className="card-image-desktop" />
                </div>
                <div className="card-glow card-glow-blue-desktop"></div>
              </div>
            </div>

            {/* Middle floating card */}
            <div className="floating-card floating-card-middle">
              <div className="card card-purple-desktop">
                <div className="card-inner card-inner-purple-desktop">
                  <Image src={cridetCard} alt="Credit Solutions" width={70} height={52} className="card-image-desktop" />
                </div>
                <div className="card-glow card-glow-purple-desktop"></div>
              </div>
            </div>

            {/* Bottom floating card */}
            <div className="floating-card floating-card-bottom">
              <div className="card card-green-desktop">
                <div className="card-inner card-inner-green-desktop">
                  <Image src={coins} alt="Digital Assets" width={70} height={52} className="card-image-desktop" />
                </div>
                <div className="card-glow card-glow-green-desktop"></div>
              </div>
            </div>

            {/* Light effects */}
            <div className="light-effect light-effect-1"></div>
            <div className="light-effect light-effect-2"></div>
            <div className="light-effect light-effect-3"></div>
          </div>
        </div>
      </section>

      {/* Light beams */}
      <div className="light-beams">
        <div className="light-beam light-beam-1"></div>
        <div className="light-beam light-beam-2"></div>
        <div className="light-beam light-beam-3"></div>
      </div>
    </div>
  );
}