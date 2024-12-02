document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.nav-bar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Language translations
    const translations = {
        en: {
            nav: {
                about: 'About',
                achievements: 'Achievements',
                profile: 'Profile',
                simracing: 'Sim Racing',
                contact: 'Contact'
            },
            hero: {
                title: 'FEMALE RACING DRIVER IN THE',
                subtitle: 'PORSCHE CUP SERIES',
                description: 'Follow my journey as I compete in the Porsche Cup Series, pushing the limits of performance and representing the next generation of motorsport talent.'
            },
            about: {
                title: 'Racing Career',
                description: 'As a semi-professional racing driver in the Porsche Cup series, I compete in the highly demanding 992 GT3 Cup car, which requires precision driving skills and technical expertise.',
                highlight: 'Every race is an opportunity to showcase both speed and racecraft while pushing the limits of performance.'
            },
            // Add more sections as needed
        },
        kr: {
            nav: {
                about: '소개',
                achievements: '성과',
                profile: '프로필',
                simracing: '심 레이싱',
                contact: '연락처'
            },
            hero: {
                title: '포르쉐 컵 시리즈',
                subtitle: '여성 레이싱 드라이버',
                description: '포르쉐 컵 시리즈에서 경쟁하며 성능의 한계를 넘어서고 차세대 모터스포츠 인재를 대표하는 저의 여정을 함께해주세요.'
            },
            about: {
                title: '레이싱 경력',
                description: '포르쉐 컵 시리즈의 세미 프로 레이싱 드라이버로서, 정밀한 드라이빙 기술과 기술적 전문성이 요구되는 992 GT3 컵카를 운전하고 있습니다.',
                highlight: '모든 레이스는 속도와 레이스크래프트를 선보이며 성능의 한계에 도전하는 기회입니다.'
            },
            // Add more sections as needed
        }
    };

    // Function to update content based on language
    function updateContent(lang) {
        // Update navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            const key = link.getAttribute('href').replace('#', '');
            if (translations[lang].nav[key]) {
                link.textContent = translations[lang].nav[key];
            }
        });

        // Update hero section
        const heroTitle = document.querySelector('.hero-content h2');
        const heroDesc = document.querySelector('.hero-content p');
        if (heroTitle && heroDesc) {
            heroTitle.innerHTML = `${translations[lang].hero.title}<br>${translations[lang].hero.subtitle}`;
            heroDesc.innerHTML = translations[lang].hero.description;
        }

        // Update about section
        const aboutTitle = document.querySelector('#about h2');
        const aboutDesc = document.querySelector('#about p');
        const aboutHighlight = document.querySelector('#about .highlight-box p');
        if (aboutTitle && aboutDesc && aboutHighlight) {
            aboutTitle.textContent = translations[lang].about.title;
            aboutDesc.textContent = translations[lang].about.description;
            aboutHighlight.textContent = translations[lang].about.highlight;
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        const currentLang = languageToggle.querySelector('.current-lang');
        
        languageToggle.addEventListener('click', function() {
            if (currentLang.textContent === 'EN') {
                currentLang.textContent = 'KR';
                updateContent('kr');
            } else {
                currentLang.textContent = 'EN';
                updateContent('en');
            }
        });
    }

    // Section visibility observer
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Smooth image loading
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const scrollArrow = document.querySelector('.scroll-arrow');
        
        // Parallax effect for hero content
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.003);
        
        // Fade out scroll arrow
        if (scrollArrow) {
            scrollArrow.style.opacity = 1 - (scrolled * 0.01);
        }
    });

    function splitTextAnimation() {
        const headings = document.querySelectorAll('.animate-text');
        
        headings.forEach(heading => {
            const text = heading.textContent;
            heading.textContent = '';
            
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${i * 0.05}s`;
                heading.appendChild(span);
            });
        });
    }

    // Add to your existing IntersectionObserver
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                splitTextAnimation();
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.animate-text').forEach(text => {
        textObserver.observe(text);
    });

    // Add scroll progress indicator
    const progressBar = document.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // Add mouse movement effect
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        e.target.style.setProperty('--mouse-x', `${x}%`);
        e.target.style.setProperty('--mouse-y', `${y}%`);
    });
});
