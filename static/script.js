// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.getElementById('portfolio-grid');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeCounters();
    loadPortfolioProjects();
    initializePortfolioFilters();
    initializeScrollEffects();
    initializeFormHandling();
    initializeAdvancedEffects();
});

// Load portfolio projects from API
async function loadPortfolioProjects(category = 'all') {
    try {
        const response = await fetch(`/api/projects?category=${category}`);
        const projects = await response.json();
        
        if (portfolioGrid) {
            portfolioGrid.innerHTML = '';
            
            if (projects.length === 0) {
                portfolioGrid.innerHTML = `
                    <div class="empty-portfolio" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <i class="fas fa-folder-open" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                        <h3>Henüz proje eklenmemiş</h3>
                        <p>Bu kategoride henüz proje bulunmuyor.</p>
                    </div>
                `;
                return;
            }
            
            projects.forEach((project, index) => {
                const projectElement = createProjectElement(project, index);
                portfolioGrid.appendChild(projectElement);
            });
        }
    } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
        if (portfolioGrid) {
            portfolioGrid.innerHTML = `
                <div class="error-portfolio" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f57c00; margin-bottom: 1rem;"></i>
                    <h3>Projeler yüklenemedi</h3>
                    <p>Lütfen sayfayı yenileyin ve tekrar deneyin.</p>
                </div>
            `;
        }
    }
}

