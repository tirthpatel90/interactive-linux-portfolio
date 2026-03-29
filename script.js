const termInput = document.getElementById('terminal-input');
const ghostText = document.getElementById('ghost-text');
const termHistory = document.getElementById('terminal-history');
const windowContainer = document.getElementById('window-container');

let commandHistory = [];
let historyIndex = -1;

const sections = {
    whoami: {
        title: "About Section",
        content: `<p class="user" style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">Tirth Patel</p>
                  <p>Information Technology student at LDRP Institute of Technology and Research.</p>
                  <br>
                  <p>Interested in Cloud Computing, DevOps, and scalable backend systems.</p>
                  <p>Currently learning AWS, Docker, CI/CD pipelines, and system design.</p>
                  <br>
                  <p>I enjoy building practical projects, exploring new technologies,</p>
                  <p>and improving my problem-solving skills through coding.</p>
                  <br>
                  <p><span class="highlight">Location:</span>India</p>`
    },
    skills: {
        title: "Skills Inventory",
        content: `
<div class="tree-container">
    <pre class="tree-view">
.
├── <span class="highlight">Languages</span>
│   ├── JavaScript
│   ├── HTML/CSS
│   ├── Python
│   ├── C/C++
│   └── SQL
├── <span class="highlight">Frameworks</span>
│   ├── React
│   ├── Node.js
│   └── Flask
├── <span class="highlight">Tools</span>
│   ├── Docker
│   ├── Git/Github
│   ├── Postman
│   └── Github Actions
    </pre>
    <pre class="tree-view">
├── <span class="highlight">Cloud/DevOps</span>
│   ├── AWS
│   ├── Azure
│   ├── Kubernetes
│   ├── CI/CD
│   └── Oracle
├── <span class="highlight">Databases</span>
│   ├── PostgreSQL
│   ├── MySQL
│   ├── SQLite
│   └── Firebase
├── <span class="highlight">Core Concepts</span>
│   ├── Linux Fundamentals
│   ├── Networking Basics
│   ├── OOP
│   └── System Design fundamentals
└── <span class="highlight">Soft Skills</span>
    ├── Communication
    ├── Leadership
    ├── Time Management
    ├── Problem Solving
    └── Collaboration
    </pre>
</div>`
    },
    projects: {
        title: "Deployment Log: Projects",
        content: `
            <div class="project-item">
                <div class="project-item-header">
                    <a href="https://github.com/tirthpatel90/Data-agnostic-MLOps-pipeline" target="_blank" class="highlight project-name">Data Agnostic MLOps Pipeline</a>
                    <span class="project-timeline">Ongoing</span>
                </div>
                <ul class="project-desc">
                    <li>Developed a modular MLOps pipeline designed to automate data ingestion, preprocessing, and model training workflows across multiple data formats (CSV, Excel, JSON).</li>
                    <li>Implemented structured pipeline orchestration with configuration-based execution and designed project architecture following automation and deployment-ready principles aligned with MLOps & DevOps workflows.</li>
                    <li>Structured ML pipeline with future containerization support using docker for reproducible execution.</li>
                </ul>
                <div class="project-stack"><span class="label">Stack:</span> Python, Pandas, NumPy, Scikit-learn, Docker, CI/CD, GitHub Actions</div>
            </div>
            <div class="project-item">
                <div class="project-item-header">
                    <a href="https://github.com/tirthpatel90/DevOps-Utility-" target="_blank" class="highlight project-name">DevOps Utility Hub</a>
                    <span class="project-timeline">March 2026</span>
                </div>
                <ul class="project-desc">
                    <li>Developed a client-side DevOps toolkit with multiple utilities for configuration validation, secrets encoding, and infrastructure helpers.</li>
                    <li>Hosted the application on AWS S3 hosting, demonstrating cloud deployment and lightweight serverless delivery of developer tools.</li>
                </ul>
                <div class="project-stack"><span class="label">Stack:</span> JavaScript, HTML/CSS, AWS S3</div>
            </div>
            <div class="project-item">
                <div class="project-item-header">
                    <a href="https://github.com/tirthpatel90/NAVIQ" target="_blank" class="highlight project-name">NAVIQ – Career Guidance Platform</a>
                    <span class="project-timeline">Dec 2025 – Jan 2026</span>
                </div>
                <ul class="project-desc">
                    <li>Developed a career guidance platform providing structured learning roadmaps, study resources, and interview preparation support for multiple technical roles.</li>
                    <li>Build backend REST APIs using python flask with SQLite database integration for managing career and learning data.</li>
                </ul>
                <div class="project-stack"><span class="label">Stack:</span> Python, React, Flask, SQLite, Tailwind CSS</div>
            </div>
            <div class="project-item">
                <div class="project-item-header">
                    <a href="https://github.com/tirthpatel90/Travel-Management-system-" target="_blank" class="highlight project-name">Travel Management System</a>
                    <span class="project-timeline">Oct 2025 – Dec 2025</span>
                </div>
                <ul class="project-desc">
                    <li>Developed a backend web app using JavaScript to manage tours, hotels, and booking workflows through RESTful APIs.</li>
                    <li>Implemented role-based control for secure user and admin operations and integrated SQLite database schemas to handle booking, user data, and travel management operations efficiently.</li>
                </ul>
                <div class="project-stack"><span class="label">Stack:</span> JavaScript, Node.js, SQLite, JWT Authentication, RESTful APIs</div>
            </div>`
    },
    experience: {
        title: "SysLog: Experience",
        content: `
            <div class="experience-item">
                <div class="experience-header">
                    <span class="experience-title">Microsoft Azure Intern</span>
                    <span class="experience-timeline">Jan 2026 – Feb 2026</span>
                </div>
                <div class="experience-sub-header">
                    <span class="experience-company">Microsoft India × AICTE</span>
                    <span class="experience-location">Remote</span>
                </div>
                <ul class="experience-bullets">
                    <li>Completed a 4-week industry focused on Microsoft Azure cloud services fundamentals.</li>
                    <li>Gained exposure to cloud computing concepts including virtual machines, storage, networking, and deployment models.</li>
                    <li>Developed foundational understanding of cloud architecture, resource provisioning, and enterprise cloud environment using Microsoft Azure Portal.</li>
                </ul>
            </div>`
    },
    connect: {
        title: "LinkLayer: Connect",
        content: `
            <p style="margin-bottom: 15px;">Establish a secure connection. Send a message directly to my inbox.</p>
            <form id="connect-form" class="contact-form" action="https://formspree.io/f/xojkvlba" method="POST">
                <div class="form-group">
                    <label for="full-name">Name</label>
                    <input type="text" id="full-name" name="name" placeholder="Your name" required spellcheck="false">
                </div>
                <div class="form-group">
                    <label for="email-addr">Email</label>
                    <input type="email" id="email-addr" name="email" placeholder="name@gmail.com" required spellcheck="false" 
                           pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" 
                           title="Please enter a valid email address (e.g. user@gmail.com)">
                </div>
                <div class="form-group">
                    <label for="msg-body">Message</label>
                    <textarea id="msg-body" name="message" required spellcheck="false">I'd like to connect with you!</textarea>
                </div>
                <button type="submit" class="send-btn">
                    <i class="fas fa-paper-plane"></i> Transmit Message
                </button>
                <div id="form-status" class="form-status"></div>
            </form>
        `
    }
};

