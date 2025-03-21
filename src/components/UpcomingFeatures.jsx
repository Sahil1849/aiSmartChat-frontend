import React from "react";
import { useNavigate } from "react-router-dom";

const upcomingFeatures = [
    {
        title: "Google Authentication",
        description: "Speak to AI and get instant responses via voice.",
    },
    {
        title: "Chats will be Stored in Database",
        description: "Adjust AI responses to be formal, casual, or humorous.",
    },
    {
        title: "Messages Notifications",
        description: "Chat with AI in multiple languages fluently.",
    },
    {
        title: "Email Verification with OTP",
        description: "AI can now take voice calls and assist users in real-time.",
    },
    {
        title: "Users Profile with Avatar's",
        description: "AI can now take voice calls and assist users in real-time.",
    },
    {
        title: "Project Settings",
        description: "AI can now take voice calls and assist users in real-time.",
    },
    {
        title: "Forgot Password and Reset Password",
        description: "AI can now take voice calls and assist users in real-time.",
    },
];

const UpcomingFeatures = () => {

    const navigate = useNavigate();
    return (
        <div className="min-h-screen space-y-4 bg-black text-white flex flex-col items-center py-12">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-blue-800 mb-8">
                🚀 Upcoming Features in AI Smart Chat
            </h1>

            {/* Features Container */}
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
                {upcomingFeatures.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 bg-blue-900/80 border border-blue-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        <h2 className="text-xl font-semibold">{feature.title}</h2>
                        <p className="text-gray-300 mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center gap-4">
                <p className="text-gray-400 text-sm mt-10">
                    Stay tuned for more updates! 🚀
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-4 py-2 border-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-md">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default UpcomingFeatures;
