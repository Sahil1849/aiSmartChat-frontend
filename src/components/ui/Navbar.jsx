import React from "react";
import { Brain, Loader2, LogOut, UserRoundX } from "lucide-react";
import { useLogout } from "../../hooks/auth/useLogout";
import { useDeleteUserAccount } from "../../hooks/users/useDeleteUserAccount";
import { useCurrentUser } from "../../hooks/users/useCurrentUser";

const Navbar = () => {
  const { mutate: logoutUser, isLoading: isLoggingOut } = useLogout();
  const { deleteAccount, isdeletingAccount } = useDeleteUserAccount();
  const userId = localStorage.getItem("userId");
  const { data: userData } = useCurrentUser(userId);
  const userEmail = userData?.email;

  const handleLogout = () => logoutUser();
  const handleDeleteAccount = () => deleteAccount(userId);

  return (
    <nav className="fixed w-full z-50">
      <div
        className="absolute inset-0 bg-blue-800/95"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(30, 64, 175, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)",
        }}
      />

      <div className="relative border-b border-blue-500/20 backdrop-blur-sm">
        <div className="max-w-full mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {userEmail?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-lg font-medium text-white">
              Welcome, <span className="text-blue-400">{userEmail}</span>
            </h1>
          </div>

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl text-white flex items-center gap-2 font-bold">
            AI-SmartChat
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-800/30 rounded-full blur-lg transform group-hover:scale-110 transition-transform duration-300" />
              <Brain className="relative text-blue-400 transform group-hover:scale-110 transition-all duration-300" />
            </div>
          </h1>

          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group relative"
            >
              <div className="absolute inset-0 bg-blue-800/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/20 backdrop-blur-sm bg-blue-900/50 text-white transition-all duration-300 group-hover:border-blue-500/40">
                <LogOut size={18} />
                {isLoggingOut ? (
                  <span className="flex items-center gap-2">
                    Logging out
                    <div className="flex space-x-1">
                      <div
                        className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </span>
                ) : (
                  "Logout"
                )}
              </div>
            </button>

            <button
              onClick={handleDeleteAccount}
              disabled={isdeletingAccount}
              className="group relative"
            >
              <div className="absolute inset-0 bg-red-900/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 backdrop-blur-sm bg-red-900/30 text-white transition-all duration-300 group-hover:border-red-500/40">
                {isdeletingAccount ? (
                  <span className="flex items-center gap-2">
                    Deleting
                    <div className="flex space-x-1">
                      <div
                        className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </span>
                ) : (
                  <>
                    Delete Account
                    <UserRoundX size={18} />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