const commands = ['whoami', 'skills', 'projects', 'experience', 'connect', 'resume', 'help', 'clear', 'ls'];

// Input Handling
// Initial cursor state
updateCursor();


termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value.toLowerCase() || ghostText.innerText;
        
        if (cmd && cmd.trim()) {
            // Add to history if not empty and not the same as last command
            if (commandHistory[commandHistory.length - 1] !== cmd) {
                commandHistory.push(cmd);
            }
            historyIndex = commandHistory.length;
        }
        
        executeCommand(cmd);
        termInput.value = '';
        ghostText.innerText = '';
    } else if (e.key === 'ArrowUp') {
        if (commandHistory.length > 0) {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
            }
            termInput.value = commandHistory[historyIndex];
            updateCursor();
        }
    } else if (e.key === 'ArrowDown') {
        if (commandHistory.length > 0) {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                termInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                termInput.value = '';
            }
            updateCursor();
        }
    }
});

// Update ghost text for blinking cursor
function updateCursor() {
    const val = termInput.value;
    const match = commands.find(c => c.startsWith(val.toLowerCase()));

    if (val && match) {
        // match.slice(val.length) is the suggestion
        ghostText.innerHTML = `${val.replace(/ /g, '&nbsp;')}<span class="cursor-block"></span><span class="suggestion">${match.slice(val.length)}</span>`;
    } else {
        ghostText.innerHTML = `${val.replace(/ /g, '&nbsp;')}<span class="cursor-block"></span>`;
    }
}

termInput.addEventListener('input', updateCursor);
termInput.addEventListener('keydown', updateCursor);


function executeCommand(cmd) {
    if (!cmd) return;

    // Add to history
    const log = document.createElement('div');
    log.innerHTML = `<span class="user">tirth@linux</span>:<span class="path">~</span>$ <span class="highlight">${cmd}</span>`;
    termHistory.appendChild(log);

    if (sections[cmd]) {
        openSection(cmd);
    } else if (cmd === 'resume') {
        const output = document.createElement('div');
        output.className = 'output';
        output.innerHTML = `<span class="highlight">Opening Resume.pdf...</span>`;
        termHistory.appendChild(output);
        window.open('Resume.pdf', '_blank');
    } else if (cmd === 'clear') {
        termHistory.innerHTML = '';
    } else if (cmd === 'help' || cmd === 'ls') {
        const output = document.createElement('div');
        output.className = 'output';
        output.innerHTML = `Available commands: <br>${commands.join(', ')}`;
        termHistory.appendChild(output);
    } else {
        const output = document.createElement('div');
        output.className = 'output';
        output.innerHTML = `Command not found: ${cmd}. Type 'help' for options.`;
        termHistory.appendChild(output);
    }

    // Auto-scroll
    const body = document.getElementById('main-terminal-body');
    body.scrollTop = body.scrollHeight;
}

