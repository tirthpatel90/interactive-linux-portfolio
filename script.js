// Sync and apply active theme instantly during loading to prevent visual flashes
const savedTheme = localStorage.getItem('tirth-portfolio-theme') || 'dracula';
document.body.classList.add(`theme-${savedTheme}`);

const termInput = document.getElementById('terminal-input');
const ghostText = document.getElementById('ghost-text');
const termHistory = document.getElementById('terminal-history');
const windowContainer = document.getElementById('window-container');

let commandHistory = [];
let historyIndex = -1;

const sections = {
    whoami: {
        title: "About Section",
        content: `
            <div class="profile-card" id="profile-card-about">
                <div class="profile-visuals">
                    <img src="profile.jpg" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'" class="profile-img-view" id="profile-avatar-img" style="position: relative; opacity: 1;">
                </div>
                <div class="profile-info">
                    <p class="user" style="font-size: 1.25rem; font-weight: bold; margin-bottom: 4px;">Tirth Patel</p>
                    <p style="font-size: 0.8rem; opacity: 0.8; font-family: var(--font-mono); color: var(--accent-color); font-weight: bold;">DevOps & Cloud Systems Engineer</p>
                    <p style="margin-top: 5px; font-size: 0.85rem; line-height: 1.45; color: #8b949e;">Information Technology student at LDRP Institute of Technology and Research.</p>
                    <p style="font-size: 0.85rem; line-height: 1.45; color: #8b949e;">Interested in Cloud Architectures, DevOps CI/CD automation, and virtualization sandboxes.</p>
                </div>
            </div>
            <br>
            <p>Currently learning AWS services, Docker containers, automated pipelines, and system architectures.</p>
            <p>I enjoy designing developer utilities, implementing interactive console sandboxes, and debugging cloud systems.</p>
            <br>
            <p><span class="highlight">Location:</span> India (GMT +5:30)</p>
        `
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
    },
    files: {
        title: "File Explorer",
        content: `
            <div class="file-grid">
                <div class="file-item" data-action="about">
                    <i class="fas fa-folder file-icon folder"></i>
                    <span class="file-name">about_me</span>
                </div>
                <div class="file-item" data-action="skills">
                    <i class="fas fa-folder file-icon folder"></i>
                    <span class="file-name">skills</span>
                </div>
                <div class="file-item" data-action="projects">
                    <i class="fas fa-folder file-icon folder"></i>
                    <span class="file-name">projects</span>
                </div>
                <div class="file-item" data-action="experience">
                    <i class="fas fa-folder file-icon folder"></i>
                    <span class="file-name">experience</span>
                </div>
                <div class="file-item" data-action="connect">
                    <i class="fas fa-folder file-icon folder"></i>
                    <span class="file-name">contact</span>
                </div>
                <div class="file-item" data-action="server">
                    <i class="fas fa-server file-icon" style="color: var(--success-color);"></i>
                    <span class="file-name">linux_server</span>
                </div>
                <div class="file-item" data-action="resume">
                    <i class="fas fa-file-pdf file-icon pdf"></i>
                    <span class="file-name">resume.pdf</span>
                </div>
            </div>
        `
    },
    theme: {
        title: "Theme Selector",
        content: `
            <p style="margin-bottom: 15px; font-size: 0.85rem; opacity: 0.8;">Select a theme preset to restyle the environment:</p>
            <div class="theme-picker-grid">
                <div class="theme-picker-card" data-theme="dracula" id="theme-card-dracula">
                    <span class="theme-picker-name">Dracula Dark</span>
                    <div class="theme-picker-preview">
                        <span class="theme-picker-dot" style="background: #0b0e14;"></span>
                        <span class="theme-picker-dot" style="background: #58a6ff;"></span>
                        <span class="theme-picker-dot" style="background: #3fb950;"></span>
                        <span class="theme-picker-dot" style="background: #bc8cff;"></span>
                    </div>
                </div>
                <div class="theme-picker-card" data-theme="matrix" id="theme-card-matrix">
                    <span class="theme-picker-name">Matrix Green</span>
                    <div class="theme-picker-preview">
                        <span class="theme-picker-dot" style="background: #020502;"></span>
                        <span class="theme-picker-dot" style="background: #00ff00;"></span>
                        <span class="theme-picker-dot" style="background: #39ff14;"></span>
                        <span class="theme-picker-dot" style="background: #00ff66;"></span>
                    </div>
                </div>
                <div class="theme-picker-card" data-theme="github" id="theme-card-github">
                    <span class="theme-picker-name">GitHub Dark</span>
                    <div class="theme-picker-preview">
                        <span class="theme-picker-dot" style="background: #0d1117;"></span>
                        <span class="theme-picker-dot" style="background: #58a6ff;"></span>
                        <span class="theme-picker-dot" style="background: #58a6ff;"></span>
                        <span class="theme-picker-dot" style="background: #8b949e;"></span>
                    </div>
                </div>
                <div class="theme-picker-card" data-theme="tokyonight" id="theme-card-tokyonight">
                    <span class="theme-picker-name">Tokyo Night</span>
                    <div class="theme-picker-preview">
                        <span class="theme-picker-dot" style="background: #1a1b26;"></span>
                        <span class="theme-picker-dot" style="background: #7aa2f7;"></span>
                        <span class="theme-picker-dot" style="background: #9ece6a;"></span>
                        <span class="theme-picker-dot" style="background: #bb9af7;"></span>
                    </div>
                </div>
                <div class="theme-picker-card" data-theme="midnight" id="theme-card-midnight">
                    <span class="theme-picker-name">Midnight Black</span>
                    <div class="theme-picker-preview">
                        <span class="theme-picker-dot" style="background: #000000;"></span>
                        <span class="theme-picker-dot" style="background: #58a6ff;"></span>
                        <span class="theme-picker-dot" style="background: #3fb950;"></span>
                        <span class="theme-picker-dot" style="background: #bc8cff;"></span>
                    </div>
                </div>
            </div>
            <p style="margin-top: 15px; font-size: 0.75rem; opacity: 0.5; font-family: var(--font-mono);">Or run in terminal: theme [dracula|matrix|github|tokyonight|midnight]</p>
        `
    }
};

