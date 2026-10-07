/**
 * ============================================================================
 * NAYAN JAIN - NEURAL NETWORK PORTFOLIO
 * Vanilla JavaScript Engine (Fully Defensive with try/catch blocks)
 * ============================================================================
 */

// Global emergency failsafe: guarantee site appearance within 4s regardless of DOM state
setTimeout(() => {
  try {
    const p = document.getElementById('preloader');
    if (p && !p.classList.contains('preloader-hidden')) {
      p.classList.add('preloader-hidden');
      setTimeout(() => { p.style.display = 'none'; }, 600);
    }
    document.body.classList.remove('loading-active');
  } catch (e) {
    console.error('Emergency preloader dismissal error:', e);
  }
}, 4000);

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. USER CONFIGURATIONS
  // Edit the values below to customize your portfolio without touching core logic!
  // ==========================================================================

  /**
   * EDUCATION CONFIGURATION:
   * By default, Class 12th and 10th nodes are hidden.
   * To show them on your timeline, simply set `showSecondaryEducation: true`.
   */
  const educationConfig = {
    showSecondaryEducation: false, // Set to true to display 12th & 10th grade
    class12th: {
      year: "2024 – 2026",
      title: "Class XII — Science (PCM)",
      school: "Senior Secondary School, Jaipur",
      description: "Core subjects: Physics, Chemistry, Mathematics, and Computer Science."
    },
    class10th: {
      year: "2022 – 2024",
      title: "Class X — Secondary Education",
      school: "High School, Jaipur",
      description: "Foundational sciences, mathematics, and logical aptitude."
    }
  };

  /**
   * CERTIFICATES CONFIGURATION:
   * Supports .pdf, .jpg, and .png files located in the /certificates folder.
   * Change `available: true` once you place your file in /certificates!
   * If `available: false`, clicking "View certificate" safely displays
   * "Certificate coming soon" instead of navigating to a broken link.
   */
  const certificatesConfig = [
    {
      id: "sih",
      title: "Smart India Hackathon (SIH)",
      file: "certificates/sih.pdf",
      available: false // Set to true when certificates/sih.pdf exists
    },
    {
      id: "agentic-ai",
      title: "Unlocking Agentic AI Workshop",
      file: "certificates/agentic-ai.pdf",
      available: false // Set to true when certificates/agentic-ai.pdf exists
    },
    {
      id: "ibm-data-science-methodology",
      title: "IBM: Data Science Methodology",
      file: "certificates/ibm-data-science-methodology.pdf",
      available: false // Set to true when certificates/ibm-data-science-methodology.pdf exists
    },
    {
      id: "ibm-data-visualization",
      title: "IBM: Data Visualization",
      file: "certificates/ibm-data-visualization.pdf",
      available: false // Set to true when certificates/ibm-data-visualization.pdf exists
    }
  ];

  /**
   * CONTACT CONFIGURATION:
   * To use Formspree instead of mailto:
   * 1. Register for free at https://formspree.io/
   * 2. Set useFormspree to true and paste your Formspree endpoint URL below.
   */
  const contactConfig = {
    useFormspree: false,
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORMSPREE_ID",
    destinationEmail: "njainmathania@gmail.com"
  };


  // ==========================================================================
  // 2. PRELOADER: "NJ" SYNAPTIC FORMATION
  // ==========================================================================
  try {
    const preloader = document.getElementById('preloader');
    const preloaderCanvas = document.getElementById('preloader-canvas');
    const preloaderText = document.getElementById('preloader-text');
    const preloaderProgress = document.getElementById('preloader-progress');
    const skipPreloaderBtn = document.getElementById('skip-preloader-btn');

    let preloaderFinished = false;

    const dismissPreloader = () => {
      if (preloaderFinished) return;
      preloaderFinished = true;
      document.body.classList.remove('loading-active');
      if (preloader) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 700);
      }
    };

    if (skipPreloaderBtn) {
      skipPreloaderBtn.addEventListener('click', dismissPreloader);
    }

    // Safety timeout within preloader module
    setTimeout(dismissPreloader, 3500);

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      dismissPreloader();
    } else if (preloaderCanvas && preloaderCanvas.getContext) {
      const pCtx = preloaderCanvas.getContext('2d');
      const pWidth = 320;
      const pHeight = 200;
      preloaderCanvas.width = pWidth;
      preloaderCanvas.height = pHeight;

      // Target coordinates forming "N" and "J"
      const targetPoints = [
        // Letter 'N'
        { tx: 70,  ty: 45,  letter: 'N' },
        { tx: 70,  ty: 80,  letter: 'N' },
        { tx: 70,  ty: 115, letter: 'N' },
        { tx: 70,  ty: 150, letter: 'N' },
        { tx: 95,  ty: 80,  letter: 'N' },
        { tx: 115, ty: 115, letter: 'N' },
        { tx: 140, ty: 45,  letter: 'N' },
        { tx: 140, ty: 80,  letter: 'N' },
        { tx: 140, ty: 115, letter: 'N' },
        { tx: 140, ty: 150, letter: 'N' },
        
        // Letter 'J'
        { tx: 180, ty: 45,  letter: 'J' },
        { tx: 210, ty: 45,  letter: 'J' },
        { tx: 240, ty: 45,  letter: 'J' },
        { tx: 210, ty: 80,  letter: 'J' },
        { tx: 210, ty: 115, letter: 'J' },
        { tx: 210, ty: 140, letter: 'J' },
        { tx: 195, ty: 152, letter: 'J' },
        { tx: 175, ty: 142, letter: 'J' }
      ];

      const pNodes = targetPoints.map(tp => ({
        x: Math.random() * pWidth,
        y: Math.random() * pHeight,
        tx: tp.tx,
        ty: tp.ty,
        letter: tp.letter,
        radius: 3,
        alpha: 0.2
      }));

      const pStartTime = performance.now();
      const pDuration = 1400; // 1.4 seconds snappy formation

      const animatePreloader = (time) => {
        if (preloaderFinished) return;

        const elapsed = time - pStartTime;
        const progress = Math.min(elapsed / pDuration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        pCtx.clearRect(0, 0, pWidth, pHeight);

        pNodes.forEach(node => {
          node.x = node.x + (node.tx - node.x) * 0.08;
          node.y = node.y + (node.ty - node.y) * 0.08;
          node.alpha = 0.3 + ease * 0.7;

          pCtx.beginPath();
          pCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          pCtx.fillStyle = node.letter === 'N' ? `rgba(34, 211, 238, ${node.alpha})` : `rgba(139, 92, 246, ${node.alpha})`;
          pCtx.shadowColor = node.letter === 'N' ? '#22d3ee' : '#8b5cf6';
          pCtx.shadowBlur = 8 * ease;
          pCtx.fill();
          pCtx.shadowBlur = 0;
        });

        for (let i = 0; i < pNodes.length; i++) {
          for (let j = i + 1; j < pNodes.length; j++) {
            const a = pNodes[i];
            const b = pNodes[j];
            if (a.letter === b.letter) {
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.hypot(dx, dy);

              if (dist < 48) {
                const lineAlpha = (1 - dist / 48) * ease * 0.85;
                pCtx.beginPath();
                pCtx.moveTo(a.x, a.y);
                pCtx.lineTo(b.x, b.y);
                pCtx.strokeStyle = a.letter === 'N' ? `rgba(34, 211, 238, ${lineAlpha})` : `rgba(139, 92, 246, ${lineAlpha})`;
                pCtx.lineWidth = 1.5;
                pCtx.stroke();
              }
            }
          }
        }

        if (preloaderProgress) {
          preloaderProgress.style.width = `${Math.round(progress * 100)}%`;
        }

        if (progress < 0.4) {
          if (preloaderText) preloaderText.textContent = "INITIALIZING SYNAPTIC MATRIX...";
        } else if (progress < 0.85) {
          if (preloaderText) preloaderText.textContent = "CALIBRATING NEURAL CORES...";
        } else {
          if (preloaderText) preloaderText.textContent = "SYNAPSE LINK ESTABLISHED [NJ]";
        }

        if (progress < 1) {
          requestAnimationFrame(animatePreloader);
        } else {
          setTimeout(dismissPreloader, 300);
        }
      };

      requestAnimationFrame(animatePreloader);
    } else {
      dismissPreloader();
    }
  } catch (err) {
    console.error('Preloader initialization error:', err);
    document.body.classList.remove('loading-active');
    const p = document.getElementById('preloader');
    if (p) p.style.display = 'none';
  }


  // ==========================================================================
  // 3. LIVING NEURAL BACKGROUND CANVAS ENGINE
  // Full-screen canvas of glowing nodes, synaptic connection lines,
  // traveling pulse packets, interactive mouse attractor, touch & scroll ripple.
  // ==========================================================================
  try {
    const neuralCanvas = document.getElementById('neural-canvas');
    if (neuralCanvas && neuralCanvas.getContext) {
      const ctx = neuralCanvas.getContext('2d');
      let width = window.innerWidth;
      let height = window.innerHeight;
      let dpr = Math.min(window.devicePixelRatio || 1, 2);
      let animationFrameId = null;
      let isTabVisible = true;

      const mouse = {
        x: -1000,
        y: -1000,
        radius: 170,
        active: false
      };

      let nodes = [];
      let pulses = [];
      let hubNodes = [];

      const resizeCanvas = () => {
        try {
          width = window.innerWidth;
          height = window.innerHeight;
          dpr = Math.min(window.devicePixelRatio || 1, 2);

          neuralCanvas.width = width * dpr;
          neuralCanvas.height = height * dpr;
          neuralCanvas.style.width = width + 'px';
          neuralCanvas.style.height = height + 'px';

          if (ctx.resetTransform) {
            ctx.resetTransform();
          } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
          }
          ctx.scale(dpr, dpr);

          initNeuralNetwork();
        } catch (e) {
          console.error('Resize canvas error:', e);
        }
      };

      const initNeuralNetwork = () => {
        nodes = [];
        pulses = [];

        const isMobile = width < 768;
        const nodeCount = isMobile ? 36 : 85;

        for (let i = 0; i < nodeCount; i++) {
          const isCyan = Math.random() > 0.35;
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
            vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
            baseRadius: Math.random() * 1.6 + 1.2,
            radius: 1.5,
            color: isCyan ? 'rgba(34, 211, 238,' : 'rgba(139, 92, 246,',
            hex: isCyan ? '#22d3ee' : '#8b5cf6',
            phase: Math.random() * Math.PI * 2,
            isHub: false
          });
        }

        const sections = ['home', 'about', 'education', 'skills', 'projects', 'certifications', 'contact'];
        hubNodes = sections.map((secId, idx) => {
          const posX = width * (0.15 + (idx % 3) * 0.35);
          const posY = height * (0.18 + Math.floor(idx / 3) * 0.35);

          const hub = {
            id: secId,
            x: posX + (Math.random() - 0.5) * 60,
            y: posY + (Math.random() - 0.5) * 60,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            baseRadius: 6,
            radius: 6,
            color: 'rgba(34, 211, 238,',
            hex: '#22d3ee',
            phase: Math.random() * Math.PI * 2,
            isHub: true,
            activeAura: 0
          };
          nodes.push(hub);
          return hub;
        });
      };

      const spawnSignalPulse = (fromNode, toNode) => {
        if (!fromNode || !toNode) return;
        pulses.push({
          from: fromNode,
          to: toNode,
          progress: 0,
          speed: 0.025 + Math.random() * 0.02,
          color: Math.random() > 0.4 ? '#22d3ee' : '#c084fc',
          size: 3
        });
      };

      window.triggerHubSignal = (sectionId) => {
        try {
          const hub = hubNodes.find(h => h.id === sectionId);
          if (hub) {
            hub.activeAura = 1.0;
            const neighbors = nodes
              .filter(n => n !== hub)
              .sort((a, b) => Math.hypot(a.x - hub.x, a.y - hub.y) - Math.hypot(b.x - hub.x, b.y - hub.y))
              .slice(0, 4);

            neighbors.forEach(n => spawnSignalPulse(n, hub));
          }
        } catch (e) {
          console.error('Trigger hub signal error:', e);
        }
      };

      let lastAutoPulse = 0;

      const render = (time) => {
        if (!isTabVisible) return;

        try {
          ctx.clearRect(0, 0, width, height);

          const isMobile = width < 768;
          const connectionDist = isMobile ? 95 : 145;

          if (time - lastAutoPulse > 1800) {
            lastAutoPulse = time;
            if (nodes.length > 5) {
              const randFrom = nodes[Math.floor(Math.random() * nodes.length)];
              const randTo = nodes[Math.floor(Math.random() * nodes.length)];
              if (randFrom && randTo && Math.hypot(randFrom.x - randTo.x, randFrom.y - randTo.y) < connectionDist * 1.5) {
                spawnSignalPulse(randFrom, randTo);
              }
            }
          }

          // Update & Draw Nodes
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            node.x += node.vx;
            node.y += node.vy;

            if (node.x < -20) node.x = width + 20;
            if (node.x > width + 20) node.x = -20;
            if (node.y < -20) node.y = height + 20;
            if (node.y > height + 20) node.y = -20;

            node.phase += 0.03;
            const breath = Math.sin(node.phase) * 0.6;
            node.radius = Math.max(1, node.baseRadius + breath);

            if (mouse.active) {
              const dx = mouse.x - node.x;
              const dy = mouse.y - node.y;
              const dist = Math.hypot(dx, dy);

              if (dist < mouse.radius) {
                const force = (1 - dist / mouse.radius) * 0.04;
                node.x += dx * force;
                node.y += dy * force;
                node.radius += (1 - dist / mouse.radius) * 2;
              }
            }

            if (node.isHub) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.radius + 7 + Math.sin(node.phase * 1.5) * 2, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(34, 211, 238, ${0.25 + (node.activeAura || 0) * 0.5})`;
              ctx.lineWidth = 1;
              ctx.stroke();

              if (node.activeAura > 0) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, (1 - node.activeAura) * 45 + 10, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(34, 211, 238, ${node.activeAura * 0.6})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
                node.activeAura -= 0.015;
              }
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.isHub ? '#22d3ee' : `${node.color} 0.85)`;
            if (node.isHub || (mouse.active && Math.hypot(mouse.x - node.x, mouse.y - node.y) < 100)) {
              ctx.shadowColor = node.hex;
              ctx.shadowBlur = node.isHub ? 14 : 8;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Draw Synapses
          ctx.lineWidth = 0.9;
          for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
              const b = nodes[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.hypot(dx, dy);

              if (dist < connectionDist) {
                const alpha = (1 - dist / connectionDist) * 0.35;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
                ctx.stroke();
              }
            }

            if (mouse.active) {
              const distToMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
              if (distToMouse < mouse.radius) {
                const mouseAlpha = (1 - distToMouse / mouse.radius) * 0.7;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(34, 211, 238, ${mouseAlpha})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
                ctx.lineWidth = 0.9;
              }
            }
          }

          // Draw Traveling Pulses
          for (let i = pulses.length - 1; i >= 0; i--) {
            const p = pulses[i];
            p.progress += p.speed;

            if (p.progress >= 1) {
              pulses.splice(i, 1);
              continue;
            }

            const px = p.from.x + (p.to.x - p.from.x) * p.progress;
            const py = p.from.y + (p.to.y - p.from.y) * p.progress;

            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        } catch (frameErr) {
          console.error('Canvas render frame error:', frameErr);
        }

        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) {
          animationFrameId = requestAnimationFrame(render);
        }
      };

      window.addEventListener('resize', () => {
        clearTimeout(window._resizeTimer);
        window._resizeTimer = setTimeout(resizeCanvas, 150);
      });

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      });

      window.addEventListener('mouseleave', () => {
        mouse.active = false;
      });

      window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
          mouse.active = true;
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
          mouse.active = true;
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        mouse.active = false;
      });

      let lastScrollY = window.scrollY;
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        const impulse = Math.min(Math.max(scrollDelta * 0.05, -3), 3);
        nodes.forEach(n => {
          n.y -= impulse * 0.3;
        });

        if (Math.abs(scrollDelta) > 15 && Math.random() > 0.6 && nodes.length > 2) {
          const n1 = nodes[Math.floor(Math.random() * nodes.length)];
          const n2 = nodes[Math.floor(Math.random() * nodes.length)];
          spawnSignalPulse(n1, n2);
        }
      }, { passive: true });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          isTabVisible = false;
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
        } else {
          isTabVisible = true;
          const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!prefersReduced) {
            animationFrameId = requestAnimationFrame(render);
          }
        }
      });

      resizeCanvas();
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        render(0);
      }
    }
  } catch (canvasErr) {
    console.error('Neural canvas subsystem error:', canvasErr);
  }


  // ==========================================================================
  // 4. TYPING ANIMATION (Hero Section)
  // ==========================================================================
  try {
    const typingTextEl = document.getElementById('typing-text');
    if (typingTextEl) {
      const words = [
        "AI & ML Student",
        "Python Learner",
        "C Programmer",
        "Space & AI Enthusiast"
      ];

      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 80;

      const typeLoop = () => {
        try {
          const currentWord = words[wordIndex];

          if (isDeleting) {
            typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
          } else {
            typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
          }

          if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1900;
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400;
          }

          setTimeout(typeLoop, typingSpeed);
        } catch (e) {
          console.error('Typing animation error:', e);
        }
      };

      setTimeout(typeLoop, 600);
    }
  } catch (typeErr) {
    console.error('Typing initialization error:', typeErr);
  }


  // ==========================================================================
  // 5. NAVIGATION, SECTION SPY & HUB ACTIVATION
  // ==========================================================================
  try {
    const sections = document.querySelectorAll('section[data-hub-id]');
    const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-links .mobile-link');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileMenuToggle && mobileNavMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenuToggle.classList.toggle('menu-open', !isExpanded);
        mobileNavMenu.classList.toggle('menu-active', !isExpanded);
        mobileNavMenu.setAttribute('aria-hidden', isExpanded);
      });

      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mobileMenuToggle.classList.remove('menu-open');
          mobileNavMenu.classList.remove('menu-active');
          mobileNavMenu.setAttribute('aria-hidden', 'true');
        });
      });
    }

    if (window.IntersectionObserver) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-hub-id');

            desktopNavLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
            });
            mobileNavLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
            });

            if (window.triggerHubSignal) {
              window.triggerHubSignal(sectionId);
            }
          }
        });
      }, {
        threshold: 0.25,
        rootMargin: "-5% 0px -15% 0px"
      });

      sections.forEach(sec => sectionObserver.observe(sec));
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function() {
        const targetId = this.getAttribute('href').substring(1);
        if (window.triggerHubSignal) {
          window.triggerHubSignal(targetId);
        }
      });
    });
  } catch (navErr) {
    console.error('Navigation subsystem error:', navErr);
  }


  // ==========================================================================
  // 6. CUSTOM CURSOR WITH LERP SMOOTHING (Desktop only)
  // ==========================================================================
  try {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let mouseX = -100;
      let mouseY = -100;
      let ringX = -100;
      let ringY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      });

      const updateRing = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        requestAnimationFrame(updateRing);
      };
      requestAnimationFrame(updateRing);

      const interactiveTargets = document.querySelectorAll('a, button, input, textarea, .skill-node, .project-card, .cert-card, .interest-chip, .channel-card');
      interactiveTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
      });

      window.addEventListener('mousedown', () => cursorRing.classList.add('cursor-active'));
      window.addEventListener('mouseup', () => cursorRing.classList.remove('cursor-active'));
    }
  } catch (cursorErr) {
    console.error('Custom cursor error:', cursorErr);
  }


  // ==========================================================================
  // 7. 3D TILT MICRO-INTERACTIONS
  // ==========================================================================
  try {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (!prefersReducedMotion && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
      tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
      });
    }
  } catch (tiltErr) {
    console.error('Tilt micro-interactions error:', tiltErr);
  }


  // ==========================================================================
  // 8. EDUCATION SECONDARY NODES TOGGLE
  // ==========================================================================
  try {
    const node12th = document.getElementById('edu-node-12th');
    const node10th = document.getElementById('edu-node-10th');

    if (educationConfig.showSecondaryEducation) {
      if (node12th) {
        node12th.style.display = 'block';
        const yearEl = document.getElementById('edu-12th-year');
        const titleEl = document.getElementById('edu-12th-title');
        const schoolEl = document.getElementById('edu-12th-school');
        const descEl = document.getElementById('edu-12th-desc');
        if (yearEl) yearEl.textContent = educationConfig.class12th.year;
        if (titleEl) titleEl.textContent = educationConfig.class12th.title;
        if (schoolEl) schoolEl.textContent = educationConfig.class12th.school;
        if (descEl) descEl.textContent = educationConfig.class12th.description;
      }
      if (node10th) {
        node10th.style.display = 'block';
        const yearEl = document.getElementById('edu-10th-year');
        const titleEl = document.getElementById('edu-10th-title');
        const schoolEl = document.getElementById('edu-10th-school');
        const descEl = document.getElementById('edu-10th-desc');
        if (yearEl) yearEl.textContent = educationConfig.class10th.year;
        if (titleEl) titleEl.textContent = educationConfig.class10th.title;
        if (schoolEl) schoolEl.textContent = educationConfig.class10th.school;
        if (descEl) descEl.textContent = educationConfig.class10th.description;
      }
    }
  } catch (eduErr) {
    console.error('Education module error:', eduErr);
  }


  // ==========================================================================
  // 9. CERTIFICATIONS & ACHIEVEMENTS SYSTEM
  // ==========================================================================
  try {
    const certButtons = document.querySelectorAll('.cert-btn');
    const certToast = document.getElementById('cert-toast');
    const certToastMsg = document.getElementById('cert-toast-msg');

    let toastTimeout = null;
    const showCertToast = (message) => {
      if (!certToast || !certToastMsg) return;
      certToastMsg.textContent = message;
      certToast.classList.add('toast-show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        certToast.classList.remove('toast-show');
      }, 3800);
    };

    certButtons.forEach(btn => {
      const certId = btn.getAttribute('data-cert-target');
      const certItem = certificatesConfig.find(c => c.id === certId);

      const btnTextSpan = btn.querySelector('.cert-btn-text');
      if (certItem) {
        if (certItem.available) {
          if (btnTextSpan) btnTextSpan.textContent = "View Certificate";
        } else {
          if (btnTextSpan) btnTextSpan.textContent = "Check Certificate";
        }
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!certItem) return;

        if (certItem.available) {
          window.open(certItem.file, '_blank');
        } else {
          if (btnTextSpan) {
            const originalText = btnTextSpan.textContent;
            btnTextSpan.textContent = "Certificate coming soon";
            setTimeout(() => {
              btnTextSpan.textContent = originalText;
            }, 2500);
          }
          showCertToast(`${certItem.title} certificate coming soon! Place file in /certificates folder.`);
        }
      });
    });
  } catch (certErr) {
    console.error('Certifications module error:', certErr);
  }


  // ==========================================================================
  // 10. CONTACT FORM VALIDATION & MAILTO CLIENT LAUNCH
  // ==========================================================================
  try {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const successBanner = document.getElementById('form-success-banner');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        const nameVal = nameInput ? nameInput.value.trim() : "";
        const nameGroup = nameInput ? nameInput.closest('.form-group') : null;
        if (!nameVal) {
          if (nameGroup) nameGroup.classList.add('has-error');
          isValid = false;
        } else if (nameGroup) {
          nameGroup.classList.remove('has-error');
        }

        const emailVal = emailInput ? emailInput.value.trim() : "";
        const emailGroup = emailInput ? emailInput.closest('.form-group') : null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          if (emailGroup) emailGroup.classList.add('has-error');
          isValid = false;
        } else if (emailGroup) {
          emailGroup.classList.remove('has-error');
        }

        const messageVal = messageInput ? messageInput.value.trim() : "";
        const msgGroup = messageInput ? messageInput.closest('.form-group') : null;
        if (!messageVal) {
          if (msgGroup) msgGroup.classList.add('has-error');
          isValid = false;
        } else if (msgGroup) {
          msgGroup.classList.remove('has-error');
        }

        if (!isValid) return;

        if (contactConfig.useFormspree) {
          fetch(contactConfig.formspreeEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: nameVal, email: emailVal, message: messageVal })
          })
          .then(res => {
            if (res.ok) {
              if (successBanner) successBanner.style.display = 'flex';
              contactForm.reset();
            } else {
              alert('Oops! There was a problem submitting your form to Formspree.');
            }
          })
          .catch(() => alert('Network error submitting to Formspree.'));
        } else {
          const subject = encodeURIComponent(`Portfolio Inquiry from ${nameVal}`);
          const body = encodeURIComponent(
            `Hi Nayan,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}\n\n---\nSent from Portfolio Neural Network`
          );
          const mailtoUrl = `mailto:${contactConfig.destinationEmail}?subject=${subject}&body=${body}`;

          if (successBanner) {
            successBanner.style.display = 'flex';
          }

          if (window.triggerHubSignal) {
            window.triggerHubSignal('contact');
          }

          window.location.href = mailtoUrl;
        }
      });

      [nameInput, emailInput, messageInput].forEach(inp => {
        if (inp) {
          inp.addEventListener('input', () => {
            const group = inp.closest('.form-group');
            if (group) group.classList.remove('has-error');
          });
        }
      });
    }
  } catch (contactErr) {
    console.error('Contact form module error:', contactErr);
  }


  // ==========================================================================
  // 11. QUICK ACTIONS: COPY EMAIL & BACK TO TOP
  // ==========================================================================
  try {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyBtnText = document.getElementById('copy-btn-text');

    if (copyEmailBtn && copyBtnText) {
      copyEmailBtn.addEventListener('click', () => {
        const emailToCopy = "njainmathania@gmail.com";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(emailToCopy).then(() => {
            copyBtnText.textContent = "Copied!";
            copyEmailBtn.style.borderColor = "var(--cyan-primary)";
            setTimeout(() => {
              copyBtnText.textContent = "Copy";
              copyEmailBtn.style.borderColor = "";
            }, 2200);
          }).catch(() => {
            prompt("Copy email address:", emailToCopy);
          });
        } else {
          prompt("Copy email address:", emailToCopy);
        }
      });
    }

    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        if (window.triggerHubSignal) {
          window.triggerHubSignal('home');
        }
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  } catch (quickErr) {
    console.error('Quick actions module error:', quickErr);
  }

});