// Create project element
function createProjectElement(project, index) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'portfolio-item';
    projectDiv.setAttribute('data-category', project.category);
    projectDiv.setAttribute('data-aos', 'fade-up');
    projectDiv.setAttribute('data-aos-delay', (index + 1) * 100);
    
    const categoryText = getCategoryText(project.category);
    const imageSrc = project.image_path ? `/static/${project.image_path}` : '';
    
    projectDiv.innerHTML = `
        <div class="portfolio-image">
            ${imageSrc ? 
                `<img src="${imageSrc}" alt="${project.title}" loading="lazy">` :
                `<div class="portfolio-placeholder">
                    <i class="fas fa-${getCategoryIcon(project.category)}"></i>
                </div>`
            }
        </div>
        <div class="portfolio-content">
            <div class="portfolio-category">${categoryText}</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.client ? `<p class="project-client"><strong>Müşteri:</strong> ${project.client}</p>` : ''}
            ${project.location ? `<p class="project-location"><strong>Konum:</strong> ${project.location}</p>` : ''}
            ${project.completion_date ? `<p class="project-date"><strong>Tamamlanma:</strong> ${formatDate(project.completion_date)}</p>` : ''}
            <button class="portfolio-btn" onclick="handleProjectView(${project.id})">
                <span>Detayları Gör</span>
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    return projectDiv;
}

// Get category text
function getCategoryText(category) {
    const categories = {
        'architecture': 'Mimarlık',
        'engineering': 'Mühendislik',
        'construction': 'İnşaat'
    };
    return categories[category] || category;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'architecture': 'drafting-compass',
        'engineering': 'calculator',
        'construction': 'hammer'
    };
    return icons[category] || 'building';
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Advanced Animation System
class SpectacularAnimations {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isLoaded = false;
        this.init();
    }

    init() {
        this.createPageTransition();
        this.initParticleSystem();
        this.initMagneticCursor();
        this.initAdvancedScrollAnimations();
        this.initMorphingElements();
        this.initSoundEffects();
    }

    // Spectacular Page Loading Animation
    createPageTransition() {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        transition.innerHTML = `
            <div class="loading-animation">
                <div class="loading-dots"></div>
                <div class="loading-dots"></div>
                <div class="loading-dots"></div>
                <div class="loading-dots"></div>
            </div>
        `;
        document.body.appendChild(transition);
        document.body.classList.add('page-loading');

        window.addEventListener('load', () => {
            setTimeout(() => {
                transition.classList.add('hidden');
                document.body.classList.remove('page-loading');
                setTimeout(() => transition.remove(), 800);
                this.isLoaded = true;
                this.triggerEntranceAnimations();
            }, 1000);
        });
    }

    // Advanced Particle System
    initParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'background-particles';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }

        // Create particles on mouse move
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.1) {
                this.createInteractiveParticle(e.clientX, e.clientY);
            }
        });
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.createParticle(container);
            }
        }, 25000);
    }

    createInteractiveParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0,0,0,0.2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            animation: interactive-particle 2s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes interactive-particle {
                0% {
                    transform: scale(0) translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2) translateY(-100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            style.remove();
        }, 2000);
    }

    // Magnetic Cursor Effects
    initMagneticCursor() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0,0,0,0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Magnetic effect for interactive elements
        const magneticElements = document.querySelectorAll('.btn, .service-card, .portfolio-item, .nav-link');
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(0,0,0,0.2)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(0,0,0,0.1)';
            });

            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Advanced Scroll Animations
    initAdvancedScrollAnimations() {
        let lastScrollY = window.scrollY;
        let navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Hide/show navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            lastScrollY = currentScrollY;

            // Parallax effects
            this.updateParallaxElements();
            this.updateMorphingElements();
        });

        // Intersection Observer for reveal animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = entry.target.dataset.animation || 'reveal-up 1s ease-out forwards';
                    this.addSpectacularEffect(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animations
        document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .feature-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(60px)';
            observer.observe(el);
        });

        // Add reveal animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes reveal-up {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes reveal-left {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes reveal-scale {
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .geometric-shape');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    addSpectacularEffect(element) {
        // Add glitter effect
        const glitter = document.createElement('div');
        glitter.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            opacity: 0;
            animation: glitter-burst 1.5s ease-out;
        `;
        
        element.style.position = 'relative';
        element.appendChild(glitter);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitter-burst {
                0% { opacity: 0; transform: scale(0) rotate(0deg); }
                50% { opacity: 1; transform: scale(1.1) rotate(180deg); }
                100% { opacity: 0; transform: scale(1.2) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            glitter.remove();
            style.remove();
        }, 1500);
    }

    // Morphing Elements
    initMorphingElements() {
        const morphingElements = document.querySelectorAll('.element, .geometric-shape');
        
        morphingElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.startMorphing(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.stopMorphing(element);
            });
        });
    }

    startMorphing(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
        element.style.transform = 'scale(1.2) rotate(180deg)';
        element.style.borderRadius = '50%';
        element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    }

    stopMorphing(element) {
        element.style.transform = 'scale(1) rotate(0deg)';
        element.style.borderRadius = '2px';
        element.style.boxShadow = 'none';
    }

    updateMorphingElements() {
        const scrolled = window.pageYOffset;
        const elements = document.querySelectorAll('.floating-elements .element');
        
        elements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const rotation = scrolled * speed;
            element.style.transform += ` rotate(${rotation}deg)`;
        });
    }

    // Sound Effects (subtle)
    initSoundEffects() {
        const playSound = (frequency, duration) => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.01, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };

        // Add subtle sound effects to interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => playSound(800, 0.1));
            btn.addEventListener('click', () => playSound(1000, 0.2));
        });

        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => playSound(600, 0.1));
        });
    }

    triggerEntranceAnimations() {
        // Trigger hero animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'hero-content-reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards';
        }

        // Staggered animations for navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.animation = `nav-link-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards`;
            }, index * 100);
        });

        // Add nav link animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes nav-link-reveal {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced existing functionality
const spectacularAnimations = new SpectacularAnimations();

// Navigation Toggle
const handleHamburgerClick = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    
    // Add spectacular animation to menu items
    if (navMenu.classList.contains('active')) {
        navLinks.forEach((link, index) => {
            link.style.animation = `menu-item-reveal 0.6s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.1}s forwards`;
        });
    }
};

hamburger.addEventListener('click', handleHamburgerClick);

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth Scrolling and Active Link Management
const handleNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                    // Add pulse effect to active link
                    link.style.animation = 'link-pulse 0.6s ease-out';
                }
            });
        }
    });
};

// Scroll Effects
const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    
    // Navbar scroll effect
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button with spectacular entrance
    if (scrollTop > 300) {
        if (!backToTopBtn.classList.contains('show')) {
            backToTopBtn.classList.add('show');
            backToTopBtn.style.animation = 'spectacular-entrance 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
        }
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Update active navigation
    handleNavigation();
    
    // Animate elements on scroll
    animateOnScroll();
};

