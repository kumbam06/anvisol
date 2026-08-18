const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    hamburger.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));
});
navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        hamburger?.classList.remove("active");
        hamburger?.setAttribute("aria-expanded", "false");
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#docs") return;
        const target = document.querySelector(href);
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
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-on"), 2800);
}

const themeToggle = document.getElementById("theme-toggle");
const themeColor = document.getElementById("theme-color");
function currentTheme() {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("anvilabs-theme", theme);
    if (themeColor) themeColor.setAttribute("content", theme === "light" ? "#f4f4f5" : "#09090b");
    themeToggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}
applyTheme(currentTheme());
themeToggle?.addEventListener("click", () => applyTheme(currentTheme() === "dark" ? "light" : "dark"));

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
}

const stages = [
    { id: "transit", label: "In Transit", log: "Edge webhook: scan @ origin hub" },
    { id: "delivery", label: "Out for Delivery", log: "Dispatch alert: courier assigned" },
    { id: "delivered", label: "Delivered", log: "ETA engine closed the window" }
];

const simForm = document.getElementById("sim-form");
const simLog = document.getElementById("sim-log");
const simChip = document.getElementById("sim-chip");
const simRun = document.getElementById("sim-run");
let simTimer = 0;

function resetSim() {
    document.querySelectorAll(".tag").forEach((tag) => tag.classList.remove("is-on"));
    if (simChip) {
        simChip.textContent = "Idle";
        simChip.className = "status-chip";
    }
}

function runSimulator(id) {
    window.clearTimeout(simTimer);
    resetSim();
    const trackingId = escapeHtml(id || "ANV-8841-QX");
    if (simLog) simLog.innerHTML = `<li class="mono is-now">Polling ${trackingId}…</li>`;
    if (simChip) {
        simChip.textContent = "Live";
        simChip.className = "status-chip is-run";
    }
    if (simRun) {
        simRun.disabled = true;
        simRun.textContent = "Polling…";
    }
    stages.forEach((stage, index) => {
        simTimer = window.setTimeout(() => {
            document.querySelector(`.tag[data-stage="${stage.id}"]`)?.classList.add("is-on");
            const line = document.createElement("li");
            line.className = "mono is-now";
            line.textContent = `${stage.label} · ${stage.log}`;
            simLog?.querySelectorAll("li").forEach((item) => item.classList.remove("is-now"));
            simLog?.append(line);
            if (index === stages.length - 1) {
                if (simChip) {
                    simChip.textContent = "Delivered";
                    simChip.className = "status-chip is-ok";
                }
                if (simRun) {
                    simRun.disabled = false;
                    simRun.textContent = "Run telemetry";
                }
                showToast("Track Ed completed the telemetry run.");
            }
        }, 900 * (index + 1));
    });
}

function launchDemo() {
    document.getElementById("tracked")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
        const input = document.getElementById("tracking-id");
        runSimulator(input?.value);
    }, 450);
}

simForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    runSimulator(document.getElementById("tracking-id")?.value);
});
document.getElementById("launch-demo")?.addEventListener("click", launchDemo);
document.getElementById("try-tracked")?.addEventListener("click", (event) => {
    event.preventDefault();
    launchDemo();
});

document.getElementById("access-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.getElementById("access-note");
    const email = document.getElementById("access-email");
    if (note) {
        note.hidden = false;
        note.textContent = `You’re on the list${email?.value ? ` as ${email.value}` : ""}. Release notes go out from AnviLabs.`;
    }
    event.target.reset();
    showToast("You’re subscribed to AnviLabs updates.");
});

const docsModal = document.getElementById("docs-modal");
const legalModal = document.getElementById("legal-modal");
const legalTitle = document.getElementById("legal-title");
const legalBody = document.getElementById("legal-body");

function openModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
}
function closeModals() {
    if (docsModal) docsModal.hidden = true;
    if (legalModal) legalModal.hidden = true;
    document.body.style.overflow = "";
}

document.querySelectorAll("[data-open-docs]").forEach((el) => {
    el.addEventListener("click", (event) => {
        event.preventDefault();
        openModal(docsModal);
    });
});

const legal = {
    privacy: {
        title: "Privacy",
        html: "<p>AnviLabs collects the email you submit for product updates. We do not sell personal data. Simulator runs stay in your browser.</p>"
    },
    terms: {
        title: "Terms",
        html: "<p>Track Ed, AnviPulse, and AnviVault are AnviLabs products. The on-site demo is illustrative. Production use requires an AnviLabs workspace.</p>"
    }
};

document.querySelectorAll("[data-open-legal]").forEach((el) => {
    el.addEventListener("click", () => {
        const key = el.getAttribute("data-open-legal");
        const copy = legal[key];
        if (!copy) return;
        if (legalTitle) legalTitle.textContent = copy.title;
        if (legalBody) legalBody.innerHTML = copy.html;
        openModal(legalModal);
    });
});

document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModals);
});
document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModals();
    });
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModals();
});
