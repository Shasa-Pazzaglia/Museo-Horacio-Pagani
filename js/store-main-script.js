/* ===================================
   STORE MAIN PAGE JAVASCRIPT
   Auto-play Carousel + Scroll to Top
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Store Main JavaScript inizializzato');

    // ============================================
    // 1. AUTO-PLAY CAROUSEL
    // ============================================
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 secondi per slide
    let autoPlayTimer;
    
    function showSlide(index) {
        // Rimuovi active da tutte le slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Aggiungi active alla slide e dot correnti
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
        console.log('Mostra slide:', currentSlide);
    }
    
    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, slideInterval);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }
    
    // Click sui dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // Pausa auto-play quando si passa sopra il carousel
    const carouselBox = document.querySelector('.carousel-hero-box');
    if (carouselBox) {
        carouselBox.addEventListener('mouseenter', stopAutoPlay);
        carouselBox.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Avvia auto-play
    startAutoPlay();

    // ============================================
    // 2. SCROLL TO TOP BUTTON - FIXED UNTIL FOOTER
    // ============================================

    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const footer = document.querySelector('.footer-container');
    const footerRight = document.querySelector('.footer-right');

    if (scrollToTopBtn && footer && footerRight) {
        // Nascondi inizialmente
        scrollToTopBtn.classList.add('hidden');

        // Click handler - scroll to top
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Scroll to top');
        });

        // Scroll handler - gestisce visibilità e posizionamento
        window.addEventListener('scroll', function() {
            // Mostra il pulsante dopo aver iniziato a scorrere
            if (window.scrollY > 100) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }

            const windowHeight = window.innerHeight;
            const isMobile = window.innerWidth < 992;

            const fixedBottom = 30;
            const arrowHeight = 50;

            if (isMobile) {
                // ===== MOBILE: Si ferma alle icone social =====
                const socialIcons = document.querySelector('.social-icons');
                const socialRect = socialIcons.getBoundingClientRect();

                const arrowTargetTop = socialRect.top;
                const fixedTop = windowHeight - fixedBottom - arrowHeight;

                if (arrowTargetTop > fixedTop) {
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = fixedBottom + 'px';
                    scrollToTopBtn.style.right = '20px';
                    scrollToTopBtn.style.top = 'auto';
                } else {
                    const distanceFromBottom = windowHeight - arrowTargetTop - arrowHeight;
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = distanceFromBottom + 'px';
                    scrollToTopBtn.style.right = '20px';
                    scrollToTopBtn.style.top = 'auto';
                }
            } else {
                // ===== DESKTOP: Si ferma sopra al bottone Get in touch =====
                const getInTouchBtn = document.querySelector('.btn-get-in-touch');
                const getInTouchRect = getInTouchBtn.getBoundingClientRect();
                const gapBetweenArrowAndButton = 30;

                const arrowTargetTop = getInTouchRect.top - gapBetweenArrowAndButton - arrowHeight;
                const fixedTop = windowHeight - fixedBottom - arrowHeight;

                if (arrowTargetTop > fixedTop) {
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = fixedBottom + 'px';
                    scrollToTopBtn.style.right = '40px';
                    scrollToTopBtn.style.top = 'auto';
                } else {
                    const distanceFromBottom = windowHeight - arrowTargetTop - arrowHeight;
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = distanceFromBottom + 'px';
                    scrollToTopBtn.style.right = '40px';
                    scrollToTopBtn.style.top = 'auto';
                }
            }
        });
    }

    // ============================================
    // 3. STICKY HEADER - HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
    // ============================================

    const header = document.querySelector('.main-header');

    if (header) {
        let lastScrollTop = 0;
        let scrollThreshold = 10;

        window.addEventListener('scroll', function() {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                header.classList.remove('header-hidden');
                return;
            }

            const scrollDiff = currentScroll - lastScrollTop;

            if (Math.abs(scrollDiff) > scrollThreshold) {
                if (scrollDiff > 0) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }

                lastScrollTop = currentScroll;
            }
        });
    }

    // ============================================
    // 4. SMOOTH SCROLL PER LINK INTERNI
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // 5. FADE IN ANIMATIONS ON SCROLL
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Osserva le sezioni
    document.querySelectorAll('.categories-section, .products-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    
    console.log('%cStore Main Script caricato con successo!', 'font-size: 14px; color: #f5c900; font-weight: bold;');
    console.log('✓ Auto-play carousel con dots');
    console.log('✓ Scroll to top button');
    console.log('✓ Sticky header');
    console.log('✓ Fade-in animations');

});
