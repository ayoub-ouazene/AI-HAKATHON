export interface Startup {
    id: string;
    name: string;
    logo: string;
    oneLiner: string;
    pitch: string;
    tags: string[];
    ask: string;
    equity: string;
    valuation: string;
    minTicket: string;
    committed: number; // percentage
    verified: boolean;

    // Risk & Analysis
    riskLevel: "Low" | "Moderate" | "High";
    riskScore: number; // 0-100
    riskAnalysis: string;

    // Detailed Content
    videoUrl: string;
    slides: { url: string; title: string; bolt: string }[];
    problem: string;
    solution: string;
    marketTraction: { label: string; value: string }[];
    team: { name: string; role: string; bio: string; avatar: string }[];
}

export const STARTUPS: Startup[] = [
    {
        id: "agriflow",
        name: "AgriFlow",
        logo: "AF",
        oneLiner: "AI-driven irrigation for arid climates",
        pitch: "AgriFlow utilizes low-cost IoT sensors combined with a proprietary AI model to predict micro-climate changes and soil moisture needs in real-time, reducing water usage by up to 35%.",
        tags: ["AgriTech", "Seed", "AI"],
        ask: "15,000,000 DZD",
        equity: "7%",
        valuation: "200M DZD",
        minTicket: "500k DZD",
        committed: 65,
        verified: true,
        riskLevel: "Low",
        riskScore: 85,
        riskAnalysis: "Strong traction with 120+ active farms. Technology is patent-pending. Main risk is hardware supply chain dependencies.",
        videoUrl: "https://images.unsplash.com/photo-1625246333195-bfca7ca46c07?q=80&w=2000&auto=format&fit=crop",
        slides: [
            {
                url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop",
                title: "The Water Crisis",
                bolt: "70% of freshwater is wasted in current irrigation methods."
            },
            {
                url: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2000&auto=format&fit=crop",
                title: "Our Solution: Smart Sensors",
                bolt: "IoT sensors provide real-time soil moisture data at 1/10th the cost."
            },
            {
                url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000&auto=format&fit=crop",
                title: "Impact & Growth",
                bolt: "Verified 35% water savings and 20% yield increase in pilots."
            }
        ],
        problem: "Current irrigation systems are wasteful, accounting for 70% of freshwater usage while losing 40% to evaporation and inefficiencies. Farmers in arid regions struggle to optimize water usage without expensive, complex infrastructure.",
        solution: "A plug-and-play IoT system that retrofits existing pumps. Our AI verified by University of Algiers pilot program demonstrated 20% yield increase alongside water savings.",
        marketTraction: [
            { label: "Farms Deployed", value: "120+" },
            { label: "MRR", value: "$40k" }
        ],
        team: [
            {
                name: "Amine Khelil",
                role: "CEO & Co-Founder",
                bio: "PhD in Agronomy from ENSA. 10 years experience in precision agriculture.",
                avatar: "https://i.pravatar.cc/150?u=amine"
            },
            {
                name: "Sarah Bouzid",
                role: "CTO",
                bio: "Ex-Google AI Researcher. Specialist in edge computing and IoT sensor networks.",
                avatar: "https://i.pravatar.cc/150?u=sarah"
            },
            {
                name: "Karim Ouali",
                role: "Head of Operations",
                bio: "Supply chain expert dealing with hardware manufacturing in Shenzhen and Algiers.",
                avatar: "https://i.pravatar.cc/150?u=karim"
            }
        ]
    },
    {
        id: "paydz",
        name: "PayDz",
        logo: "PZ",
        oneLiner: "Stripe for North Africa",
        pitch: "Next-gen payment gateway offering seamless integration for local e-commerce platforms with support for CIB, Edahabia, and mobile wallets.",
        tags: ["Fintech", "Series A"],
        ask: "50,000,000 DZD",
        equity: "10%",
        valuation: "500M DZD",
        minTicket: "2M DZD",
        committed: 40,
        verified: true,
        riskLevel: "Moderate",
        riskScore: 65,
        riskAnalysis: "High regulatory barrier to entry which they have cleared, but facing stiff competition from legacy banking solutions.",
        videoUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2000&auto=format&fit=crop",
        slides: [
            {
                url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop",
                title: "Fragmented Payments",
                bolt: "Merchants struggle with multiple disjointed payment providers."
            },
            {
                url: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2000&auto=format&fit=crop",
                title: "Unified API",
                bolt: "One simple API integration for CIB, Edahabia, and cash."
            },
            {
                url: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2000&auto=format&fit=crop",
                title: "Market Opportunity",
                bolt: "$2B processed volume in the first year of operation."
            }
        ],
        problem: "E-commerce abandonment rate in Algeria is 60% due to payment friction. Merchants lack reliable, developer-friendly APIs to accept digital payments.",
        solution: "Unified API for all local payment methods. Instant onboarding for merchants and same-day settlement.",
        marketTraction: [
            { label: "Process Volume", value: "2B DZD" },
            { label: "Merchants", value: "500+" }
        ],
        team: [
            {
                name: "Yacine Brahimi",
                role: "CEO",
                bio: "Serial fintech entrepreneur. Previously sold mobile wallet startup to international bank.",
                avatar: "https://i.pravatar.cc/150?u=yacine"
            },
            {
                name: "Nadia Mansouri",
                role: "VP Engineering",
                bio: "15 years building high-frequency trading systems in London.",
                avatar: "https://i.pravatar.cc/150?u=nadia"
            }
        ]
    },
    {
        id: "medilink",
        name: "MediLink",
        logo: "ML",
        oneLiner: "Telemedicine for rural access",
        pitch: "Connecting patients in remote wilayas with specialist doctors in Algiers and Oran via secure video consultations.",
        tags: ["Health", "Pre-Seed"],
        ask: "8,000,000 DZD",
        equity: "5%",
        valuation: "160M DZD",
        minTicket: "200k DZD",
        committed: 20,
        verified: true,
        riskLevel: "High",
        riskScore: 45,
        riskAnalysis: "Pre-revenue stage. Regulatory framework for telemedicine is still evolving. User adoption in target demographic is unproven.",
        videoUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop",
        slides: [
            {
                url: "https://images.unsplash.com/photo-1576091160550-2187580023f7?q=80&w=2000&auto=format&fit=crop",
                title: "Healthcare Divide",
                bolt: "Rural patients travel 300km on average for basic care."
            },
            {
                url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2000&auto=format&fit=crop",
                title: "Virtual Clinics",
                bolt: "Partnering with local pharmacies to create connectivity hubs."
            },
            {
                url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
                title: "Scalable Model",
                bolt: "Waitlist of 2k+ patients and 50 specialist doctors."
            }
        ],
        problem: "Specialist density is 10x lower in southern regions compared to the north. Patients travel an average of 300km for basic consultations.",
        solution: "Mobile-first platform optimized for 3G networks. Partnership with Algérie Télécom to provide connectivity hubs in clinics.",
        marketTraction: [
            { label: "Waitlist", value: "2k+" },
            { label: "Doctors Onboarded", value: "50" }
        ],
        team: [
            {
                name: "Dr. Ahmed Saadi",
                role: "Founder",
                bio: "Cardiologist practicing in Tamanrasset for 20 years. Deep user empathy.",
                avatar: "https://i.pravatar.cc/150?u=ahmed"
            },
            {
                name: "Leila Benali",
                role: "Product Lead",
                bio: "Built health-tech products for NGOs in West Africa.",
                avatar: "https://i.pravatar.cc/150?u=leila"
            }
        ]
    }
];
