document.addEventListener("DOMContentLoaded", () => {
    // 1. Typewriter Effect
    const roles = ["Frontend Developer", "ML Enthusiast", "Hackathon Participant"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector(".typewriter-text");
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    if (typewriterElement) {
        type();
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-links li");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("nav-active");
            hamburger.classList.toggle("toggle");
        });

        // Close mobile menu when a link is clicked
        links.forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("nav-active")) {
                    navLinks.classList.remove("nav-active");
                    hamburger.classList.remove("toggle");
                }
            });
        });
    }

    // 3. Navbar background on scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // 4. Scroll-Triggered Fade-In Animations (Intersection Observer)
    const sections = document.querySelectorAll(".section");
    
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // 5. Active Nav Link Highlight
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-links a").forEach(li => {
            li.classList.remove("active");
            if (li.getAttribute("href") === `#${current}`) {
                li.classList.add("active");
            }
        });
    });

    // 6. Canvas Particles Background
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        
        let particlesArray = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = "rgba(57, 211, 83, 0.2)"; // green accent with low opacity
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            particlesArray = [];
            const numberOfParticles = Math.min(Math.floor(window.innerWidth / 10), 100);
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
    }
});
