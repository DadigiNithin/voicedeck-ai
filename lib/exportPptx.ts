import pptxgen from "pptxgenjs";
import { Slide } from "@/data/mockData";

// Safe SVG to Base64 data URI encoder for both Browser and Node environments
function svgToBase64(svg: string): string {
  // Ensure all & are properly XML-escaped as &amp; if not already escaped
  const cleanSvg = svg.replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;");

  if (typeof window !== "undefined") {
    try {
      const encoded = encodeURIComponent(cleanSvg).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );
      return "data:image/svg+xml;base64," + btoa(encoded);
    } catch (e) {
      console.error("Browser SVG base64 encoding error:", e);
    }
  }

  return "data:image/svg+xml;base64," + Buffer.from(cleanSvg, "utf-8").toString("base64");
}

// Helper to generate clean, transparent topic-specific SVG reference graphics
function getSlideReferenceImageSVG(slide: Slide, index: number): string {
  const textLower = (slide.title + " " + (slide.bullets || []).join(" ")).toLowerCase();

  let headerTitle = "SLIDE GRAPHIC";
  let primaryColor = "#A855F7";
  let secondaryColor = "#3B82F6";
  let iconSvg = "";

  if (textLower.includes("voice") || textLower.includes("audio") || textLower.includes("transcrib") || textLower.includes("speech") || textLower.includes("interest")) {
    headerTitle = "VOICE AI &amp; TRANSCRIPTION";
    primaryColor = "#C084FC";
    secondaryColor = "#EC4899";
    iconSvg = `
      <path d="M100 150 L100 130 M120 170 L120 110 M140 190 L140 90 M160 210 L160 70 M180 230 L180 50 M200 210 L200 70 M220 190 L220 90 M240 170 L240 110 M260 150 L260 130" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
      <circle cx="180" cy="140" r="75" stroke="${primaryColor}" stroke-width="2.5" fill="none" opacity="0.5"/>
    `;
  } else if (textLower.includes("algo") || textLower.includes("payment") || textLower.includes("blockchain") || textLower.includes("wallet")) {
    headerTitle = "ALGORAND x402 PROTOCOL";
    primaryColor = "#10B981";
    secondaryColor = "#3B82F6";
    iconSvg = `
      <polygon points="180,40 260,85 260,175 180,220 100,175 100,85" fill="none" stroke="${primaryColor}" stroke-width="3.5"/>
      <polygon points="180,65 235,95 235,165 180,195 125,165 125,95" fill="${primaryColor}" opacity="0.2" stroke="${secondaryColor}" stroke-width="2"/>
      <text x="180" y="138" font-family="Times New Roman" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ALGO</text>
    `;
  } else if (textLower.includes("slide") || textLower.includes("format") || textLower.includes("deck") || textLower.includes("present") || textLower.includes("course") || textLower.includes("academic")) {
    headerTitle = "ACADEMIC &amp; AI ARCHITECTURE";
    primaryColor = "#F59E0B";
    secondaryColor = "#8B5CF6";
    iconSvg = `
      <rect x="90" y="60" width="180" height="110" rx="8" fill="#1E293B" stroke="${primaryColor}" stroke-width="2.5"/>
      <line x1="110" y1="90" x2="250" y2="90" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="110" y1="115" x2="210" y2="115" stroke="${secondaryColor}" stroke-width="2.5"/>
      <line x1="110" y1="135" x2="230" y2="135" stroke="#94A3B8" stroke-width="2.5"/>
      <circle cx="240" cy="180" r="26" fill="${primaryColor}"/>
      <text x="240" y="186" font-family="Times New Roman" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AI</text>
    `;
  } else if (textLower.includes("market") || textLower.includes("growth") || textLower.includes("cgpa") || textLower.includes("score") || textLower.includes("metric") || textLower.includes("profile")) {
    headerTitle = "PERFORMANCE METRICS";
    primaryColor = "#3B82F6";
    secondaryColor = "#10B981";
    iconSvg = `
      <polyline points="90,190 140,140 190,160 250,80 280,50" fill="none" stroke="${secondaryColor}" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="280" cy="50" r="7" fill="${secondaryColor}"/>
      <rect x="100" y="160" width="18" height="40" fill="${primaryColor}" opacity="0.6"/>
      <rect x="150" y="140" width="18" height="60" fill="${primaryColor}" opacity="0.7"/>
      <rect x="200" y="110" width="18" height="90" fill="${primaryColor}" opacity="0.8"/>
      <rect x="250" y="70" width="18" height="130" fill="${primaryColor}"/>
    `;
  } else {
    headerTitle = `STRATEGY PILLAR #${index + 1}`;
    primaryColor = "#8B5CF6";
    secondaryColor = "#6366F1";
    iconSvg = `
      <circle cx="180" cy="130" r="60" fill="none" stroke="${primaryColor}" stroke-width="3.5"/>
      <polygon points="180,80 193,115 230,115 200,138 211,173 180,150 149,173 160,138 130,115 167,115" fill="${secondaryColor}" opacity="0.85"/>
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="280" viewBox="0 0 360 280">
      <rect x="5" y="5" width="350" height="270" rx="12" fill="#0F172A" stroke="${primaryColor}" stroke-width="2"/>
      <rect x="20" y="20" width="320" height="32" rx="6" fill="#1E293B"/>
      <text x="180" y="41" font-family="Times New Roman" font-size="12" font-weight="bold" fill="#E2E8F0" text-anchor="middle">
        ${headerTitle}
      </text>
      <g transform="translate(0, 10)">
        ${iconSvg}
      </g>
      <text x="180" y="255" font-family="Times New Roman" font-size="11" font-style="italic" fill="#94A3B8" text-anchor="middle">
        Slide ${index + 1} Visual Reference - VoiceDeck AI
      </text>
    </svg>
  `;

  return svgToBase64(svg);
}

// Generate Cover Slide Graphic SVG
function getTitleSlideReferenceImageSVG(title: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="320" viewBox="0 0 380 320">
      <rect x="5" y="5" width="370" height="310" rx="16" fill="#0F172A" stroke="#7C3AED" stroke-width="2"/>
      <polygon points="190,45 280,95 280,195 190,245 100,195 100,95" fill="none" stroke="#A855F7" stroke-width="3"/>
      <polygon points="190,70 255,108 255,182 190,220 125,182 125,108" fill="#7C3AED" opacity="0.25" stroke="#3B82F6" stroke-width="1.5"/>
      <circle cx="190" cy="145" r="38" fill="#7C3AED" opacity="0.9"/>
      <text x="190" y="155" font-family="Times New Roman" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AI</text>
      <path d="M 20 145 Q 80 95 130 145 T 190 145 T 250 145 T 360 145" fill="none" stroke="#A855F7" stroke-width="2.5" opacity="0.7"/>
      <rect x="30" y="260" width="320" height="32" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1"/>
      <text x="190" y="281" font-family="Times New Roman" font-size="12" font-weight="bold" fill="#E2E8F0" text-anchor="middle">
        VOICEDECK AI PRESENTATION
      </text>
    </svg>
  `;

  return svgToBase64(svg);
}

// Build PowerPoint Presentation instance with strictly Times New Roman typography and clean layout
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
  titleSlide.background = { color: "0F172A" };

  titleSlide.addText(title || "Generated Presentation", {
    x: 0.8,
    y: 1.5,
    w: 7.2,
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
      y: 3.5,
      w: 7.2,
      h: 1.2,
      fontSize: 18,
      italic: true,
      color: "C084FC",
      fontFace: FONT_TIMES,
      align: "left",
      valign: "top",
    });
  }

  titleSlide.addText("Generated by VoiceDeck AI - Executive Presentation Layout", {
    x: 0.8,
    y: 5.4,
    w: 7.2,
    h: 0.5,
    fontSize: 13,
    color: "94A3B8",
    fontFace: FONT_TIMES,
  });

  try {
    const titleImageSvg = getTitleSlideReferenceImageSVG(title || "Presentation");
    titleSlide.addImage({
      data: titleImageSvg,
      x: 8.4,
      y: 1.6,
      w: 4.2,
      h: 3.5,
    });
  } catch (e) {
    console.error("Error adding title slide image:", e);
  }

  titleSlide.addText("VoiceDeck AI | Executive Presentation", {
    x: 0.8,
    y: 6.8,
    w: 11.7,
    h: 0.3,
    fontSize: 10,
    color: "64748B",
    fontFace: FONT_TIMES,
  });

  // 2. INDIVIDUAL CONTENT SLIDES
  (slides || []).forEach((slideData, index) => {
    const slide = pptx.addSlide();
    slide.background = { color: "0F172A" };

    const slideTitleText = slideData.icon
      ? `${slideData.icon} ${slideData.title}`
      : slideData.title;

    slide.addText(slideTitleText, {
      x: 0.8,
      y: 0.6,
      w: 11.7,
      h: 0.7,
      fontSize: 24,
      bold: true,
      color: "FFFFFF",
      fontFace: FONT_TIMES,
    });

    if (slideData.subtitle) {
      slide.addText(slideData.subtitle, {
        x: 0.8,
        y: 1.3,
        w: 11.7,
        h: 0.4,
        fontSize: 15,
        italic: true,
        color: "C084FC",
        fontFace: FONT_TIMES,
      });
    }

    const contentY = slideData.subtitle ? 1.8 : 1.5;

    if (slideData.bullets && slideData.bullets.length > 0) {
      const textRows = slideData.bullets.map((bullet) => ({
        text: bullet,
        options: {
          fontSize: 15,
          color: "F1F5F9",
          breakLine: true,
          spaceBefore: 10,
          bullet: true,
          fontFace: FONT_TIMES,
        },
      }));

      slide.addText(textRows, {
        x: 0.8,
        y: contentY,
        w: 7.2,
        h: 4.6,
        valign: "top",
      });
    }

    try {
      const refImageSvg = getSlideReferenceImageSVG(slideData, index);
      slide.addImage({
        data: refImageSvg,
        x: 8.4,
        y: contentY,
        w: 4.2,
        h: 3.3,
      });

      slide.addText(`Figure ${index + 1}: Slide Visual Reference`, {
        x: 8.4,
        y: contentY + 3.4,
        w: 4.2,
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

    if (slideData.speakerNotes) {
      slide.addNotes(slideData.speakerNotes);
    }

    slide.addText(`VoiceDeck AI | Slide ${index + 1} of ${slides.length}`, {
      x: 0.8,
      y: 6.8,
      w: 11.7,
      h: 0.3,
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
