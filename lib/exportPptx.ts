import pptxgen from "pptxgenjs";
import { Slide } from "@/data/mockData";

// Helper to generate elegant topic-specific SVG reference images
function getSlideReferenceImageSVG(slide: Slide, index: number): string {
  const textLower = (slide.title + " " + (slide.bullets || []).join(" ")).toLowerCase();

  let headerTitle = "REFERENCE GRAPHIC";
  let primaryColor = "#8B5CF6";
  let secondaryColor = "#3B82F6";
  let iconSvg = "";

  if (textLower.includes("voice") || textLower.includes("audio") || textLower.includes("transcrib") || textLower.includes("speech")) {
    headerTitle = "VOICE AI SPECTRUM & TRANSCRIPTION";
    primaryColor = "#A855F7";
    secondaryColor = "#EC4899";
    iconSvg = `
      <path d="M120 160 L120 140 M140 180 L140 120 M160 200 L160 100 M180 220 L180 80 M200 240 L200 60 M220 220 L220 80 M240 200 L240 100 M260 180 L260 120 M280 160 L280 140" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
      <circle cx="200" cy="150" r="85" stroke="${primaryColor}" stroke-width="3" fill="none" opacity="0.4"/>
    `;
  } else if (textLower.includes("x402") || textLower.includes("algo") || textLower.includes("payment") || textLower.includes("blockchain") || textLower.includes("wallet")) {
    headerTitle = "ALGORAND x402 BLOCKCHAIN NODE";
    primaryColor = "#10B981";
    secondaryColor = "#3B82F6";
    iconSvg = `
      <polygon points="200,60 290,110 290,210 200,260 110,210 110,110" fill="none" stroke="${primaryColor}" stroke-width="4"/>
      <polygon points="200,90 260,125 260,195 200,230 140,195 140,125" fill="${primaryColor}" opacity="0.2" stroke="${secondaryColor}" stroke-width="2"/>
      <text x="200" y="160" font-family="Times New Roman" font-size="22" font-weight="bold" fill="#FFFFFF" text-anchor="middle">0.1 ALGO</text>
    `;
  } else if (textLower.includes("slide") || textLower.includes("format") || textLower.includes("deck") || textLower.includes("present")) {
    headerTitle = "SLIDE SYNTHESIS ARCHITECTURE";
    primaryColor = "#F59E0B";
    secondaryColor = "#8B5CF6";
    iconSvg = `
      <rect x="110" y="80" width="180" height="110" rx="8" fill="#1E293B" stroke="${primaryColor}" stroke-width="3"/>
      <line x1="130" y1="110" x2="270" y2="110" stroke="#FFFFFF" stroke-width="4"/>
      <line x1="130" y1="135" x2="230" y2="135" stroke="${secondaryColor}" stroke-width="3"/>
      <line x1="130" y1="155" x2="250" y2="155" stroke="#94A3B8" stroke-width="3"/>
      <circle cx="270" cy="210" r="30" fill="${primaryColor}"/>
      <text x="270" y="217" font-family="Times New Roman" font-size="20" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AI</text>
    `;
  } else if (textLower.includes("market") || textLower.includes("growth") || textLower.includes("business") || textLower.includes("revenue") || textLower.includes("roi")) {
    headerTitle = "BUSINESS METRICS & ANALYTICS";
    primaryColor = "#3B82F6";
    secondaryColor = "#10B981";
    iconSvg = `
      <polyline points="110,220 160,170 210,190 270,110 310,80" fill="none" stroke="${secondaryColor}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="310" cy="80" r="8" fill="${secondaryColor}"/>
      <rect x="120" y="190" width="20" height="40" fill="${primaryColor}" opacity="0.6"/>
      <rect x="170" y="170" width="20" height="60" fill="${primaryColor}" opacity="0.7"/>
      <rect x="220" y="140" width="20" height="90" fill="${primaryColor}" opacity="0.8"/>
      <rect x="270" y="100" width="20" height="130" fill="${primaryColor}"/>
    `;
  } else {
    headerTitle = `EXECUTIVE STRATEGY PILLAR #${index + 1}`;
    primaryColor = "#8B5CF6";
    secondaryColor = "#6366F1";
    iconSvg = `
      <circle cx="200" cy="150" r="70" fill="none" stroke="${primaryColor}" stroke-width="4"/>
      <polygon points="200,95 215,135 255,135 223,160 235,200 200,175 165,200 177,160 145,135 185,135" fill="${secondaryColor}" opacity="0.8"/>
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="380" viewBox="0 0 500 380">
      <defs>
        <linearGradient id="bgGrad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
        <linearGradient id="cardBorder${index}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${primaryColor}"/>
          <stop offset="100%" stop-color="${secondaryColor}"/>
        </linearGradient>
      </defs>
      
      <!-- Container Background Box -->
      <rect x="10" y="10" width="480" height="360" rx="16" fill="url(#bgGrad${index})" stroke="url(#cardBorder${index})" stroke-width="3"/>
      
      <!-- Top Title Tag Accent -->
      <rect x="30" y="30" width="440" height="40" rx="8" fill="#334155" opacity="0.5"/>
      <text x="250" y="55" font-family="Times New Roman" font-size="15" font-weight="bold" fill="#F8FAFC" text-anchor="middle" letter-spacing="1.5">
        ${headerTitle}
      </text>

      <!-- Center Graphic Art -->
      <g transform="translate(50, 20)">
        ${iconSvg}
      </g>

      <!-- Footer Emblem Text -->
      <rect x="30" y="310" width="440" height="36" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1"/>
      <text x="250" y="333" font-family="Times New Roman" font-size="13" font-style="italic" fill="#94A3B8" text-anchor="middle">
        Slide ${index + 1} Visual Reference • VoiceDeck AI Synthesis
      </text>
    </svg>
  `;

  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

// Generate Cover Slide Image SVG
function getTitleSlideReferenceImageSVG(title: string, subtitle?: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="550" height="400" viewBox="0 0 550 400">
      <defs>
        <linearGradient id="titleBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E1B4B"/>
          <stop offset="50%" stop-color="#0F172A"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
        <linearGradient id="titleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A855F7"/>
          <stop offset="100%" stop-color="#3B82F6"/>
        </linearGradient>
      </defs>

      <!-- Background Card Box -->
      <rect x="10" y="10" width="530" height="380" rx="20" fill="url(#titleBg)" stroke="#4C1D95" stroke-width="3"/>
      
      <!-- Glowing Hexagon Network Emblem -->
      <polygon points="275,70 380,130 380,250 275,310 170,250 170,130" fill="none" stroke="url(#titleGlow)" stroke-width="4"/>
      <polygon points="275,100 350,145 350,235 275,280 200,235 200,145" fill="url(#titleGlow)" opacity="0.15" stroke="#7C3AED" stroke-width="2"/>

      <!-- Center Icon -->
      <circle cx="275" cy="190" r="50" fill="#7C3AED" opacity="0.8"/>
      <text x="275" y="202" font-family="Times New Roman" font-size="34" font-weight="bold" fill="#FFFFFF" text-anchor="middle">🎙️</text>

      <!-- Decorative Waveforms -->
      <path d="M 40 190 Q 110 130 170 190 T 275 190 T 380 190 T 510 190" fill="none" stroke="#A855F7" stroke-width="3" opacity="0.6"/>
      <path d="M 40 190 Q 110 240 170 190 T 275 190 T 380 190 T 510 190" fill="none" stroke="#3B82F6" stroke-width="2" opacity="0.5"/>

      <!-- Bottom Banner -->
      <rect x="40" y="325" width="470" height="40" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1"/>
      <text x="275" y="350" font-family="Times New Roman" font-size="14" font-weight="bold" fill="#E2E8F0" text-anchor="middle">
        VOICEDECK AI • EXECUTIVE PRESENTATION DECK
      </text>
    </svg>
  `;

  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

// Build PowerPoint Presentation instance with strictly Times New Roman typography and reference graphics
export async function buildPptxInstance(
  slides: Slide[],
  title?: string,
  subtitle?: string
) {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "VoiceDeck AI";
  pptx.company = "VoiceDeck AI";
  pptx.title = title || "VoiceDeck Presentation";

  const FONT_TIMES = "Times New Roman";

  // 1. TITLE SLIDE
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "0F172A" }; // Deep Slate/Navy

  // Top header accent line
  titleSlide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: 0.15,
    fill: { color: "7C3AED" },
  });

  // Left Column: Title & Subtitle Info Box
  titleSlide.addText(title || "Generated Presentation", {
    x: 0.8,
    y: 1.8,
    w: 6.5,
    h: 1.8,
    fontSize: 34,
    bold: true,
    color: "FFFFFF",
    fontFace: FONT_TIMES,
    align: "left",
    valign: "middle",
  });

  if (subtitle) {
    titleSlide.addText(subtitle, {
      x: 0.8,
      y: 3.8,
      w: 6.5,
      h: 1.0,
      fontSize: 18,
      italic: true,
      color: "C084FC",
      fontFace: FONT_TIMES,
      align: "left",
    });
  }

  // Title Slide Metadata Box
  titleSlide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 5.2,
    w: 6.5,
    h: 1.2,
    fill: { color: "1E293B" },
    line: { color: "334155", width: 1 },
    rectRadius: 0.08,
  });

  titleSlide.addText(
    [
      { text: "Synthesized by: ", options: { bold: true, color: "94A3B8" } },
      { text: "VoiceDeck AI (Gemini 2.5 + Algorand x402)\n", options: { color: "E2E8F0" } },
      { text: "Typography: ", options: { bold: true, color: "94A3B8" } },
      { text: "Times New Roman Executive Layout", options: { color: "C084FC" } },
    ],
    {
      x: 1.0,
      y: 5.3,
      w: 6.1,
      h: 1.0,
      fontSize: 12,
      fontFace: FONT_TIMES,
      valign: "middle",
    }
  );

  // Right Column: Title Slide Reference Image Graphic
  try {
    const titleImageSvg = getTitleSlideReferenceImageSVG(title || "Presentation", subtitle);
    titleSlide.addImage({
      data: titleImageSvg,
      x: 7.6,
      y: 1.6,
      w: 5.0,
      h: 4.8,
    });
  } catch (e) {
    console.error("Error adding title slide image:", e);
  }

  // Footer on Title Slide
  titleSlide.addText("VoiceDeck AI  |  Executive Presentation", {
    x: 0.8,
    y: 7.0,
    w: 11.7,
    h: 0.4,
    fontSize: 10,
    color: "64748B",
    fontFace: FONT_TIMES,
  });

  // 2. INDIVIDUAL CONTENT SLIDES
  (slides || []).forEach((slideData, index) => {
    const slide = pptx.addSlide();
    slide.background = { color: "0F172A" };

    // Top purple accent strip
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      h: 0.12,
      fill: { color: "7C3AED" },
    });

    // Icon & Slide Title
    const slideTitleText = slideData.icon
      ? `${slideData.icon}  ${slideData.title}`
      : slideData.title;

    slide.addText(slideTitleText, {
      x: 0.8,
      y: 0.5,
      w: 11.7,
      h: 0.7,
      fontSize: 24,
      bold: true,
      color: "FFFFFF",
      fontFace: FONT_TIMES,
    });

    // Subtitle if available
    if (slideData.subtitle) {
      slide.addText(slideData.subtitle, {
        x: 0.8,
        y: 1.2,
        w: 11.7,
        h: 0.4,
        fontSize: 15,
        italic: true,
        color: "A855F7",
        fontFace: FONT_TIMES,
      });
    }

    const cardY = slideData.subtitle ? 1.7 : 1.4;
    const cardH = slideData.subtitle ? 4.8 : 5.1;

    // LEFT COLUMN: Bullet points card container (W: 6.4 in)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: cardY,
      w: 6.4,
      h: cardH,
      fill: { color: "1E293B" },
      line: { color: "334155", width: 1 },
      rectRadius: 0.08,
    });

    // Bullet items formatting in Times New Roman
    if (slideData.bullets && slideData.bullets.length > 0) {
      const textRows = slideData.bullets.map((bullet) => ({
        text: bullet,
        options: {
          fontSize: 15,
          color: "F1F5F9",
          breakLine: true,
          spaceBefore: 12,
          bullet: true,
          fontFace: FONT_TIMES,
        },
      }));

      slide.addText(textRows, {
        x: 1.1,
        y: cardY + 0.3,
        w: 5.8,
        h: cardH - 0.6,
        valign: "top",
      });
    }

    // RIGHT COLUMN: Embedded Reference Image Box (W: 5.0 in, X: 7.5 in)
    try {
      const refImageSvg = getSlideReferenceImageSVG(slideData, index);
      slide.addImage({
        data: refImageSvg,
        x: 7.5,
        y: cardY,
        w: 5.0,
        h: cardH - 0.4,
      });

      // Caption label below reference image
      slide.addText(`Figure ${index + 1}: Slide Reference Graphic`, {
        x: 7.5,
        y: cardY + cardH - 0.35,
        w: 5.0,
        h: 0.3,
        fontSize: 11,
        italic: true,
        color: "94A3B8",
        fontFace: FONT_TIMES,
        align: "center",
      });
    } catch (e) {
      console.error(`Error adding reference image to slide ${index + 1}:`, e);
    }

    // Speaker Notes
    if (slideData.speakerNotes) {
      slide.addNotes(slideData.speakerNotes);
    }

    // Slide Footer
    slide.addText(`VoiceDeck AI  |  Slide ${index + 1} of ${slides.length}`, {
      x: 0.8,
      y: 7.0,
      w: 11.7,
      h: 0.4,
      fontSize: 10,
      color: "64748B",
      fontFace: FONT_TIMES,
    });
  });

  return pptx;
}

// Generate Buffer for server-side link downloading
export async function generatePptxBuffer(
  slides: Slide[],
  title?: string,
  subtitle?: string
) {
  const pptx = await buildPptxInstance(slides, title, subtitle);
  const buffer = await pptx.write({ outputType: "nodebuffer" });
  return buffer;
}

// Client-side browser download handler
export async function downloadPresentationAsPptx(
  slides: Slide[],
  title?: string,
  subtitle?: string
) {
  if (!slides || slides.length === 0) return;

  const pptx = await buildPptxInstance(slides, title, subtitle);

  const safeName = (title || "VoiceDeck_Presentation")
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/_+/g, "_")
    .toLowerCase();

  await pptx.writeFile({ fileName: `${safeName}.pptx` });
}
