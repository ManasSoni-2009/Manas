// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================================
       1. GSAP & LENIS SETUP
       ========================================================================= */
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);


    /* =========================================================================
       2. PRELOADER ANIMATION
       ========================================================================= */
    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.preloader-text');
    const preloaderProgress = document.querySelector('.preloader-progress');

    const tlPreload = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = "auto";
            lenis.start();
            initHeroAnimations();
        }
    });

    lenis.stop();
    document.body.style.overflow = "hidden";

    tlPreload
        .to(preloaderProgress, { width: '100%', duration: 1.5, ease: "power2.inOut" })
        .to(preloaderText, { y: '0%', duration: 0.8, ease: "power4.out" }, "-=0.5")
        .to(preloader, { yPercent: -100, duration: 1, ease: "power4.inOut", delay: 0.3 })
        .set(preloader, { display: 'none' });


    /* =========================================================================
       3. CUSTOM CURSOR
       ========================================================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY, outlineX = mouseX, outlineY = mouseY;

    // Detect touch devices to disable custom cursor
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    if (!isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
        });

        const renderCursor = () => {
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            if (cursorDot && cursorOutline) {
                cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            }
            requestAnimationFrame(renderCursor);
        };
        renderCursor();

        const hoverTargets = document.querySelectorAll('.hover-target');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovered');
                cursorOutline.classList.add('hovered');
                const cursorText = target.getAttribute('data-cursor-text');
                if (cursorText) {
                    cursorDot.classList.add('cursor-text-active');
                    cursorDot.setAttribute('data-content', cursorText);
                }
            });
            target.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovered');
                cursorOutline.classList.remove('hovered');
                cursorDot.classList.remove('cursor-text-active');
                cursorDot.removeAttribute('data-content');
            });
        });
    }


    /* =========================================================================
       4. MAGNETIC BUTTONS
       ========================================================================= */
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });


    /* =========================================================================
       5. HERO ANIMATIONS
       ========================================================================= */
    function initHeroAnimations() {
        gsap.to('.hero-title .reveal-text', { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "expo.out" });
        gsap.to('.hero-subtitle', { y: 0, opacity: 1, duration: 1.2, delay: 0.6, ease: "expo.out" });
    }


    /* =========================================================================
       6. SCROLL TRIGGER ANIMATIONS (GLOBAL REVEALS & TIMELINE)
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal-text, .fade-text');
    revealElements.forEach((el) => {
        if (!el.closest('.hero')) {
            gsap.fromTo(el,
                { y: 60, opacity: 0, scale: 0.98 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out",
                    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
                }
            );
        }
    });

    // Parallax Image in About
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        gsap.to(parallaxImg, {
            yPercent: 20, ease: "none",
            scrollTrigger: { trigger: '.about-visual', start: "top bottom", end: "bottom top", scrub: true }
        });
    }

    // Timeline Items Scroll Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            y: 80, opacity: 0, scale: 0.95, duration: 1.2, ease: "expo.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Skill Grid Cards Stagger
    gsap.from('.skill-card', {
        y: 60, opacity: 0, scale: 0.9, stagger: 0.05, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: '.skills-grid', start: "top 85%" }
    });


    /* =========================================================================
       7. SKILL CARDS & MODAL LOGIC
       ========================================================================= */
    const skillCards = document.querySelectorAll('.skill-card');
    const modalOverlay = document.getElementById('skill-modal');
    const modalCloseBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalIconDiv = document.getElementById('modal-icon');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const desc = card.getAttribute('data-skilldesc');
            const iconHtml = card.querySelector('i') ? card.querySelector('i').outerHTML : card.querySelector('.custom-icon-text').outerHTML;

            modalTitle.innerText = title;
            modalDesc.innerText = desc;

            // Replace modal icon
            const iconContainer = document.querySelector('.modal-icon-container');
            iconContainer.innerHTML = iconHtml;

            // Stop smooth scroll while modal open
            lenis.stop();
            modalOverlay.classList.add('active');
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            lenis.start();
        });
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                lenis.start();
            }
        });
    }


    /* =========================================================================
       8. HORIZONTAL SCROLL FOR PROJECTS
       ========================================================================= */
    const horizontalScollSection = document.querySelector('.horizontal-scroll-wrapper');
    const horizontalContainer = document.querySelector('.horizontal-scroll-container');

    let mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
        if (horizontalContainer) {
            let scrollTween = gsap.to(horizontalContainer, {
                x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: horizontalScollSection,
                    pin: true, scrub: 1,
                    end: () => "+=" + horizontalContainer.scrollWidth,
                    invalidateOnRefresh: true
                }
            });

            const projectImgs = gsap.utils.toArray('.project-img');
            projectImgs.forEach(img => {
                gsap.to(img, {
                    xPercent: 10, ease: "none",
                    scrollTrigger: {
                        trigger: horizontalScollSection, scrub: 1, containerAnimation: scrollTween, start: "left right", end: "right left"
                    }
                });
            });
        }
    });


    /* =========================================================================
       9. HERO CANVAS (SIMPLE PARTICLES/NOISE EFFECT)
       ========================================================================= */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            let particleCount = width > 768 ? 150 : 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width, y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.5, vy: Math.random() * 0.5 + 0.1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(210, 255, 0, 0.4)';
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.y > height) p.y = 0;
                if (p.x > width) p.x = 0;
                if (p.x < 0) p.x = width;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
            });
            requestAnimationFrame(drawParticles);
        }

        initCanvas();
        drawParticles();
        window.addEventListener('resize', initCanvas);
    }


    /* =========================================================================
       10. MOBILE NAVIGATION
       ========================================================================= */
    const mobileBtn = document.querySelector('.nav-mobile-btn');
    const mobileMenu = document.querySelector('.nav-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let menuOpen = false;

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.add('active');
                mobileBtn.children[0].style.transform = 'translateY(8px) rotate(45deg)';
                mobileBtn.children[1].style.transform = 'translateY(-8px) rotate(-45deg)';
                lenis.stop();
            } else {
                closeMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        menuOpen = false;
        mobileMenu.classList.remove('active');
        mobileBtn.children[0].style.transform = 'none';
        mobileBtn.children[1].style.transform = 'none';
        lenis.start();
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            const targetId = link.getAttribute('href');
            lenis.scrollTo(targetId);
        });
    });

});
