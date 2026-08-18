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
    dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        ctx.beginPath();
        ctx.fillStyle = dist < 140 ? "rgba(46, 230, 166, 0.55)" : "rgba(124, 92, 255, 0.28)";
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
    tracked: "track-ed.app",
    lab: "anvisol.studio/lab",
    next: "anvisol.studio/next"
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
        if (stageLabel) stageLabel.textContent = labels[product] || "anvisol";
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
        title: "Own the problem",
        body: "We do not take random client briefs as the core business. We pick problems Anvisol can operate for years — then we productize the solution."
    },
    {
        kicker: "Stage 02",
        title: "Design the smallest useful product",
        body: "A thin slice that a real person can use beats a 40-page proposal. Interface, data, and one sharp outcome."
    },
    {
        kicker: "Stage 03",
        title: "Build, upload, and put it in front of people",
        body: "Code ships. The product gets a public surface. Feedback starts the moment someone can click."
    },
    {
        kicker: "Stage 04",
        title: "Measure, iterate, then stack the next app",
        body: "We keep the products we launch. Improvements go into the same catalog, and the studio starts the next title."
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

function stamp(hoursAgo) {
    const date = new Date(Date.now() - hoursAgo * 3600 * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function runTrace(statusEl, items) {
    if (statusEl) statusEl.textContent = "Tracing route…";
    items.forEach((item) => item.classList.remove("done", "now"));
    const times = [30, 18, 8, 3, 0];
    items.forEach((item, index) => {
        window.setTimeout(() => {
            items.forEach((row) => row.classList.remove("now"));
            item.classList.add("done", "now");
            const time = item.querySelector("time");
            if (time) time.textContent = stamp(times[index] || 0);
            if (index === items.length - 1) {
                item.classList.remove("now");
                if (statusEl) statusEl.textContent = "Route complete · delivered";
                showToast("Track Ed finished the trace.");
            }
        }, 420 * (index + 1));
    });
}

const trackerForm = document.getElementById("tracker-form");
trackerForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.getElementById("tracker-status");
    const items = [...document.querySelectorAll("#route li")];
    runTrace(status, items);
});

document.getElementById("hero-track-btn")?.addEventListener("click", () => {
    const items = [...document.querySelectorAll("#hero-pulse li")];
    items.forEach((item) => item.classList.remove("done", "now"));
    items.forEach((item, index) => {
        window.setTimeout(() => {
            items.forEach((row) => row.classList.remove("now"));
            item.classList.add("done", "now");
            if (index === items.length - 1) showToast("Hero trace complete.");
        }, 280 * (index + 1));
    });
});

const contactForm = document.getElementById("contact-form");
contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.getElementById("form-note");
    if (note) {
        note.hidden = false;
        note.textContent = "Message captured locally. Email contact@anvisol.in and we will reply.";
    }
    contactForm.reset();
    showToast("Thanks — Anvisol got your note.");
});
