// VoiceDeck AI — Mock Data

export const sampleTranscript = `Good morning everyone. Today's meeting covers our Q3 business review. 

First, let's talk about revenue growth. We've seen a 34% increase in quarterly revenue, driven primarily by our enterprise segment. Our ARR has crossed the $2M milestone.

Next, marketing budget. We're increasing our digital marketing spend by 40% next quarter, focusing on SEO, content marketing, and paid social campaigns. We'll also be launching a referral program.

On the hiring front, we plan to add 12 new engineers, 3 product managers, and expand our sales team by 5 members. Onboarding will begin in October.

For the product roadmap, we're launching the mobile app in November, introducing AI-powered analytics in January, and targeting international markets by Q1 next year.

Finally, our partnership with TechCorp is confirmed. This opens doors to 500 enterprise clients and a $500K joint marketing fund.`;

export interface Slide {
  id: number;
  title: string;
  bullets: string[];
  icon: string;
  gradient: string;
}

export const generatedSlides: Slide[] = [
  {
    id: 1,
    title: "Quarterly Business Review",
    bullets: [
      "Q3 Performance Overview",
      "Key Milestones & Achievements",
      "Strategic Priorities Ahead",
      "Team & Growth Highlights",
    ],
    icon: "📊",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title: "Revenue Growth",
    bullets: [
      "34% increase in quarterly revenue",
      "ARR crossed $2M milestone",
      "Enterprise segment leading growth",
      "Strong retention metrics at 94%",
    ],
    icon: "📈",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: 3,
    title: "Marketing Strategy",
    bullets: [
      "40% increase in digital marketing budget",
      "Focus: SEO, content & paid social",
      "New referral program launching Q4",
      "Target: 3x lead generation growth",
    ],
    icon: "🎯",
    gradient: "from-violet-600 to-purple-500",
  },
  {
    id: 4,
    title: "Hiring Plan",
    bullets: [
      "12 new engineers onboarding October",
      "3 product managers joining the team",
      "Sales team expansion by 5 members",
      "New remote-first hiring policy",
    ],
    icon: "👥",
    gradient: "from-indigo-600 to-blue-500",
  },
  {
    id: 5,
    title: "Product Roadmap",
    bullets: [
      "Mobile app launch — November 2024",
      "AI analytics module — January 2025",
      "International markets — Q1 2025",
      "Enterprise API — Q2 2025",
    ],
    icon: "🗺️",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 6,
    title: "Strategic Partnerships",
    bullets: [
      "TechCorp partnership confirmed",
      "Access to 500 enterprise clients",
      "$500K joint marketing fund secured",
      "Co-branded product planned for 2025",
    ],
    icon: "🤝",
    gradient: "from-blue-500 to-indigo-600",
  },
];

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out VoiceDeck AI",
    features: [
      "3 slide decks per month",
      "Basic AI summarization",
      "5 themes available",
      "PDF export",
      "Community support",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: "$19",
    period: "per month",
    description: "For individuals and freelancers",
    features: [
      "Unlimited slide decks",
      "Advanced AI generation",
      "All 20+ themes",
      "PPTX + PDF export",
      "Voice upload (up to 2 hours)",
      "Priority support",
      "x402 pay-per-use APIs",
    ],
    cta: "Start Basic",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "For teams and enterprises",
    features: [
      "Everything in Basic",
      "Team collaboration (up to 10)",
      "Custom branding",
      "White-label export",
      "API access",
      "Analytics dashboard",
      "x402 protected endpoints",
      "Algorand blockchain payments",
      "Dedicated account manager",
    ],
    cta: "Start Pro Trial",
    highlighted: false,
    badge: "Enterprise",
  },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Product Manager",
    company: "TechVentures",
    avatar: "PS",
    rating: 5,
    quote:
      "VoiceDeck AI saved me hours every week. I just record our standup, and within seconds I have a polished deck ready for stakeholders. It's like magic.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Startup Founder",
    company: "InnovateLabs",
    avatar: "MC",
    rating: 5,
    quote:
      "Used this to turn a 30-minute investor call into a pitch deck overnight. The AI understood the context perfectly and structured everything beautifully.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Sales Director",
    company: "GrowthCo",
    avatar: "AP",
    rating: 5,
    quote:
      "Our entire sales team uses VoiceDeck AI now. We go from discovery call recordings to client proposals in under 5 minutes. ROI is unbelievable.",
  },
];

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "How does VoiceDeck AI generate slides from audio?",
    answer:
      "VoiceDeck AI uses advanced speech-to-text technology to transcribe your audio, then applies a large language model to summarize, extract key points, and structure them into logical slide sections with appropriate headings and bullet points.",
  },
  {
    id: 2,
    question: "What audio formats are supported?",
    answer:
      "We support MP3, MP4, WAV, M4A, FLAC, OGG, and WebM formats. Files up to 500MB can be uploaded. For longer recordings, we recommend splitting them into chapters.",
  },
  {
    id: 3,
    question: "What is x402 payment protection?",
    answer:
      "x402 is an HTTP 402 Payment Required protocol that enables pay-per-use access to AI APIs via Algorand blockchain micropayments. This ensures secure, transparent, and decentralized billing for each AI generation request.",
  },
  {
    id: 4,
    question: "Can I edit the generated slides?",
    answer:
      "Yes! After generation, you can edit slide titles, bullet points, reorder slides, change themes, and add or remove content before exporting to PPTX or PDF.",
  },
  {
    id: 5,
    question: "Is my audio data private?",
    answer:
      "Absolutely. Your audio files and transcripts are processed securely and are never stored permanently on our servers unless you explicitly save them. All data is encrypted in transit and at rest.",
  },
  {
    id: 6,
    question: "How accurate is the AI transcription?",
    answer:
      "Our transcription achieves 95%+ accuracy for clear audio in English. We also support multiple languages including Spanish, French, German, Hindi, and 20+ others with high accuracy.",
  },
  {
    id: 7,
    question: "Can I use my own slide templates?",
    answer:
      "Pro users can upload custom PowerPoint templates and brand guidelines. The AI will then apply your company's colors, fonts, and layouts to every generated deck.",
  },
  {
    id: 8,
    question: "Is there an API available?",
    answer:
      "Yes! Pro plan users get full API access to integrate VoiceDeck AI into their own workflows, CRMs, or internal tools. Our REST API is protected by x402 payment authorization.",
  },
];

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Voice Upload",
    description: "Upload audio file or record directly in browser",
    icon: "🎤",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: 2,
    title: "Speech-to-Text",
    description: "AI converts audio to accurate transcript",
    icon: "📝",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 3,
    title: "AI Summarization",
    description: "LLM extracts key topics and insights",
    icon: "🤖",
    color: "from-violet-500 to-violet-700",
  },
  {
    id: 4,
    title: "Slide Structuring",
    description: "Content organized into logical slide flow",
    icon: "🗂️",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    id: 5,
    title: "Theme Generation",
    description: "Beautiful design theme auto-selected",
    icon: "🎨",
    color: "from-cyan-500 to-cyan-700",
  },
  {
    id: 6,
    title: "Export PPT",
    description: "Download as PPTX, PDF, or share link",
    icon: "📤",
    color: "from-teal-500 to-teal-700",
  },
];

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