// Docker Sandbox State variables
let dockerState = {
    active: false,
    user: 'root',
    host: 'centos-sandbox',
    path: '/'
};

const containerCommands = ['ls', 'yum', 'exit', 'help', 'clear', 'whoami'];
const centosFiles = ['bin/', 'etc/', 'home/', 'var/', 'usr/', 'root/', 'opt/', 'tmp/'];
const commands = ['whoami', 'skills', 'projects', 'experience', 'connect', 'resume', 'help', 'clear', 'ls', 'files', 'theme', 'docker', 'server'];

// Input Handling
// Initial cursor state
updateCursor();

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const val = termInput.value.toLowerCase();
        
        // Intercept docker subcommands auto-completion
        if (val.startsWith('docker ') && !dockerState.active) {
            const subcommands = ['ps', 'images', 'run -it centos', 'run -it ubuntu'];
            const typedSub = val.slice(7);
            const matchSub = subcommands.find(sc => sc.startsWith(typedSub));
            if (matchSub) {
                termInput.value = `docker ${matchSub}`;
                updateCursor();
            }
            return;
        }

        const activeList = dockerState.active ? containerCommands : commands;
        const match = activeList.find(c => c.startsWith(val));
        if (match) {
            termInput.value = match;
            updateCursor();
        }
    } else if (e.key === 'Enter') {
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
    const activeList = dockerState.active ? containerCommands : commands;

    // Check if typing a docker subcommand
    if (val.toLowerCase().startsWith('docker ') && !dockerState.active) {
        const subcommands = ['ps', 'images', 'run -it centos', 'run -it ubuntu'];
        const typedSub = val.toLowerCase().slice(7);
        const match = subcommands.find(sc => sc.startsWith(typedSub));
        if (match) {
            ghostText.innerHTML = `${val.replace(/ /g, '&nbsp;')}<span class="cursor-block"></span><span class="suggestion">${match.slice(typedSub.length)}</span>`;
        } else {
            ghostText.innerHTML = `${val.replace(/ /g, '&nbsp;')}<span class="cursor-block"></span>`;
        }
        return;
    }

    const match = activeList.find(c => c.startsWith(val.toLowerCase()));

    if (val && match) {
        // match.slice(val.length) is the suggestion
        ghostText.innerHTML = `${val.replace(/ /g, '&nbsp;')}<span class="cursor-block"></span><span class="suggestion">${match.slice(val.length)}</span>`;
    } else {
        ghostText.innerHTML = `${val.replace(/ /g, '&nbsp;')}<span class="cursor-block"></span>`;
    }
}

