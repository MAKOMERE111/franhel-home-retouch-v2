import { createRoot } from "react-dom/client";
import HouseExperience from "./HouseExperience";

function mount() {
  const el = document.getElementById("three-house-root");
  if (!el || el.dataset.mounted === "true") return;

  let initialClient = null;
  try {
    const raw = el.dataset.client;
    initialClient = raw && raw !== "null" ? JSON.parse(raw) : null;
  } catch (e) {
    initialClient = null;
  }

  el.dataset.mounted = "true";
  createRoot(el).render(<HouseExperience initialClient={initialClient} />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}

// Turbo Drive caches and restores pages; re-mount on each visit so the
// canvas isn't left stale after a back/forward navigation.
document.addEventListener("turbo:load", mount);