window.addEventListener('scroll', handleScroll, { passive: true });

// Back to Top
const handleBackToTop = () => {
    // Add spectacular scroll animation
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    const animateScroll = (currentTime) => {
        const timeElapsed = currentTime - startTime;
        const duration = 1000; // 1 second
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition * (1 - ease));
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    };
    
    requestAnimationFrame(animateScroll);
};

// Hero Button Handlers
const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add flash effect to contact section
    setTimeout(() => {
        contactSection.style.animation = 'section-flash 1s ease-out';
    }, 800);
};

const handlePortfolioClick = () => {
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection.scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add spectacular reveal to portfolio items
    setTimeout(() => {
        portfolioGrid.querySelectorAll('.portfolio-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'portfolio-spectacular 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards';
            }, index * 100);
        });
    }, 800);
};

// Portfolio Filter System
const initializePortfolioFilters = () => {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Load projects from API based on filter
            await loadPortfolioProjects(filter);
        });
    });
};

// Project View Handler
const handleProjectView = async (projectId) => {
    try {
        const response = await fetch(`/api/projects/${projectId}`);
        const project = await response.json();
        
        if (project) {
            showProjectModal(project);
        } else {
            showProjectModal({
                title: 'Proje Bulunamadı',
                description: 'Bu proje hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz.'
            });
        }
    } catch (error) {
        console.error('Proje detayları yüklenirken hata oluştu:', error);
        showProjectModal({
            title: 'Hata',
            description: 'Proje detayları yüklenirken bir hata oluştu. Lütfen tekrar deneyin.'
        });
    }
};

// Enhanced Modal for Project Details
const showProjectModal = (project) => {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.4s ease;
        backdrop-filter: blur(10px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 48px;
        border-radius: 2px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.4s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
    `;
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 24px;">
            <h2 style="color: #000; margin-bottom: 8px; font-size: 24px; font-weight: 600;">${project.title}</h2>
            <div style="width: 40px; height: 2px; background: #000; margin-bottom: 24px;"></div>
        </div>
        
        ${project.image_path ? `
            <div style="margin-bottom: 24px; text-align: center;">
                <img src="/static/${project.image_path}" alt="${project.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            </div>
        ` : ''}
        
        <p style="color: #666; margin-bottom: 32px; line-height: 1.7; font-size: 16px;">
            ${project.description}
        </p>
        
        <div style="margin-bottom: 32px;">
            <h3 style="color: #000; font-size: 16px; font-weight: 600; margin-bottom: 16px;">Proje Detayları:</h3>
            <div style="display: grid; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 6px; height: 6px; background: #000; border-radius: 50%;"></div>
                    <span style="color: #666; font-size: 14px;"><strong>Kategori:</strong> ${getCategoryText(project.category)}</span>
                </div>
                ${project.client ? `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 6px; height: 6px; background: #000; border-radius: 50%;"></div>
                        <span style="color: #666; font-size: 14px;"><strong>Müşteri:</strong> ${project.client}</span>
                    </div>
                ` : ''}
                ${project.location ? `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 6px; height: 6px; background: #000; border-radius: 50%;"></div>
                        <span style="color: #666; font-size: 14px;"><strong>Konum:</strong> ${project.location}</span>
                    </div>
                ` : ''}
                ${project.completion_date ? `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 6px; height: 6px; background: #000; border-radius: 50%;"></div>
                        <span style="color: #666; font-size: 14px;"><strong>Tamamlanma Tarihi:</strong> ${formatDate(project.completion_date)}</span>
                    </div>
                ` : ''}
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 6px; height: 6px; background: #000; border-radius: 50%;"></div>
                    <span style="color: #666; font-size: 14px;"><strong>Durum:</strong> ${project.status === 'completed' ? 'Tamamlandı' : project.status === 'ongoing' ? 'Devam Ediyor' : 'Planlandı'}</span>
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <button onclick="this.closest('.modal').remove()" style="
                background: #000;
                color: white;
                border: none;
                padding: 16px 32px;
                border-radius: 2px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                font-family: inherit;
                font-size: 15px;
            " onmouseover="this.style.background='#333'" onmouseout="this.style.background='#000'">
                Kapat
            </button>
            <button onclick="handleContactClick(); this.closest('.modal').remove();" style="
                background: transparent;
                color: #000;
                border: 1px solid #000;
                padding: 16px 32px;
                border-radius: 2px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                font-family: inherit;
                font-size: 15px;
            " onmouseover="this.style.background='#000'; this.style.color='white';" onmouseout="this.style.background='transparent'; this.style.color='#000';">
                İletişime Geç
            </button>
        </div>
    `;
    
    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 400);
        }
    });
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 400);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
};

