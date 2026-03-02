// filename: App.jsx
import { useState, useEffect, useCallback } from "react";

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  card:          { background:"#fff", borderRadius:8, padding:16, marginBottom:12, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", border:"1px solid #e0e0e0" },
  sessionHeader: { background:"#1A237E", color:"#fff", borderRadius:10, padding:"16px 20px", marginBottom:16, border:"2px solid #0D1B2A" },
  concept:       { background:"#FFF8E1", borderLeft:"5px solid #F57F17", borderRadius:8, padding:16, marginBottom:16 },
  bookRefs:      { background:"#E8F5E9", borderLeft:"5px solid #2E7D32", borderRadius:8, padding:16, marginBottom:16 },
  claudePrompt:  { background:"#EEF2FF", borderLeft:"5px solid #1A237E", borderRadius:8, padding:14, marginBottom:16 },
  tasks:         { background:"#fff", borderRadius:10, padding:20, marginBottom:16, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", border:"1px solid #e0e0e0" },
  quiz:          { background:"#F3E5F5", borderLeft:"5px solid #6A1B9A", borderRadius:8, padding:16, marginBottom:16 },
  resourcesCard: { background:"#fff", borderRadius:10, padding:20, marginBottom:20, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", border:"1px solid #e0e0e0" },
  navBtn:        { padding:"10px 20px", borderRadius:6, border:"1px solid #ddd", cursor:"pointer", fontSize:13, fontWeight:600, background:"#fff", color:"#1A237E" }
};

// ─── Book Data (GoalKicker Linux Notes for Professionals TOC) ─────────────────
const BOOK = {
  linux: {
    name: "Linux Notes for Professionals (GoalKicker)",
    short: "📗 Linux Book",
    chapters: {
      1:  "Ch 1: Getting Started — Useful shortcuts (1.1), File Management Commands (1.2), Hello World (1.3), Basic Utilities (1.4), Searching patterns (1.5), File Manipulation (1.6), File/Directory details (1.7)",
      2:  "Ch 2: Detecting distro — debian-based (2.1), systemd-based (2.2), RHEL/CentOS/Fedora (2.3), uname (2.4), basic info (2.5), GNU coreutils (2.6), find release (2.7)",
      3:  "Ch 3: Kernel info — uname -a (3.1)",
      4:  "Ch 4: Shell — Change default (4.1), Basic Utilities (4.2), Aliases (4.3), Locate files (4.4)",
      5:  "Ch 5: Disk Space — Investigate Directories (5.1), Checking Space (5.2)",
      6:  "Ch 6: System Info — CPU/Memory/Network/Disk stats (6.1), lscpu/lshw (6.2), List Hardware (6.3), CPU model/speed (6.4), Process monitoring (6.5)",
      7:  "Ch 7: ls — Options (7.1), most used examples (7.2)",
      8:  "Ch 8: tar — Compress folder (8.1), Extract (8.2), List contents (8.3), List archive (8.4), Compress exclude (8.5), Strip components (8.6)",
      9:  "Ch 9: Services — List Ubuntu (9.1), systemd management (9.2)",
      10: "Ch 10: Managing Services — Troubleshoot (10.1), Start/Stop (10.2), Status (10.3)",
      11: "Ch 11: Users — Own password (11.1), Another user (11.2), Add user (11.3), Remove user (11.4), Remove with home (11.5), List groups current (11.6), List groups user (11.7)",
      12: "Ch 12: Bash scripting — Shebang (12.1), Variables (12.2), Arrays (12.3), Conditionals (12.4), Loops (12.5), Functions (12.6)",
      13: "Ch 13: tee — To stdout and file (13.1), From pipe chain (13.2), To multiple files (13.3), Append (13.4)",
      14: "Ch 14: SSH — Connect server (14.1), Install OpenSSH (14.2), Configure server (14.3), Passwordless (14.4), Generate key (14.5), Disable service (14.6)",
      15: "Ch 15: SCP — Basic Usage (15.1), Secure Copy (15.2)",
      16: "Ch 16: Cron Jobs — Crontab syntax (16.1), List crons (16.2), Edit crontab (16.3), Special strings (16.4)",
      17: "Ch 17: Network Config — Local DNS (17.1), Configure DNS (17.2), Manipulate routes (17.3), Hostname other system (17.4), Interface details (17.5), Adding IP (17.6)",
      18: "Ch 18: Grep — Basic usage (18.1), Regular expressions (18.2), Recursive (18.3), Context lines (18.4)",
      19: "Ch 19: AWK — Print fields (19.1), Conditionals (19.2), Built-in variables (19.3)",
      20: "Ch 20: Package Managers — Update apt (20.1), Install pacman (20.2), Update pacman (20.3), Update yum (20.4)"
    }
  }
};

// ─── Curriculum Data ──────────────────────────────────────────────────────────
const WEEKS = [
  // ═══════════════════════════ PRE-START ══════════════════════════════════════
  {
    id:"w0", label:"Pre-Start", color:"#4A148C", light:"#FAF0FF",
    title:"WSL2 + Claude Code Setup",
    subtitle:"Complete this Saturday before Day 1.",
    sessions:[
      {
        id:"s0",
        title:"Setup: WSL2 + Claude Code on Windows",
        tag:"SETUP", tagColor:"#4A148C",
        date:"Pre-Start — before Day 1",
        concept:"Your Windows PC runs WSL2 — a real Ubuntu kernel inside Windows. It shares your filesystem and network so you use genuine Linux commands. Claude Code is an AI assistant that runs in your terminal, reads your codebase, and writes code with you.",
        bookRefs:[
          { chapter:1,  note:"Read Ch 1 Sections 1.1–1.2 now: Useful shortcuts & File Management Commands — so the terminal feels familiar on Day 1" },
          { chapter:20, note:"Read Ch 20 Section 20.1: apt package manager basics — you'll run apt install dozens of times" }
        ],
        tasks:[
          "Open PowerShell as Administrator",
          "Run: wsl --install (restart when prompted)",
          "Open Ubuntu from Start Menu → set username and password",
          "Run: sudo apt update && sudo apt upgrade -y",
          "Run: sudo apt install -y git curl wget vim htop net-tools tree",
          "Node.js 22: curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs",
          "Verify: node --version && npm --version",
          "Run: sudo apt install -y python3 python3-pip",
          "Run: pip3 install anthropic --break-system-packages",
          "Install Claude Code: npm install -g @anthropic-ai/claude-code",
          "Get API key from console.anthropic.com → API Keys",
          "Store key: echo 'export ANTHROPIC_API_KEY=\"sk-ant-YOUR-KEY-HERE\"' >> ~/.bashrc",
          "Run: source ~/.bashrc",
          "Secure: chmod 600 ~/.bashrc",
          "Test Claude Code: claude 'list the files in the current directory'",
          "Run: mkdir -p ~/projects && cd ~/projects",
          "Create a GitHub account if you don't have one (github.com)",
          "Configure git: git config --global user.name 'Your Name' && git config --global user.email 'you@email.com'"
        ],
        quiz:[
          "What is WSL2 and why is it better than a full VM for development?",
          "Why do we store the API key in ~/.bashrc instead of hardcoding it?",
          "What does chmod 600 do to ~/.bashrc and why is that important?"
        ],
        claudePrompt:"Say to Claude Code: 'Pre-start complete — verify my WSL2, Python, and Claude Code setup and tell me if anything is missing.'"
      }
    ]
  },

  // ════════════════════════════ WEEK 1 ════════════════════════════════════════
  {
    id:"w1", label:"Week 1", color:"#1A237E", light:"#EEF2FF",
    title:"Linux Filesystem & Basic Tools",
    subtitle:"Master navigation, permissions, shell scripting, packages + first real agent.",
    sessions:[
      {
        id:"s1",
        title:"Day 1 — Filesystem, ls, grep, find",
        tag:"LINUX", tagColor:"#1A237E",
        date:"Day 1 — Monday",
        concept:"The Linux filesystem starts at / (root). Everything is a file — even devices and processes. ls lists directory contents, grep searches text patterns inside files, find locates files by name, type, or size. These three cover 80% of daily navigation and debugging work.",
        bookRefs:[
          { chapter:1, note:"Read ALL of Ch 1 today (Sections 1.1–1.7): shortcuts, file management, grep/find patterns, file manipulation — run every example in the terminal" },
          { chapter:7, note:"Read Ch 7 Sections 7.1–7.2: Every ls option and example — type each one yourself" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 1 (all sections) and Ch 7",
          "OverTheWire Bandit Levels 0–3: bandit.labs.overthewire.org",
          "ls -la /",
          "ls -la /etc && ls -la /var && ls -la /home && ls -la /usr",
          "grep -r 'root' /etc/passwd",
          "grep -rn 'PermitRootLogin' /etc/ssh/ 2>/dev/null",
          "find / -name '*.log' -size +1M 2>/dev/null | head -10",
          "find /home -type f -name '*.py' 2>/dev/null",
          "find /etc -name '*.conf' -mtime -7 2>/dev/null | head -10",
          "AGENT: claude 'Create a Python script that lists all .py files in ~/projects, prints their filenames and line counts, and shows a total'",
          "Read the generated script carefully before running it",
          "python3 file_lister.py",
          "Create GitHub repo 'linux-ai-tools' and push the script"
        ],
        quiz:[
          "What does ls -la show that plain ls does not?",
          "What is the difference between grep and find?",
          "What does 2>/dev/null do in the find command?",
          "What is the difference between /etc, /var, and /usr directories?"
        ],
        claudePrompt:"Say: 'Starting Day 1 — I'm learning the Linux filesystem. Teach me ls, grep, and find with practical examples.'"
      },
      {
        id:"s2",
        title:"Day 2 — Permissions & Users",
        tag:"LINUX", tagColor:"#1A237E",
        date:"Day 2 — Tuesday",
        concept:"Linux permissions use three triads: owner (u), group (g), others (o) — each with read (r=4), write (w=2), execute (x=1). chmod changes permissions, chown changes ownership. Users and groups are the foundation of Linux security — misunderstanding them causes most security mistakes.",
        bookRefs:[
          { chapter:11, note:"Read Ch 11 fully: user management — add/remove users, change passwords, manage groups" },
          { chapter:1,  note:"Review Ch 1 Section 1.6: File manipulation — chmod and chown examples to run yourself" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 11",
          "OverTheWire Bandit Levels 4–7",
          "cat /etc/passwd | grep -v nologin | grep -v false",
          "cat /etc/group | head -20",
          "id && whoami && groups",
          "ls -la /home",
          "sudo useradd -m testuser && sudo passwd testuser",
          "sudo usermod -aG sudo testuser",
          "su - testuser (switch to testuser then exit)",
          "touch testfile.txt && chmod 644 testfile.txt && ls -la testfile.txt",
          "chmod 755 testfile.txt && ls -la testfile.txt",
          "chmod 600 testfile.txt && ls -la testfile.txt",
          "AGENT: claude 'Create a Python script that takes a file path and prints its permissions in both octal (e.g. 644) and symbolic (e.g. rw-r--r--) format'",
          "python3 permissions_reader.py /etc/passwd",
          "sudo userdel -r testuser"
        ],
        quiz:[
          "What does 755 mean in chmod notation — break down each digit?",
          "Why should most config files NOT be chmod 777?",
          "What is the difference between su and sudo?",
          "How do groups allow multiple users to share file access?"
        ],
        claudePrompt:"Say: 'Starting Day 2 — teach me Linux file permissions and user management. I want to understand chmod, chown, users, and groups.'"
      },
      {
        id:"s3",
        title:"Day 3 — Shell Scripting + tar",
        tag:"LINUX + SCRIPTING", tagColor:"#4527A0",
        date:"Day 3 — Wednesday",
        concept:"Bash scripts automate repetitive commands. A script is just a text file starting with #!/bin/bash — it runs top-to-bottom, supports variables ($VAR), loops (for/while), conditionals (if/then), and functions. tar creates compressed archives — essential for backups, deployments, and sharing files.",
        bookRefs:[
          { chapter:4,  note:"Read Ch 4 Sections 4.1–4.4: Shell basics, change default shell, aliases (add yours today), locate files" },
          { chapter:8,  note:"Read Ch 8 Sections 8.1–8.6: tar compress, extract, list, strip components — run every example" },
          { chapter:12, note:"Read Ch 12 Sections 12.1–12.6: Bash scripting — shebang, variables, arrays, conditionals, loops, functions" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 4, Ch 8, and Ch 12",
          "nano ~/.bashrc — add at least 3 useful aliases (e.g. alias ll='ls -la')",
          "source ~/.bashrc && test your new aliases",
          "mkdir -p ~/scripts && cd ~/scripts",
          "Write backup.sh: archives ~/projects to ~/backups/backup-$(date +%Y%m%d).tar.gz",
          "chmod +x backup.sh && ./backup.sh",
          "tar -tzf ~/backups/backup-*.tar.gz | head -20 (list archive contents)",
          "mkdir -p /tmp/restore-test && tar -xzf ~/backups/backup-*.tar.gz -C /tmp/restore-test/",
          "Write a for loop script: iterate over all *.sh files in ~/scripts and print name + line count",
          "Write a conditional script: check if ~/projects exists, create it if not",
          "AGENT: claude 'Create a Bash script that monitors disk usage: if any partition is over 80% full, print a warning with the partition name and current usage'",
          "Review the generated script, then: chmod +x disk_monitor.sh && ./disk_monitor.sh"
        ],
        quiz:[
          "What does tar -czf archive.tar.gz folder/ do vs tar -xzf archive.tar.gz?",
          "How do you make a Bash script executable, and what is the shebang line?",
          "What is $() used for in shell scripts — give an example?",
          "Why are aliases saved in ~/.bashrc and not in the script itself?"
        ],
        claudePrompt:"Say: 'Starting Day 3 — teach me Bash scripting fundamentals and tar archiving with practical examples.'"
      },
      {
        id:"s4",
        title:"Day 4 — System Info & Package Management",
        tag:"LINUX", tagColor:"#1A237E",
        date:"Day 4 — Thursday",
        concept:"Real sysadmins constantly check system resources: CPU load, RAM usage, disk space, running processes. apt is Ubuntu's package manager — it installs, updates, removes, and searches software. htop, df, free, and ps are your eyes into system health.",
        bookRefs:[
          { chapter:5,  note:"Read Ch 5 Sections 5.1–5.2: Investigate disk space with df and du — run both on your system" },
          { chapter:6,  note:"Read Ch 6 Sections 6.1–6.5: CPU, memory, network, disk stats and process monitoring — lscpu, lshw, htop" },
          { chapter:20, note:"Read Ch 20 fully: apt, pacman, yum — focus on apt but understand the others exist" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 5, Ch 6, Ch 20",
          "df -h && du -sh ~/* 2>/dev/null",
          "free -h",
          "cat /proc/cpuinfo | grep 'model name' | head -1",
          "nproc && lscpu | grep -E 'CPU|Thread|Core'",
          "htop (explore — q to quit, F5 for tree view)",
          "ps aux --sort=-%cpu | head -10",
          "ps aux --sort=-%mem | head -10",
          "sudo apt update && apt list --upgradable 2>/dev/null | head -20",
          "sudo apt install -y tree ncdu",
          "tree ~/projects -L 2",
          "ncdu ~ (interactive disk usage — q to quit)",
          "AGENT: claude 'Create a Python script that prints a system health summary: hostname, CPU%, RAM%, disk usage percentages for all mounts, and top 5 CPU-consuming processes'",
          "python3 system_health.py",
          "Push to your GitHub repo"
        ],
        quiz:[
          "What is the difference between df and du?",
          "What does free -h tell you — what are the 'buff/cache' numbers?",
          "How do you see every installed package on Ubuntu?",
          "What does ps aux show and what do the columns mean?"
        ],
        claudePrompt:"Say: 'Starting Day 4 — teach me Linux system monitoring commands: df, du, free, ps, htop, and apt package management.'"
      },
      {
        id:"s5",
        title:"Day 5 — Week 1 Review + First Real Claude Agent",
        tag:"LINUX + AGENT", tagColor:"#B71C1C",
        date:"Day 5 — Friday",
        concept:"Today you consolidate Week 1 and build your first production-quality Claude agent: a recipe writer with a well-crafted system prompt. A system prompt defines the AI's persona, constraints, and output format — it's the foundation of every useful agent. Understanding this structure is the most important skill in AI development.",
        bookRefs:[
          { chapter:1,  note:"Quick review: any Ch 1 sections you haven't fully mastered — redo any commands that weren't clear" },
          { chapter:4,  note:"Review Ch 4 aliases — finalize your ~/.bashrc with all shortcuts that will help your workflow" }
        ],
        tasks:[
          "OverTheWire Bandit Levels 8–11",
          "Self-check: can you (1) navigate filesystem, (2) set permissions, (3) write a bash script, (4) use tar? Fix gaps.",
          "mkdir -p ~/projects/agents/week1 && cd ~/projects/agents/week1",
          "AGENT: claude 'Create a Python recipe agent for Root Solutions (low-sodium health food brand). System prompt: healthy ingredients only, always mention sodium content per serving, output in clean markdown. Use claude-3-5-haiku-20241022 model.'",
          "Read recipe_agent.py carefully — understand the messages structure and system prompt",
          "python3 recipe_agent.py — test with: 'Give me a recipe for chicken stir fry'",
          "Test with 2 more different recipe requests",
          "Modify the system prompt: add 'always include prep time in minutes' — observe the difference",
          "AGENT: claude 'Explain to me how the Anthropic Python SDK messages array works — show me the role types and when to use each'",
          "git add . && git commit -m 'Week 1 complete: first Claude agent with system prompt' && git push"
        ],
        quiz:[
          "What is a system prompt and how does it differ from a user message?",
          "What roles can messages have in the Anthropic SDK messages array?",
          "Why would you use claude-3-5-haiku instead of claude-3-5-sonnet?",
          "Name 5 Linux commands you learned this week and describe what each does"
        ],
        claudePrompt:"Say: 'Day 5 review — quiz me on Week 1 Linux fundamentals, then help me improve my recipe agent's system prompt.'"
      }
    ]
  },

  // ════════════════════════════ WEEK 2 ════════════════════════════════════════
  {
    id:"w2", label:"Week 2", color:"#004D40", light:"#E0F2F1",
    title:"SSH, Networking & Services",
    subtitle:"Remote access, network diagnostics, systemd + multi-turn conversation agents.",
    sessions:[
      {
        id:"s6",
        title:"Day 6 — SSH + Secure Remote Access",
        tag:"NETWORKING", tagColor:"#004D40",
        date:"Day 6 — Monday",
        concept:"SSH (Secure Shell) connects you to remote Linux machines over an encrypted channel. Key-based authentication uses a private key (you keep) + public key (server holds) — far more secure than passwords. SCP securely copies files between machines. These skills are mandatory for any cloud or server work.",
        bookRefs:[
          { chapter:14, note:"Read Ch 14 fully: SSH connect, install OpenSSH server, configure, passwordless auth, generate key, disable service" },
          { chapter:15, note:"Read Ch 15 Sections 15.1–15.2: SCP basic usage and secure file copy examples" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 14 and Ch 15",
          "sudo apt install -y openssh-server",
          "sudo systemctl start ssh && sudo systemctl enable ssh",
          "sudo systemctl status ssh",
          "ip addr show | grep 'inet '",
          "ssh-keygen -t ed25519 -C 'your-email@example.com' (accept default path, optionally set passphrase)",
          "cat ~/.ssh/id_ed25519.pub",
          "ssh localhost (type yes to accept fingerprint, then exit)",
          "scp ~/.bashrc localhost:/tmp/bashrc-test && ls -la /tmp/bashrc-test",
          "Add your SSH public key to GitHub: github.com → Settings → SSH and GPG keys → New SSH key",
          "Test GitHub SSH: ssh -T git@github.com",
          "Update your repo remote: git remote set-url origin git@github.com:USERNAME/linux-ai-tools.git",
          "AGENT: claude 'Create a Python script that takes a list of hostnames and checks which ones are reachable by attempting a socket connection to port 22'",
          "python3 ssh_checker.py"
        ],
        quiz:[
          "Why is SSH key-based auth more secure than password auth?",
          "What is the difference between id_ed25519 (private) and id_ed25519.pub (public)?",
          "What happens if someone gets your private key?",
          "How does SCP differ from regular cp?"
        ],
        claudePrompt:"Say: 'Starting Day 6 — teach me SSH key generation, passwordless auth setup, and SCP file transfer.'"
      },
      {
        id:"s7",
        title:"Day 7 — Network Diagnostics",
        tag:"NETWORKING", tagColor:"#004D40",
        date:"Day 7 — Tuesday",
        concept:"Network troubleshooting is a critical sysadmin skill. ping tests connectivity, curl makes HTTP requests, ss/netstat shows open ports, ip shows interfaces and routes, dig/nslookup resolves DNS. Knowing these lets you diagnose whether a problem is DNS, routing, firewall, or the application.",
        bookRefs:[
          { chapter:17, note:"Read Ch 17 Sections 17.1–17.6: DNS config, routes, hostname resolution, interface details, adding IPs" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 17",
          "ping -c 4 8.8.8.8 && ping -c 4 google.com",
          "ip addr show && ip route show",
          "ss -tulpn",
          "curl -I https://api.anthropic.com",
          "curl -s https://httpbin.org/ip",
          "cat /etc/resolv.conf && cat /etc/hosts",
          "nslookup google.com && dig google.com A",
          "sudo apt install -y dnsutils traceroute",
          "traceroute google.com | head -10",
          "sudo apt install -y nmap",
          "nmap -sn 127.0.0.1 (scan localhost)",
          "AGENT: claude 'Create a Python script using the requests library that takes a list of URLs, checks their HTTP status codes, response time in ms, and reports which are up/down/slow (>2s)'",
          "python3 url_checker.py"
        ],
        quiz:[
          "What does ss -tulpn show — what does each flag mean?",
          "What is the difference between /etc/resolv.conf and /etc/hosts?",
          "How do you find which process is listening on port 8080?",
          "What does curl -I show vs plain curl?"
        ],
        claudePrompt:"Say: 'Starting Day 7 — teach me Linux network diagnostic commands: ping, curl, ss, ip, dig, and traceroute.'"
      },
      {
        id:"s8",
        title:"Day 8 — systemd & Service Management",
        tag:"SYSADMIN", tagColor:"#1B5E20",
        date:"Day 8 — Wednesday",
        concept:"systemd is the init system that starts everything when Linux boots. systemctl manages services: start, stop, enable (auto-start on boot), disable, status. journalctl reads structured system logs. Understanding services lets you deploy Flask apps, databases, and any long-running process as a managed background service.",
        bookRefs:[
          { chapter:9,  note:"Read Ch 9 Sections 9.1–9.2: List running services on Ubuntu, systemd unit management" },
          { chapter:10, note:"Read Ch 10 Sections 10.1–10.3: Troubleshoot failing services, start/stop commands, reading status" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 9 and Ch 10",
          "systemctl list-units --type=service --state=running",
          "systemctl status ssh",
          "sudo systemctl stop ssh && systemctl status ssh",
          "sudo systemctl start ssh",
          "journalctl -u ssh -n 30",
          "journalctl -p err -n 30 --no-pager",
          "pip3 install flask --break-system-packages",
          "Create ~/projects/hello-service/hello.py: Flask app returning 'Hello from systemd' on GET /",
          "python3 hello.py (test manually: curl http://localhost:5000, then Ctrl+C)",
          "Create /etc/systemd/system/hello.service (ask Claude for the correct unit file format)",
          "sudo systemctl daemon-reload && sudo systemctl start hello",
          "sudo systemctl status hello",
          "curl http://localhost:5000",
          "sudo systemctl enable hello (auto-start on boot)"
        ],
        quiz:[
          "What is the difference between systemctl start and systemctl enable?",
          "How do you view the last 50 log lines for a specific service?",
          "What is a systemd unit file and what are its key sections?",
          "Why would a service work manually but fail as a systemd service?"
        ],
        claudePrompt:"Say: 'Starting Day 8 — teach me systemd service management and how to deploy a Flask app as a systemd service.'"
      },
      {
        id:"s9",
        title:"Day 9 — Multi-Turn Conversation Agents",
        tag:"AI AGENT", tagColor:"#E65100",
        date:"Day 9 — Thursday",
        concept:"A stateless agent forgets everything after each call. Multi-turn agents maintain a messages list that grows each exchange — this is exactly how ChatGPT works. The messages array holds the entire conversation: [{role:'user', content:'...'}, {role:'assistant', content:'...'}, ...]. You control context by controlling this list.",
        bookRefs:[],
        tasks:[
          "Review your Day 5 recipe agent — confirm it is stateless (new messages list each call)",
          "mkdir -p ~/projects/agents/week2 && cd ~/projects/agents/week2",
          "AGENT: claude 'Create a Python multi-turn conversation agent using the Anthropic SDK. It maintains a messages list across turns. Commands: /history (show past exchanges), /clear (reset conversation), /save (write to conversation.json), /quit (exit).'",
          "Read the code carefully — trace the messages list through multiple turns",
          "Run it and test: ask something, reference your previous answer, ask what you said first",
          "Type /history — verify it shows the full exchange",
          "Type /save — inspect conversation.json",
          "Add feature: truncate messages list to last 10 exchanges to control token usage",
          "AGENT: claude 'Show me how token count grows with conversation length using the Anthropic SDK usage object in the API response'",
          "Commit with: git add . && git commit -m 'Day 9: multi-turn agent with history and save' && git push"
        ],
        quiz:[
          "What is the messages array and what role values are valid?",
          "Why does a stateless agent not remember what you said in a previous call?",
          "How would you limit conversation history to prevent hitting context limits?",
          "Where in the API response can you find token usage counts?"
        ],
        claudePrompt:"Say: 'Starting Day 9 — teach me how multi-turn conversation memory works in the Anthropic SDK messages array.'"
      },
      {
        id:"s10",
        title:"Day 10 — Week 2 Review + tee & Logging",
        tag:"LINUX + REVIEW", tagColor:"#004D40",
        date:"Day 10 — Friday",
        concept:"tee reads from stdin and writes to both stdout and a file simultaneously — it 'tees off' the pipeline without breaking it. Used for capturing output while still seeing it live. Today you solidify Week 2 and add professional structured logging to your multi-turn agent.",
        bookRefs:[
          { chapter:13, note:"Read Ch 13 Sections 13.1–13.4: tee — stdout+file, pipe chain, multiple files, append mode" }
        ],
        tasks:[
          "📗 Read Linux Book Ch 13",
          "OverTheWire Bandit Levels 12–15",
          "echo 'hello world' | tee output.txt && cat output.txt",
          "ls -la /etc | tee /tmp/etc-listing.txt | wc -l",
          "echo 'appended line' | tee -a output.txt && cat output.txt",
          "echo 'test' | tee file1.txt file2.txt && diff file1.txt file2.txt",
          "ping -c 3 google.com | tee /tmp/ping-log.txt",
          "AGENT: claude 'Add structured JSON logging to my multi-turn agent from Day 9. Log each exchange as one JSON line: {timestamp, turn_number, user_message, response_preview (first 80 chars), input_tokens, output_tokens}. Write to agent.log'",
          "Run agent, make 5 exchanges, then: cat agent.log | python3 -m json.tool",
          "Week 2 self-assessment (1-5): SSH, networking commands, systemd, multi-turn agents"
        ],
        quiz:[
          "What does tee -a do differently from tee without -a?",
          "How is tee useful when debugging a complex shell pipeline?",
          "What fields would you log for a production AI agent?",
          "Name the systemctl commands for: start, stop, restart, enable, check status"
        ],
        claudePrompt:"Say: 'Day 10 review — quiz me on Week 2: SSH, networking, systemd, multi-turn agents, and tee.'"
      }
    ]
  },

  // ════════════════════════════ WEEK 3 ════════════════════════════════════════
  {
    id:"w3", label:"Week 3", color:"#BF360C", light:"#FBE9E7",
    title:"Python Agents & Claude API Deep Dive",
    subtitle:"Structured output, tool use (function calling), file agents, Flask API.",
    sessions:[
      {
        id:"s11",
        title:"Day 11 — Structured Output & JSON Agents",
        tag:"AI AGENT", tagColor:"#BF360C",
        date:"Day 11 — Monday",
        concept:"Structured output means the model returns JSON you can parse and use in your code — not human-readable text. Use a system prompt that explicitly demands JSON in a specific schema. This is how AI integrates with databases, APIs, and any programmatic system. Always add a JSON validation layer.",
        bookRefs:[],
        tasks:[
          "mkdir -p ~/projects/agents/week3 && cd ~/projects/agents/week3",
          "AGENT: claude 'Create a Python agent using claude-3-5-haiku-20241022 that extracts structured data from text. Input: paragraph about a person. System prompt enforces JSON output: {name, age, job, city, key_fact}. Add json.loads() validation and retry once if parse fails.'",
          "Test with 3 different paragraphs",
          "AGENT: claude 'Create a Linux command explainer agent. Input: a shell command like find / -name *.log 2>/dev/null. Output JSON: {command, purpose, flags: [{flag, meaning}], example_output}.'",
          "Test explainer with 5 different commands you've learned",
          "Build a pipeline: take a block of terminal output, extract commands, explain each",
          "Add error handling: if Claude returns malformed JSON, log the raw response and raise a clear error",
          "Commit both scripts to GitHub"
        ],
        quiz:[
          "How do you reliably force JSON output from a language model?",
          "What happens when the model doesn't follow your JSON schema?",
          "When would you use claude-3-5-haiku vs claude-3-5-sonnet?",
          "How do you validate a Python dict against an expected schema?"
        ],
        claudePrompt:"Say: 'Starting Day 11 — teach me how to enforce structured JSON output from the Anthropic API reliably.'"
      },
      {
        id:"s12",
        title:"Day 12 — Tool Use (Function Calling)",
        tag:"AI AGENT", tagColor:"#BF360C",
        date:"Day 12 — Tuesday",
        concept:"Tool use lets the AI call your Python functions — it decides WHEN and with WHAT arguments. You define tools as JSON schemas. The model returns a tool_use content block; you execute the function, return the result in a tool_result block, and the conversation continues. This is how agents act on the real world.",
        bookRefs:[],
        tasks:[
          "Read: https://docs.anthropic.com/en/docs/build-with-claude/tool-use (bookmark this)",
          "AGENT: claude 'Build a Python agent with tool use. Define 3 tools: get_current_time() → ISO string, read_file(path: str) → file contents string, list_directory(path: str) → list of filenames. Agent decides which tool to call based on user questions.'",
          "Study the tool definition JSON schema structure carefully",
          "Test: ask 'what time is it?' — verify tool_use block calls get_current_time",
          "Test: ask 'what files are in ~/projects?' — verify list_directory is called",
          "Test: ask 'read my .bashrc file' — verify read_file is called",
          "Add a 4th tool: get_file_size(path: str) → size in bytes",
          "Handle the case where a tool call throws an exception — return the error in tool_result",
          "AGENT: claude 'Show me how to handle a case where the model calls a tool multiple times in one response turn'",
          "Commit with a clear description of what each tool does"
        ],
        quiz:[
          "What is the tool_use content block and what fields does it have?",
          "How do you return a tool result back to the model?",
          "What security risks exist with a read_file tool? How would you mitigate them?",
          "Why is tool use fundamentally different from asking the model to write code?"
        ],
        claudePrompt:"Say: 'Starting Day 12 — walk me through the Anthropic tool use API step by step, including the tool_result message format.'"
      },
      {
        id:"s13",
        title:"Day 13 — File System Agent + Context Management",
        tag:"AI AGENT", tagColor:"#BF360C",
        date:"Day 13 — Wednesday",
        concept:"Context window size limits how much text you can send in one prompt. Embedding large files wastes tokens and hits limits fast. Production agents chunk large inputs, summarize intermediate results, and selectively include context. Monitoring token usage lets you optimize cost and reliability.",
        bookRefs:[
          { chapter:1, note:"Review Ch 1 Section 1.6: File manipulation commands — these are what your agent will automate" }
        ],
        tasks:[
          "AGENT: claude 'Build a codebase analyzer agent. Takes a directory path, reads all .py files, returns: file count, total lines, all function names, and a 3-sentence project summary. Use claude-3-5-sonnet for quality.'",
          "Test on ~/projects directory",
          "Print the token usage from the API response (response.usage.input_tokens)",
          "Add chunking: if total file content exceeds 12,000 characters, summarize each file individually first",
          "AGENT: claude 'Create a file editor agent: takes a filename and instruction (e.g. add type hints to all functions), reads the file, applies the change, shows a diff before writing. Add --dry-run flag.'",
          "Test on your file_lister.py from Day 1",
          "Run with --dry-run first, then apply the change",
          "Compare haiku vs sonnet cost and quality on the same task",
          "Commit both agents to GitHub with README explaining what each does"
        ],
        quiz:[
          "What is the context window and why does it impose a hard limit?",
          "Where in the API response do you find input and output token counts?",
          "What is a good strategy for summarizing a large codebase that exceeds the context window?",
          "How does context window size affect cost on the Anthropic API?"
        ],
        claudePrompt:"Say: 'Starting Day 13 — help me understand context window management and token optimization for production agents.'"
      },
      {
        id:"s14",
        title:"Day 14 — Flask API: Agent as a Service",
        tag:"DEPLOYMENT", tagColor:"#1A237E",
        date:"Day 14 — Thursday",
        concept:"Wrapping an agent in a Flask REST API turns it into a service any web app, mobile app, or script can call. POST /chat with a JSON body, get a JSON response. Storing conversation history server-side by session ID gives stateful multi-turn conversations to any client.",
        bookRefs:[],
        tasks:[
          "Review Day 8 Flask app — you already know the basics",
          "pip3 install flask flask-cors --break-system-packages",
          "AGENT: claude 'Create agent_api.py: Flask app with POST /chat (body: {message, session_id}) that calls Claude with conversation history stored in a dict keyed by session_id. Returns {response, session_id, input_tokens, output_tokens}.'",
          "Add GET /sessions — return list of active session IDs",
          "Add DELETE /sessions/<session_id> — clear a conversation",
          "Add GET /health — return {status: ok, sessions_count, uptime}",
          "Test with curl: curl -X POST http://localhost:5000/chat -H 'Content-Type: application/json' -d '{\"message\": \"hello\", \"session_id\": \"test1\"}'",
          "Send a follow-up with same session_id — verify it remembers context",
          "Deploy as a systemd service using Day 8 knowledge",
          "pip3 freeze > requirements.txt"
        ],
        quiz:[
          "What is a REST API and how does JSON over HTTP work?",
          "Why store conversation history server-side rather than in the client request?",
          "What is CORS and when does it matter for Flask APIs?",
          "What HTTP status codes should you return for success, bad request, and server error?"
        ],
        claudePrompt:"Say: 'Starting Day 14 — help me build a production Flask REST API that wraps my Claude conversation agent.'"
      },
      {
        id:"s15",
        title:"Day 15 — Week 3 Review + Deploy to Render",
        tag:"DEPLOYMENT + REVIEW", tagColor:"#BF360C",
        date:"Day 15 — Friday",
        concept:"Production deployment means your agent runs 24/7 on a server someone else manages. Render.com deploys Python/Flask apps for free from a GitHub repo. Environment variables store secrets like API keys securely — never hardcode them. This session turns your local agent into a live public URL.",
        bookRefs:[],
        tasks:[
          "Self-check: JSON agents ✓, tool use ✓, file agent ✓, Flask API ✓? Fill any gaps first.",
          "Create account at render.com",
          "Create Procfile in project root: echo 'web: python agent_api.py' > Procfile",
          "Update agent_api.py: import os; port = int(os.environ.get('PORT', 5000)); app.run(host='0.0.0.0', port=port)",
          "Verify requirements.txt is complete: pip3 freeze > requirements.txt",
          "git add . && git commit -m 'Week 3 complete: Flask agent API ready for deployment' && git push",
          "Render dashboard → New → Web Service → connect GitHub repo",
          "Set environment variable: ANTHROPIC_API_KEY = your key",
          "Deploy and wait for build to complete",
          "Test your live URL: curl https://your-app.onrender.com/health",
          "Test chat: curl -X POST https://your-app.onrender.com/chat -H 'Content-Type: application/json' -d '{\"message\": \"hello\", \"session_id\": \"live-test\"}'",
          "AGENT: claude 'Review my agent_api.py and list the top 3 security improvements for production'"
        ],
        quiz:[
          "Why should API keys NEVER be in source code or committed to git?",
          "What is requirements.txt and why does Render need it?",
          "What is the PORT environment variable and why bind to 0.0.0.0?",
          "Name 3 things you'd add before calling this truly production-ready"
        ],
        claudePrompt:"Say: 'Day 15 review — quiz me on Week 3, then help me fix any issues deploying my Flask agent to Render.'"
      }
    ]
  },

  // ════════════════════════════ WEEK 4 ════════════════════════════════════════
  {
    id:"w4", label:"Week 4", color:"#1B5E20", light:"#E8F5E9",
    title:"Advanced Agents & Production",
    subtitle:"Orchestration, RAG basics, GitHub Actions CI/CD, monitoring, capstone project.",
    sessions:[
      {
        id:"s16",
        title:"Day 16 — Agent Orchestration Patterns",
        tag:"AI AGENT", tagColor:"#1B5E20",
        date:"Day 16 — Monday",
        concept:"Orchestration chains multiple agents: one routes tasks, others specialize. The orchestrator pattern has a coordinator that classifies intent and delegates to specialists — each with its own system prompt and model choice. This is how complex AI applications handle varied user requests reliably.",
        bookRefs:[],
        tasks:[
          "mkdir -p ~/projects/agents/week4 && cd ~/projects/agents/week4",
          "AGENT: claude 'Build a 2-stage agent pipeline: (1) Classifier agent reads user input and returns JSON {intent: research|code|summarize|other, confidence: 0-1}. (2) Route to specialist agents: researcher (thorough analysis), coder (produce working Python), summarizer (concise bullet points). Each specialist has its own system prompt.'",
          "Test with 5+ different input types",
          "Add a fallback: if intent is 'other' or confidence < 0.7, route to a general agent",
          "Add logging: log which specialist was called, response time, and total tokens",
          "AGENT: claude 'Add a critique agent that reviews each specialist response and either approves it or requests one revision. Show both the original and revised responses.'",
          "Measure total token usage across all agents for one user request",
          "Commit and push with architecture description in README"
        ],
        quiz:[
          "What is the orchestrator pattern and when is it useful?",
          "When would multiple specialized agents beat one general agent?",
          "How do you prevent infinite loops in agent pipelines?",
          "How does adding more agents affect total cost per user request?"
        ],
        claudePrompt:"Say: 'Starting Day 16 — teach me the orchestrator/specialist agent pattern with a practical Python example.'"
      },
      {
        id:"s17",
        title:"Day 17 — RAG Basics",
        tag:"AI AGENT", tagColor:"#1B5E20",
        date:"Day 17 — Tuesday",
        concept:"RAG (Retrieval Augmented Generation) gives agents access to your own documents without fine-tuning. You embed documents as vectors, store in a vector database, and retrieve the most relevant chunks before each query. The retrieved chunks become context in the prompt. This is how enterprise AI adds private knowledge to Claude.",
        bookRefs:[],
        tasks:[
          "pip3 install sentence-transformers faiss-cpu --break-system-packages",
          "AGENT: claude 'Build a basic RAG system: (1) Ingest all .txt files from a directory into a FAISS in-memory vector store using the sentence-transformers all-MiniLM-L6-v2 model. (2) For each question, find the 3 most relevant chunks (similarity search). (3) Include those chunks as context in the Claude prompt.'",
          "Create 5 sample .txt files with different topics (use your Linux notes or copy sections from your README files)",
          "Index the documents",
          "Test: ask questions that require reading the documents to answer",
          "Print and compare: same question with RAG context vs without",
          "Add source attribution: which .txt file did each answer come from?",
          "Add a re-ranking step: retrieve top 5, then ask Claude to rank which 2 are most relevant",
          "Commit with docstring explaining the indexing and retrieval steps"
        ],
        quiz:[
          "What is a vector embedding and why is it useful for search?",
          "What is FAISS and what problem does it solve?",
          "Why is RAG better than fine-tuning for adding new private knowledge?",
          "What is 'chunk size' and how does it affect retrieval quality?"
        ],
        claudePrompt:"Say: 'Starting Day 17 — teach me how to build a RAG system from scratch using FAISS and sentence-transformers.'"
      },
      {
        id:"s18",
        title:"Day 18 — GitHub Actions CI/CD",
        tag:"DEVOPS", tagColor:"#0D47A1",
        date:"Day 18 — Wednesday",
        concept:"CI/CD automates testing and deployment when you push code. GitHub Actions runs YAML workflows on GitHub's servers: install dependencies → run tests → deploy. This prevents broken code from reaching production and eliminates manual deployment steps. It's how all professional software teams ship code.",
        bookRefs:[],
        tasks:[
          "Open your GitHub repo → Actions tab → New workflow",
          "AGENT: claude 'Write a GitHub Actions workflow file (.github/workflows/test.yml) that: runs on push to main, sets up Python 3.11, installs requirements.txt, runs pytest on any test_*.py files, and reports pass/fail status.'",
          "Create test_agent.py with 3 simple tests (e.g., test JSON parsing, test tool definition schema)",
          "Create .github/workflows/test.yml with the generated content",
          "git add . && git push — watch the Action run in the GitHub Actions tab",
          "Add a lint step: pip install flake8 && flake8 . --max-line-length=120",
          "AGENT: claude 'Write a second workflow deploy.yml: triggers after test.yml passes on main push, calls a Render deploy hook URL stored as a GitHub secret RENDER_DEPLOY_HOOK_URL'",
          "Add the Render deploy hook URL as a GitHub Actions secret",
          "Push a small change and watch: test → deploy pipeline",
          "Add a build status badge to README.md"
        ],
        quiz:[
          "What triggers a GitHub Actions workflow?",
          "What is the difference between CI (Continuous Integration) and CD (Continuous Deployment)?",
          "How do you store API keys and secrets in GitHub Actions?",
          "What does the 'needs' keyword do in a workflow job?"
        ],
        claudePrompt:"Say: 'Starting Day 18 — teach me GitHub Actions CI/CD for a Python Flask project from scratch.'"
      },
      {
        id:"s19",
        title:"Day 19 — Monitoring, Logging & Error Handling",
        tag:"PRODUCTION", tagColor:"#4A148C",
        date:"Day 19 — Thursday",
        concept:"Production agents need observability: structured JSON logs, error tracking, and health metrics. Without these, debugging production issues is nearly impossible. Retry logic with exponential backoff handles transient API failures. A health endpoint lets load balancers verify your service is alive.",
        bookRefs:[],
        tasks:[
          "pip3 install structlog --break-system-packages",
          "AGENT: claude 'Refactor agent_api.py to use structlog for structured JSON logging. Log for each request: request_id (UUID), timestamp, session_id, user_message_length, model, response_time_ms, input_tokens, output_tokens, error (null if none).'",
          "Add retry logic: if Anthropic API call raises an exception, retry up to 3 times with exponential backoff (1s, 2s, 4s)",
          "Enhance GET /health: return {status: ok, uptime_seconds, total_requests, error_count, last_error_at}",
          "Add request_id header to every response so users can reference it in support",
          "AGENT: claude 'Add a simple in-memory rate limiter: max 20 requests per session_id per minute. Return HTTP 429 with retry_after if exceeded.'",
          "Test error scenarios: invalid API key, malformed JSON body, missing session_id field",
          "Verify structured logs appear correctly: cat agent.log | python3 -m json.tool",
          "Redeploy to Render, verify /health endpoint works on live URL"
        ],
        quiz:[
          "What is structured logging and how does it differ from print statements?",
          "What is exponential backoff and when should you use it?",
          "What HTTP status code should a rate limiter return and why?",
          "What metrics would you track to know if your AI API is healthy?"
        ],
        claudePrompt:"Say: 'Starting Day 19 — help me add production-grade logging, retries, and monitoring to my Flask agent API.'"
      },
      {
        id:"s20",
        title:"Days 20–30 — Capstone Project",
        tag:"CAPSTONE", tagColor:"#B71C1C",
        date:"Days 20–30 — Final Sprint",
        concept:"Your capstone integrates everything: Linux knowledge, Claude agents with tool use, RAG (if applicable), Flask API, GitHub Actions CI/CD, structured logging, and monitoring. Build something you would actually use — or can show to an employer. This is your portfolio piece.",
        bookRefs:[],
        tasks:[
          "Choose your capstone project: Linux assistant / Code reviewer / Document Q&A / Custom business tool / Your idea",
          "AGENT: claude 'Help me design the architecture for [your project]. I want: tool list, data model, API endpoints, system prompt strategy, and tech stack.'",
          "Define 3–5 tools the agent will have access to",
          "Design the data model (what gets stored, where, how long)",
          "Build core agent with tool use (Day 12 pattern)",
          "Add RAG if your project uses documents (Day 17 pattern)",
          "Wrap in Flask API with session management (Day 14 pattern)",
          "Add structured logging and health endpoint (Day 19 pattern)",
          "Set up GitHub Actions test + deploy pipeline (Day 18 pattern)",
          "Write README.md: project description, setup instructions, API documentation, architecture overview",
          "Deploy final version to Render",
          "Share GitHub URL — you are now an AI developer"
        ],
        quiz:[
          "Describe your capstone architecture in 3 sentences to someone non-technical",
          "What was the hardest technical challenge and how did you solve it?",
          "What would you add with one more week of development?",
          "Which Linux command do you reach for most automatically now?"
        ],
        claudePrompt:"Say: 'Starting capstone — help me design and build [your project name] as a production AI agent application.'"
      }
    ]
  }
];

// ─── Resources Data ────────────────────────────────────────────────────────────
const RESOURCES = {
  reference: [
    { title:"Anthropic API Docs", url:"https://docs.anthropic.com", note:"Official Claude API reference — tool use, models, pricing, limits" },
    { title:"Linux Notes for Professionals (PDF)", url:"https://goalkicker.com/LinuxBook/", note:"Free GoalKicker PDF — the book used throughout this curriculum" },
    { title:"OverTheWire: Bandit", url:"https://overthewire.org/wargames/bandit/", note:"Interactive Linux wargame — beginner to intermediate, used in Week 1–2" },
    { title:"Anthropic Cookbook (GitHub)", url:"https://github.com/anthropics/anthropic-cookbook", note:"Official code examples: tool use, RAG, vision, structured output" }
  ],
  tools: [
    { title:"WSL2 Install Guide (Microsoft)", url:"https://learn.microsoft.com/en-us/windows/wsl/install", note:"Official Microsoft guide for WSL2 setup on Windows" },
    { title:"Render.com (Free Hosting)", url:"https://render.com", note:"Deploy Flask/Python apps free — used in Week 3 Day 15" },
    { title:"GitHub Actions Docs", url:"https://docs.github.com/en/actions", note:"Full reference for CI/CD workflows — used in Week 4 Day 18" },
    { title:"FAISS by Meta AI", url:"https://github.com/facebookresearch/faiss", note:"Vector similarity search library — used in RAG session Day 17" }
  ],
  reading: [
    { title:"Anthropic Prompt Engineering Guide", url:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", note:"Official prompting strategies for Claude" },
    { title:"Prompt Engineering Guide (DAIR.AI)", url:"https://www.promptingguide.ai/", note:"Comprehensive free guide: zero-shot, few-shot, CoT, RAG patterns" },
    { title:"The Linux Command Line (free PDF)", url:"https://linuxcommand.org/tlcl.php", note:"Excellent free book for going deeper on bash scripting" }
  ]
};

// ─── localStorage Hook ────────────────────────────────────────────────────────
function useStorage(key, fallback) {
  const [val, setVal] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setVal(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, [key]);

  const save = useCallback(v => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);

  return [val, save, loaded];
}

// ─── Flat ordered list of all sessions (for prev/next nav) ────────────────────
const ALL_SESSIONS = WEEKS.flatMap(w => w.sessions.map(s => ({ weekId: w.id, sessionId: s.id })));

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [checked, setChecked, loaded] = useStorage("curriculum-tasks-v2", {});
  const [activeWeek, setActiveWeek]     = useState("w0");
  const [activeSession, setActiveSession] = useState("s0");
  const [activeTab, setActiveTab]       = useState("curriculum");

  const toggleTask = (sid, idx) => {
    const k = `${sid}-${idx}`;
    setChecked(prev => ({ ...prev, [k]: !prev[k] }));
  };

  // ── Derived state ────────────────────────────────────────────────────────────
  const curWeek = WEEKS.find(w => w.id === activeWeek) || null;
  const curSess = curWeek?.sessions?.find(s => s.id === activeSession) || null;

  const allTaskKeys = WEEKS.flatMap(w =>
    w.sessions.flatMap(s => s.tasks.map((_, i) => `${s.id}-${i}`))
  );
  const totalDone = allTaskKeys.filter(k => checked[k]).length;
  const overallPct = allTaskKeys.length ? Math.round((totalDone / allTaskKeys.length) * 100) : 0;

  const sessPct = s => {
    if (!s?.tasks?.length) return 0;
    const done = s.tasks.filter((_, i) => checked[`${s.id}-${i}`]).length;
    return Math.round((done / s.tasks.length) * 100);
  };

  // ── Prev / next navigation ───────────────────────────────────────────────────
  const curIdx = ALL_SESSIONS.findIndex(x => x.sessionId === activeSession);
  const prevEntry = curIdx > 0 ? ALL_SESSIONS[curIdx - 1] : null;
  const nextEntry = curIdx < ALL_SESSIONS.length - 1 ? ALL_SESSIONS[curIdx + 1] : null;

  const goTo = entry => {
    if (!entry) return;
    setActiveWeek(entry.weekId);
    setActiveSession(entry.sessionId);
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const pbar = (pct, color, h = 8) => (
    <div style={{ background:"#e0e0e0", borderRadius:8, height:h, overflow:"hidden" }}>
      <div style={{ width:`${pct}%`, background:color, height:"100%", transition:"width 0.4s" }} />
    </div>
  );

  const chip = (label, bg) => (
    <span style={{ background:bg, color:"#fff", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:4, whiteSpace:"nowrap" }}>
      {label}
    </span>
  );

  // ── Book refs block ──────────────────────────────────────────────────────────
  const BookRefs = ({ refs = [] }) => {
    if (!refs.length) return null;
    return (
      <div style={S.bookRefs}>
        <div style={{ fontWeight:700, color:"#1B5E20", fontSize:13, marginBottom:10 }}>📗 Read These Exact Sections Today</div>
        {refs.map((ref, i) => (
          <div key={i} style={{ marginBottom:8, padding:"8px 12px", background:"#fff", borderRadius:6, borderLeft:"3px solid #2E7D32" }}>
            <div style={{ fontWeight:700, fontSize:13, color:"#1B5E20" }}>
              {BOOK.linux.chapters[ref.chapter] || `Chapter ${ref.chapter}`}
            </div>
            <div style={{ fontSize:13, color:"#555", marginTop:4 }}>{ref.note}</div>
          </div>
        ))}
      </div>
    );
  };

  // ── Loading gate ─────────────────────────────────────────────────────────────
  if (!loaded) {
    return <div style={{ padding:40, textAlign:"center", color:"#555" }}>Loading progress...</div>;
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Segoe UI', Arial, sans-serif", minHeight:"100vh", background:"#f4f5fa", color:"#111" }}>

      {/* ── Header ── */}
      <div style={{ background:"#0D1B2A", color:"#fff", padding:"12px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:18, fontWeight:700 }}>Linux → AI Developer — 30-Day Roadmap</div>
          <div style={{ fontSize:12, opacity:0.75 }}>WSL2 • Claude Code • Python Agents • Production Deployment</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:26, fontWeight:700, color:"#90caf9" }}>{overallPct}%</div>
          <div style={{ fontSize:12, opacity:0.75 }}>{totalDone} / {allTaskKeys.length} tasks</div>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{ background:"#1a237e", padding:"6px 20px", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ flex:1 }}>{pbar(overallPct, "#90caf9", 10)}</div>
        <span style={{ color:"#fff", fontSize:12, whiteSpace:"nowrap" }}>Overall Progress</span>
      </div>

      {/* ── Tabs ── */}
      <div style={{ background:"#fff", borderBottom:"1px solid #ddd", display:"flex" }}>
        {[
          ["curriculum", "📚 Curriculum"],
          ["resources",  "🔗 Resources"],
          ["howto",      "💬 How-to"]
        ].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            flex:1, padding:"12px", border:"none", cursor:"pointer",
            background: activeTab === id ? "#eef2ff" : "transparent",
            color:      activeTab === id ? "#1a237e" : "#666",
            fontWeight: activeTab === id ? 700 : 400,
            borderBottom: activeTab === id ? "2px solid #1a237e" : "2px solid transparent",
            fontSize:13
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={{ display:"flex", height:"calc(100vh - 130px)" }}>

        {/* ── Sidebar ── */}
        <div style={{ width:240, background:"#fff", borderRight:"1px solid #e0e0e0", overflowY:"auto", flexShrink:0 }}>
          {WEEKS.map(w => {
            const weekTasks = w.sessions.flatMap(s => s.tasks.map((_, i) => `${s.id}-${i}`));
            const weekDone  = weekTasks.filter(k => checked[k]).length;
            const weekPct   = weekTasks.length ? Math.round((weekDone / weekTasks.length) * 100) : 0;
            return (
              <div key={w.id}>
                <button
                  onClick={() => { setActiveWeek(w.id); setActiveSession(w.sessions[0]?.id || ""); }}
                  style={{
                    width:"100%", textAlign:"left", padding:"10px 14px",
                    border:"none", cursor:"pointer",
                    background: activeWeek === w.id ? w.color : "transparent",
                    color:      activeWeek === w.id ? "#fff" : "#333",
                    fontWeight: activeWeek === w.id ? 700 : 400,
                    fontSize:13, borderBottom:"1px solid #f0f0f0"
                  }}
                >
                  <div>{w.label}: {w.title}</div>
                  <div style={{ fontSize:11, opacity:0.8, marginTop:2 }}>
                    {w.sessions.length} sessions • {weekPct}% done
                  </div>
                </button>
                {activeWeek === w.id && w.sessions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSession(s.id)}
                    style={{
                      width:"100%", textAlign:"left", padding:"7px 14px 7px 20px",
                      border:"none", cursor:"pointer",
                      background:   activeSession === s.id ? w.light : "transparent",
                      borderLeft:   activeSession === s.id ? `3px solid ${w.color}` : "3px solid transparent",
                      fontSize:12,
                      color:        activeSession === s.id ? w.color : "#555",
                      borderBottom:"1px solid #f8f8f8"
                    }}
                  >
                    <div style={{ fontWeight: activeSession === s.id ? 700 : 400, lineHeight:1.4 }}>{s.title}</div>
                    <div style={{ fontSize:11, color:"#999", marginTop:2 }}>
                      {sessPct(s)}% • {s.tasks.length} tasks
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        {/* ── Main content ── */}
        <div style={{ flex:1, overflowY:"auto", padding:20 }}>

          {/* ══ CURRICULUM TAB ══ */}
          {activeTab === "curriculum" && (
            curSess ? (
              <>
                {/* Session header */}
                <div style={S.sessionHeader}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6, flexWrap:"wrap" }}>
                    {chip(curSess.tag || "SESSION", curSess.tagColor || "#888")}
                    {sessPct(curSess) === 100 && chip("✓ COMPLETE", "#1B5E20")}
                    <span style={{ fontSize:12, opacity:0.8, marginLeft:"auto" }}>{curSess.date || ""}</span>
                  </div>
                  <div style={{ fontSize:20, fontWeight:700, lineHeight:1.3 }}>{curSess.title}</div>
                  <div style={{ marginTop:10 }}>{pbar(sessPct(curSess), "rgba(255,255,255,0.6)", 10)}</div>
                  <div style={{ fontSize:12, opacity:0.8, marginTop:4 }}>
                    {curSess.tasks.filter((_, i) => checked[`${curSess.id}-${i}`]).length} / {curSess.tasks.length} tasks complete
                  </div>
                </div>

                {/* Concept */}
                {curSess.concept && (
                  <div style={S.concept}>
                    <div style={{ fontWeight:700, color:"#E65100", fontSize:13, marginBottom:8 }}>📖 UNDERSTAND THIS FIRST</div>
                    <div style={{ fontSize:14, lineHeight:1.8, color:"#333" }}>{curSess.concept}</div>
                  </div>
                )}

                {/* Book refs */}
                <BookRefs refs={curSess.bookRefs || []} />

                {/* Claude prompt */}
                {curSess.claudePrompt && (
                  <div style={S.claudePrompt}>
                    <div style={{ fontWeight:700, color:"#1A237E", fontSize:13, marginBottom:6 }}>💬 START YOUR SESSION WITH CLAUDE CODE</div>
                    <div style={{ fontSize:14, color:"#1A237E", fontStyle:"italic", lineHeight:1.6 }}>{curSess.claudePrompt}</div>
                  </div>
                )}

                {/* Tasks */}
                <div style={S.tasks}>
                  <div style={{ fontWeight:700, fontSize:15, color:"#1A237E", marginBottom:14 }}>⚡ SESSION TASKS</div>
                  {curSess.tasks.map((task, i) => {
                    const k    = `${curSess.id}-${i}`;
                    const done = !!checked[k];
                    const isAgent   = typeof task === "string" && task.startsWith("AGENT:");
                    const isBookRef = typeof task === "string" && task.startsWith("📗");
                    return (
                      <div
                        key={i}
                        onClick={() => toggleTask(curSess.id, i)}
                        style={{
                          display:"flex", alignItems:"flex-start", gap:12,
                          padding:"10px 0",
                          borderBottom: i < curSess.tasks.length - 1 ? "1px solid #f5f5f5" : "none",
                          cursor:"pointer", opacity: done ? 0.5 : 1
                        }}
                      >
                        <div style={{
                          width:22, height:22, borderRadius:4, flexShrink:0, marginTop:1,
                          border:`2px solid ${done ? "#1B5E20" : "#ccc"}`,
                          background: done ? "#1B5E20" : "#fff",
                          display:"flex", alignItems:"center", justifyContent:"center"
                        }}>
                          {done && <span style={{ color:"#fff", fontSize:13, lineHeight:1 }}>✓</span>}
                        </div>
                        <div style={{
                          fontSize:14, lineHeight:1.6,
                          textDecoration: done ? "line-through" : "none",
                          color:      isAgent ? "#0D47A1" : isBookRef ? "#1B5E20" : "#222",
                          fontWeight: isAgent || isBookRef ? 600 : 400,
                          fontFamily: (!isAgent && !isBookRef && task.startsWith("Run:")) || task.includes("&&") || task.includes("sudo") || task.startsWith("curl") || task.startsWith("git") ? "monospace" : "inherit",
                          fontSize:   (!isAgent && !isBookRef && (task.includes("&&") || task.includes("sudo") || task.startsWith("curl") || task.startsWith("git"))) ? 13 : 14
                        }}>
                          {task}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quiz */}
                {curSess.quiz?.length > 0 && (
                  <div style={S.quiz}>
                    <div style={{ fontWeight:700, color:"#4A148C", fontSize:13, marginBottom:4 }}>🎯 END-OF-SESSION QUIZ</div>
                    <div style={{ fontSize:12, color:"#6A1B9A", marginBottom:12, fontStyle:"italic" }}>
                      Tell Claude: "Quiz me on this session — one question at a time, wait for my answer."
                    </div>
                    {curSess.quiz.map((q, i) => (
                      <div key={i} style={{ display:"flex", gap:10, marginBottom:8, padding:"8px 12px", background:"#fff", borderRadius:6 }}>
                        <span style={{ fontWeight:700, color:"#6A1B9A", flexShrink:0 }}>Q{i + 1}.</span>
                        <span style={{ fontSize:14, lineHeight:1.6 }}>{q}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Prev / Next navigation */}
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, gap:12 }}>
                  <button
                    style={{ ...S.navBtn, opacity: prevEntry ? 1 : 0.3, cursor: prevEntry ? "pointer" : "default" }}
                    onClick={() => goTo(prevEntry)}
                    disabled={!prevEntry}
                  >
                    ← Previous Session
                  </button>
                  <button
                    style={{ ...S.navBtn, opacity: nextEntry ? 1 : 0.3, cursor: nextEntry ? "pointer" : "default" }}
                    onClick={() => goTo(nextEntry)}
                    disabled={!nextEntry}
                  >
                    Next Session →
                  </button>
                </div>
              </>
            ) : (
              <div style={{ padding:60, textAlign:"center", color:"#888" }}>
                Select a week and session from the sidebar to begin.
              </div>
            )
          )}

          {/* ══ RESOURCES TAB ══ */}
          {activeTab === "resources" && (
            <div>
              {[
                ["📘 Reference Material", RESOURCES.reference],
                ["🛠 Tools & Platforms",   RESOURCES.tools],
                ["📖 Deeper Reading",      RESOURCES.reading]
              ].map(([heading, items]) => (
                <div key={heading} style={S.resourcesCard}>
                  <h3 style={{ marginBottom:16, color:"#1A237E", fontSize:15 }}>{heading}</h3>
                  {items.map((r, i) => (
                    <div key={i} style={{ marginBottom:14, paddingBottom:14, borderBottom: i < items.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                      <a href={r.url} target="_blank" rel="noreferrer" style={{ fontWeight:600, color:"#1A237E", fontSize:14 }}>
                        {r.title} ↗
                      </a>
                      <div style={{ fontSize:13, color:"#555", marginTop:4 }}>{r.note}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ══ HOW-TO TAB ══ */}
          {activeTab === "howto" && (
            <div style={S.resourcesCard}>
              <h2 style={{ color:"#1A237E", marginBottom:20, fontSize:18 }}>How Sessions Work</h2>

              {[
                ["1. Start each session with Claude Code", "Open your Ubuntu terminal (WSL2). Before touching any task, say the Claude prompt shown at the top of each session. This gives Claude context for the session and lets it guide you through unfamiliar territory."],
                ["2. Read the book sections first", "The green 'Read These Sections' box tells you exactly which chapters to read before starting tasks. Read them in the terminal: open the PDF and read while your terminal is open. Run every example you see."],
                ["3. Work through tasks top to bottom", "Click each task checkbox when you complete it. Tasks with AGENT: prefix mean you ask Claude Code to generate something — read the generated code before running it. Tasks starting with 📗 are read-first reminders."],
                ["4. Use Claude as your pair programmer", "For every AGENT: task, paste the exact prompt into Claude Code (claude in your terminal). Review what it generates. Ask follow-up questions. Don't just run code you don't understand."],
                ["5. End with the quiz", "After completing all tasks, use the quiz questions to test yourself. Paste them to Claude: 'Quiz me one at a time, wait for my answer.' If you struggle on any question, re-do the related tasks."],
                ["6. Track progress", "Checked tasks are saved in your browser. The progress bar updates as you go. Your goal: 100% on all sessions by end of Week 4."]
              ].map(([title, body]) => (
                <div key={title} style={{ marginBottom:20, paddingBottom:20, borderBottom:"1px solid #f0f0f0" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:"#1A237E", marginBottom:6 }}>{title}</div>
                  <div style={{ fontSize:14, lineHeight:1.7, color:"#444" }}>{body}</div>
                </div>
              ))}

              <div style={{ background:"#EEF2FF", borderRadius:8, padding:16, marginTop:8 }}>
                <div style={{ fontWeight:700, color:"#1A237E", marginBottom:8 }}>Quick Reference: Claude Code Commands</div>
                {[
                  ["claude 'your prompt'",        "One-shot: ask Claude something and get a response"],
                  ["claude",                       "Start an interactive session (Ctrl+C to exit)"],
                  ["claude --continue",            "Continue the last conversation"],
                  ["claude --model claude-3-5-sonnet-20241022 'prompt'", "Use a specific model"]
                ].map(([cmd, desc]) => (
                  <div key={cmd} style={{ display:"flex", gap:12, marginBottom:8, fontSize:13 }}>
                    <code style={{ background:"#fff", padding:"2px 8px", borderRadius:4, fontFamily:"monospace", whiteSpace:"nowrap", color:"#0D47A1" }}>{cmd}</code>
                    <span style={{ color:"#555" }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
