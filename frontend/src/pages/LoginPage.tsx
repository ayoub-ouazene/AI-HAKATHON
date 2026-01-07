import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await auth.login(formData.email, formData.password);

            // Update context
            // Note: UserContext currently handles type, but not full user object. 
            // We pass the type we got back.
            login(response.user.type, response.token);

            toast.success(`Welcome back, ${response.user.name}`);

            // Route based on user type
            if (response.user.type === 'startup') {
                navigate("/startup/dashboard");
            } else if (response.user.type === 'investor') {
                navigate("/investor/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to sign in");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Interaction Area (40%) */}
            <div className="flex w-full flex-col justify-center px-8 lg:w-[40%] xl:px-24">
                <div className="mx-auto w-full max-w-sm">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
                            Welcome back.
                        </h1>
                        <p className="mt-2 text-neutral-500">
                            Please enter your details to access the vault.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Email Input */}
                            <div className="group relative">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className={`w-full border-b bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-neutral-400 
                    ${errors.email ? 'border-red-500' : 'border-neutral-200 focus:border-neutral-900'}`}
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        if (errors.email) setErrors({ ...errors, email: "" });
                                    }}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="group relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`w-full border-b bg-transparent pb-2 text-lg outline-none transition-colors placeholder:text-neutral-400
                    ${errors.password ? 'border-red-500' : 'border-neutral-200 focus:border-neutral-900'}`}
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        if (errors.password) setErrors({ ...errors, password: "" });
                                    }}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-4">
                            <Button
                                type="submit"
                                className="h-12 w-full rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-medium"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-neutral-100" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-neutral-400">Or continue with</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-12 w-full rounded-full border-neutral-200 hover:bg-neutral-50"
                                onClick={() => toast.info("Google Sign In not implemented yet")}
                            >
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign in with Google
                            </Button>
                        </div>
                    </form>

                    {/* Footer Link */}
                    <p className="mt-8 text-center text-sm text-neutral-500">
                        Don't have an account?{" "}
                        <a href="/" className="font-medium text-neutral-900 underline underline-offset-4 hover:text-black">
                            Apply for Access
                        </a>
                    </p>
                </div>
            </div>

            {/* Right Side - Visual Area (60%) */}
            <div className="hidden lg:flex w-[60%] bg-zinc-50 relative overflow-hidden items-center justify-center">
                <img
                    src="/src/assets/login-visual.png"
                    alt="Abstract minimalist architecture"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
            </div>
        </div>
    );
};

export default LoginPage;