termInput.addEventListener('input', updateCursor);
termInput.addEventListener('keydown', updateCursor);

function updatePromptPrefix() {
    const prefix = document.getElementById('terminal-prompt-prefix');
    if (!prefix) return;

    if (dockerState.active) {
        prefix.innerHTML = `<span class="docker-root-prompt">[${dockerState.user}@${dockerState.host} ${dockerState.path}]#</span> `;
    } else {
        prefix.innerHTML = `<span class="user">tirth@linux</span>:<span class="path">~</span>$ `;
    }
}




function getActiveThemeName() {
    if (document.body.classList.contains('theme-matrix')) return 'Matrix-Green';
    if (document.body.classList.contains('theme-github')) return 'GitHub-Dark';
    if (document.body.classList.contains('theme-tokyonight')) return 'Tokyo-Night';
    if (document.body.classList.contains('theme-midnight')) return 'Midnight-Black';
    return 'Dracula-Dark (Default)';
}

function setTheme(name) {
    const validThemes = ['dracula', 'matrix', 'github', 'tokyonight', 'midnight'];
    if (!validThemes.includes(name)) return false;

    validThemes.forEach(t => document.body.classList.remove(`theme-${t}`));
    document.body.classList.add(`theme-${name}`);
    localStorage.setItem('tirth-portfolio-theme', name);

    // Sync active states on theme card elements if they exist
    const cards = document.querySelectorAll('.theme-picker-card');
    cards.forEach(c => {
        if (c.dataset.theme === name) {
            c.classList.add('active');
        } else {
            c.classList.remove('active');
        }
    });

    // Also sync the dropdown active item if present
    const dropdownItems = document.querySelectorAll('.theme-dropdown-item');
    dropdownItems.forEach(item => {
        if (item.dataset.theme === name) {
            item.style.fontWeight = 'bold';
            item.style.color = 'var(--accent-color)';
        } else {
            item.style.fontWeight = 'normal';
            item.style.color = '';
        }
    });

    return true;
}

