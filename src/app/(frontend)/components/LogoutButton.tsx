"use client";

const logout = async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.reload(); // Recharge la page pour supprimer les données user
};

export const LogoutButton = () => (
  <button
    className="rounded-sm border-1 px-4 hover:bg-white hover:text-black cursor-pointer m-2"
    onClick={logout}
  >
    Logout
  </button>
);
