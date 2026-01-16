/* ===================================
   MAIN JAVASCRIPT - MUSEO PAGANI
   Carousel + Scroll to Top + Animations
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Main JavaScript inizializzato');

    // ============================================
    // EVENTS CAROUSEL - RESPONSIVE (Desktop: Loop infinito | Mobile: Finito)
    // ============================================
    
    const carousel = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (carousel && track) {
        
        // ===== SETUP INIZIALE =====
        const originalCards = Array.from(track.children);
        const cardCount = originalCards.length;
        
        if (cardCount === 0) return;
        
        // ===== VARIABILI DI STATO =====
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let previousTranslate = 0;
        let animationID = 0;
        let isTransitioning = false;
        let isMobile = window.innerWidth < 992;
        let clones = [];
        
        // ===== FUNZIONI HELPER =====
        
        function getCardWidth() {
            const cardWidth = originalCards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(track).gap) || 20;
            return cardWidth + gap;
        }
        
        function setSliderPosition(position) {
            track.style.transform = `translateX(${position}px)`;
        }
        
        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }
        
        function animation() {
            setSliderPosition(currentTranslate);
            if (isDragging) requestAnimationFrame(animation);
        }
        
        // ===== INIZIALIZZAZIONE DESKTOP (Loop infinito con cloni) =====
        
        function initDesktopMode() {
            // Rimuovi eventuali cloni esistenti
            clones.forEach(clone => clone.remove());
            clones = [];
            
            // Crea cloni per loop infinito
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                track.appendChild(clone);
                clones.push(clone);
            });
            
            originalCards.slice().reverse().forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                track.insertBefore(clone, track.firstChild);
                clones.push(clone);
            });
            
            // Posiziona al centro (card originali)
            const cardWithGap = getCardWidth();
            currentTranslate = -(cardCount * cardWithGap);
            previousTranslate = currentTranslate;
            track.classList.add('no-transition');
            setSliderPosition(currentTranslate);
            setTimeout(() => track.classList.remove('no-transition'), 50);
            
            // Mostra frecce
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
            
            console.log('✓ Modalità Desktop: Loop infinito attivato');
        }
        
        // ===== INIZIALIZZAZIONE MOBILE (Loop infinito con cloni) =====

        function initMobileMode() {
            // Rimuovi eventuali cloni esistenti
            clones.forEach(clone => clone.remove());
            clones = [];

            // Crea cloni infiniti per loop infinito (come desktop)
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                track.appendChild(clone);
                clones.push(clone);
            });

            originalCards.slice().reverse().forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                track.insertBefore(clone, track.firstChild);
                clones.push(clone);
            });

            // Posiziona al centro (card originali)
            const cardWithGap = getCardWidth();
            currentTranslate = -(cardCount * cardWithGap);
            previousTranslate = currentTranslate;
            track.classList.add('no-transition');
            setSliderPosition(currentTranslate);
            setTimeout(() => track.classList.remove('no-transition'), 50);

            console.log('✓ Modalità Mobile: Loop infinito attivato');
        }
        
        // ===== CONTROLLA BOUNDARIES (Loop infinito per DESKTOP e MOBILE) =====

        function checkBoundaries() {
            const cardWithGap = getCardWidth();
            const position = currentTranslate;

            // Loop infinito (sia desktop che mobile)
            if (position > -(cardWithGap / 2)) {
                // Spostato troppo a sinistra, resetta alla fine
                currentTranslate = -(cardCount * cardWithGap) + (position % (cardCount * cardWithGap));
                previousTranslate = currentTranslate;
                track.classList.add('no-transition');
                setSliderPosition(currentTranslate);
                setTimeout(() => track.classList.remove('no-transition'), 50);
            } else if (position < -(cardCount * cardWithGap * 2) + (cardWithGap / 2)) {
                // Spostato troppo a destra, resetta all'inizio
                currentTranslate = -(cardCount * cardWithGap) + (position % (cardCount * cardWithGap));
                previousTranslate = currentTranslate;
                track.classList.add('no-transition');
                setSliderPosition(currentTranslate);
                setTimeout(() => track.classList.remove('no-transition'), 50);
            }
        }
        
        // ===== CONTROLLI FRECCE (SOLO DESKTOP) =====
        
        if (prevBtn && nextBtn) {
            
            prevBtn.addEventListener('click', function() {
                if (isTransitioning || isMobile) return;

                isTransitioning = true;
                track.classList.remove('no-transition');

                const cardWithGap = getCardWidth();
                currentTranslate += cardWithGap * 3;
                previousTranslate = currentTranslate;

                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                setSliderPosition(currentTranslate);

                setTimeout(() => {
                    checkBoundaries();
                    isTransitioning = false;
                    track.style.transition = '';
                }, 500);
            });
            
            nextBtn.addEventListener('click', function() {
                if (isTransitioning || isMobile) return;

                isTransitioning = true;
                track.classList.remove('no-transition');

                const cardWithGap = getCardWidth();
                currentTranslate -= cardWithGap * 3;
                previousTranslate = currentTranslate;

                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                setSliderPosition(currentTranslate);

                setTimeout(() => {
                    checkBoundaries();
                    isTransitioning = false;
                    track.style.transition = '';
                }, 500);
            });
        }
        
        // ===== DRAG CON MOUSE (DESKTOP) =====
        
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mousemove', drag);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('mouseleave', dragEnd);
        
        function dragStart(event) {
            if (isTransitioning || !isMobile) return;

            isDragging = true;
            startX = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            track.style.cursor = 'grabbing';

            track.classList.add('no-transition');
        }
        
        function drag(event) {
            if (!isDragging) return;
            
            event.preventDefault();
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startX;
            currentTranslate = previousTranslate + diff;
        }
        
        function dragEnd() {
            if (!isDragging) return;
            
            isDragging = false;
            cancelAnimationFrame(animationID);
            previousTranslate = currentTranslate;
            track.style.cursor = 'grab';
            
            setTimeout(() => {
                checkBoundaries();
            }, 50);
        }
        
        // ===== TOUCH DRAG (MOBILE) =====
        
        track.addEventListener('touchstart', touchStart, { passive: true });
        track.addEventListener('touchmove', touchMove, { passive: false });
        track.addEventListener('touchend', touchEnd);
        
        function touchStart(event) {
            if (isTransitioning) return;
            
            isDragging = true;
            startX = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            
            track.classList.add('no-transition');
        }
        
        function touchMove(event) {
            if (!isDragging) return;
            
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startX;
            currentTranslate = previousTranslate + diff;
            
            if (Math.abs(diff) > 10) {
                event.preventDefault();
            }
        }
        
        function touchEnd() {
            if (!isDragging) return;
            
            isDragging = false;
            cancelAnimationFrame(animationID);
            previousTranslate = currentTranslate;
            
            setTimeout(() => {
                checkBoundaries();
            }, 50);
        }
        
        // ===== PREVIENI SELEZIONE TESTO E DRAG IMMAGINI =====
        
        track.addEventListener('dragstart', (e) => e.preventDefault());
        track.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
        
        // ===== GESTIONE RESIZE =====
        
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const wasMobile = isMobile;
                isMobile = window.innerWidth < 992;
                
                // Se cambia la modalità (mobile <-> desktop)
                if (wasMobile !== isMobile) {
                    if (isMobile) {
                        initMobileMode();
                    } else {
                        initDesktopMode();
                    }
                } else {
                    // Ricalcola posizioni mantenendo la modalità corrente
                    const cardWithGap = getCardWidth();
                    
                    if (!isMobile) {
                        const relativeIndex = Math.round(-currentTranslate / cardWithGap);
                        currentTranslate = -(relativeIndex * cardWithGap);
                    } else {
                        // Su mobile ricalcola mantenendo la posizione proporzionale
                        const maxScroll = cardCount * cardWithGap - carousel.offsetWidth;
                        if (currentTranslate < -maxScroll) {
                            currentTranslate = -maxScroll;
                        }
                    }
                    
                    previousTranslate = currentTranslate;
                    track.classList.add('no-transition');
                    setSliderPosition(currentTranslate);
                    setTimeout(() => track.classList.remove('no-transition'), 50);
                }
            }, 250);
        });
        
        // ===== INIZIALIZZAZIONE =====
        
        if (isMobile) {
            initMobileMode();
        } else {
            initDesktopMode();
        }
    }

    // ============================================
    // SCROLL TO TOP BUTTON - FIXED UNTIL FOOTER
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
                // ===== MOBILE: Si ferma alle icone social =====
                const socialIcons = document.querySelector('.social-icons');
                const socialRect = socialIcons.getBoundingClientRect();

                // Calcola dove dovrebbe fermarsi la freccia (allineata alle icone social)
                const arrowTargetTop = socialRect.top;

                // Calcola la posizione fixed della freccia (bottom della viewport)
                const fixedTop = windowHeight - fixedBottom - arrowHeight;

                // Se le icone social sono ancora SOTTO la posizione fixed
                if (arrowTargetTop > fixedTop) {
                    // Mantieni la freccia fixed in basso
                    scrollToTopBtn.style.position = 'fixed';
                    scrollToTopBtn.style.bottom = fixedBottom + 'px';
                    scrollToTopBtn.style.right = '20px';
                    scrollToTopBtn.style.top = 'auto';
                } else {
                    // La freccia ha raggiunto le icone social, fermala lì
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
                const gapBetweenArrowAndButton = 30; // Gap tra freccia e bottone

                // Calcola la posizione target della freccia nel footer
                // La freccia dovrebbe essere 30px sopra al bottone "Get in touch"
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
                    // Calcola il bottom dinamico per mantenerla 30px sopra al bottone
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
    document.querySelectorAll('.map-info-section, .events-section, .store-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    
    console.log('%cMain Script caricato con successo!', 'font-size: 14px; color: #f5c900; font-weight: bold;');
    console.log('✓ Carousel con loop infinito e drag fluido');
    console.log('✓ Scroll to top button');
    console.log('✓ Smooth scroll per link interni');
    console.log('✓ Animazioni fade-in on scroll');

});