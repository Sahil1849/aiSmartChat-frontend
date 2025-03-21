import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    return (
        <footer className="fixed bottom-0 w-full z-50">
            <div className="absolute inset-0 bg-blue-900" style={{
                backgroundImage: 'radial-gradient(circle at center, rgba(30, 64, 175, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)',
            }} />
            
            <div className="relative border-t border-blue-500/20 backdrop-blur-sm">
                <div className="max-w-full mx-auto px-6 py-2 flex justify-between items-center">
                    {/* Left Side - Copyright */}
                    <div className="flex items-center gap-2 text-gray-400">
                        <span>&copy; {currentYear}</span>
                        <span className="text-white font-medium">Sahil Bankar.</span>
                        <span>All Rights Reserved</span>
                    </div>

                    {/* Right Side - Version & Upcoming Version Link */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400">Version 1.0</span>
                        <div className="h-4 w-px bg-blue-500/20" />
                        <button
                            onClick={() => navigate("/upcoming-features")}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                            <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-blue-900/50 text-white transition-all duration-300 group-hover:border-blue-500/40">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <span>Upcoming Version</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;