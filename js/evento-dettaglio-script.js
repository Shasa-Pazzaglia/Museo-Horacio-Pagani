/* ===================================
   EVENTO DETTAGLIO PAGE JAVASCRIPT
   Scroll to Top + Sticky Header + Animations
   Identico alla homepage
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Evento Dettaglio JavaScript inizializzato');

    // ============================================
    // SCROLL TO TOP BUTTON - FIXED UNTIL FOOTER
    // Si ferma SOPRA il bottone Get in touch (desktop)
    // Si ferma SOPRA le icone social (mobile)
    // IDENTICO ALLA HOMEPAGE
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
            // Mostra il pulsante dopo aver iniziato a scorrere (es. dopo 100px)
            if (window.scrollY > 100) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }

            const windowHeight = window.innerHeight;
            const isMobile = window.innerWidth < 992;

            // Distanza fissa dal bottom quando è in modalità fixed
            const fixedBottom = 30;
            const arrowHeight = 50; // Altezza della freccia

            if (isMobile) {
                // ===== MOBILE: Si ferma SOPRA alle icone social =====
                const socialIcons = document.querySelector('.social-icons');
                if (!socialIcons) return;
                
                const socialRect = socialIcons.getBoundingClientRect();
                const gapBetweenArrowAndSocial = 30;

                // Calcola dove dovrebbe fermarsi la freccia (SOPRA le icone social)
                const arrowTargetTop = socialRect.top - gapBetweenArrowAndSocial - arrowHeight;

                // Calcola la posizione fixed della freccia (bottom della viewport)
                const fixedTop = windowHeight - fixedBottom - arrowHeight;

                // Se la posizione target è ancora SOTTO la posizione fixed
                if (arrowTargetTop > fixedTop) {
                    // Mantieni la freccia fixed in basso
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = fixedBottom + 'px';
                    scrollToTopBtn.style.right = '20px';
                    scrollToTopBtn.style.top = 'auto';
                } else {
                    // La freccia ha raggiunto le icone social, fermala SOPRA
                    const distanceFromBottom = windowHeight - arrowTargetTop - arrowHeight;
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = distanceFromBottom + 'px';
                    scrollToTopBtn.style.right = '20px';
                    scrollToTopBtn.style.top = 'auto';
                }
            } else {
                // ===== DESKTOP: Si ferma SOPRA al bottone Get in touch =====
                const getInTouchBtn = document.querySelector('.btn-get-in-touch');
                if (!getInTouchBtn) return;
                
                const getInTouchRect = getInTouchBtn.getBoundingClientRect();
                const gapBetweenArrowAndButton = 30; // Gap tra freccia e bottone

                // Calcola la posizione target della freccia nel footer
                // La freccia dovrebbe essere 30px SOPRA al bottone "Get in touch"
                const arrowTargetTop = getInTouchRect.top - gapBetweenArrowAndButton - arrowHeight;

                // Calcola la posizione fixed della freccia (bottom della viewport)
                const fixedTop = windowHeight - fixedBottom - arrowHeight;

                // Se la posizione target della freccia è ancora SOTTO la posizione fixed
                if (arrowTargetTop > fixedTop) {
                    // Mantieni la freccia fixed in basso
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = fixedBottom + 'px';
                    scrollToTopBtn.style.right = '40px';
                    scrollToTopBtn.style.top = 'auto';
                } else {
                    // La freccia ha raggiunto la sua posizione nel footer
                    // Calcola il bottom dinamico per mantenerla 30px SOPRA al bottone
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
    // IDENTICO ALLA HOMEPAGE
    // ============================================

    const header = document.querySelector('.main-header');

    if (header) {
        let lastScrollTop = 0;
        let scrollThreshold = 10; // Soglia minima per attivare il cambio (evita jitter)

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
    // FADE IN ANIMATIONS ON SCROLL
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
    document.querySelectorAll('.event-detail-hero, .gallery-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ============================================
    // GALLERY BOXES STAGGER ANIMATION
    // ============================================
    
    const galleryBoxes = document.querySelectorAll('.gallery-box');
    
    if (galleryBoxes.length > 0) {
        galleryBoxes.forEach((box, index) => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(20px)';
            box.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            observer.observe(box);
        });
    }

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    
    console.log('%cEvento Dettaglio Page caricata con successo!', 'font-size: 14px; color: #f5c900; font-weight: bold;');
    console.log('✓ Scroll to top button con behavior identico homepage');
    console.log('✓ Sticky header (hide on scroll down, show on scroll up)');
    console.log('✓ Smooth scroll per link interni');
    console.log('✓ Animazioni fade-in on scroll');
    console.log('✓ Gallery boxes stagger animation');

});