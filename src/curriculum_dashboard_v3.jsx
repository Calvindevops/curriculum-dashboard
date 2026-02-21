import { useState, useEffect, useCallback } from "react";

// ─── Book chapter maps ────────────────────────────────────────────────────────
const BOOKS = {
  linux: {
    emoji: "📗", label: "Linux Book", color: "#1B5E20", bg: "#E8F5E9", border: "#2E7D32",
    name: "Linux Notes for Professionals (GoalKicker)",
    when: "Month 1 — open every Linux session",
    chapters: {
      1:  "Ch 1: Getting Started — file management, ls, grep, find, shortcuts",
      2:  "Ch 2: Detecting distro — lsb_release, uname, /etc/os-release",
      3:  "Ch 3: Running kernel info — uname -a",
      4:  "Ch 4: Shell — bash, PS1, aliases, history",
      5:  "Ch 5: Disk Space — df -h, du -sh",
      6:  "Ch 6: System Info — CPU, memory, vmstat, iostat, ps, top",
      7:  "Ch 7: ls command — all options explained",
      8:  "Ch 8: tar compression — create, extract, list archives",
      9:  "Ch 9–10: Services — systemctl, journalctl, start/stop/status",
      11: "Ch 11: Modifying Users — useradd, passwd, groups, sudo",
      13: "Ch 13: tee command — pipe to file AND stdout simultaneously",
      14: "Ch 14: SSH — keygen, sshd_config, authorized_keys, passwordless login",
      15: "Ch 15: SCP — secure copy between machines",
      17: "Ch 17: Network Config — ip, routes, DNS, interfaces, ifconfig",
      20: "Ch 20: Package Managers — apt, pacman, yum",
    }
  },
  bash: {
    emoji: "📘", label: "Bash Book", color: "#0D47A1", bg: "#E3F2FD", border: "#1565C0",
    name: "Bash Notes for Professionals (GoalKicker)",
    when: "Month 1 — open every scripting session, primary reference Session 4",
    chapters: {
      1:  "Ch 1: Getting Started — variables, echo, read, basic syntax",
      2:  "Ch 2: Script shebang, arguments ($1 $2 $@), exit codes ($?)",
      3:  "Ch 3: Navigating directories — pushd, popd, cd tricks",
      4:  "Ch 4: Listing files — ls patterns, globbing, wildcards",
      5:  "Ch 5: cat, heredocs (<<EOF), multi-line strings",
      6:  "Ch 6: Pipes & redirection — |, >, >>, 2>&1, /dev/null",
      7:  "Ch 7: String manipulation — substring, length, replace, split",
      8:  "Ch 8: Arrays — declare, append, loop, associative arrays",
      9:  "Ch 9: Conditionals — if/elif/else, [[ ]], -f -d -z -n flags",
      10: "Ch 10: Loops — for, while, until, break, continue",
      11: "Ch 11: Functions — define, call, return values, local variables",
      12: "Ch 12: Debugging — set -x trace mode, set -e, set -u, trap ERR",
      13: "Ch 13: Type and declare — readonly, integer, export",
      14: "Ch 14: Sourcing files — source vs execute, .bashrc vs .bash_profile",
      15: "Ch 15: Process substitution — <(), >(), parallel output",
      16: "Ch 16: Arithmetic — $(( )), let, bc for floats",
      17: "Ch 17: Scoping — local variables inside functions",
      18: "Ch 18: Jobs & processes — &, wait, jobs, fg, bg, kill",
      19: "Ch 19: Pattern matching — case statements, glob patterns",
      20: "Ch 20: File testing — -e exists, -f file, -d dir, -r readable",
      21: "Ch 21: Here strings — <<< piped to command",
      22: "Ch 22: read command — user input, -p prompt, -s silent",
      23: "Ch 23: getopts — parsing command line flags in scripts",
      24: "Ch 24: Best practices — set -euo pipefail, quoting, shellcheck",
      25: "Ch 25: Customising the prompt — PS1, colours, git branch",
    }
  },
  java: {
    emoji: "☕", label: "Java Book", color: "#BF360C", bg: "#FBE9E7", border: "#E64A19",
    name: "Java Notes for Professionals (GoalKicker)",
    when: "Month 2/3 — Android app for Root Solutions, Spring Boot APIs",
    chapters: {
      1:  "Ch 1: Getting Started — main method, compile, run, data types",
      2:  "Ch 2: Arrays — declaration, iteration, multidimensional",
      3:  "Ch 3: Collections — ArrayList, HashMap, LinkedList, Set",
      4:  "Ch 4: Strings — StringBuilder, format, split, regex",
      5:  "Ch 5: Object-Oriented — classes, interfaces, inheritance",
      6:  "Ch 6: Exceptions — try/catch/finally, custom exceptions",
      7:  "Ch 7: Generics — type parameters, wildcards, bounded types",
      8:  "Ch 8: Streams — filter, map, reduce, collect, lambdas",
      9:  "Ch 9: Files & I/O — File, Path, BufferedReader, FileWriter",
      10: "Ch 10: Concurrency — Thread, ExecutorService, synchronized",
      11: "Ch 11: Networking — HttpURLConnection, Socket, ServerSocket",
      12: "Ch 12: JSON — Gson, Jackson, parsing and serializing",
      13: "Ch 13: Android basics — Activity, Intent, View, RecyclerView",
      14: "Ch 14: Testing — JUnit, assertions, Mockito",
      15: "Ch 15: Maven & Gradle — build tools, dependencies",
    }
  },
};

