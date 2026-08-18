const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const themeToggle = document.getElementById("theme-toggle");
const themeColor = document.getElementById("theme-color");

function currentTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("anvilabs-theme", theme);
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#111318" : "#FAFCFC");
    themeToggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

applyTheme(currentTheme());
themeToggle?.addEventListener("click", () => applyTheme(currentTheme() === "dark" ? "light" : "dark"));

const burger = document.querySelector(".burger");
const links = document.querySelector(".links");
burger?.addEventListener("click", () => {
    const open = links?.classList.toggle("is-open");
    burger.classList.toggle("active", Boolean(open));
    burger.setAttribute("aria-expanded", String(Boolean(open)));
});
links?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        links.classList.remove("is-open");
        burger?.classList.remove("active");
        burger?.setAttribute("aria-expanded", "false");
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const toast = document.getElementById("toast");
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-on");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-on"), 2600);
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
}

function parseTask(text) {
    const value = (text || "").trim() || "New study block";
    const lower = value.toLowerCase();
    let when = "Today";
    if (lower.includes("tomorrow")) when = "Tomorrow";
    if (lower.includes("all day")) when = "All day";
    if (lower.includes("urgent")) when = "Urgent";
    const time = value.match(/(\d{1,2}(?::\d{2})?\s?(?:am|pm))/i);
    if (time) when = `${when === "Today" ? "" : `${when} · `}${time[1].toUpperCase()}`.replace(/^ · /, "");
    const title = value
        .replace(/\b(tomorrow|today|urgent|all day)\b/gi, "")
        .replace(/\b\d{1,2}(?::\d{2})?\s?(?:am|pm)\b/gi, "")
        .replace(/\s+/g, " ")
        .trim() || value;
    return { title, when };
}

const planForm = document.getElementById("plan-form");
const taskList = document.getElementById("task-list");
planForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("plan-input");
    const parsed = parseTask(input?.value);
    const item = document.createElement("li");
    item.innerHTML = `<b>${escapeHtml(parsed.title)}</b><span>${escapeHtml(parsed.when)}</span>`;
    taskList?.prepend(item);
    showToast("Added to today’s planner.");
});

const WORK = 25 * 60;
const BREAK = 5 * 60;
let remaining = WORK;
let ticking = 0;
let onBreak = false;
const face = document.getElementById("timer-face");
const startBtn = document.getElementById("timer-start");
const note = document.getElementById("timer-note");

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function paintTimer() {
    if (face) face.textContent = formatTime(remaining);
}

function stopTick() {
    window.clearInterval(ticking);
    ticking = 0;
    if (startBtn) startBtn.textContent = "Start";
}

startBtn?.addEventListener("click", () => {
    if (ticking) {
        stopTick();
        return;
    }
    startBtn.textContent = "Pause";
    ticking = window.setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
            onBreak = !onBreak;
            remaining = onBreak ? BREAK : WORK;
            if (note) {
                note.textContent = onBreak
                    ? "Break · 5 minutes. Stretch, then start another block."
                    : "Work block · 25 minutes, then a break.";
            }
            showToast(onBreak ? "Break time." : "Back to a focus block.");
        }
        paintTimer();
    }, 1000);
});

document.getElementById("timer-reset")?.addEventListener("click", () => {
    stopTick();
    onBreak = false;
    remaining = WORK;
    paintTimer();
    if (note) note.textContent = "Work block · 25 minutes, then a break.";
});

document.getElementById("id-card")?.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("is-back");
});

document.getElementById("mail-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const mail = document.getElementById("mail");
    const status = document.getElementById("mail-note");
    if (status) {
        status.hidden = false;
        status.textContent = `Saved${mail?.value ? ` for ${mail.value}` : ""}. We’ll send Track Ed notes only.`;
    }
    event.target.reset();
    showToast("You’re on the Track Ed notes list.");
});
