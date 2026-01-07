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
    if (data.logoUrl) formData.append("logoUrl", data.logoUrl);
    if (data.pitchDeckUrl) formData.append("pitchDeckUrl", data.pitchDeckUrl);
    if (data.cnrcUrl) formData.append("cnrcUrl", data.cnrcUrl);

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