function openSection(slug) {
    const data = sections[slug];
    if (!data) return;

    // Remove existing if any
    const existing = document.getElementById(`window-${slug}`);
    if (existing) {
        focusWindow(slug);
        return;
    }

    const win = document.createElement('div');
    win.className = 'terminal-window spawned-window';
    win.id = `window-${slug}`;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        win.style.left = '0px';
        win.style.top = '0px';
    } else {
        win.style.left = `${50 + Math.random() * 100}px`;
        win.style.top = `${50 + Math.random() * 100}px`;
    }
    win.style.zIndex = getTopZIndex() + 1;

    win.innerHTML = `
        <div class="terminal-header">
            <div class="header-buttons">
                <span class="btn red"></span>
                <span class="btn yellow"></span>
                <span class="btn green"></span>
            </div>
            <div class="header-title">${data.title}</div>
        </div>
        <div class="terminal-body">${data.content}</div>
    `;

    // Add event listeners instead of inline attributes
    const header = win.querySelector('.terminal-header');
    header.addEventListener('mousedown', () => focusWindow(slug));

    win.querySelector('.btn.red').addEventListener('click', () => closeWindow(slug));
    win.querySelector('.btn.yellow').addEventListener('click', () => minimizeWindow(slug));
    win.querySelector('.btn.green').addEventListener('click', () => maximizeWindow(slug));

    windowContainer.appendChild(win);
    makeDraggable(win);

    if (slug === 'connect') {
        initConnectForm();
    }
}

function initConnectForm() {
    const form = document.getElementById('connect-form');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const email = data.get('email');
        const status = document.getElementById('form-status');

        // Strict Email Validation Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            status.textContent = "✗ Please enter a valid email address.";
            status.className = "form-status error";
            return;
        }

        const submitBtn = form.querySelector('.send-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.textContent = "✓ Message transmitted successfully!";
                status.className = "form-status success";
                form.reset();
            } else {
                const result = await response.json();
                status.textContent = "✗ Transmission failed: " + (result.errors?.[0]?.message || "Unknown error");
                status.className = "form-status error";
            }
        } catch (error) {
            status.textContent = "✗ Connection error. Please try again.";
            status.className = "form-status error";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Transmit Message';
        }
    };
}

function closeWindow(slug) {
    document.getElementById(`window-${slug}`).remove();
}

function maximizeWindow(slug) {
    const win = document.getElementById(`window-${slug}`);
    win.classList.toggle('maximized');
}

function minimizeWindow(slug) {
    const win = document.getElementById(`window-${slug}`);
    if (win.classList.contains('maximized')) {
        win.classList.remove('maximized');
    } else {
        win.classList.toggle('collapsed');
    }
}

function focusWindow(slug) {
    const win = document.getElementById(`window-${slug}`);
    if (win) win.style.zIndex = getTopZIndex() + 1;
}

function getTopZIndex() {
    const windows = document.querySelectorAll('.terminal-window');
    let max = 10;
    windows.forEach(w => {
        const z = parseInt(w.style.zIndex);
        if (z > max) max = z;
    });
    return max;
}

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = el.querySelector('.terminal-header');

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.closest('.header-buttons')) return; // Don't drag if clicking buttons

        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Disable transition while dragging for performance and to prevent fighting
        el.style.transition = 'none';

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        // Touch events
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;

        focusWindow(el.id.replace('window-', ''));
    }

    header.ontouchstart = dragMouseDown;

    function elementDrag(e) {
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;

        // Only drag if not maximized
        if (!el.classList.contains('maximized')) {
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        // Re-enable transition after drag
        el.style.transition = '';
    }
}

// Initial focus
document.addEventListener('DOMContentLoaded', runBootSequence);

async function runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const messages = [
        "Initializing system...",
        "Loading modules...",
        "Establishing secure connection...",
        "Welcome to Tirth's terminal"
    ];

    for (const msg of messages) {
        const line = document.createElement('div');
        line.textContent = msg;
        bootText.appendChild(line);
        await new Promise(resolve => setTimeout(resolve, 800));
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    bootScreen.classList.add('fade-out');
    document.body.classList.add('booted');

    // Focus terminal after sequence
    setTimeout(() => {
        termInput.focus();
        updateCursor();
    }, 1000);
}

document.addEventListener('click', (e) => {
    // Only focus terminal if clicking on the background/desktop or non-interactive elements
    const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A'];
    if (!interactiveTags.includes(e.target.tagName)) {
        termInput.focus();
    }
});
termInput.focus();
