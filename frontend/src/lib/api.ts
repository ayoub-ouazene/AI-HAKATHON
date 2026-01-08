import { CloudCog } from "lucide-react";

export const API_BASE_URL = "http://localhost:3000/api";

export async function registerFounder(data: any) {
    const formData = new FormData();

    // Append text fields
    Object.keys(data).forEach((key) => {
        if (data[key] !== null && typeof data[key] !== "object") {
            formData.append(key, data[key]);
        }
    });

    // Append files
    if (data.logoUrl) formData.append("logo", data.logoUrl);
    if (data.pitchDeckUrl) formData.append("pitchDeck", data.pitchDeckUrl);
    if (data.cnrcUrl) formData.append("cnrc", data.cnrcUrl);

    const response = await fetch(`${API_BASE_URL}/auth/signup/startup`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to register founder");
    }

    return response.json();
}

export async function registerInvestor(data: any) {
    const response = await fetch(`${API_BASE_URL}/auth/signup/investor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to register investor");
    }

    return response.json();
}

export async function getDeals() {
    const response = await fetch(`${API_BASE_URL}/deals/feed`);
    if (!response.ok) {
        throw new Error("Failed to fetch deals");
    }
    return response.json();
}

export async function getInvestorPortfolio() {
    const response = await fetch(`${API_BASE_URL}/investor/portfolio`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch investor portfolio");
    }

    const data = await response.json();
    console.log("🚀 Debug Service Response:", data); // <--- Added Log
    return data;
}

export async function createInvestmentOffer(data: { fundingRequestId: number, proposedAmount: number, proposedEquity: number }) {
    const token = localStorage.getItem('token');

    // The backend expects: fundingRequestId, proposedAmount, proposedEquity
    // And user ID is extracted from token (req.user.id)

    const response = await fetch(`${API_BASE_URL}/investor/make-offer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create offer");
    }

    return response.json();
}

export async function createFundingRequest(data: { amountRequested: number, equityOffered: number, offerType: "EQUITY" | "ROYALTY" }) {
    const token = localStorage.getItem('token');

    // Convert numbers if they are strings (safeguard)
    const payload = {
        ...data,
        amountRequested: Number(data.amountRequested),
        equityOffered: Number(data.equityOffered)
    };

    const response = await fetch(`${API_BASE_URL}/deals/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to create funding request");
    }

    return response.json();
}

export async function getStartupDashboard() {
    const response = await fetch(`${API_BASE_URL}/startup/dashboard`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch startup dashboard");
    }

    return response.json();
}

export async function respondToInvestmentOffer(offerId: number, status: 'ACCEPTED' | 'REJECTED') {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/startup/offer-respond`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ offerId, status }),
    });

    if (!response.ok) {
        throw new Error("Failed to update offer status");
    }

    return response.json();
}

export async function addFinancialRecord(data: { month: string, revenue: number, costs: number, proofDocument?: File }) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append("month", data.month);
    formData.append("revenue", data.revenue.toString());
    formData.append("costs", data.costs.toString());
    if (data.proofDocument) {
        formData.append("proofDocument", data.proofDocument);
    }

    const response = await fetch(`${API_BASE_URL}/startup/financials`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to add financial record");
    }

    return response.json();
}

export async function generateSlides() {
    const response = await fetch(`${API_BASE_URL}/slides/SlideGenerate`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate slides");
    }

    return response.json();
}