export const features: Feature[] = [
  {
    id: 1,
    title: "Voice Recording Upload",
    description:
      "Upload MP3, WAV, MP4 audio files or record directly in your browser with one click.",
    icon: "Mic",
    gradient: "from-purple-500/20 to-purple-600/10",
  },
  {
    id: 2,
    title: "Transcript Input",
    description:
      "Paste meeting transcripts directly. Supports Zoom, Google Meet, and Teams auto-transcripts.",
    icon: "FileText",
    gradient: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: 3,
    title: "AI Slide Generator",
    description:
      "Powered by state-of-the-art LLMs to intelligently structure content into compelling slides.",
    icon: "Sparkles",
    gradient: "from-violet-500/20 to-violet-600/10",
  },
  {
    id: 4,
    title: "Auto Theme Selection",
    description:
      "AI detects meeting context and selects the most appropriate visual theme automatically.",
    icon: "Palette",
    gradient: "from-indigo-500/20 to-indigo-600/10",
  },
  {
    id: 5,
    title: "Smart Bullet Extraction",
    description:
      "Key points, action items, and decisions are automatically extracted and formatted.",
    icon: "Zap",
    gradient: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    id: 6,
    title: "Charts & Graph Support",
    description:
      "Numeric data from discussions is automatically converted into beautiful charts.",
    icon: "BarChart3",
    gradient: "from-teal-500/20 to-teal-600/10",
  },
  {
    id: 7,
    title: "PPTX Export",
    description:
      "One-click export to PowerPoint, PDF, or shareable web link — fully editable.",
    icon: "Download",
    gradient: "from-blue-500/20 to-indigo-600/10",
  },
  {
    id: 8,
    title: "x402 Payment Protection",
    description:
      "AI APIs secured with HTTP 402 payment protocol on Algorand blockchain for pay-per-use billing.",
    icon: "Shield",
    gradient: "from-purple-500/20 to-pink-600/10",
  },
];
