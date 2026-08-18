const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const themeToggle = document.getElementById("theme-toggle");
const themeColor = document.getElementById("theme-color");

function currentTheme() {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("anvilabs-theme", theme);
    if (themeColor) themeColor.setAttribute("content", theme === "light" ? "#efeaf8" : "#07080f");
    if (themeToggle) {
        themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
}

applyTheme(currentTheme());
themeToggle?.addEventListener("click", () => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
});

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
        const id = anchor.getAttribute("href");
        const target = id ? document.querySelector(id) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const progress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${value}%`;
}, { passive: true });

const toast = document.getElementById("toast");
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-on");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-on"), 2800);
}

document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const box = card.getBoundingClientRect();
        const rx = ((event.clientY - box.top) / box.height - 0.5) * -6;
        const ry = ((event.clientX - box.left) / box.width - 0.5) * 6;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    });
});

const canvas = document.getElementById("field");
const ctx = canvas?.getContext("2d");
const dots = [];
function sizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function seedDots() {
    dots.length = 0;
    const count = Math.min(48, Math.floor((window.innerWidth * window.innerHeight) / 28000));
    for (let i = 0; i < count; i += 1) {
        dots.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35
        });
    }
}
let pointer = { x: -9999, y: -9999 };
window.addEventListener("mousemove", (event) => {
    pointer = { x: event.clientX, y: event.clientY };
});
function drawField() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const styles = getComputedStyle(document.documentElement);
    const near = styles.getPropertyValue("--field-near").trim() || "rgba(62, 240, 194, 0.55)";
    const far = styles.getPropertyValue("--field-far").trim() || "rgba(139, 124, 255, 0.26)";
    dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        ctx.beginPath();
        ctx.fillStyle = dist < 140 ? near : far;
        ctx.arc(dot.x, dot.y, dist < 140 ? 2.2 : 1.2, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(drawField);
}
if (canvas && ctx) {
    sizeCanvas();
    seedDots();
    drawField();
    window.addEventListener("resize", () => {
        sizeCanvas();
        seedDots();
    });
}

const labels = {
    tracked: "TrackEd · iOS",
    lab: "anvilabs.com/lab",
    next: "anvilabs.com/next"
};
document.querySelectorAll(".switcher-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.dataset.product;
        document.querySelectorAll(".switcher-btn").forEach((item) => {
            item.classList.toggle("is-active", item === button);
            item.setAttribute("aria-selected", String(item === button));
        });
        document.querySelectorAll(".stage-panel").forEach((panel) => {
            panel.classList.toggle("is-visible", panel.dataset.panel === product);
        });
        const stageLabel = document.getElementById("stage-label");
        if (stageLabel) stageLabel.textContent = labels[product] || "anvilabs";
    });
});

document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("is-active", item === button));
        document.querySelectorAll(".product-card").forEach((card) => {
            const show = filter === "all" || card.dataset.category === filter;
            card.classList.toggle("is-hidden", !show);
        });
    });
});

const shipCopy = [
    {
        kicker: "Stage 01",
        title: "Understand the problem",
        body: "Whether it is an Anvilabs product or an app for you, we start with who will use it and what has to work on day one."
    },
    {
        kicker: "Stage 02",
        title: "Design a useful first version",
        body: "A thin slice a real person can use beats a 40-page deck. Interface, data, and one sharp outcome."
    },
    {
        kicker: "Stage 03",
        title: "Build and put it in people’s hands",
        body: "Code ships. The app gets in front of users. Feedback starts the moment someone can tap."
    },
    {
        kicker: "Stage 04",
        title: "Measure, improve, keep going",
        body: "We iterate on Anvilabs products in our catalog, and we keep custom apps improving with you."
    }
];
const shipDetail = document.getElementById("ship-detail");
document.querySelectorAll(".ship-step").forEach((button) => {
    button.addEventListener("click", () => {
        const index = Number(button.dataset.step || 0);
        document.querySelectorAll(".ship-step").forEach((item) => item.classList.toggle("is-active", item === button));
        const copy = shipCopy[index];
        if (shipDetail && copy) {
            shipDetail.innerHTML = `<p class="mini-kicker">${copy.kicker}</p><h3>${copy.title}</h3><p>${copy.body}</p>`;
        }
    });
});

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}

function parseTask(text) {
    const value = (text || "").trim() || "New study block";
    const lower = value.toLowerCase();
    let when = "Today";
    if (lower.includes("tomorrow")) when = "Tomorrow";
    if (/\d{1,2}(am|pm)/i.test(lower) || /\d{1,2}:\d{2}/.test(lower)) {
        const match = value.match(/(\d{1,2}(?::\d{2})?\s?(?:am|pm)?)/i);
        if (match) when = match[1].toUpperCase();
    }
    if (lower.includes("urgent")) when = "Urgent";
    return { title: value.replace(/\s+urgent$/i, "").trim(), when };
}

const trackerForm = document.getElementById("tracker-form");
const route = document.getElementById("route");
trackerForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("tracking-number");
    const status = document.getElementById("tracker-status");
    const parsed = parseTask(input?.value);
    if (!route) return;
    const item = document.createElement("li");
    item.className = "now";
    item.innerHTML = `<span class="dot"></span><div><strong>${escapeHtml(parsed.title)}</strong><p>Added from natural language</p></div><time>${escapeHtml(parsed.when)}</time>`;
    route.querySelectorAll("li").forEach((row) => row.classList.remove("now"));
    route.prepend(item);
    if (status) status.textContent = `Planned: ${parsed.title}`;
    showToast("TrackEd added it to today’s plan.");
    if (input) input.value = "";
});

route?.addEventListener("click", (event) => {
    const item = event.target.closest("li");
    if (!item) return;
    item.classList.toggle("done");
    item.classList.remove("now");
});

document.getElementById("hero-track-btn")?.addEventListener("click", () => {
    const input = document.getElementById("hero-track-input");
    const list = document.getElementById("hero-pulse");
    if (!list) return;
    const parsed = parseTask(input?.value);
    const item = document.createElement("li");
    item.className = "now";
    item.innerHTML = `<i></i><div><b>${escapeHtml(parsed.title)}</b><span>${escapeHtml(parsed.when)}</span></div>`;
    list.querySelectorAll("li").forEach((row) => row.classList.remove("now"));
    list.prepend(item);
    showToast("Task planned in TrackEd.");
});

const contactForm = document.getElementById("contact-form");
contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.getElementById("form-note");
    if (note) {
        note.hidden = false;
        note.textContent = "Message captured locally. Email contact@anvilabs.com and we will reply.";
    }
    contactForm.reset();
    showToast("Thanks — Anvilabs got your note.");
});