function executeCommand(input) {
    if (!input) return;

    // Add to history
    const log = document.createElement('div');
    if (dockerState.active) {
        log.innerHTML = `<span class="docker-root-prompt">[${dockerState.user}@${dockerState.host} ${dockerState.path}]#</span> <span class="highlight">${input}</span>`;
    } else {
        log.innerHTML = `<span class="user">tirth@linux</span>:<span class="path">~</span>$ <span class="highlight">${input}</span>`;
    }
    termHistory.appendChild(log);

    // Split parameters for parsed shell execution
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // DOCKER CONTAINER ACTIVE CLI ROUTING
    if (dockerState.active) {
        handleDockerCommand(cmd, args);
        // Auto-scroll
        const body = document.getElementById('main-terminal-body');
        body.scrollTop = body.scrollHeight;
        return;
    }

    // REGULAR PORTFOLIO COMMANDS
    if (cmd === 'whoami') {
        openSection('whoami');
    } else if (sections[cmd]) {
        openSection(cmd);
    } else if (cmd === 'resume') {
        const output = document.createElement('div');
        output.className = 'output';
        output.innerHTML = `<span class="highlight">Opening Resume.pdf...</span>`;
        termHistory.appendChild(output);
        window.open('Resume.pdf', '_blank');
    } else if (cmd === 'clear') {
        termHistory.innerHTML = '';
    } else if (cmd === 'files') {
        openSection('files');
    } else if (cmd === 'wasm' || cmd === 'server') {
        spawnWasmTerminal();
    } else if (cmd === 'theme') {
        if (args.length === 0) {
            openSection('theme');
        } else {
            const themeName = args[0].toLowerCase();
            const success = setTheme(themeName);
            const output = document.createElement('div');
            output.className = 'output';
            if (success) {
                output.innerHTML = `<span class="highlight">✓ Theme environment successfully updated to: ${themeName}</span>`;
            } else {
                output.innerHTML = `<span style="color: #ff5f56;">✗ Unknown theme: "${themeName}". Available themes: dracula, matrix, github, tokyonight, midnight</span>`;
            }
            termHistory.appendChild(output);
        }
    } else if (cmd === 'docker') {
        handleBaseDockerCommand(args);
    } else if (cmd === 'help' || cmd === 'ls') {
        const output = document.createElement('div');
        output.className = 'output';
        output.innerHTML = `Available commands: <br>${commands.join(', ')}<br><br>💡 Try: 'server' to run a real WebAssembly Linux Server in your browser!`;
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

function handleBaseDockerCommand(args) {
    const output = document.createElement('div');
    output.className = 'output';

    if (args.length === 0) {
        output.innerHTML = `
<pre style="margin: 0; font-family: var(--font-mono); color: #8b949e; line-height: 1.45;">
Usage: docker [run|ps|images]
Commands:
  docker ps                  List running containers
  docker images              List locally cached container images
  docker run -it centos      Spin up an isolated CentOS container sandbox
  docker run -it ubuntu      Spin up an isolated Ubuntu container sandbox
</pre>
`;
        termHistory.appendChild(output);
        return;
    }

    const sub = args[0].toLowerCase();
    if (sub === 'ps') {
        output.innerHTML = `<span style="font-family: var(--font-mono);">CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS          PORTS</span>`;
        termHistory.appendChild(output);
    } else if (sub === 'images') {
        output.innerHTML = `
<pre style="margin: 0; font-family: var(--font-mono); color: #8b949e;">
REPOSITORY   TAG       IMAGE ID       SIZE
centos       latest    5d0da3dc9764   231MB
ubuntu       latest    ba6250787135   72.8MB
nginx        alpine    f8f8f2e2124a   23.5MB
</pre>
`;
        termHistory.appendChild(output);
    } else if (sub === 'run') {
        if (args[1] === '-it' && (args[2] === 'centos' || args[2] === 'ubuntu')) {
            const OS = args[2];
            dockerState.active = true;
            dockerState.user = 'root';
            dockerState.host = `${OS}-container`;
            dockerState.path = '/';
            
            output.innerHTML = `<span class="highlight">Unable to find image '${OS}:latest' locally...</span><br>
latest: Pulling from library/${OS}<br>
Digest: sha256:7f950a3c9764a85fa62ba62b...<br>
Status: Downloaded newer image for ${OS}:latest<br><br>
<span class="highlight">[Booting virtual container...]</span><br>
- Mounting root file systems... (OK)<br>
- Configuring loopback device & bridge eth0... (OK)<br>
- Restricting sandbox namespaces... (OK)<br>
- Granting superuser root privileges... (OK)<br><br>
Welcome to the isolated ${OS.toUpperCase()} Docker Sandbox!<br>
Type 'yum' (CentOS) or 'apt' (Ubuntu) for packages, or 'exit' to terminate.`;
            
            termHistory.appendChild(output);
            
            // Clear history for clean container environment
            setTimeout(() => {
                termHistory.innerHTML = '';
                const containerWelcome = document.createElement('div');
                containerWelcome.className = 'output';
                containerWelcome.innerHTML = `Welcome to the isolated ${OS.toUpperCase()} Docker Sandbox!<br>Type 'yum' (CentOS) or 'apt' (Ubuntu) for packages, or 'exit' to terminate.`;
                termHistory.appendChild(containerWelcome);
                updatePromptPrefix();
                updateCursor();
            }, 1800);
        } else {
            output.innerHTML = `<span style="color: #ff5f56;">✗ Invalid options. Usage: docker run -it [centos|ubuntu]</span>`;
            termHistory.appendChild(output);
        }
    } else {
        output.innerHTML = `<span style="color: #ff5f56;">✗ Unknown docker command: "${sub}". Type 'docker' for options.</span>`;
        termHistory.appendChild(output);
    }
}

function handleDockerCommand(cmd, args) {
    const output = document.createElement('div');
    output.className = 'output';

    if (cmd === 'exit') {
        dockerState.active = false;
        output.innerHTML = `exit<br>[Container terminated successfully. Resources released.]`;
        termHistory.appendChild(output);
        updatePromptPrefix();
        updateCursor();
    } else if (cmd === 'clear') {
        termHistory.innerHTML = '';
    } else if (cmd === 'whoami') {
        output.innerHTML = 'root';
        termHistory.appendChild(output);
    } else if (cmd === 'ls') {
        output.innerHTML = `<span style="color: var(--accent-color); font-weight: bold;">${centosFiles.join('  ')}</span>`;
        termHistory.appendChild(output);
    } else if (cmd === 'yum' || cmd === 'apt') {
        if (args.length > 0 && args[0] === 'install') {
            const pkg = args[1] || 'nginx';
            output.innerHTML = `
Loaded plugins: fastestmirror, ovl<br>
Determining fastest mirrors<br>
Resolving Dependencies<br>
--> Running transaction check<br>
---> Package ${pkg}.x86_64 0:1.20.1-1 will be installed<br>
--> Finished Dependency Resolution<br><br>
Total download size: 582 k<br>
Installed size: 1.6 M<br>
Downloading packages:<br>
${pkg}-1.20.1-1.rpm          [====================>] 100% (582 KB/s)<br><br>
Running transaction check<br>
Running transaction test<br>
Transaction test succeeded<br>
Running transaction<br>
  Installing : ${pkg}-1.20.1-1                                      1/1<br>
  Verifying  : ${pkg}-1.20.1-1                                      1/1<br><br>
<span class="highlight">Installed:</span><br>
  ${pkg}.x86_64 0:1.20.1-1<br><br>
<span class="highlight">Complete!</span>
`;
            termHistory.appendChild(output);
        } else {
            output.innerHTML = `
Usage: ${cmd} install [package_name]<br>
Try running: ${cmd} install nginx
`;
            termHistory.appendChild(output);
        }
    } else if (cmd === 'help') {
        output.innerHTML = `Isolated Container Shell commands: <br>${containerCommands.join(', ')}`;
        termHistory.appendChild(output);
    } else {
        output.innerHTML = `bash: ${cmd}: command not found. Type 'help' for options.`;
        termHistory.appendChild(output);
    }
}

function openSection(slug) {
    if (slug === 'server' || slug === 'wasm') {
        spawnWasmTerminal();
        return;
    }
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
    } else if (slug === 'files') {
        initFileTree(win);
    } else if (slug === 'theme') {
        initThemeSelector(win);
    }
}

function initFileTree(win) {
    const items = win.querySelectorAll('.file-item');
    items.forEach(item => {
        const action = item.dataset.action;
        const openAction = () => {
            if (action === 'resume') {
                window.open('Resume.pdf', '_blank');
            } else {
                const slugMap = {
                    'about': 'whoami',
                    'skills': 'skills',
                    'projects': 'projects',
                    'experience': 'experience',
                    'connect': 'connect'
                };
                openSection(slugMap[action] || action);
            }
        };
        
        // Double click for desktop
        item.addEventListener('dblclick', openAction);
        
        // Single tap for mobile / touch screens
        let lastTap = 0;
        item.addEventListener('click', (e) => {
            const now = Date.now();
            const DOUBLE_PRESS_DELAY = 300;
            if (now - lastTap < DOUBLE_PRESS_DELAY || window.innerWidth <= 768) {
                openAction();
            }
            lastTap = now;
            
            // Highlight item
            items.forEach(i => i.style.background = '');
            item.style.background = 'rgba(255, 255, 255, 0.05)';
            e.stopPropagation();
        });
    });
    
    // Clicking window body deselects items
    win.querySelector('.terminal-body').addEventListener('click', () => {
        items.forEach(i => i.style.background = '');
    });
}

function initThemeSelector(win) {
    const cards = win.querySelectorAll('.theme-picker-card');
    const currentTheme = localStorage.getItem('tirth-portfolio-theme') || 'dracula';
    
    // Set initial active card
    const currentCard = win.querySelector(`#theme-card-${currentTheme}`);
    if (currentCard) currentCard.classList.add('active');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const themeName = card.dataset.theme;
            setTheme(themeName);
        });
    });
}

