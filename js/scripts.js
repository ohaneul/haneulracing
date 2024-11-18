document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.nav-bar');
    const navToggle = document.querySelector('.nav-toggle');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const snapIndicators = {
        left: document.createElement('div'),
        right: document.createElement('div')
    };

    Object.values(snapIndicators).forEach(indicator => {
        indicator.className = 'snap-indicator';
        document.body.appendChild(indicator);
    });

    function dragStart(e) {
        initialX = e.type === 'touchstart' ? e.touches[0].clientX - xOffset : e.clientX - xOffset;
        initialY = e.type === 'touchstart' ? e.touches[0].clientY - yOffset : e.clientY - yOffset;

        if (e.target === navbar) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.type === 'touchmove' ? e.touches[0].clientX - initialX : e.clientX - initialX;
            currentY = e.type === 'touchmove' ? e.touches[0].clientY - initialY : e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            const snapThreshold = 50;
            const screenWidth = window.innerWidth;
            
            if (currentX < snapThreshold) {
                snapIndicators.left.style.opacity = '0.5';
                snapIndicators.left.style.left = '20px';
                snapIndicators.left.style.top = `${currentY + 20}px`;
                snapIndicators.left.style.height = `${navbar.offsetHeight}px`;
            } else if (currentX > screenWidth - navbar.offsetWidth - snapThreshold) {
                snapIndicators.right.style.opacity = '0.5';
                snapIndicators.right.style.right = '20px';
                snapIndicators.right.style.top = `${currentY + 20}px`;
                snapIndicators.right.style.height = `${navbar.offsetHeight}px`;
            } else {
                Object.values(snapIndicators).forEach(indicator => {
                    indicator.style.opacity = '0';
                });
            }

            setTranslate(currentX, currentY, navbar);
        }
    }

    function dragEnd(e) {
        if (!isDragging) return;

        const snapThreshold = 50;
        const screenWidth = window.innerWidth;
        
        if (currentX < snapThreshold) {
            currentX = 20;
        } else if (currentX > screenWidth - navbar.offsetWidth - snapThreshold) {
            currentX = screenWidth - navbar.offsetWidth - 20;
        }

        setTranslate(currentX, currentY, navbar);
        
        Object.values(snapIndicators).forEach(indicator => {
            indicator.style.opacity = '0';
        });

        initialX = currentX;
        initialY = currentY;
        isDragging = false;

        // Toggle navbar visibility
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('hidden');
            navToggle.classList.toggle('visible');
        });
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    navbar.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    navbar.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    // Scroll indicator click handler
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        const navHeight = document.querySelector('.nav-bar').offsetHeight;
        const targetPosition = aboutSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling navigation
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav-bar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active section on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.nav-bar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (correspondingLink) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
    
    // Navbar scroll effect
    const lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    });
    
    // Set active nav item based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Animate stat numbers
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = stat.innerText;
        let startValue = 0;
        
        if (!isNaN(parseInt(finalValue))) {
            const duration = 2000;
            const step = parseInt(finalValue) / (duration / 16);
            
            const counter = setInterval(() => {
                startValue += step;
                if (startValue >= parseInt(finalValue)) {
                    stat.innerText = finalValue;
                    clearInterval(counter);
                } else {
                    stat.innerText = Math.floor(startValue);
                }
            }, 16);
        }
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add custom animation based on element type
                if (entry.target.classList.contains('stat-circle')) {
                    entry.target.style.animation = 'floatAnimation 4s ease-in-out infinite';
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.content-container').forEach(element => {
        observer.observe(element);
    });
    
    let heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        let opacity = 1 - (scrollPosition / (window.innerHeight * 0.5));
        
        if (opacity >= 0) {
            heroSection.style.opacity = opacity;
        }
    });
    
    // Theme toggling
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        themeToggle.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        
        // Save preference
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });
    
    // Check saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggle.classList.add('light-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    // Language toggling
    const languageToggle = document.getElementById('languageToggle');
    const translations = {
        en: {
            about: "About",
            achievements: "Achievements",
            profile: "Profile",
            simracing: "Sim Racing",
            contact: "Contact"
        },
        kr: {
            about: "소개",
            achievements: "성과",
            profile: "프로필",
            simracing: "심레이싱",
            contact: "연락처"
        }
    };
    
    let currentLang = localStorage.getItem('lang') || 'en';
    
    languageToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'kr' : 'en';
        languageToggle.querySelector('.current-lang').textContent = currentLang.toUpperCase();
        updateLanguage();
        localStorage.setItem('lang', currentLang);
    });
    
    function updateLanguage() {
        // Update navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            const key = link.getAttribute('href').replace('#', '');
            if (translations[currentLang][key]) {
                link.textContent = translations[currentLang][key];
            }
        });
        
        // Update other text elements
        if (currentLang === 'kr') {
            document.querySelector('.hero-content h2').textContent = '레이싱 드라이버';
        } else {
            document.querySelector('.hero-content h2').textContent = 'Racing Driver';
        }
    }
    
    // Initialize language
    if (localStorage.getItem('lang') === 'kr') {
        currentLang = 'kr';
        languageToggle.querySelector('.current-lang').textContent = 'KR';
        updateLanguage();
    }

    // Mouse move effect for content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            section.style.setProperty('--x', `${x}%`);
            section.style.setProperty('--y', `${y}%`);
        });
    });
});
