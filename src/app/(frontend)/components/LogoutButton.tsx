"use client";

const logout = async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.reload(); // Recharge la page pour supprimer les données user
};

export const LogoutButton = () => (
  <button className="docs" onClick={logout}>
    Logout
  </button>
);