function initConnectForm() {
    const form = document.getElementById('connect-form');
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
    const win = document.getElementById(`window-${slug}`);
    if (win) {
        win.remove();
    }
}

function maximizeWindow(idOrSlug) {
    const win = document.getElementById(`window-${idOrSlug}`) || document.getElementById(idOrSlug);
    if (win) {
        win.classList.toggle('maximized');
    }
}

function minimizeWindow(idOrSlug) {
    const win = document.getElementById(`window-${idOrSlug}`) || document.getElementById(idOrSlug);
    if (win) {
        if (win.classList.contains('maximized')) {
            win.classList.remove('maximized');
        } else if (win.id !== 'main-terminal') {
            win.classList.toggle('collapsed');
        }
    }
}

function focusWindow(idOrSlug) {
    const win = document.getElementById(`window-${idOrSlug}`) || document.getElementById(idOrSlug);
    if (win) win.style.zIndex = getTopZIndex() + 1;
}

function initMainTerminalControls() {
    const mainTerminal = document.getElementById('main-terminal');
    if (mainTerminal) {
        const redBtn = mainTerminal.querySelector('.btn.red');
        const yellowBtn = mainTerminal.querySelector('.btn.yellow');
        const greenBtn = mainTerminal.querySelector('.btn.green');

        if (redBtn) {
            redBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Red close button is disabled for the main terminal
            });
        }
        if (yellowBtn) {
            yellowBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                minimizeWindow('main-terminal');
            });
        }
        if (greenBtn) {
            greenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                maximizeWindow('main-terminal');
            });
        }

        mainTerminal.addEventListener('mousedown', () => {
            focusWindow('main-terminal');
        });
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            const mainTerminal = document.getElementById('main-terminal');
            if (mainTerminal) {
                const termInput = document.getElementById('terminal-input');
                if (termInput) termInput.focus();
                focusWindow('main-terminal');
            }
        });
    }
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
        if (e.target.closest('.header-buttons')) return;

        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        el.style.transition = 'none';

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

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

        el.style.transition = '';
    }
}

