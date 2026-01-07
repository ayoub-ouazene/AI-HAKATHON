import { API_BASE_URL } from "./api";

export interface LoginResponse {
    user: {
        id: string;
        email: string;
        type: 'startup' | 'investor';
        name: string;
    };
    token: string;
}

export const auth = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Invalid credentials");
            }

            // Normalize backend response (role: 'STARTUP' | 'INVESTOR') to frontend type ('startup' | 'investor')
            // Backend login response: { token, user: { id, role, email } }
            const type = data.user.role === 'STARTUP' ? 'startup' : 'investor';

            // Store token for persistence (UserContext also does this, but good to have raw data)
            localStorage.setItem('token', data.token);

            return {
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    type: type,
                    name: data.user.name || (type === 'startup' ? "Founder" : "Investor") // Backend login doesn't always return name
                },
                token: data.token
            };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },
};