// ─── Curriculum ───────────────────────────────────────────────────────────────
const WEEKS = [
  {
    id:"w0", label:"Pre-Start", color:"#4A148C", light:"#FAF0FF",
    title:"WSL2 + Claude Code Setup",
    subtitle:"Do this Saturday Feb 22. Nothing on Feb 23 works without it.",
    sessions:[{
      id:"s0", title:"Setup: WSL2 + Claude Code on iBUYPOWER",
      tag:"SETUP", tagColor:"#4A148C", date:"Sat Feb 22 — before Day 1",
      concept:"Your iBUYPOWER runs Windows. WSL2 (Windows Subsystem for Linux) gives you a real Ubuntu environment inside Windows — same filesystem, same commands, same tools as a native Linux machine. Claude Code is an AI coding assistant that runs in your terminal and reads your codebase. These two together are your complete development environment for Month 1.",
      bookRefs:[
        { book:"linux", chapter:1,  note:"Ch 1 Sections 1.1–1.2: These are the first commands you type in WSL2. Shortcuts and file management — read now so the terminal feels familiar from minute one." },
        { book:"linux", chapter:20, note:"Ch 20 Section 20.1: How apt works — you will use apt install for every tool this month. Understand it before you need it." },
        { book:"bash",  chapter:1,  note:"Ch 1: Your first bash commands — variables, echo, read. The pre-start setup script you run is bash. Understanding the syntax means you can read and modify it." },
        { book:"bash",  chapter:14, note:"Ch 14: Sourcing files — explains exactly why we use source ~/.bashrc after adding the API key. This is the most common bash 'why does this not work' confusion." },
      ],
      tasks:[
        "Open PowerShell as Administrator on iBUYPOWER (right-click → Run as Administrator)",
        "Run: wsl --install (installs WSL2 + Ubuntu — takes 5–10 mins, restart when prompted)",
        "Open 'Ubuntu' from Start Menu — set your Linux username and password",
        "Run: sudo apt update && sudo apt upgrade -y",
        "Run: sudo apt install -y git curl wget vim htop net-tools",
        "Install Node.js 22: curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -",
        "Run: sudo apt install -y nodejs && node --version (verify v22.x)",
        "Run: sudo apt install -y python3 python3-pip",
        "Run: pip3 install anthropic flask --break-system-packages",
        "Install Claude Code: npm install -g @anthropic-ai/claude-code",
        "Get API key: console.anthropic.com → API Keys → Create Key",
        "Store key: echo 'export ANTHROPIC_API_KEY="sk-ant-YOUR-KEY"' >> ~/.bashrc",
        "Run: source ~/.bashrc (this is what Ch 14 of the Bash Book explains)",
        "Secure it: chmod 600 ~/.bashrc",
        "Test Claude Code: claude 'list the files in this directory' — must return output",
        "Create workspace: mkdir -p ~/projects && cd ~/projects",
        "Come back to Claude chat and say: 'Pre-start complete' so I can verify",
      ],
      quiz:[
        "What is WSL2 and why do we use it instead of a VM?",
        "Why do we store ANTHROPIC_API_KEY in ~/.bashrc instead of in our code?",
        "What does source ~/.bashrc do and why is it needed after editing the file?",
        "What does chmod 600 ~/.bashrc protect against?",
      ],
      claudePrompt:"Come to Claude and say: 'Pre-start complete — verify my setup is correct before Day 1.'",
    }],
  },
  {
    id:"w1", label:"Week 1", color:"#1A237E", light:"#EEF2FF",
    title:"Linux Foundation + First Agents",
    subtitle:"Rebuild Linux from the ground up. Claude Code live from Session 1. Both every day.",
    sessions:[
      {
        id:"s1", title:"Linux Filesystem + Permissions + Your First Agent",
        tag:"LINUX + AGENT", tagColor:"#8B1A1A", date:"Session 1 — Feb 23",
        concept:"The Linux filesystem is a tree starting at /. Every file has three permission sets: owner, group, everyone else. Each set has read=4, write=2, execute=1 — you add them to get the octal number. chmod 755 = owner everything (4+2+1=7), group and others read+execute (4+0+1=5). Your first AI agent is a Python script that calls Claude's API with a system prompt that defines its role, constraints, and output format.",
        bookRefs:[
          { book:"linux", chapter:1,  note:"Ch 1 Sections 1.1–1.7: Read ALL of Chapter 1 today alongside your terminal. File management, shortcuts, grep, find — every command in today's session is here." },
          { book:"linux", chapter:7,  note:"Ch 7: ls options deep dive — run every example in Section 7.2 in your actual terminal as you read it." },
          { book:"linux", chapter:2,  note:"Ch 2 Section 2.1: Run lsb_release -a to identify your exact WSL2 Ubuntu distribution." },
          { book:"bash",  chapter:6,  note:"Ch 6: Pipes and redirection — when you run find / -perm -u=s 2>/dev/null, the 2>/dev/null is bash redirection. This chapter explains every redirect operator you'll use today." },
        ],
        tasks:[
          "OverTheWire Bandit Levels 0→5: overthewire.org/wargames/bandit — SSH in, solve puzzle, move to next",
          "📗 Open Linux Book Ch 1 and 📘 Bash Book Ch 6 — read alongside every command",
          "Map the filesystem: ls -la /, ls /etc, ls /var, ls /home, ls /usr",
          "Mental math practice: calculate 755, 644, 700, 600 without looking up — this must be instant",
          "Run: find / -perm -u=s -type f 2>/dev/null (find all setuid binaries — the 2>/dev/null hides permission errors)",
          "Run: stat ~/.bashrc (see inode number, permissions, timestamps on a real file)",
          "Run: chmod 750 ~/projects && ls -la ~ (verify the permission change happened)",
          "AGENT: In ~/projects, open claude and say: 'Create a Python agent for Root Solutions, a natural low-sodium seasoning company. System prompt must enforce: healthy ingredients only, always state sodium content, output as markdown with ingredients list and steps.'",
          "Read EVERY line of the generated code before running it — what does the messages array contain?",
          "Run: python3 recipe_agent.py — test with at least 3 different ingredient combinations",
          "AGENT: 'Create a Linux security auditor agent. It accepts a file path, reads the file permissions, and reports: world-writable files (dangerous), setuid binaries (privilege escalation risk), files readable by everyone that should not be. System prompt: you are a senior Linux security engineer.'",
          "Open github.com/dair-ai/Prompt-Engineering-Guide — read the Introduction section now",
          "Create GitHub repo 'claude-agents', push both agents, README explains what each agent does",
        ],
        quiz:[
          "What do the three digits in chmod 755 each represent? Calculate 644, 700, 600 mentally right now.",
          "What is a setuid binary and why is it a potential security escalation path?",
          "What does a system prompt in an AI agent control — what happens if you don't include one?",
          "What does 2>/dev/null do in a bash command — why did we need it in the find command?",
        ],
        claudePrompt:"Come to Claude and say: 'Starting Session 1. Teach me Linux permissions with a concrete example before I touch any commands.'",
      },
      {
        id:"s2", title:"Linux Users + Processes + SSH + Agent Tool Use",
        tag:"LINUX + AGENT", tagColor:"#8B1A1A", date:"Session 2",
        concept:"Linux is a multi-user system — every process runs as a user with specific privileges. /etc/passwd stores user info; /etc/shadow stores hashed passwords (root-only). SSH key pairs are asymmetric cryptography: your private key stays on your machine, your public key goes on the server. Agent tool use is how Claude acts beyond generating text — you define a tool as a JSON schema, Claude decides when to call it, you execute it and send results back.",
        bookRefs:[
          { book:"linux", chapter:11, note:"Ch 11: Read ALL of Chapter 11 — useradd, passwd, userdel, groups. Run every command in a test context so you have muscle memory." },
          { book:"linux", chapter:14, note:"Ch 14: Read ALL of Chapter 14 — SSH is today's core skill. Section 14.4 passwordless connection and Section 14.5 generate keys are critical." },
          { book:"linux", chapter:6,  note:"Ch 6 Section 6.5: Process monitoring — ps aux options explained. Run all the ps commands shown while your Flask app is running." },
          { book:"bash",  chapter:18, note:"Ch 18: Jobs and processes — &, wait, jobs, fg, bg, kill. When you run agents in the background with &, this chapter explains what happens." },
          { book:"bash",  chapter:2,  note:"Ch 2: Exit codes ($?) — after every command you run today, check echo $? to see if it succeeded (0) or failed (non-zero). This is fundamental to scripting." },
        ],
        tasks:[
          "Bandit Levels 5→10",
          "📗 Open Linux Book Ch 11 (Users) and Ch 14 (SSH) alongside every command",
          "📘 Open Bash Book Ch 18 (Jobs) — run a Python script in background with & and observe",
          "Read /etc/passwd: cat /etc/passwd | head -20 — identify every colon-separated field",
          "Read /etc/shadow: sudo cat /etc/shadow | head -3 — notice the hashed password field",
          "Add a test user: sudo useradd testdev && sudo passwd testdev",
          "List groups: groups testdev && id testdev (see UID, GID, supplementary groups)",
          "Clean up: sudo userdel -r testdev (the -r flag removes their home folder — always use it)",
          "Process snapshot: ps aux | head -20 — understand every column: USER PID %CPU %MEM COMMAND",
          "Sort by CPU: ps aux | sort -k3 -rn | head -10 (top 10 CPU consumers right now)",
          "Generate SSH keys: ssh-keygen -t ed25519 -C 'youremail@gmail.com' (accept all defaults)",
          "View public key: cat ~/.ssh/id_ed25519.pub (this is SAFE to share — never share id_ed25519)",
          "Add to GitHub: Settings → SSH Keys → New SSH Key → paste public key → save",
          "Test: ssh -T git@github.com (should say 'Hi username! You have successfully authenticated')",
          "Harden SSH: sudo vim /etc/ssh/sshd_config — set PermitRootLogin no, PasswordAuthentication no",
          "AGENT: 'Build a Python agent with two tools — read_file(path) and write_file(path, content). The agent reads /etc/passwd, identifies all users with login shells, and writes a security report to ~/reports/user-audit.txt. Define each tool as a proper JSON schema dict.'",
          "Read the tool definition carefully — understand the input_schema structure",
          "Run it. Verify: cat ~/reports/user-audit.txt shows real content",
          "Push tool_use_agent.py to 'claude-agents' with README explaining the tool loop",
        ],
        quiz:[
          "What is the difference between /etc/passwd and /etc/shadow — what does each store?",
          "What does the -r flag do in userdel -r and why should you always use it?",
          "Which SSH key goes on the server — public or private? Why does it not matter if someone sees the public key?",
          "Describe the agent tool loop step by step — what happens after Claude returns a tool_use block?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 2. Teach me the SSH key pair — how does asymmetric cryptography make it secure?'",
      },
      {
        id:"s3", title:"Linux Networking + Firewall + Root Solutions Backend",
        tag:"LINUX + AGENT", tagColor:"#8B1A1A", date:"Session 3",
        concept:"Every service you run listens on a port number. ufw (Uncomplicated Firewall) controls which ports are reachable from outside. fail2ban reads your auth logs and temporarily bans IPs that are brute-forcing SSH. Today Claude Code builds the Root Solutions Flask API — a real web server with SQLite database. Your job: read every line of generated code, understand it, and fix any security issues before it goes to GitHub.",
        bookRefs:[
          { book:"linux", chapter:17, note:"Ch 17: Read ALL of Chapter 17 — networking is today's Linux focus. Section 17.5 interface details and Section 17.3 routes are especially important. Run every ip and ifconfig command shown." },
          { book:"linux", chapter:9,  note:"Ch 9–10: Systemd services — fail2ban and nginx both run as systemd services. Understanding systemctl start/stop/status/enable is essential." },
          { book:"linux", chapter:15, note:"Ch 15: SCP — you will need this to move files between machines later. Read both sections now." },
          { book:"bash",  chapter:20, note:"Ch 20: File testing operators — when you write health-check scripts, you need -f (file exists), -d (directory exists), -r (readable). These are bash conditionals you will use every session from now on." },
          { book:"bash",  chapter:9,  note:"Ch 9: Conditionals — if/elif/else with [[ ]] syntax. Your health check scripts use these patterns. Read this before Session 4's bash scripting." },
        ],
        tasks:[
          "Bandit Levels 10→14",
          "📗 Open Linux Book Ch 17 (Networking) and Ch 9–10 (Services)",
          "📘 Open Bash Book Ch 20 (File Testing) — you will use these operators today in test commands",
          "Run: ip addr show — read every field, identify your WSL2 network interface",
          "Run: ip route show — identify the default gateway line",
          "Run: ss -tulpn — all listening ports. What is already listening on WSL2?",
          "Run: curl -v https://api.anthropic.com 2>&1 | head -30 (see real HTTP headers)",
          "Enable firewall: sudo apt install ufw && sudo ufw enable",
          "Configure: sudo ufw default deny incoming && sudo ufw allow ssh && sudo ufw allow 5000",
          "Run: sudo ufw status verbose — verify your rules",
          "Install fail2ban: sudo apt install fail2ban && sudo systemctl status fail2ban",
          "Read auth log: sudo tail -20 /var/log/auth.log (authentication events in real time)",
          "Read Prompt Engineering Guide: Chain-of-Thought section",
          "AGENT: mkdir ~/projects/root-solutions-api && cd ~/projects/root-solutions-api && claude",
          "Prompt: 'Create a complete Flask REST API with SQLite for Root Solutions seasoning company. Tables: products(id, name, description, sodium_mg, category), recipes(id, title, instructions, seasoning_id, prep_time_mins). Endpoints: GET /health, GET /products, GET /recipes, GET /products/:id, POST /generate-recipe that calls Anthropic API to create a recipe from an ingredients list. Use parameterized queries exclusively — no string formatting in SQL queries.'",
          "Read every generated file line by line before running. Open Bash Book for any syntax you don't recognise.",
          "Run: python3 app.py — test: curl localhost:5000/health, curl localhost:5000/products",
          "AGENT: 'Review this entire Flask API for: SQL injection vulnerabilities (check every query), missing error handling (what happens on bad input?), hardcoded secrets, missing input validation. Give exact line numbers for every issue found.'",
          "Fix every issue manually — understand what you are fixing and why",
          "Push 'root-solutions-api' to GitHub with README containing curl test commands",
        ],
        quiz:[
          "What does ss -tulpn show — what does each flag mean?",
          "What is SQL injection and how do parameterized queries prevent it at a technical level?",
          "What does ufw default deny incoming do — why is this the right starting posture?",
          "What is the difference between a port and an IP address?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 3. Explain what a TCP port is and why Flask binds to port 5000.'",
      },
      {
        id:"s4", title:"Bash Scripting + Agent Reflection Loops",
        tag:"BASH + AGENT", tagColor:"#1B5E20", date:"Session 4 — PRIMARY BASH SESSION",
        concept:"Bash scripting is DevOps work — not optional background knowledge. set -euo pipefail is the mandatory safety header: -e exits on any error, -u treats unset variables as errors, -o pipefail catches errors inside pipes. A reflection loop is an agent that evaluates its own output and retries if quality is below a threshold — this is how you get outputs that improve across iterations instead of accepting the first mediocre result.",
        bookRefs:[
          { book:"bash",  chapter:9,  note:"Ch 9: Conditionals — the entire if/elif/else syntax, [[ vs [, -f -d -z -n operators. Your health-check script uses all of these. Read this before writing a single line of your script." },
          { book:"bash",  chapter:10, note:"Ch 10: Loops — for and while loops. Your script loops through a list of checks. This chapter has every loop pattern you need." },
          { book:"bash",  chapter:11, note:"Ch 11: Functions — how to write a reusable log() function, how local variables work inside functions, how to return values." },
          { book:"bash",  chapter:12, note:"Ch 12: Debugging — set -x traces every command before executing it. When your script breaks, set -x at the top. This chapter explains every debug technique." },
          { book:"bash",  chapter:24, note:"Ch 24: Best practices — set -euo pipefail explained in full. Quoting rules. How to use shellcheck. READ THIS FIRST before writing your script." },
          { book:"linux", chapter:4,  note:"Ch 4 Section 4.2: Shell utilities — PS1 customisation, Ctrl shortcuts, command history. Make your shell faster today." },
          { book:"linux", chapter:13, note:"Ch 13: tee command — your agents pipe output through tee to write to a log file AND display on screen simultaneously. Critical for monitoring long-running agents." },
        ],
        tasks:[
          "Bandit Levels 14→18",
          "📘 Open Bash Book Ch 24 (Best Practices) FIRST — read it before writing any script today",
          "📘 Then open Ch 9 (Conditionals), Ch 10 (Loops), Ch 11 (Functions), Ch 12 (Debugging)",
          "📗 Open Linux Book Ch 13 (tee) — use tee when you run your script at the end",
          "Write ~/scripts/health-check.sh FROM SCRATCH — no Claude. This tests your own understanding.",
          "Line 1 must be: #!/usr/bin/env bash",
          "Line 2 must be: set -euo pipefail",
          "Add a log() function: log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }",
          "Script checks: ANTHROPIC_API_KEY is set (-n flag), python3 is available (command -v), Flask API responds (curl -sf localhost:5000/health)",
          "Each check: log the result, exit 1 with a clear error message if failed",
          "Use tee to run it: ./health-check.sh | tee ~/logs/health.log (output to screen AND file)",
          "Install shellcheck: sudo apt install shellcheck && shellcheck ~/scripts/health-check.sh",
          "Fix EVERY warning shellcheck reports — look up each one in Bash Book Ch 24",
          "Schedule with cron: crontab -e → add: */15 * * * * ~/scripts/health-check.sh >> ~/logs/health.log 2>&1",
          "Verify cron running: crontab -l && tail -f ~/logs/health.log",
          "Read Prompt Engineering Guide: Self-Consistency section",
          "AGENT: 'Add a reflection loop to the Root Solutions recipe generator. Flow: (1) Generate a recipe, (2) Evaluate it: score sodium_compliance (under 400mg = 10, over 600mg = 0), ingredient_availability (common supermarket items 1–10), cooking_complexity (beginner-friendly 1–10). (3) If average score < 7, regenerate using the critique as additional context. Max 3 iterations. Log each attempt: attempt_number, scores, critique used, final_score.'",
          "Run the agent 5 times with different inputs — observe how many iterations each takes",
          "Write a bash script that calls /generate-recipe 5 times and saves results — use a for loop (Ch 10)",
          "Push health-check.sh + reflection loop update to GitHub",
        ],
        quiz:[
          "What does each part of set -euo pipefail do — what bug does each flag catch?",
          "Write a bash function from memory: takes a filename argument, checks if it exists and is readable, logs the result.",
          "What does the tee command do — draw the data flow when running: ./script.sh | tee log.txt",
          "What is the agent reflection loop — why does capping iterations at 3 matter?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 4. Bash scripting session. Teach me set -euo pipefail — what bug does each flag prevent?'",
      },
      {
        id:"s5", title:"Git Mastery + Roblox Multi-Agent Pipeline",
        tag:"GIT + AGENT", tagColor:"#1A237E", date:"Session 5",
        concept:"Git tracks every change to every file. Branches let you work on features without breaking main. The Roblox game needs a 3-agent pipeline: GameDesigner outputs a JSON spec, LuaWriter turns that spec into Roblox Lua code, CodeReviewer checks for security vulnerabilities. The orchestrator runs them in sequence and handles retries. This is the core multi-agent pattern you will use across all three projects.",
        bookRefs:[
          { book:"linux", chapter:15, note:"Ch 15: SCP — use this to copy generated Lua files from WSL2 to Windows for Roblox Studio import. Both sections are short — read now." },
          { book:"linux", chapter:1,  note:"Ch 1 Section 1.5: grep -R and find — search your growing codebase for patterns across multiple files. Essential as projects get larger." },
          { book:"bash",  chapter:23, note:"Ch 23: getopts — when your orchestrator script accepts flags like --mechanic 'health-system' --retry 3, getopts parses them. Build this into your orchestrator today." },
          { book:"bash",  chapter:18, note:"Ch 18: Jobs and processes — run the orchestrator in background with & while monitoring its logs with tail -f in another terminal. This is how you run long agent pipelines." },
        ],
        tasks:[
          "Bandit Levels 18→22",
          "📗 Open Linux Book Ch 15 (SCP) and 📘 Bash Book Ch 23 (getopts)",
          "learngitbranching.js.org — complete ALL levels (1–2 hrs — after this git is permanent memory)",
          "Configure git: git config --global user.name 'Your Name' && git config --global user.email 'you@email.com'",
          "Switch all repos to SSH: git remote set-url origin git@github.com:username/repo.git",
          "Verify: git remote -v (should show git@ not https://)",
          "Create dev branches: git checkout -b dev && git push -u origin dev (on all 2 repos)",
          "GitHub branch protection: root-solutions-api → Settings → Branches → Protect main",
          "GoalKicker Git Book: goalkicker.com/GitBook — read the entire book (it is short)",
          "Practice: git log --oneline --graph --all, git stash, git stash pop, git bisect",
          "Read Prompt Engineering Guide: ReAct Prompting section (Reasoning + Acting interleaved)",
          "AGENT: 'Design and build a 3-agent Roblox combat game pipeline as roblox_orchestrator.py. Agent 1 — GameDesigner: takes mechanic name, outputs JSON with: player_stats, interaction_rules, edge_cases list, server_validation_required bool. Agent 2 — LuaWriter: takes JSON spec, outputs complete Roblox Lua with server-side validation on all RemoteEvents. Agent 3 — CodeReviewer: audits Lua for: client-trusted values (any damage taken from client), DataStore calls missing pcall, memory leaks from uncleared connections, Scripts that should be LocalScripts. Orchestrator: retries LuaWriter once if reviewer finds CRITICAL issues. Accept --mechanic flag via sys.argv.'",
          "Run pipeline for: 'player health and damage system'",
          "Run pipeline for: 'weapon pickup and inventory system'",
          "Push 'roblox-combat-game' repo: orchestrator.py + generated Lua + ASCII pipeline diagram in README",
        ],
        quiz:[
          "What is the difference between git merge and git rebase — when do you use each?",
          "Explain the multi-agent orchestrator pattern — why use 3 agents instead of asking one agent to do everything?",
          "What is a Roblox RemoteEvent and why must damage calculation always run on the server?",
          "What does git stash do and when would you use it?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 5. Explain multi-agent orchestration — why specialists outperform a generalist agent.'",
      },
    ],
  },
  {
    id:"w2", label:"Week 2", color:"#1B5E20", light:"#F1F8E9",
    title:"Docker + Containerised Agents",
    subtitle:"All 3 projects Dockerized. Agents run on real infrastructure. CI/CD live.",
    sessions:[
      {
        id:"s6", title:"Docker Fundamentals + Parallel Agents",
        tag:"DOCKER + AGENT", tagColor:"#1B5E20", date:"Session 6",
        concept:"A Docker container is an isolated process with its own filesystem — not a VM. An image is the blueprint (read-only layers), a container is the running instance (adds a writable layer on top). -p 5000:5000 maps host port 5000 to container port 5000. Parallel agents use asyncio.gather() to run multiple Claude API calls concurrently — I/O-bound tasks like API calls are perfect for async because the bottleneck is waiting for the network, not the CPU.",
        bookRefs:[
          { book:"linux", chapter:5, note:"Ch 5: Disk Space — run df -h and docker system df to see how much space images are consuming. Docker images stack up fast — learn to clean them." },
          { book:"linux", chapter:6, note:"Ch 6 Section 6.1: vmstat and iostat — run these while Docker pulls images and while containers are running. See the real CPU and I/O numbers." },
          { book:"bash",  chapter:18, note:"Ch 18: Jobs — run docker logs -f container & in background to tail logs while running tests in foreground. This is how you monitor running containers from bash." },
        ],
        tasks:[
          "Bandit Levels 22→26",
          "📗 Open Linux Book Ch 5–6 and 📘 Bash Book Ch 18",
          "Install Docker in WSL2: curl -fsSL https://get.docker.com | sh",
          "Add to docker group: sudo usermod -aG docker $USER && newgrp docker",
          "Verify: docker --version && docker run hello-world",
          "Run interactive Ubuntu container: docker run -it ubuntu:22.04 bash (notice isolated filesystem)",
          "Practice all core commands: docker ps, stop, rm, images, rmi, exec, logs, stats",
          "Run named container with port: docker run -d -p 5000:5000 --name test-api python:3.11-slim sleep infinity",
          "Exec into it: docker exec -it test-api bash — install python3, note the isolated environment",
          "Check image disk usage: docker system df",
          "Clean up: docker stop test-api && docker rm test-api && docker system prune",
          "AGENT: 'Refactor the Roblox orchestrator to use asyncio throughout. All GameDesigner calls run concurrently with asyncio.gather(). All LuaWriter calls run concurrently after designs complete. All CodeReviewer calls run concurrently. Add timing instrumentation: log start time, end time, and duration for each stage and overall. Print a timing summary table at the end.'",
          "Run the parallel pipeline for 3 mechanics simultaneously",
          "Record: sequential time estimate vs actual parallel time — what is the speedup?",
          "Push updated orchestrator with timing table in README",
        ],
        quiz:[
          "What is the difference between a Docker image and a container — what is a 'writable layer'?",
          "What does -p 5000:5000 do — what happens if you use -p 8080:5000 instead?",
          "Why does asyncio speed up API calls but NOT CPU-heavy computation?",
          "What does docker system prune do and when should you be careful with it?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 6. Explain Docker containers vs VMs — what makes containers start in milliseconds?'",
      },
      {
        id:"s7", title:"Dockerfile + Container Security + Agent Memory",
        tag:"DOCKER + AGENT", tagColor:"#1B5E20", date:"Session 7",
        concept:"A Dockerfile builds your image layer by layer. Docker caches each layer — if layer N changes, all layers after N rebuild. That is why you COPY requirements.txt (changes rarely) and run pip install before COPY . . (changes constantly). Running as root inside containers is a critical flaw — a container escape gives root on the host. Agent memory solves the stateless problem: Claude forgets everything between calls. Loading a JSON file at startup and saving at shutdown makes agents session-aware.",
        bookRefs:[
          { book:"linux", chapter:9,  note:"Ch 9–10: systemctl — today you write a systemd .service file for the Flask API. Understanding enable/start/status/restart is essential. Read all of Chapter 10." },
          { book:"linux", chapter:11, note:"Ch 11 Section 11.3: useradd — the USER directive in Dockerfile uses the same concept. You add a non-root user inside the container for security." },
          { book:"bash",  chapter:12, note:"Ch 12: Debugging with set -x — add this to your Dockerfile RUN scripts when builds fail unexpectedly. Seeing every command traced helps diagnose layer failures." },
          { book:"bash",  chapter:5,  note:"Ch 5: Heredocs — Dockerfile RUN commands that span multiple lines use the same heredoc concept. Understanding <<EOF helps you write clean multi-line RUN instructions." },
        ],
        tasks:[
          "📗 Open Linux Book Ch 9–10 (Services) and 📘 Bash Book Ch 12 (Debugging)",
          "Write Dockerfile for root-solutions-api FROM SCRATCH without Claude — this tests your own understanding",
          "Must include: FROM python:3.11-slim, WORKDIR /app, COPY requirements.txt ., RUN pip install -r requirements.txt --no-cache-dir, COPY . ., RUN useradd -m appuser, USER appuser, EXPOSE 5000, CMD ["python3","app.py"]",
          "Write .dockerignore: .env, __pycache__, .git, *.pyc, *.pyo",
          "Build: docker build -t root-solutions:v1 . (watch the layer caching)",
          "Test: docker run -d -p 5000:5000 -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY root-solutions:v1",
          "Verify: curl localhost:5000/health && curl localhost:5000/products",
          "Inspect: docker exec root-solutions-test whoami (should NOT be root)",
          "Install trivy for vulnerability scanning: check GitHub releases for trivy Linux binary",
          "Scan: trivy image root-solutions:v1 — document every HIGH and CRITICAL CVE found",
          "Fix the most critical issues, rebuild, scan again — compare before/after",
          "AGENT: 'Add persistent session memory to the Roblox orchestrator. On startup: load roblox_memory.json if it exists, print a summary of what was built previously. Memory stores: mechanics_built (list of names), reviewer_critiques (list of strings), fixes_applied (list), game_state_description (string). On shutdown: write updated memory atomically — write to roblox_memory.tmp then rename to roblox_memory.json.'",
          "Run session 1, then session 2 — verify session 2 prints session 1 memory on startup",
          "AGENT: 'Generate a systemd service file for root-solutions-api that starts on boot, restarts on failure after 5 seconds, and runs as the non-root user appuser.'",
          "Push Dockerfiles + memory system to GitHub",
        ],
        quiz:[
          "Explain Docker layer caching — why does COPY requirements.txt before COPY . . save build time?",
          "What vulnerability does running as root inside a container create in a worst-case scenario?",
          "How does the agent memory pattern work — what is atomic file writing and why does it prevent corruption?",
          "What does systemctl enable servicename do that systemctl start servicename does not?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 7. Teach me Docker layer caching — draw the rebuild chain when I change one Python file.'",
      },
      {
        id:"s8", title:"docker-compose + RAG Pipeline for AI Platform",
        tag:"DOCKER + AGENT", tagColor:"#1B5E20", date:"Session 8",
        concept:"docker-compose defines multi-container apps in YAML. Containers on the same compose network resolve each other by service name — Flask reaches the database by calling 'db:5432', not '172.x.x.x'. RAG (Retrieval Augmented Generation): documents get split into 200-word chunks → each chunk gets embedded into a high-dimensional vector → vectors stored in ChromaDB → a question gets embedded → top 5 most similar chunks retrieved → Claude answers from that context. Businesses are completely isolated — one company's documents cannot be queried by another.",
        bookRefs:[
          { book:"linux", chapter:17, note:"Ch 17 Section 17.1: /etc/hosts — docker-compose creates internal DNS so containers find each other by service name. This is the same concept as /etc/hosts, automated." },
          { book:"linux", chapter:8,  note:"Ch 8: tar — you will tar the ChromaDB data directory for backups. All sections relevant." },
          { book:"bash",  chapter:8,  note:"Ch 8: Arrays — when ingesting multiple documents, use a bash array to loop through files and call ingest.py on each. This chapter has every array pattern you need." },
          { book:"bash",  chapter:15, note:"Ch 15: Process substitution — diff <(python3 query.py 'question' business-001) <(python3 query.py 'question' business-002) — compare outputs from two businesses without temp files." },
        ],
        tasks:[
          "📗 Open Linux Book Ch 17 Section 17.1 and 📘 Bash Book Ch 8 (Arrays)",
          "Write docker-compose.yml for root-solutions-api: services api and nginx (placeholder for now)",
          "Practice: docker-compose up -d, ps, logs api -f, exec api python3 --version, down -v",
          "Test container DNS: docker-compose exec api ping nginx — containers find each other by service name",
          "Install: pip3 install chromadb sentence-transformers --break-system-packages",
          "AGENT: 'Build the complete RAG pipeline for the AI chatbot platform. Create three files: (1) ingest.py — reads a .txt file path and business_id argument, splits text into 200-word chunks with 50-word overlap, embeds each chunk using sentence-transformers all-MiniLM-L6-v2, stores in ChromaDB collection named business_id. Prints chunk count on completion. (2) query.py — takes question and business_id arguments, embeds the question, retrieves 5 most similar chunks from that business collection, sends to Claude with system prompt: Answer only from the provided context. If the answer is not in the context, say so clearly. Returns the answer. (3) app.py Flask endpoint POST /chat accepting JSON {question: string, business_id: string} — calls query.py logic, returns {answer: string, sources_used: int}.'",
          "Create test data: write a Root Solutions product description .txt file with 10 products",
          "Test ingest: python3 ingest.py root-solutions-products.txt business-001",
          "Test query: python3 query.py 'what chicken seasonings do you carry?' business-001",
          "Verify isolation: create business-002 collection and confirm business-001 query cannot access it",
          "Write docker-compose.yml for AI platform: api service + chromadb service with named volume for persistence",
          "Push 'tailored-ai-platform' repo: ingest.py + query.py + app.py + docker-compose.yml + test data file",
        ],
        quiz:[
          "How do containers on the same docker-compose network find each other without knowing IP addresses?",
          "What is a text embedding — what does it mean for two similar texts to have similar vectors?",
          "Explain the full RAG flow: from a user's question to Claude's answer, every step.",
          "What does 50-word overlap in chunking prevent — what problem does it solve?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 8. Explain RAG with a diagram — how does a business document become an answer to a customer question?'",
      },
      {
        id:"s9", title:"GitHub Actions CI/CD + Agents Triggered by Git Events",
        tag:"CI/CD + AGENT", tagColor:"#4A148C", date:"Session 9",
        concept:"CI/CD: every git push automatically triggers testing (CI) and deployment (CD). GitHub Actions workflow files are YAML — but the run: steps inside jobs are bash. Every command in a run: step is bash. GitHub Secrets stores your API keys encrypted in GitHub's servers, injected as environment variables into workflow runs — they never appear in logs or code.",
        bookRefs:[
          { book:"bash",  chapter:6,  note:"Ch 6: Pipes and redirection — GitHub Actions run: steps pipe commands together constantly. 'docker build . | tee build.log', 'pytest 2>&1 | tee test-results.txt' — every pipe in your workflow is Bash Ch 6." },
          { book:"bash",  chapter:2,  note:"Ch 2: Exit codes — GitHub Actions stops a job if any step exits non-zero. Understanding $? and why set -e matters means you understand why CI fails when a test fails." },
          { book:"bash",  chapter:19, note:"Ch 19: Pattern matching — case statements in workflow bash steps let you handle different branches differently: case $GITHUB_REF in refs/heads/main) deploy ;; *) echo skip ;; esac" },
          { book:"linux", chapter:3,  note:"Ch 3: Kernel info — GitHub Actions runs on ubuntu-latest. uname -a in a workflow step confirms the exact Ubuntu version running your CI." },
        ],
        tasks:[
          "📘 Open Bash Book Ch 6 (Pipes) and Ch 2 (Exit Codes) — everything in CI/CD run: steps is bash",
          "mkdir -p .github/workflows in root-solutions-api",
          "AGENT: 'Write a GitHub Actions workflow file .github/workflows/test.yml that: triggers on push to any branch, runs on ubuntu-latest, uses actions/setup-python@v4 with python 3.11, installs dependencies from requirements.txt, runs pytest tests/ and exits non-zero if any test fails. Show complete YAML.'",
          "Read every line of the generated YAML — what does 'on:', 'jobs:', 'steps:' each mean?",
          "git add .github/ && git commit -m 'Add: CI test pipeline' && git push",
          "Go to GitHub → Actions tab — watch the run in real time",
          "Break a test intentionally → push → see red X → fix → push → see green checkmark",
          "Add GitHub Secrets: Settings → Secrets → Actions → New: ANTHROPIC_API_KEY and GHCR_TOKEN",
          "AGENT: 'Extend the workflow: on push to main only — build Docker image and push to ghcr.io/yourusername/root-solutions:latest using GHCR_TOKEN secret. After push — trigger a smoke test job that calls GET /health on the deployed service and fails if response is not 200.'",
          "AGENT: 'Add pip caching to the workflow using actions/cache. Cache key: hash of requirements.txt file. Restore key: ubuntu-latest-pip-. Show how to add this as a step before pip install.'",
          "Measure: compare workflow duration before caching vs after",
          "AGENT: 'Write a GitHub Actions job triggered on pull_request that: gets the PR diff using the GitHub API, sends it to Claude with system prompt: You are a senior Python engineer reviewing a pull request. Check for: bugs, security issues, missing error handling, and hardcoded secrets. Post the review as a PR comment using the GitHub API with the GITHUB_TOKEN secret.'",
          "Test the PR bot by opening a real PR on root-solutions-api",
        ],
        quiz:[
          "What is the difference between CI and CD — what does each automate?",
          "Why do we use GitHub Secrets instead of env vars directly in the YAML file?",
          "What does actions/cache do and why does hashing requirements.txt make a smart cache key?",
          "What is the connection between bash exit codes and GitHub Actions job success/failure?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 9. Walk me through the full CI/CD flow — from git push to deployed Docker container, every step.'",
      },
      {
        id:"s10", title:"Nginx + SSL + AI Platform Live at Real URL",
        tag:"DEVOPS + AGENT", tagColor:"#0D47A1", date:"Session 10",
        concept:"Nginx is a reverse proxy: it receives all incoming traffic on port 80/443 and routes to the right backend service. Without it, users would need to know which port each service runs on. With it, everything enters on standard web ports and Nginx handles routing. SSL encrypts traffic between browser and server — without it, anyone on the network can read the data in transit. Today the AI platform gets a real URL a business can visit.",
        bookRefs:[
          { book:"linux", chapter:17, note:"Ch 17 Section 17.2: DNS — when you point a domain at Railway or Render, understanding /etc/resolv.conf and DNS resolution explains how the domain finds your server." },
          { book:"linux", chapter:9,  note:"Ch 9 Section 9.2: systemctl reload nginx — after every nginx config change you run nginx -t to test then systemctl reload to apply without dropping connections." },
          { book:"bash",  chapter:20, note:"Ch 20: File testing — before reloading nginx, test: [[ -f /etc/nginx/sites-enabled/root-solutions ]] && nginx -t || echo 'Config file missing'. This pattern prevents reloading a broken config." },
        ],
        tasks:[
          "📗 Open Linux Book Ch 17 Section 17.2 (DNS) and Ch 9 (Services)",
          "Install nginx: sudo apt install nginx && sudo systemctl status nginx",
          "Read the default config: sudo cat /etc/nginx/nginx.conf (understand events, http, server blocks)",
          "Create site config: sudo vim /etc/nginx/sites-available/root-solutions",
          "Config content: server { listen 80; server_name _; location / { proxy_pass http://localhost:5000; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; } }",
          "Enable: sudo ln -s /etc/nginx/sites-available/root-solutions /etc/nginx/sites-enabled/",
          "Test config: sudo nginx -t (must say 'test is successful' before reloading)",
          "Apply: sudo systemctl reload nginx",
          "Verify: curl http://localhost/health (hitting port 80, routed to 5000)",
          "Monitor: sudo tail -f /var/log/nginx/access.log (watch requests hit in real time)",
          "Add rate limiting: limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s; in http block",
          "SSL: sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/dev.key -out /etc/ssl/certs/dev.crt",
          "Add SSL server block on port 443 in nginx config, re-test and reload",
          "AGENT: 'Build business onboarding for the AI platform: POST /business/register (creates UUID business_id, stores in SQLite businesses table, returns {business_id, api_key}), POST /business/upload (accepts multipart file + business_id header, saves to disk, ingests to ChromaDB, returns {chunks_ingested}), GET /business/widget.js (returns JavaScript that creates a floating bottom-right chat button, uses business_id from query param, POSTs questions to /chat). Add API key authentication middleware to /business/upload and /chat.'",
          "AGENT: 'Write a simple landing page HTML: headline, 3-feature value prop, register form that calls /business/register, shows embed code after registration.'",
          "Deploy to Railway.app: connect GitHub repo, add ANTHROPIC_API_KEY env var, deploy",
          "Get live URL. Test from your phone. Send to your brother.",
        ],
        quiz:[
          "What is a reverse proxy — draw the request flow from browser to Flask when Nginx is in front.",
          "What does SSL encrypt — what can someone on the network see if you use HTTP instead of HTTPS?",
          "What does proxy_set_header X-Real-IP $remote_addr do and why does Flask need it?",
          "What is rate limiting at the Nginx level and what attack does it mitigate?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 10. Draw the full request flow from a browser to my Flask API when Nginx is in front.'",
      },
    ],
  },
  {
    id:"w3", label:"Week 3", color:"#880E4F", light:"#FFF0F5",
    title:"Monitoring + Logging + Published Game",
    subtitle:"Prometheus. Grafana. Loki. Every service observed. Roblox game published.",
    sessions:[
      {
        id:"s11", title:"Prometheus + Grafana + Agent Metrics",
        tag:"MONITORING", tagColor:"#880E4F", date:"Session 11",
        concept:"The three pillars of observability: metrics (numbers over time — request rate, latency, error rate), logs (discrete events — what happened when), traces (path of one request through multiple services). Prometheus pulls from /metrics endpoints every 15 seconds. Counter = always goes up (total requests). Gauge = goes up and down (active connections). Histogram = measures distribution of values (p95 latency). Grafana visualises Prometheus data and sends alerts.",
        bookRefs:[
          { book:"linux", chapter:6, note:"Ch 6 Section 6.1: Run vmstat, iostat, netstat before installing Prometheus. These are the raw Linux equivalents of what Prometheus automates. See the numbers manually first, then see how Prometheus persists them." },
          { book:"linux", chapter:5, note:"Ch 5 Section 5.2: df -h — Prometheus stores metrics on disk. Check available space before starting it, and configure --storage.tsdb.retention.time=15d to prevent unlimited growth." },
          { book:"bash",  chapter:9,  note:"Ch 9: Conditionals — write a bash alerting script: if curl -sf localhost:5000/health returns non-zero, send notification. This is manual alerting before Grafana alerting is configured." },
        ],
        tasks:[
          "📗 Open Linux Book Ch 6 Section 6.1 — run vmstat 1 5, iostat -x 1 5, netstat -tulpn",
          "Check disk: df -h (Prometheus needs sustained disk space — verify you have it)",
          "Install: pip3 install prometheus-flask-exporter prometheus-client --break-system-packages",
          "Add to Flask app: from prometheus_flask_exporter import PrometheusFlaskExporter; PrometheusFlaskExporter(app)",
          "Restart Flask and test: curl localhost:5000/metrics — you should see prometheus-format output",
          "Run Prometheus: docker run -d -p 9090:9090 --name prometheus -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus",
          "Create prometheus.yml: scrape_configs: - job_name: root-solutions, static_configs: [{targets: ['host.docker.internal:5000']}]",
          "Visit localhost:9090 → Expression browser → run: rate(http_requests_total[5m])",
          "Run Grafana: docker run -d -p 3000:3000 --name grafana grafana/grafana",
          "Login localhost:3000 (admin/admin, change password) → Add Prometheus data source",
          "Create dashboard panels: HTTP request rate, error rate (5xx), p95 response time",
          "AGENT: 'Add custom Prometheus metrics to root-solutions-api: (1) claude_api_duration_seconds Histogram with buckets [0.5, 1, 2, 5, 10, 30] and labels [endpoint, model], (2) recipe_reflection_iterations Counter with label [sodium_category], (3) active_claude_calls Gauge. Wrap every Claude API call in a context manager that updates these metrics.'",
          "AGENT: 'Add /health endpoint to every service: returns JSON {status: ok, uptime_seconds: N, model: claude-sonnet-4-6, last_request_iso: timestamp, version: git_sha}.'",
          "Add Prometheus alerting rule: alert if error rate > 1% for 5 minutes",
          "AGENT: 'Export the Grafana dashboard as JSON so I can commit it to homelab-infrastructure repo.'",
        ],
        quiz:[
          "What are the three pillars of observability and what is the key difference between each?",
          "What is the difference between Counter, Gauge, and Histogram — give a real example of each from your infrastructure.",
          "What does rate(http_requests_total[5m]) calculate — what does the 5m window mean?",
          "Why must every service have a /health endpoint — what does it enable?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 11. Explain Prometheus metrics — what is the difference between Counter, Gauge, and Histogram?'",
      },
      {
        id:"s12", title:"Loki Centralised Logging + Roblox Game Published",
        tag:"MONITORING + PROJECT", tagColor:"#880E4F", date:"Session 12",
        concept:"When you have 10 containers, SSHing into each one to read logs is not scalable — you need all logs queryable from one place. Promtail collects log lines from files and containers and ships them to Loki. Loki stores them indexed by labels. Grafana queries Loki with LogQL. Structured JSON logging means every log line is a queryable object, not a string you grep through.",
        bookRefs:[
          { book:"linux", chapter:9,  note:"Ch 10 Section 10.1: journalctl — Loki can ingest systemd journal logs. journalctl -xe is how you read them manually before Loki is set up. Understanding journalctl means you know what Loki is collecting." },
          { book:"bash",  chapter:6,  note:"Ch 6: Redirection — your agents use: python3 agent.py 2>&1 | tee agent.log. The 2>&1 redirects stderr to stdout so both go to the log file. This chapter explains exactly why." },
          { book:"bash",  chapter:16, note:"Ch 16: Arithmetic — in logging scripts, calculate request rates: requests_per_min=$((total_requests / elapsed_seconds * 60)). Basic arithmetic in bash without external tools." },
        ],
        tasks:[
          "📗 Open Linux Book Ch 10 Section 10.1 (journalctl) and 📘 Bash Book Ch 6 (Redirection)",
          "Run Loki: docker run -d --name loki -p 3100:3100 grafana/loki:latest",
          "Create promtail-config.yml: scrape nginx access log and ~/logs/agent-requests.log",
          "Run Promtail: docker run -d --name promtail -v /var/log:/var/log -v ~/promtail-config.yml:/etc/promtail/config.yml grafana/promtail:latest",
          "Add Loki data source in Grafana (URL: http://localhost:3100)",
          "Query: {job='nginx'} |= 'POST' (all POST requests to nginx — should see /chat calls)",
          "AGENT: 'Add structured JSON logging to all agents and Flask apps. Replace all print() and logging calls with a json_log(level, action, **kwargs) function that writes: {timestamp, level, agent_name, request_id, action, duration_ms, tokens_used, success, error}. Every Flask request gets a UUID request_id at entry, carried through to agent calls.'",
          "Add Grafana log panel: last 50 agent errors from Loki, filtered by level=ERROR",
          "Add all services to a single master docker-compose.yml: prometheus, grafana, loki, promtail, root-solutions, ai-platform",
          "Test: docker-compose up -d — all services live with one command",
          "ROBLOX: Run agent pipeline for final 2 mechanics: 'spectator mode for dead players' and 'end-of-round stats screen with MVP'",
          "Final security review: AGENT: 'Do a final security audit of all Lua files in roblox-combat-game. For each file: list every RemoteEvent and whether it validates inputs server-side, every DataStore call and whether it has pcall error handling, every connection and whether it is cleared on cleanup. Produce a table: issue, file, line, severity, fix applied.'",
          "Fix every CRITICAL issue. Import all Lua into Roblox Studio. Full playtest.",
          "Generate store listing with Claude → PUBLISH the game → share URL with nephew",
        ],
        quiz:[
          "What does Promtail do — what is its relationship to Loki?",
          "What is structured logging — what makes JSON logs more useful than plain text logs?",
          "What does 2>&1 do in a bash command — why do we use it when logging agent output?",
          "Why must all Roblox damage calculation run server-side — what exploit does client-side trust enable?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 12. Explain the Loki + Promtail + Grafana stack — how does a log line in my Flask app appear in a Grafana dashboard?'",
      },
      {
        id:"s13", title:"Linux Security Hardening + Production Agent Hardening",
        tag:"SECURITY", tagColor:"#4A148C", date:"Session 13",
        concept:"Security hardening is systematic attack surface reduction. Lynis audits your Linux system against hundreds of security checks and gives a hardening index score. Every finding has a reason — understanding the reason is more important than applying the fix blindly. Agent hardening means input sanitization (never trust user input), output validation (verify response structure before returning), graceful fallback (handle API unavailability), and cost controls (cache identical requests).",
        bookRefs:[
          { book:"linux", chapter:14, note:"Ch 14 Section 14.3: sshd_config — today you complete the full hardening list. Beyond PermitRootLogin no: also set MaxAuthTries 3, LoginGraceTime 30, ClientAliveInterval 300, AllowUsers yourusername only." },
          { book:"linux", chapter:9,  note:"Ch 9–10: systemctl --failed — check for failed services. service --status-all — list every service. Disable anything not needed. Every running service is a potential attack surface." },
          { book:"bash",  chapter:12, note:"Ch 12: Debugging with set -x — use this in your security audit bash scripts to trace every command. When Lynis runs a check, you can reproduce it manually with tracing to understand exactly what it tested." },
          { book:"bash",  chapter:20, note:"Ch 20: File testing — the heart of bash security scripts: [[ -w /etc/passwd ]] && echo DANGER — world-writable system files, [[ -x /usr/bin/something ]] — unexpected executables. Build a custom audit script using these operators." },
        ],
        tasks:[
          "📗 Open Linux Book Ch 14 Section 14.3 and 📘 Bash Book Ch 12 (Debugging) + Ch 20 (File Testing)",
          "Complete sshd_config hardening: MaxAuthTries 3, LoginGraceTime 30, AllowUsers yourusername, X11Forwarding no, ClientAliveInterval 300",
          "Restart and verify: sudo systemctl restart ssh && sudo systemctl status ssh",
          "Install Lynis: sudo apt install lynis",
          "Run full audit: sudo lynis audit system 2>&1 | tee ~/security/lynis-before.txt",
          "Record your hardening index score from the report",
          "Read every WARNING and SUGGESTION line — implement at least 5 recommendations",
          "Write a custom bash security audit script using Bash Book Ch 20 file testing operators",
          "Script checks: world-writable files in /, setuid binaries not in whitelist, SSH config values, empty passwords",
          "Run Lynis again: sudo lynis audit system 2>&1 | tee ~/security/lynis-after.txt",
          "Diff the two reports: diff ~/security/lynis-before.txt ~/security/lynis-after.txt | grep 'Hardening index'",
          "Check all services: systemctl --failed && service --status-all | grep '[ + ]'",
          "Run trivy on all Docker images — fix any HIGH severity CVEs",
          "AGENT: 'Harden root-solutions-api for production: (1) Input sanitization — strip HTML from all string inputs with bleach library, limit ingredients list to maximum 20 items, reject empty requests with HTTP 400 and descriptive error message. (2) Output validation — verify recipe response contains required fields: title string, ingredients list with at least 3 items, instructions string, sodium_estimate_mg integer. If missing fields, retry once, then return HTTP 502 with explanation. (3) Fallback — if Claude API raises an exception, query SQLite for the 3 highest-rated cached recipes matching the category and return those with a header X-Fallback: true. (4) Cost control — use Redis (or dict cache for now) to cache responses by hash of sorted ingredients list, TTL 1 hour.'",
          "Push security-audit.md to homelab-infrastructure repo documenting before/after scores",
        ],
        quiz:[
          "What is the Lynis hardening index — what does a score of 65 vs 85 mean practically?",
          "Write the bash file-testing command to find all world-writable files in /etc — explain each part.",
          "What is input sanitization — give a concrete example of an attack it prevents against your recipe API.",
          "What should an agent's fallback behavior do when the Claude API is unavailable?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 13. Explain defense in depth — why do we harden at multiple layers instead of relying on the firewall?'",
      },
      {
        id:"s14", title:"Performance Tuning + Advanced Agent Patterns",
        tag:"DEVOPS + AGENT", tagColor:"#0D47A1", date:"Session 14",
        concept:"Performance problems are rarely where you expect. vmstat column 'wa' (I/O wait) tells you if your bottleneck is disk. iostat shows disk read/write rates. Container resource limits prevent one container from starving others. Tree of Thoughts prompting has Claude explore multiple solution paths before committing. Plan-Execute-Verify adds a planning checkpoint and a verification checkpoint around each agent action — significantly improves reliability on complex tasks.",
        bookRefs:[
          { book:"linux", chapter:6, note:"Ch 6 Section 6.1: Run ALL monitoring commands — vmstat 1 10, iostat -xz 1 5, iotop, iftop. This is the performance session. You need real numbers from your running infrastructure, not theory." },
          { book:"linux", chapter:6, note:"Ch 6 Section 6.2: lscpu — your iBUYPOWER i7-14700KF has 20 cores. Note that asyncio agent calls are I/O-bound (waiting for API response), not CPU-bound. More cores do not help asyncio — understanding why requires knowing this architecture." },
          { book:"bash",  chapter:16, note:"Ch 16: Arithmetic — calculate your agent efficiency metrics: cost_per_recipe=$((total_api_calls * token_cost / recipes_generated)). Build a bash performance report script using integer arithmetic." },
          { book:"bash",  chapter:10, note:"Ch 10: Loops — write a bash load test: for i in $(seq 1 20); do curl -sf localhost:5000/generate-recipe & done; wait. The & and wait pattern is parallel execution in bash." },
        ],
        tasks:[
          "📗 Open Linux Book Ch 6 Section 6.1 and 📘 Bash Book Ch 10 (Loops) + Ch 16 (Arithmetic)",
          "Run: vmstat 1 10 while agents are running — watch the 'wa' column (I/O wait)",
          "Run: iostat -xz 1 5 — is ChromaDB causing disk pressure during queries?",
          "Run: docker stats --no-stream — snapshot CPU and memory per container",
          "Run: free -h — how much RAM is available vs used vs cached by the kernel",
          "Add memory and CPU limits to ALL services in docker-compose.yml (deploy: resources: limits)",
          "Write a bash load test using a for loop with & and wait — hit /generate-recipe 10 times concurrently",
          "Monitor docker stats during load test — which container hits its limit first?",
          "Read Prompt Engineering Guide: Tree of Thoughts section",
          "AGENT: 'Implement Tree of Thoughts for Root Solutions recipe generation: (1) Generate 3 distinct recipe approaches: traditional comfort food, modern fusion, quick 20-minute prep. (2) Score each approach on three axes: sodium_mg (under 300=10, 300-400=7, over 400=3), ingredient_count (under 8=10, 8-12=7, over 12=3), prep_time_minutes (under 20=10, 20-35=7, over 35=3). (3) Print the full evaluation tree showing all three approaches and scores. (4) Select highest total score, develop it fully. (5) Return both the full tree and the final recipe.'",
          "AGENT: 'Add Plan-Execute-Verify to the Roblox LuaWriter agent. Before writing code: (1) Write a numbered pseudocode plan. (2) List every edge case to handle. After writing code: (3) Re-read each edge case and quote the line of code that handles it. If any edge case is not handled, revise the code before outputting.'",
          "Compare output quality: Tree of Thoughts recipe vs standard reflection recipe — which is better?",
          "Compare Lua quality: Plan-Execute-Verify vs standard LuaWriter — does it catch more edge cases?",
          "Document results in performance-analysis.md in homelab-infrastructure",
        ],
        quiz:[
          "What does a high 'wa' value in vmstat indicate — what is the system waiting for?",
          "Why does asyncio not speed up CPU-bound work — what kind of work does it actually help?",
          "Explain Tree of Thoughts — what is the key difference from standard chain-of-thought prompting?",
          "What does Plan-Execute-Verify add to agent reliability — at what cost?",
        ],
        claudePrompt:"Come to Claude and say: 'Session 14. Explain Tree of Thoughts and when to use it vs standard chain-of-thought.'",
      },
      {
        id:"s15", title:"Portfolio Polish + Month 1 Complete",
        tag:"PORTFOLIO", tagColor:"#1A237E", date:"Session 15 — End of Month 1",
        concept:"A DevOps portfolio is not a list of technologies you read about. It is a list of systems you currently operate. Every repo must immediately communicate three things: what it does, what problem it solves, and how to run it in under 5 minutes. Your GitHub contribution graph showing 15+ sessions of consistent commits is evidence of discipline — that matters to any employer or client.",
        bookRefs:[
          { book:"bash",  chapter:24, note:"Ch 24: Best practices — re-read this final session. Count how many of these you now follow naturally vs had to be reminded of. This is a measure of how far your bash has come." },
          { book:"linux", chapter:1,  note:"Ch 1 Section 1.3: Hello World. You ran your first echo command in pre-start. Look at what you have built since that first command. This is the measure of one month." },
        ],
        tasks:[
          "Audit every repo on GitHub: description filled in, topics added, README present",
          "Each README must have: one-paragraph description, ASCII architecture diagram, tech stack list, prerequisites, exact run commands, curl test examples, screenshot or Grafana dashboard image",
          "Take screenshots: Grafana dashboard with real data, docker-compose ps showing all running, Nginx access log, published Roblox game",
          "Add screenshots to READMEs — one image is worth more than three paragraphs",
          "AGENT: 'Write my GitHub profile README.md. I am a DevOps and AI agent developer. Include: 2-sentence professional bio, the 5 projects built this month with one-line descriptions and repo links, tech stack as an organised grid (Infrastructure / AI & Agents / Projects), a learning philosophy statement in one sentence.'",
          "AGENT: 'Audit my repos — claude-agents, root-solutions-api, roblox-combat-game, tailored-ai-platform, homelab-infrastructure — and rate each README 1–10 with exactly 3 specific improvements per repo.'",
          "Implement every improvement suggested for any repo rated below 7",
          "Record a 3-minute Loom video: AI platform end-to-end — upload doc, ask question, get answer from business's own context",
          "Root Solutions: demo for your brother — walk him through the API and recipe generator, ask for feedback on what matters to him",
          "Finance outreach: send a message to 3 finance businesses you know — simple: 'I built an AI chatbot that answers questions from your own documents. Free trial?'",
          "Write month1-reflection.md: what I built (list each project), what Claude generated vs what I wrote myself, hardest concept and how it finally clicked, biggest surprise, 3 goals for Month 2 on the Mac Mini",
          "Push month1-reflection.md to claude-agents repo",
          "Come to Claude and say: 'Month 1 complete. Quiz me on everything — Linux, Docker, CI/CD, agents, monitoring.'",
        ],
        quiz:[
          "Describe your complete infrastructure stack from memory — every component and how they connect.",
          "Explain the full RAG pipeline from a user question to a Claude answer — every technical step.",
          "Walk me through the Roblox 3-agent pipeline — what does each agent do, what does each one receive and output?",
          "What is the single most important thing you understand now that you did not understand before Month 1?",
          "If a DevOps hiring manager asked 'what did you build in the last month?' — give your answer.",
        ],
        claudePrompt:"Come to Claude and say: 'Month 1 complete. Quiz me on everything — Linux, Bash, Docker, CI/CD, AI agents, and monitoring.'",
      },
    ],
  },
];

// ─── Resources ────────────────────────────────────────────────────────────────
const RESOURCES = {
  systemDesign:[
    {n:1,  title:"System Design Fundamentals",   when:"Session 1",    why:"Foundation for how every system you build should be architected"},
    {n:2,  title:"API Design",                   when:"Session 3",    why:"You are building Root Solutions API — this makes it professional-grade"},
    {n:3,  title:"Load Balancing",               when:"Session 8",    why:"When AI platform gets customers you need to handle traffic spikes"},
    {n:4,  title:"Message Queues",               when:"Session 9",    why:"AI platform document processing uses exactly this pattern"},
    {n:5,  title:"Rate Limiting",                when:"Session 10",   why:"You implement this in Nginx today — now understand the theory"},
    {n:6,  title:"Caching",                      when:"Month 2 W1",   why:"Cache Claude responses — reduce costs significantly"},
    {n:7,  title:"Sharding & Partitioning",      when:"Month 2 W2",   why:"When ChromaDB grows to millions of business documents"},
    {n:8,  title:"Database Replication",         when:"Month 2 W2",   why:"Root Solutions and AI platform both need data redundancy"},
    {n:9,  title:"Consistent Hashing",           when:"Month 2 W3",   why:"Distributing load across your 3-node Mac Mini fleet"},
    {n:10, title:"CAP Theorem",                  when:"Month 2 W3",   why:"Critical for 3-node AI stack architecture decisions"},
    {n:11, title:"Microservices",                when:"Month 3 W1",   why:"Break AI platform into auth, processing, chat, billing services"},
    {n:12, title:"Fault Tolerance",              when:"Month 3 W1",   why:"If Claude API goes down your chatbot still needs to respond"},
    {n:13, title:"Scalability",                  when:"Month 3 W2",   why:"Going from 1 customer to 100 — what breaks, what scales"},
    {n:14, title:"Event-Driven Architecture",    when:"Month 3 W3",   why:"Document upload triggers async processing chain"},
    {n:15, title:"Service Discovery",            when:"Month 3 W3",   why:"How your 3-node fleet discovers and routes to each other"},
  ],
  financeAI:[
    {n:1,  author:"Bojan Radojicic",  title:"How to Build Finance Model 10x Faster with AI",      url:"https://youtube.com/watch?v=79AEXjBqAJ4"},
    {n:2,  author:"Nicolas Boucher",  title:"Top 10 AI Tools For Finance in 2025",                 url:"https://youtube.com/watch?v=ZS0j-BtNoms"},
    {n:3,  author:"David Fortin CPA", title:"Microsoft Copilot Full Course For Beginners",         url:"https://youtube.com/watch?v=bBqTdOkso2Y"},
    {n:4,  author:"Bojan Radojicic",  title:"Best AI Tools For Finance: 10X Your Productivity",   url:"https://youtube.com/watch?v=DCygtlQpRzc"},
    {n:5,  author:"Josh Aharonoff",   title:"AI Accountants Are Here — QuickBooks AI Agents",     url:"https://youtube.com/watch?v=Ci4UogS3m5s"},
    {n:6,  author:"Bojan Radojicic",  title:"How Finance Teams Save 50% Time with Genspark AI",   url:"https://youtube.com/watch?v=QXMvzHdWaKA"},
    {n:7,  author:"Nicolas Boucher",  title:"Financial Analysis With AI in 5 Minutes",            url:"https://youtube.com/watch?v=wiOx3xsILPM"},
    {n:8,  author:"Leila Gharani",    title:"Bring ChatGPT INSIDE Excel",                         url:"https://youtube.com/watch?v=kQPUWryXwag"},
    {n:9,  author:"Bojan Radojicic",  title:"The FUTURE of FP&A: 7 AI Hacks",                    url:"https://youtube.com/watch?v=aHRp1CGG40s"},
    {n:10, author:"Mynda Treacy",     title:"NEW Excel COPILOT Function",                         url:"https://youtube.com/watch?v=ITjl7J7zJro"},
    {n:11, author:"Bojan Radojicic",  title:"9 AI Prompts That Will TRANSFORM Finance Work",      url:"https://youtube.com/watch?v=1EYvg7wAwzw"},
    {n:12, author:"Josh Aharonoff",   title:"4 BEAUTIFUL Dashboards with Excel Copilot",          url:"https://youtube.com/watch?v=3Q4NeGAC0gM"},
    {n:13, author:"Nicolas Boucher",  title:"How to Use ChatGPT to Build Financial Models",       url:"https://youtube.com/watch?v=EfIZxsobyVI"},
    {n:14, author:"Bojan Radojicic",  title:"10 ChatGPT Tips for Financial Analysts",             url:"https://youtube.com/watch?v=3U-OmnW7u4g"},
    {n:15, author:"David Fortin CPA", title:"How to Install Copilot in Excel in 2025",            url:"https://youtube.com/watch?v=Fmn_CZiOJCE"},
    {n:16, author:"Nicolas Boucher",  title:"How to Train Finance Team on AI in 30 Days",         url:"https://youtube.com/watch?v=Qc99kkGVc_E"},
    {n:17, author:"David Fortin CPA", title:"Build Your First Microsoft Copilot 365 Agent",       url:"https://youtube.com/watch?v=K3lyfJ-2RXQ"},
    {n:18, author:"Leila Gharani",    title:"Don't Use ChatGPT Until You Watch This",             url:"https://youtube.com/watch?v=wBAnCMA98ls"},
    {n:19, author:"Christian Wattig", title:"How AI is Changing FP&A",                            url:"https://youtube.com/watch?v=ahhKsQQcmG0"},
    {n:20, author:"Mynda Treacy",     title:"The Best AI Finance Tool Experts Will Ever Need",    url:"https://youtube.com/watch?v=F26bwVgD_lgh"},
  ],
  keyRefs:[
    {title:"Linux Notes for Professionals",     url:"https://goalkicker.com/LinuxBook/",              note:"📗 Open EVERY Linux session — chapter refs in each session card", highlight:"linux"},
    {title:"Bash Notes for Professionals",      url:"https://goalkicker.com/BashBook/",               note:"📘 Open EVERY scripting session — PRIMARY reference Session 4", highlight:"bash"},
    {title:"Java Notes for Professionals",      url:"https://goalkicker.com/JavaBook/",               note:"☕ Month 2/3 — Android app for Root Solutions", highlight:"java"},
    {title:"Prompt Engineering Guide (dair-ai)",url:"https://github.com/dair-ai/Prompt-Engineering-Guide", note:"Open EVERY agent session — live browser tab"},
    {title:"Stanford CS324 — LLMs",             url:"https://stanford-cs324.github.io/winter2022/",   note:"1 lecture per evening — academic LLM foundation"},
    {title:"Anthropic Prompting Guide",         url:"https://anthropic.skilljar.com",                 note:"Official Anthropic training — agent patterns"},
    {title:"OverTheWire Bandit",                url:"https://overthewire.org/wargames/bandit",        note:"2–3 levels per session — Linux reaffirmation game"},
    {title:"learngitbranching.js.org",          url:"https://learngitbranching.js.org/",              note:"Complete ALL levels — Session 5"},
    {title:"GoalKicker Git Book",               url:"https://goalkicker.com/GitBook/",                note:"Read in full — Session 5"},
    {title:"GoalKicker Python Book",            url:"https://goalkicker.com/PythonBook/",             note:"Open alongside every agent session"},
    {title:"Anthropic Tool Use Docs",           url:"https://docs.anthropic.com/en/docs/build-with-claude/tool-use", note:"Reference for Sessions 2–5"},
    {title:"DeepLearning.AI Short Courses",     url:"https://deeplearning.ai/short-courses/",         note:"Month 2/3 — AI-specific short courses"},
    {title:"Hugging Face Learn",                url:"https://huggingface.co/learn",                   note:"Month 2/3 — ML models after Mac Mini arrives"},
    {title:"Full Stack Deep Learning",          url:"https://fullstackdeeplearning.com",              note:"Month 3"},
  ],
};

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useStorage(key, fallback) {
  const [val, setVal] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // Claude.ai artifact environment
        if (typeof window !== "undefined" && window.storage && typeof window.storage.get === "function") {
          const r = await window.storage.get(key);
          if (r && r.value) setVal(JSON.parse(r.value));
        } else {
          // Vercel / any standard browser — use localStorage
          const r = localStorage.getItem(key);
          if (r) setVal(JSON.parse(r));
        }
      } catch {}
      setLoaded(true);
    };
    load();
  }, [key]);

  const save = useCallback(v => {
    setVal(v);
    try {
      if (typeof window !== "undefined" && window.storage && typeof window.storage.set === "function") {
        window.storage.set(key, JSON.stringify(v)).catch(() => {});
      } else {
        localStorage.setItem(key, JSON.stringify(v));
      }
    } catch {}
  }, [key]);

  return [val, save, loaded];
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [checked,  setChecked,  loaded] = useStorage("devops-v4-tasks", {});
  const [watched,  setWatched]          = useStorage("devops-v4-videos", {});
  const [activeWeek,    setActiveWeek]    = useState("w0");
  const [activeSession, setActiveSession] = useState("s0");
  const [activeTab,     setActiveTab]     = useState("curriculum");

  const toggleTask  = (sid, idx) => { const k=`${sid}-${idx}`; setChecked({...checked,[k]:!checked[k]}); };
  const toggleWatch = id => setWatched(p => ({...p,[id]:!p[id]}));

  const allKeys    = WEEKS.flatMap(w => w.sessions.flatMap(s => s.tasks.map((_,i) => `${s.id}-${i}`)));
  const totalDone  = allKeys.filter(k => checked[k]).length;
  const overallPct = Math.round(totalDone / allKeys.length * 100);
  const weekPct    = w => { const ks=w.sessions.flatMap(s=>s.tasks.map((_,i)=>`${s.id}-${i}`)); return ks.length?Math.round(ks.filter(k=>checked[k]).length/ks.length*100):0; };
  const sessPct    = s => { const ks=s.tasks.map((_,i)=>`${s.id}-${i}`); return ks.length?Math.round(ks.filter(k=>checked[k]).length/ks.length*100):0; };

  const curWeek = WEEKS.find(w => w.id === activeWeek);
  const curSess = curWeek?.sessions.find(s => s.id === activeSession);

  const pbar = (pct, color, h=8) => (
    <div style={{background:"#e0e0e0",borderRadius:8,height:h,overflow:"hidden"}}>
      <div style={{width:`${pct}%`,background:color,height:"100%",borderRadius:8,transition:"width 0.4s ease"}}/>
    </div>
  );
  const chip = (label, color) => (
    <span style={{background:color,color:"#fff",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:4,letterSpacing:0.5,whiteSpace:"nowrap"}}>{label}</span>
  );

  const bookRefBlock = (refs) => {
    if (!refs?.length) return null;
    // Group by book
    const grouped = {};
    refs.forEach(r => { if (!grouped[r.book]) grouped[r.book]=[]; grouped[r.book].push(r); });
    return Object.entries(grouped).map(([bookKey, bookRefs]) => {
      const b = BOOKS[bookKey];
      return (
        <div key={bookKey} style={{background:b.bg,borderLeft:`4px solid ${b.border}`,borderRadius:8,padding:14,marginBottom:12}}>
          <div style={{fontWeight:700,color:b.color,fontSize:13,marginBottom:10}}>{b.emoji} {b.label.toUpperCase()} — Chapters for This Session</div>
          {bookRefs.map((ref, i) => (
            <div key={i} style={{marginBottom:8,padding:"8px 10px",background:"#fff",borderRadius:6,borderLeft:`3px solid ${b.border}`}}>
              <div style={{fontWeight:700,fontSize:13,color:b.color}}>{b.chapters[ref.chapter]}</div>
              <div style={{fontSize:12,color:"#555",marginTop:3}}>{ref.note}</div>
            </div>
          ))}
        </div>
      );
    });
  };

  if (!loaded) return <div style={{padding:40,fontFamily:"Arial"}}>Loading your progress...</div>;

  return (
    <div style={{fontFamily:"Arial, sans-serif",minHeight:"100vh",background:"#f4f5fa",color:"#111"}}>

      {/* Header */}
      <div style={{background:"#0D1B2A",color:"#fff",padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:17,fontWeight:700}}>🚀 DevOps + AI Agents — Month 1 Curriculum</div>
          <div style={{fontSize:11,color:"#90CAF9",marginTop:2}}>iBUYPOWER WSL2 Ubuntu  •  Starts Feb 23  •  Session-based  •  Linux/DevOps + Agents every session  •  3 Books integrated</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:22,fontWeight:700,color:"#90CAF9"}}>{overallPct}%</div>
          <div style={{fontSize:11,color:"#78909C"}}>{totalDone}/{allKeys.length} tasks</div>
        </div>
      </div>
      <div style={{background:"#1A237E",padding:"6px 20px",display:"flex",alignItems:"center",gap:12}}>
        <div style={{flex:1}}>{pbar(overallPct,"#90CAF9",10)}</div>
        <span style={{color:"#fff",fontSize:11,whiteSpace:"nowrap"}}>Overall progress</span>
      </div>

      {/* Book legend bar */}
      <div style={{background:"#fff",borderBottom:"1px solid #e8e8e8",padding:"6px 20px",display:"flex",gap:16,alignItems:"center"}}>
        <span style={{fontSize:11,color:"#999",fontWeight:600}}>BOOKS IN THIS CURRICULUM:</span>
        {Object.values(BOOKS).map(b => (
          <span key={b.label} style={{fontSize:11,fontWeight:700,color:b.color,background:b.bg,padding:"2px 8px",borderRadius:4,border:`1px solid ${b.border}`}}>
            {b.emoji} {b.label} — {b.when}
          </span>
        ))}
      </div>

      {/* Tabs */}
      <div style={{background:"#fff",borderBottom:"1px solid #e0e0e0",padding:"0 20px",display:"flex"}}>
        {[["curriculum","📚 Curriculum"],["resources","🎬 Books & Resources"],["howto","💬 How Sessions Work"]].map(([id,label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding:"9px 18px",border:"none",cursor:"pointer",fontSize:13,background:"transparent",
            fontWeight:activeTab===id?700:400,color:activeTab===id?"#1A237E":"#666",
            borderBottom:activeTab===id?"3px solid #1A237E":"3px solid transparent",
          }}>{label}</button>
        ))}
      </div>

      <div style={{display:"flex",height:"calc(100vh - 126px)"}}>

        {/* Sidebar */}
        <div style={{width:220,background:"#fff",borderRight:"1px solid #e0e0e0",overflowY:"auto",flexShrink:0}}>
          {WEEKS.map(w => (
            <div key={w.id}>
              <button onClick={() => { setActiveWeek(w.id); setActiveSession(w.sessions[0].id); }}
                style={{width:"100%",textAlign:"left",padding:"10px 14px",border:"none",cursor:"pointer",
                  background:activeWeek===w.id?w.color:"transparent",color:activeWeek===w.id?"#fff":"#333",
                  fontWeight:activeWeek===w.id?700:400,fontSize:13,borderBottom:"1px solid #f0f0f0"}}>
                <div>{w.label}: {w.title.split("+")[0].trim()}</div>
                <div style={{fontSize:11,opacity:0.8,marginTop:3}}>{weekPct(w)}% complete</div>
                <div style={{marginTop:4}}>{pbar(weekPct(w),activeWeek===w.id?"#ffffff88":w.color,4)}</div>
              </button>
              {activeWeek===w.id && w.sessions.map(s => (
                <button key={s.id} onClick={() => setActiveSession(s.id)}
                  style={{width:"100%",textAlign:"left",padding:"8px 14px 8px 20px",border:"none",cursor:"pointer",
                    background:activeSession===s.id?w.light:"transparent",
                    borderLeft:activeSession===s.id?`3px solid ${w.color}`:"3px solid transparent",
                    fontSize:12,color:activeSession===s.id?w.color:"#555",borderBottom:"1px solid #f8f8f8"}}>
                  <div style={{fontWeight:activeSession===s.id?700:400}}>{s.title.length>38?s.title.substring(0,38)+"…":s.title}</div>
                  <div style={{fontSize:11,color:"#999",marginTop:2}}>{sessPct(s)}% • {s.tasks.filter((_,i)=>checked[`${s.id}-${i}`]).length}/{s.tasks.length}</div>
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{flex:1,overflowY:"auto",padding:20}}>

          {activeTab==="curriculum" && curSess && (
            <>
              {/* Session header */}
              <div style={{background:curWeek.color,color:"#fff",borderRadius:10,padding:"14px 18px",marginBottom:14}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  {chip(curSess.tag,"rgba(255,255,255,0.25)")}
                  {sessPct(curSess)===100 && chip("✓ COMPLETE","#1B5E20")}
                  <span style={{fontSize:11,opacity:0.8,marginLeft:"auto"}}>{curSess.date}</span>
                </div>
                <div style={{fontSize:19,fontWeight:700}}>{curSess.title}</div>
                <div style={{marginTop:10}}>{pbar(sessPct(curSess),"rgba(255,255,255,0.55)",10)}</div>
                <div style={{fontSize:11,opacity:0.8,marginTop:4}}>
                  {curSess.tasks.filter((_,i)=>checked[`${curSess.id}-${i}`]).length}/{curSess.tasks.length} tasks complete
                </div>
              </div>

              {/* Concept */}
              <div style={{background:"#FFF8E1",borderLeft:"4px solid #F57F17",borderRadius:8,padding:14,marginBottom:14}}>
                <div style={{fontWeight:700,color:"#E65100",fontSize:12,marginBottom:7}}>📖 UNDERSTAND THIS FIRST — before touching any commands</div>
                <div style={{fontSize:14,lineHeight:1.75,color:"#333"}}>{curSess.concept}</div>
              </div>

              {/* Book refs — grouped by book */}
              {bookRefBlock(curSess.bookRefs)}

              {/* Claude start prompt */}
              {curSess.claudePrompt && (
                <div style={{background:"#EEF2FF",borderLeft:"4px solid #1A237E",borderRadius:8,padding:12,marginBottom:14}}>
                  <div style={{fontWeight:700,color:"#1A237E",fontSize:12,marginBottom:4}}>💬 START YOUR SESSION — say this to Claude first</div>
                  <div style={{fontSize:14,color:"#1A237E",fontStyle:"italic"}}>{curSess.claudePrompt}</div>
                </div>
              )}

              {/* Tasks */}
              <div style={{background:"#fff",borderRadius:10,padding:18,marginBottom:14,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
                <div style={{fontWeight:700,fontSize:14,color:"#1A237E",marginBottom:12}}>⚡ SESSION TASKS</div>
                {curSess.tasks.map((task, idx) => {
                  const k = `${curSess.id}-${idx}`;
                  const done = !!checked[k];
                  const isAgent = task.startsWith("AGENT:");
                  const isBook  = task.startsWith("📗") || task.startsWith("📘") || task.startsWith("☕");
                  return (
                    <div key={idx} onClick={() => toggleTask(curSess.id, idx)}
                      style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 0",
                        borderBottom:idx<curSess.tasks.length-1?"1px solid #f5f5f5":"none",
                        cursor:"pointer",opacity:done?0.5:1}}>
                      <div style={{width:20,height:20,borderRadius:4,border:`2px solid ${done?"#1B5E20":"#ccc"}`,
                        background:done?"#1B5E20":"#fff",display:"flex",alignItems:"center",justifyContent:"center",
                        flexShrink:0,marginTop:2}}>
                        {done && <span style={{color:"#fff",fontSize:12}}>✓</span>}
                      </div>
                      <div style={{fontSize:13,lineHeight:1.6,
                        textDecoration:done?"line-through":"none",
                        color:isAgent?"#0D47A1":isBook?"#1B5E20":"#222",
                        fontWeight:isAgent||isBook?"600":"400"}}>
                        {task}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quiz */}
              <div style={{background:"#F3E5F5",borderLeft:"4px solid #6A1B9A",borderRadius:8,padding:14}}>
                <div style={{fontWeight:700,color:"#4A148C",fontSize:12,marginBottom:4}}>🎯 END-OF-SESSION QUIZ</div>
                <div style={{fontSize:11,color:"#6A1B9A",marginBottom:10,fontStyle:"italic"}}>
                  Tell Claude: "Quiz me on this session — one question at a time, don't move on until I answer correctly."
                </div>
                {curSess.quiz.map((q, i) => (
                  <div key={i} style={{display:"flex",gap:8,marginBottom:8,padding:"8px 10px",background:"#fff",borderRadius:6}}>
                    <span style={{fontWeight:700,color:"#6A1B9A",flexShrink:0,fontSize:13}}>Q{i+1}.</span>
                    <span style={{fontSize:13}}>{q}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab==="resources" && (
            <div>
              {/* Three book panels */}
              {Object.entries(BOOKS).map(([key, b]) => (
                <div key={key} style={{background:b.color,color:"#fff",borderRadius:10,padding:18,marginBottom:18}}>
                  <div style={{fontSize:17,fontWeight:700,marginBottom:4}}>{b.emoji} {b.name}</div>
                  <div style={{fontSize:12,opacity:0.85,marginBottom:12}}>{b.when}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    {Object.entries(b.chapters).map(([ch,desc]) => (
                      <div key={ch} style={{background:"rgba(255,255,255,0.13)",borderRadius:5,padding:"6px 8px",fontSize:11}}>
                        {desc}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Key references */}
              <div style={{background:"#fff",borderRadius:10,padding:18,marginBottom:18,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
                <div style={{fontWeight:700,fontSize:15,color:"#1A237E",marginBottom:12}}>🔗 All References</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {RESOURCES.keyRefs.map((r, i) => {
                    const b = r.highlight ? BOOKS[r.highlight] : null;
                    return (
                      <div key={i} style={{background:b?b.bg:"#f8f9ff",borderRadius:7,padding:10,borderLeft:`3px solid ${b?b.border:"#1A237E"}`}}>
                        <a href={r.url} target="_blank" rel="noreferrer"
                          style={{fontWeight:700,color:b?b.color:"#1A237E",textDecoration:"none",fontSize:13}}>
                          {r.title}
                        </a>
                        <div style={{fontSize:11,color:"#666",marginTop:3}}>{r.note}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Design */}
              <div style={{background:"#fff",borderRadius:10,padding:18,marginBottom:18,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
                <div style={{fontWeight:700,fontSize:15,color:"#1A237E",marginBottom:4}}>🏗 System Design — 15 Videos</div>
                <div style={{fontSize:12,color:"#666",marginBottom:12}}>Evening viewing, one per session, mapped to when it's most relevant to what you're building.</div>
                {RESOURCES.systemDesign.map(v => (
                  <div key={v.n} onClick={() => toggleWatch(`sd-${v.n}`)}
                    style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid #f0f0f0",cursor:"pointer",opacity:watched[`sd-${v.n}`]?0.4:1}}>
                    <div style={{width:20,height:20,borderRadius:4,border:`2px solid ${watched[`sd-${v.n}`]?"#1B5E20":"#ccc"}`,
                      background:watched[`sd-${v.n}`]?"#1B5E20":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {watched[`sd-${v.n}`] && <span style={{color:"#fff",fontSize:11}}>✓</span>}
                    </div>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{v.n}. {v.title}</div>
                      <div style={{fontSize:11,color:"#666",marginTop:1}}>📅 {v.when} — {v.why}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Finance AI */}
              <div style={{background:"#fff",borderRadius:10,padding:18,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
                <div style={{fontWeight:700,fontSize:15,color:"#4A148C",marginBottom:4}}>💼 AI in Finance — 20 Videos</div>
                <div style={{fontSize:12,color:"#666",marginBottom:12}}>Weekend watching. Learn the language finance professionals use — so you can sell the AI platform to them.</div>
                {RESOURCES.financeAI.map(v => (
                  <div key={v.n} onClick={() => toggleWatch(`fi-${v.n}`)}
                    style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid #f0f0f0",cursor:"pointer",opacity:watched[`fi-${v.n}`]?0.4:1}}>
                    <div style={{width:20,height:20,borderRadius:4,border:`2px solid ${watched[`fi-${v.n}`]?"#4A148C":"#ccc"}`,
                      background:watched[`fi-${v.n}`]?"#4A148C":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {watched[`fi-${v.n}`] && <span style={{color:"#fff",fontSize:11}}>✓</span>}
                    </div>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{v.n}. {v.title}</div>
                      <div style={{fontSize:11,color:"#7B1FA2"}}>{v.author}</div>
                      <a href={v.url} target="_blank" rel="noreferrer" style={{fontSize:11,color:"#1565C0"}}>{v.url}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab==="howto" && (
            <div>
              <div style={{background:"#0D1B2A",color:"#fff",borderRadius:10,padding:22,marginBottom:16}}>
                <div style={{fontSize:19,fontWeight:700,marginBottom:10}}>How Every Session Works</div>
                <div style={{fontSize:14,color:"#90CAF9",lineHeight:1.85}}>
                  You are reteaching yourself these subjects with me as your instructor. Not a video you watch alone — an instructor-led session where I explain, you do, and I verify you understood before we close.
                </div>
              </div>
              {[
                {n:"1",title:"Open the session card first",color:"#1A237E",body:"Read the Concept block before touching a command. Read the Book References and open those chapters. Then say the Claude prompt shown. In that chat I explain the concept with a real example and verify it makes sense. You do not touch a command until it does."},
                {n:"2",title:"Work through tasks one at a time",color:"#1B5E20",body:"The task list is your session plan. Work in order. Paste terminal output to me as you go. If something errors — paste the error. We debug it together. You never get stuck alone. Every error is a lesson. AGENT tasks: read every line Claude Code generates before running it."},
                {n:"3",title:"Read the book chapters alongside the work",color:"#0D47A1",body:"Each session card shows exactly which Linux Book and Bash Book chapters to open. Read them simultaneously with the commands — not before, not after. The book explains why, the terminal proves it works."},
                {n:"4",title:"Quiz before closing the session",color:"#880E4F",body:"Tell Claude: 'Quiz me on this session — one question at a time.' I will not move to the next question until you answer the current one correctly. If you cannot answer it, the session is not finished yet."},
                {n:"5",title:"Accountability — I notice when you disappear",color:"#E65100",body:"Do not let more than 5 days pass between sessions. When you come back after a gap, the first thing I ask is what got in the way — not to judge, but to remove the actual blocker. The most common failure mode: something breaks, you do not ask for help, you drift. Paste the error. Come back."},
              ].map(item => (
                <div key={item.n} style={{background:"#fff",borderLeft:`4px solid ${item.color}`,borderRadius:8,padding:14,marginBottom:10,boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:7}}>
                    <span style={{background:item.color,color:"#fff",width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,flexShrink:0}}>{item.n}</span>
                    <span style={{fontWeight:700,fontSize:14,color:item.color}}>{item.title}</span>
                  </div>
                  <div style={{fontSize:13,color:"#333",lineHeight:1.7}}>{item.body}</div>
                </div>
              ))}
              <div style={{background:"#1A237E",color:"#fff",borderRadius:10,padding:18,marginTop:6}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>February 23rd — Your first message</div>
                <div style={{fontSize:14,color:"#90CAF9",fontStyle:"italic",lineHeight:1.8}}>
                  "I'm ready to start Session 1. Linux filesystem and my first agent. Teach me the concept first."
                </div>
                <div style={{fontSize:12,color:"#546E7A",marginTop:8}}>I will take it from there.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
