/* ===================================
   VISITA PAGE JAVASCRIPT
   Smooth Scroll + Scroll to Top + Animations
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Visita Page JavaScript inizializzato');

    // ============================================
    // SMOOTH SCROLL PER BOTTONI VISITA
    // ============================================
    
    const btnVisitMuseum = document.querySelector('a[href="#visita-standard"]');
    const btnVisitGuided = document.querySelector('a[href="#visita-guidata"]');
    
    if (btnVisitMuseum) {
        btnVisitMuseum.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#visita-standard');
            
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Scroll to Visita Standard');
            }
        });
    }
    
    if (btnVisitGuided) {
        btnVisitGuided.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#visita-guidata');
            
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('Scroll to Visita Guidata');
            }
        });
    }

    // ============================================
    // SCROLL TO TOP BUTTON - FIXED UNTIL FOOTER
    // Identico alla homepage
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

            // Distanza fissa dal bottom quando è in modalità fixed
            const fixedBottom = 30;
            const arrowHeight = 50;

            if (isMobile) {
                // ===== MOBILE: Si ferma alle icone social =====
                const socialIcons = document.querySelector('.social-icons');
                const socialRect = socialIcons.getBoundingClientRect();

                // Calcola dove dovrebbe fermarsi la freccia
                const arrowTargetTop = socialRect.top;

                // Calcola la posizione fixed della freccia
                const fixedTop = windowHeight - fixedBottom - arrowHeight;

                // Se le icone social sono ancora SOTTO la posizione fixed
                if (arrowTargetTop > fixedTop) {
                    // Mantieni la freccia fixed in basso
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = fixedBottom + 'px';
                    scrollToTopBtn.style.right = '20px';
                    scrollToTopBtn.style.top = 'auto';
                } else {
                    // La freccia ha raggiunto le icone social
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

                // Calcola la posizione target della freccia nel footer
                const arrowTargetTop = getInTouchRect.top - gapBetweenArrowAndButton - arrowHeight;

                // Calcola la posizione fixed della freccia
                const fixedTop = windowHeight - fixedBottom - arrowHeight;

                // Se la posizione target è ancora SOTTO la posizione fixed
                if (arrowTargetTop > fixedTop) {
                    // Mantieni la freccia fixed in basso
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = fixedBottom + 'px';
                    scrollToTopBtn.style.right = '40px';
                    scrollToTopBtn.style.top = 'auto';
                } else {
                    // La freccia ha raggiunto la sua posizione nel footer
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
    // STICKY HEADER - HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
    // Identico alla homepage
    // ============================================

    const header = document.querySelector('.main-header');

    if (header) {
        let lastScrollTop = 0;
        let scrollThreshold = 10;

        window.addEventListener('scroll', function() {
            const currentScroll = window.scrollY;

            // Se siamo all'inizio della pagina, mostra sempre l'header
            if (currentScroll <= 0) {
                header.classList.remove('header-hidden');
                return;
            }

            // Calcola la differenza di scroll
            const scrollDiff = currentScroll - lastScrollTop;

            // Solo se lo scroll supera la soglia
            if (Math.abs(scrollDiff) > scrollThreshold) {
                if (scrollDiff > 0) {
                    // Scrolling DOWN - nascondi header
                    header.classList.add('header-hidden');
                } else {
                    // Scrolling UP - mostra header
                    header.classList.remove('header-hidden');
                }

                lastScrollTop = currentScroll;
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL PER LINK INTERNI
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo per link con # reali (non solo #)
            if (href.length > 1 && href !== '#visita-standard' && href !== '#visita-guidata') {
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
    // FADE IN ANIMATIONS ON SCROLL
    // Identico alla homepage
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
    document.querySelectorAll('.buttons-section, .map-info-section, .pricing-section, .accessibility-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ============================================
    // HOVER EFFECTS PER BUTTONS E CARDS
    // ============================================
    
    // Hover effects per i pulsanti visita
    const visitButtons = document.querySelectorAll('.btn-visit-box');
    visitButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Hover effects per i pulsanti acquista
    const buyButtons = document.querySelectorAll('.btn-buy-ticket');
    buyButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    
    console.log('%cVisita Page Script caricato con successo!', 'font-size: 14px; color: #f5c900; font-weight: bold;');
    console.log('✓ Smooth scroll per bottoni visita');
    console.log('✓ Scroll to top button');
    console.log('✓ Sticky header');
    console.log('✓ Animazioni fade-in on scroll');
    console.log('✓ Hover effects');

});
