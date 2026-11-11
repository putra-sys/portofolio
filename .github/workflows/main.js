/* ═════════════════════════════════════════════
   PORTFOLIO — TERMINAL THEME · main.js
   ═════════════════════════════════════════════ */

(function(){
"use strict";

/* ─────────────────────────────────────────────
   ✏️ EDIT THIS FIRST — your profile
   ───────────────────────────────────────────── */
const PROFILE = {
  name:  "Putra Adi Wibowo",            // ← your name
  role:  "System Administrator",
  years: "3+",
  email: "you@example.com",
  github:   "github.com/yourusername",
  linkedin: "linkedin.com/in/yourusername",
  location: "Jakarta, Indonesia (UTC+7)"
};

/* ═════════ helpers ═════════ */
const $ = (s)=>document.querySelector(s);
const esc = (s)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

/* ASCII art (escaped carefully) */
const TUX = [
  "      .--.      ",
  "     |o_o |     ",
  "     |:_/ |     ",
  "    //   \\ \\    ",
  "   (|     | )   ",
  "  /'\\_   _/'\\  ",
  "  \\___)=(___/   "
];
const COFFEE = [
  "      ( (",
  "       ) )",
  "    ........",
  "    |      |]",
  "    \\      /",
  "     `----'"
];

function bar(level, width){
  width = width || 10;
  var f = Math.round(level / 10);
  if(f > width) f = width;
  return "[" + "█".repeat(f) + "░".repeat(width - f) + "] " + level + "%";
}

/* ═════════ BOOT SEQUENCE ═════════ */
(function boot(){
  var overlay = $("#boot"), log = $("#bootLog");
  var lines = [
    "[    0.000000] portfolio-bios v2.6.1 starting...",
    "[    0.041233] CPU: Human Brain @ 3.2 GHz ...................... <ok>OK</ok>",
    "[    0.102451] Memory: 128 GB RAM (coffee-optimized) ........... <ok>OK</ok>",
    "[    0.310822] Loading kernel: sysadmin-6.1.0-lts ............... <ok>OK</ok>",
    "[    0.528930] Mounting /dev/portfolio on / ..................... <ok>OK</ok>",
    "[    0.841265] Starting services: nginx docker sshd cron ....... <ok>OK</ok>",
    "[    1.203881] Starting portfolio.service ................... <ok>ACTIVE</ok>",
    "[    1.402173] Boot complete. Welcome, visitor."
  ];
  var delays = [80,140,180,160,190,170,220,150];
  var i = 0, skipped = false, timer = null;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finish(){
    if(skipped) return;
    skipped = true;
    clearTimeout(timer);
    overlay.classList.add("done");
    setTimeout(function(){ overlay.remove(); }, 600);
    afterBoot();
  }
  function next(){
    if(skipped) return;
    if(i >= lines.length){ timer = setTimeout(finish, 350); return; }
    log.innerHTML += lines[i].replace(/<ok>/g,'<span class="ok">').replace(/<\/ok>/g,"</span>") + "\n";
    i++;
    timer = setTimeout(next, delays[i] || 120);
  }

  if(reduced){ setTimeout(finish, 0); return; }
  document.addEventListener("keydown", finish, {once:true});
  overlay.addEventListener("click", finish);
  next();
})();

/* ═════════ TYPED HERO NAME ═════════ */
(function typedName(){
  var el = $("#typedName"), sub = $("#heroSub");
  var name = PROFILE.name;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced){ el.textContent = name; sub.classList.add("show"); return; }
  var i = 0;
  (function tick(){
    if(i <= name.length){
      el.textContent = name.slice(0, i);
      i++;
      setTimeout(tick, 65);
    } else {
      setTimeout(function(){ sub.classList.add("show"); }, 250);
    }
  })();
})();

/* ═════════ TERMINAL ═════════ */
(function terminal(){
  var body   = $("#termBody"), out = $("#termOutput");
  var input  = $("#hiddenInput"), cmdText = $("#cmdText");
  var history = [], histIdx = -1;
  var PROMPT = "visitor@portfolio:~$";

  function line(html, cls){
    var d = document.createElement("div");
    d.className = "term-line " + (cls || "");
    d.innerHTML = html;
    out.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function echo(cmd){
    line('<span class="t-cmd"><span class="prompt">' + PROMPT + '</span> ' + esc(cmd) + "</span>", "echo");
  }
  function multi(text, cls){ text.split("\n").forEach(function(l){ line(l || "&nbsp;", cls); }); }

  /* ── contact block (reused) ── */
  function contactBlock(){
    line('<span class="prompt-inline">[contact]</span>');
    line('email    : <a href="mailto:' + PROFILE.email + '">' + PROFILE.email + "</a>");
    line('github   : <a href="https://' + PROFILE.github + '" target="_blank" rel="noopener">' + PROFILE.github + "</a>");
    line('linkedin : <a href="https://' + PROFILE.linkedin + '" target="_blank" rel="noopener">' + PROFILE.linkedin + "</a>");
    line('location : ' + esc(PROFILE.location));
    line('status   : open to full-time / remote / freelance');
  }

  /* ── skills text (reused) ── */
  function skillsText(){
    multi(
      "OPERATING SYSTEMS\n" +
      "  Linux (Debian/Ubuntu/RHEL)     " + bar(90) + "\n" +
      "  Windows Server 2016–2022       " + bar(75) + "\n" +
      "  Bash / PowerShell               " + bar(85),
      "");
    multi(
      "NETWORKING & SECURITY\n" +
      "  TCP/IP · DNS · DHCP · VPN      " + bar(85) + "\n" +
      "  Firewalls (iptables/pfSense)    " + bar(78) + "\n" +
      "  Hardening · fail2ban · TLS     " + bar(72),
      "");
    multi(
      "VIRTUALIZATION & CONTAINERS\n" +
      "  VMware ESXi / Proxmox          " + bar(78) + "\n" +
      "  Docker / docker-compose        " + bar(80) + "\n" +
      "  Kubernetes (basics)            " + bar(55),
      "");
    multi(
      "OPS & MONITORING\n" +
      "  Zabbix · Grafana · Prometheus  " + bar(75) + "\n" +
      "  Ansible & automation           " + bar(70) + "\n" +
      "  MySQL · PostgreSQL · Redis     " + bar(70) + "",
      "");
  }

  var COMMANDS = {
    help: function(){
      multi(
        "Available commands:\n" +
        "  help        show this list\n" +
        "  whoami      who is this guy?\n" +
        "  about       short bio\n" +
        "  skills      skill matrix, in your terminal\n" +
        "  contact     how to reach me\n" +
        "  neofetch    system info, the fun way\n" +
        "  uptime      how long has he been doing this?\n" +
        "  ls          list files\n" +
        "  pwd         print working directory\n" +
        "  echo        print text\n" +
        "  history     command history\n" +
        "  ping        test connection\n" +
        "  clear       clear the screen");
      line("hint: try <b>sudo</b> at your own risk.", "sys");
    },
    whoami: function(){
      line("<b>" + esc(PROFILE.name) + "</b> — " + esc(PROFILE.role));
      line(PROFILE.years + " years keeping servers alive, patched, and boring (in a good way).");
      line("Type 'about' for the story, or 'skills' for the toolbox.", "sys");
    },
    about: function(){
      multi(
        "I keep production infrastructure alive, fast, and boring —\n" +
        "because boring infrastructure means everyone else can sleep\n" +
        "at night.\n" +
        "\n" +
        "Day-to-day: Linux & Windows servers, containers, networks,\n" +
        "automation, monitoring, and backups that actually restore.\n" +
        "\n" +
        "# automate it, document it, monitor it — then go home.",
        "");
    },
    skills: skillsText,
    contact: contactBlock,
    uptime: function(){
      var d = new Date();
      var t = d.toTimeString().slice(0,8);
      line(" " + t + " up " + PROFILE.years + " years, 245 days, 3 users, load average: 0.42, 0.35, coffee");
      line("production systems: healthy ✓   pager: hopefully silent", "ok");
    },
    ls: function(){
      line('about.txt   <span class="green">skills.log</span>   <span class="green">contact.cfg</span>   uptime.info   <span class="dim">.coffee_rc</span>');
    },
    pwd: function(){ line("/home/visitor/portfolio"); },
    neofetch: function(){
      var html = '<div class="fetch-grid"><pre class="ascii">' + TUX.join("\n") + '</pre><div class="fetch-info">';
      var info = [
        esc(PROFILE.name.split(" ")[0].toLowerCase()) + "@portfolio",
        "────────────────",
        "OS:       Linux (Debian 12) x86_64",
        "Host:     " + PROFILE.role,
        "Kernel:   6.1.0-12-amd64",
        "Uptime:   " + PROFILE.years + " years in production",
        "Shell:    bash 5.2.15",
        "Editor:   vim (of course)",
        "Packages: 1337 (dpkg)",
        "Coffee:   unlimited refills"
      ];
      info.forEach(function(l, idx){
        html += "<div>" + (idx < 2 ? '<span class="hl">' + esc(l) + "</span>"
                 : '<span class="k">' + esc(l.split(":")[0]) + ":</span>" + esc(l.slice(l.split(":")[0].length + 1))) + "</div>";
      });
      line(html + "</div></div>");
    },
    echo: function(args){
      var t = args.join(" ");
      if(t === "$HOME") t = "/home/visitor";
      else if(t === "$USER") t = "visitor";
      else if(t === "$NAME") t = PROFILE.name;
      line(esc(t) || "&nbsp;");
    },
    history: function(){
      history.forEach(function(h, i){ line("  " + (i + 1) + "  " + esc(h), "sys"); });
      if(!history.length) line("(empty — like a fresh shell)", "sys");
    },
    ping: function(){
      multi(
        "PING portfolio.local (127.0.0.1): 56 data bytes\n" +
        "64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.42 ms\n" +
        "64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.17 ms",
        "");
      line("--- portfolio.local ping statistics ---", "sys");
      line("2 packets transmitted, 2 received, 0% packet loss", "ok");
      line("connection to your next sysadmin: established.", "ok");
    },
    clear: function(){ out.innerHTML = ""; },
    coffee: function(){
      line('<pre class="ascii">' + COFFEE.join("\n") + "</pre>");
      line("brewing... done. productivity +10%.", "ok");
    },
    exit: function(){ line("There is no exit — only new challenges. (Try 'contact' instead.)", "sys"); },
    hire: function(){
      line("excellent decision. loading contact...", "ok");
      contactBlock();
    }
  };

  function run(raw){
    var trimmed = raw.trim();
    echo(trimmed);
    if(!trimmed){ return; }
    history.push(trimmed);
    histIdx = history.length;

    var parts  = trimmed.split(/\s+/);
    var cmd    = parts[0].toLowerCase();
    var args   = parts.slice(1);

    /* sudo easter eggs */
    if(cmd === "sudo"){
      var rest = args.join(" ").toLowerCase();
      if(rest === "hire-me" || rest === "hire me" || rest === "hire"){
        line("✔ root privileges granted. redirecting...", "ok");
        contactBlock();
      } else {
        line("visitor is not in the sudoers file. This incident will be reported.", "err");
      }
      return;
    }
    if(cmd === "rm"){
      if(args.indexOf("-rf") !== -1 && args.indexOf("/") !== -1){
        line("Nice try. This portfolio is protected by immutable attributes (and common sense).", "err");
      } else {
        line("rm: cannot remove: Permission denied", "err");
      }
      return;
    }
    if(cmd === "hire-me"){ COMMANDS.hire(); return; }

    var fn = COMMANDS[cmd];
    if(fn){ fn(args); }
    else {
      line("bash: " + esc(cmd) + ": command not found (try 'help')", "err");
    }
  }

  /* ── input plumbing ── */
  function focusInput(){ try{ input.focus({preventScroll:true}); }catch(e){ input.focus(); } }
  body.addEventListener("click", focusInput);

  input.addEventListener("input", function(){ cmdText.textContent = input.value; });

  input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
      var v = input.value;
      input.value = ""; cmdText.textContent = "";
      run(v);
    } else if(e.key === "ArrowUp"){
      e.preventDefault();
      if(histIdx > 0){ histIdx--; input.value = history[histIdx] || ""; cmdText.textContent = input.value; }
    } else if(e.key === "ArrowDown"){
      e.preventDefault();
      if(histIdx < history.length - 1){ histIdx++; input.value = history[histIdx] || ""; }
      else { histIdx = history.length; input.value = ""; }
      cmdText.textContent = input.value;
    } else if(e.key === "Tab"){
      e.preventDefault();
      var v = input.value.trim().toLowerCase();
      if(!v) return;
      var matches = Object.keys(COMMANDS).concat(["sudo","rm","hire-me"]).filter(function(c){ return c.indexOf(v) === 0; });
      if(matches.length === 1){
        input.value = matches[0] + " "; cmdText.textContent = input.value;
      } else if(matches.length > 1){
        echo(input.value);
        line(matches.join("   "), "sys");
        input.value = v; cmdText.textContent = v;
      }
    } else if(e.key === "l" && e.ctrlKey){
      e.preventDefault(); COMMANDS.clear();
    } else if(e.key === "c" && e.ctrlKey){
      echo(input.value + "^C");
      input.value = ""; cmdText.textContent = "";
    }
  });

  /* welcome — called after boot */
  window.__termWelcome = function(){
    line("Welcome to portfolio terminal v1.0.0 (bash 5.2.15)", "sys");
    line("Type 'help' to see available commands.", "sys");
    line("&nbsp;");
    run("whoami");
    /* auto-focus only on desktop — avoid popping the mobile keyboard */
    if(window.matchMedia("(hover: hover)").matches) focusInput();
  };
})();

/* ═════════ SCROLL REVEAL + SKILL BARS ═════════ */
(function reveals(){
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      en.target.classList.add("inview");
      en.target.querySelectorAll(".fill").forEach(function(f){
        f.style.width = f.dataset.lvl + "%";
      });
      obs.unobserve(en.target);
    });
  }, {threshold: 0.15});

  document.querySelectorAll(".reveal").forEach(function(el){
    if(reduced){
      el.classList.add("inview");
      el.querySelectorAll(".fill").forEach(function(f){ f.style.width = f.dataset.lvl + "%"; });
      return;
    }
    obs.observe(el);
  });
})();

/* called by boot finish */
function afterBoot(){
  if(window.__termWelcome) window.__termWelcome();
}

})();
