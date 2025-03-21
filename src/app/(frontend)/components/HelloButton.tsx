"use client";

const sayHi = async () => {
  let res = await fetch("/api/hello", { method: "GET" });
  res = await res.json();
  console.log(res);
};

export const HelloButton = () => (
  <button className="docs" onClick={sayHi}>
    Get Hello
  </button>
);
