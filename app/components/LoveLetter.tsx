"use client";

import { useState } from "react";
import styles from "./LoveLetter.module.css";
import Rose from "./Rose";

interface LoveLetterProps {
  to?: string;
  from?: string;
  title?: string;
  message?: string;
}

export default function LoveLetter({
  to = "Mi Amor",
  from = "Tu Admirador",
  title = "Para Ti",
  message = "Eres la persona más especial en mi vida. Cada día a tu lado es un regalo. Te amo con todo mi corazón.",
}: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fontFamily, setFontFamily] = useState('var(--font-great-vibes)');

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for flap animation + letter slide up (approx 1.2s total)
      setTimeout(() => {
        setIsFullOpen(true);
      }, 1000);
    } else {
      // If already open, clicking again opens reading view immediately if it wasn't open
      setIsFullOpen(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullOpen(false);
    // Wait for overlay to fade out before closing envelope
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };

  const cycleFont = () => {
    if (fontFamily === 'var(--font-great-vibes)') {
      setFontFamily('var(--font-playfair)');
    } else if (fontFamily === 'var(--font-playfair)') {
      setFontFamily('var(--font-dancing)');
    } else {
      setFontFamily('var(--font-great-vibes)');
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.envelopeWrapper} ${isOpen ? styles.open : ""}`}
        onClick={handleOpen}
      >
        <div className={styles.envelope}>
          <div className={styles.frontLeft}></div>
          <div className={styles.frontRight}></div>
          <div className={styles.front}></div>

          <div className={styles.flap}></div>
          <div className={styles.heart}>⭐</div>

          {/* This is the small letter inside the envelope that slides out */}
          <div className={styles.letterPreview}>
            <div className={styles.letterContent} style={{ transform: 'scale(0.8)' }}>
              <p style={{ margin: 0 }}>{title}</p>
              <div style={{ height: '3px', width: '30px', background: '#d81b60', margin: '5px auto' }}></div>
              <p style={{ fontSize: '0.8rem' }}>De: {from}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Overlay */}
      <div className={`${styles.readingOverlay} ${isFullOpen ? styles.visible : ""}`}>
        <div className={styles.paper}>
          {/* Controls */}
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px', zIndex: 10 }}>
            <button
              onClick={toggleItalic}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #ccc',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: isItalic ? '#d81b60' : '#333'
              }}
              title="Cursiva"
            >
              I
            </button>
            <button
              onClick={cycleFont}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #ccc',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#333'
              }}
              title="Cambiar Fuente"
            >
              F
            </button>
          </div>

          <div className={styles.letterContent} style={{
            fontFamily: fontFamily,
            fontStyle: isItalic ? 'italic' : 'normal',
            transition: 'all 0.3s ease'
          }}>
            <div className={styles.letterTitle}>{title}</div>
            <p className={styles.letterBody}>
              {to},<br /><br />
              {message}
              <br /><br />
              Con cariño,<br />
              {from}
            </p>
            <button className={styles.closeButton} onClick={handleClose}>
              Guardar carta
            </button>

            <Rose />
          </div>
        </div>
      </div>
    </div>
  );
}
