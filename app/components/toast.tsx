export function showToast(message: string, durationMs: number = 1800) {
  if (typeof window === "undefined") return;
  const existing = document.querySelector(".x-toast");
  if (existing) existing.remove();

  const el = document.createElement("div");
  el.className = "x-toast";
  el.textContent = message;
  document.body.appendChild(el);

  el.offsetHeight;
  el.classList.add("show");

  window.setTimeout(() => {
    el.classList.remove("show");
    window.setTimeout(() => el.remove(), 300);
  }, durationMs);
}