// Animated Counter
const initializeCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounters = () => {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.stats');
        const sectionTop = statsSection.offsetTop;
        const sectionHeight = statsSection.offsetHeight;
        const scrollPos = window.pageYOffset + window.innerHeight;
        
        if (scrollPos > sectionTop + sectionHeight / 2) {
            hasAnimated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
};

// Initialize Scroll Animations
const initializeScrollEffects = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
};

// Animate elements on scroll (for additional effects)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
const initializeAnimations = () => {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
    });
};

// Form Handling
const initializeFormHandling = () => {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add input animations
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'translateY(-2px)';
                input.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'translateY(0)';
                input.style.boxShadow = 'none';
            });
        });
    }
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.message) {
        showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
        return;
    }
    
    // Phone validation (basic Turkish format)
    const phoneRegex = /^[+]?[0-9\s\(\)-]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Lütfen geçerli bir telefon numarası girin.', 'error');
        return;
    }
    
    // Simulate form submission
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağız.', 'success');
        contactForm.reset();
    }, 2000);
};

// Enhanced Notification System
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const colors = {
        success: '#000',
        error: '#dc2626',
        info: '#2563eb'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: ${colors[type]};
        color: white;
        padding: 16px 24px;
        border-radius: 2px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s ease;
        max-width: 400px;
        font-weight: 500;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 5000);
    
    // Close on click
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    });
};

// Loading State
const showLoadingState = () => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Gönderiliyor...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
};

const hideLoadingState = () => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span>Mesaj Gönder</span> <i class="fas fa-arrow-right"></i>';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
};

// Smooth Page Load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add smooth transitions to all elements
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: opacity 0.3s ease, transform 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // Escape key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.opacity = '0';
            modal.querySelector('div').style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 400);
        });
    }
    
    // Arrow keys for portfolio navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filters = Array.from(filterBtns);
        const currentIndex = filters.indexOf(activeFilter);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            filters[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < filters.length - 1) {
            filters[currentIndex + 1].click();
        }
    }
});

// Touch/Swipe Support for Mobile Portfolio
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next portfolio filter
            const activeFilter = document.querySelector('.filter-btn.active');
            const filters = Array.from(filterBtns);
            const currentIndex = filters.indexOf(activeFilter);
            if (currentIndex < filters.length - 1) {
                filters[currentIndex + 1].click();
            }
        } else {
            // Swipe right - previous portfolio filter
            const activeFilter = document.querySelector('.filter-btn.active');
            const filters = Array.from(filterBtns);
            const currentIndex = filters.indexOf(activeFilter);
            if (currentIndex > 0) {
                filters[currentIndex - 1].click();
            }
        }
    }
};

// Performance Optimization - Throttled Scroll
let ticking = false;

const optimizedScroll = () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
};

window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', optimizedScroll, { passive: true });

// Intersection Observer for better performance
const createIntersectionObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Enhanced animation system
const initializeEnhancedAnimations = () => {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    
    const animationObserver = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Unobserve after animation to improve performance
                animationObserver.unobserve(entry.target);
            }
        });
    });
    
    elementsToAnimate.forEach(el => {
        animationObserver.observe(el);
    });
};

// Initialize enhanced animations on load
document.addEventListener('DOMContentLoaded', initializeEnhancedAnimations);

// Export functions for global access
window.handleContactClick = handleContactClick;
window.handlePortfolioClick = handlePortfolioClick;
window.handleProjectView = handleProjectView;
window.handleBackToTop = handleBackToTop; 