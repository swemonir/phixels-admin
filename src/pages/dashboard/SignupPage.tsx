import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';
import { authApi } from '../../services/api';

export function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const response = await authApi.signup({ name, email, password });
            if (response && response.token) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setSuccess('Account created successfully! Please login to continue.');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Signup failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[color:var(--deep-navy)] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[color:var(--deep-red)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"
                    style={{
                        animationDelay: '1s'
                    }} />

            </div>

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                className="w-full max-w-md relative z-10">

                {/* Logo */}
                <div className="text-center mb-8">
                    <img
                        src="/Phixels-Logo.svg"
                        alt="Phixels"
                        className="h-12 w-auto mx-auto mb-4" />

                    <h1 className="text-3xl font-bold text-white mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-400">
                        Sign up to access the admin panel
                    </p>
                </div>

                {/* Signup Card */}
                <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error &&
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3">

                                <AlertCircle className="text-red-500" size={20} />
                                <span className="text-sm text-red-500">{error}</span>
                            </motion.div>
                        }

                        {success &&
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">

                                <CheckCircle className="text-green-500" size={20} />
                                <span className="text-sm text-green-500">{success}</span>
                            </motion.div>
                        }

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium">Full Name</label>
                            <div className="relative">
                                <User
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20} />

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium">Email</label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20} />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                                    placeholder="admin@phixels.io"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20} />

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20} />

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !!success}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">

                            {isLoading ? 'Creating Account...' : success ? 'Redirecting...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[color:var(--bright-red)] hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>);
}