// Initial focus
document.addEventListener('DOMContentLoaded', () => {
    runBootSequence();
    initMainTerminalControls();
    
    // Floating Quick Theme Selector Event Bindings
    const quickBtn = document.getElementById('theme-quick-btn');
    const quickDropdown = document.getElementById('theme-quick-dropdown');
    
    if (quickBtn && quickDropdown) {
        quickBtn.addEventListener('click', (e) => {
            quickDropdown.classList.toggle('show');
            e.stopPropagation();
        });
        
        const dropdownItems = quickDropdown.querySelectorAll('.theme-dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const themeName = item.dataset.theme;
                setTheme(themeName);
                quickDropdown.classList.remove('show');
                e.stopPropagation();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!quickBtn.contains(e.target) && !quickDropdown.contains(e.target)) {
                quickDropdown.classList.remove('show');
            }
        });
    }
});

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

    setTimeout(() => {
        termInput.focus();
        updateCursor();
    }, 1000);
}

document.addEventListener('click', (e) => {
    const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A'];
    // Avoid stealing focus if clicking on quick theme selector button or items
    const themeSelector = e.target.closest('#theme-quick-btn') || e.target.closest('#theme-quick-dropdown');
    if (!interactiveTags.includes(e.target.tagName) && !themeSelector) {
        termInput.focus();
    }
});
termInput.focus();

function spawnWasmTerminal() {
    const slug = 'wasm';
    const existing = document.getElementById(`window-${slug}`);
    if (existing) {
        focusWindow(slug);
        return;
    }

    const win = document.createElement('div');
    win.className = 'terminal-window spawned-window';
    win.id = `window-${slug}`;
    
    // Set proper layout window dimensions for terminal container
    win.style.width = '700px';
    win.style.height = '450px';
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        win.style.left = '0px';
        win.style.top = '0px';
        win.style.width = '100%';
        win.style.height = 'auto';
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
            <div class="header-title"><i class="fas fa-microchip"></i> mainframe-core // WebAssembly Alpine Linux</div>
        </div>
        <div class="terminal-body wasm-container" style="padding: 0; background: #000; overflow-y: auto; height: calc(100% - 37px);">
            <iframe class="wasm-terminal-frame" src="https://copy.sh/v86/?profile=alpine" style="height: 1000px; width: 100%; border: none;" scrolling="no" allowfullscreen></iframe>
        </div>
    `;

    // Add event listeners
    const header = win.querySelector('.terminal-header');
    header.addEventListener('mousedown', () => focusWindow(slug));

    win.querySelector('.btn.red').addEventListener('click', () => closeWindow(slug));
    win.querySelector('.btn.yellow').addEventListener('click', () => minimizeWindow(slug));
    win.querySelector('.btn.green').addEventListener('click', () => {
        win.classList.toggle('maximized');
        if (win.classList.contains('maximized')) {
            win.style.width = '';
            win.style.height = '';
        } else {
            win.style.width = '700px';
            win.style.height = '450px';
        }
    });

    windowContainer.appendChild(win);
    makeDraggable(win);
    focusWindow(slug);
}
