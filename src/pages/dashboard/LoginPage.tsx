import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
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
            Dashboard Login
          </h1>
          <p className="text-gray-400">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {/* Login Card */}
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
                  placeholder="password"
                />

              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">

              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>


        </div>
      </motion.div>
    </div>);

}