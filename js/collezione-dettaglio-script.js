/* ===================================
   PAGANI ZONDA R - JAVASCRIPT
   Timeline, Gallery, Tech Data, Lightboxes
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Zonda R JavaScript inizializzato');

    // ============================================
    // TIMELINE NAVIGATION
    // ============================================
    
    const timelineTrack = document.getElementById('timelineTrack');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelinePrev = document.getElementById('timelinePrev');
    const timelineNext = document.getElementById('timelineNext');
    
    let currentIndex = 1; // Zonda R è l'elemento centrale (index 1)
    
    function updateTimeline() {
        // Calcola la posizione centrale
        const trackHeight = timelineTrack.offsetHeight;
        const itemHeight = timelineItems[0].offsetHeight;
        const gap = 40;
        const offset = (currentIndex * (itemHeight + gap));
        
        // Centra l'elemento attivo
        const centerOffset = (trackHeight / 2) - (itemHeight / 2);
        const translateY = centerOffset - offset;
        
        timelineTrack.style.transform = `translateY(${translateY}px)`;
        
        // Aggiorna le classi active
        timelineItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
    }
    
    // Navigation buttons
    if (timelinePrev && timelineNext) {
        timelinePrev.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateTimeline();
                console.log('Timeline: Modello precedente', currentIndex);
            }
        });
        
        timelineNext.addEventListener('click', function() {
            if (currentIndex < timelineItems.length - 1) {
                currentIndex++;
                updateTimeline();
                console.log('Timeline: Modello successivo', currentIndex);
            }
        });
    }
    
    // Inizializza la posizione
    updateTimeline();

    // ============================================
    // TIMELINE DROPDOWN MENU
    // ============================================
    
    const timelineMenuBtn = document.getElementById('timelineMenuBtn');
    const timelineDropdown = document.getElementById('timelineDropdown');
    const timelineDropdownClose = document.getElementById('timelineDropdownClose');
    const dropdownItems = document.querySelectorAll('.timeline-dropdown-item');
    
    if (timelineMenuBtn && timelineDropdown) {
        // Apri menu
        timelineMenuBtn.addEventListener('click', function() {
            timelineDropdown.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Timeline dropdown aperto');
        });
        
        // Chiudi menu
        if (timelineDropdownClose) {
            timelineDropdownClose.addEventListener('click', function() {
                timelineDropdown.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Timeline dropdown chiuso');
            });
        }
        
        // Chiudi cliccando fuori
        timelineDropdown.addEventListener('click', function(e) {
            if (e.target === timelineDropdown) {
                timelineDropdown.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Selezione modello dal dropdown
        dropdownItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Aggiorna selezione visuale
                dropdownItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Aggiorna timeline
                currentIndex = index;
                updateTimeline();
                
                // Chiudi dropdown
                timelineDropdown.classList.remove('active');
                document.body.style.overflow = '';
                
                console.log('Modello selezionato dal dropdown:', this.dataset.model);
            });
        });
        
        // Chiudi con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && timelineDropdown.classList.contains('active')) {
                timelineDropdown.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // ACTION BUTTONS - SCROLL TO SECTIONS
    // ============================================
    
    const readMoreBtn = document.getElementById('readMoreBtn');
    const galleryBtn = document.getElementById('galleryBtn');
    const techDataBtn = document.getElementById('techDataBtn');
    const gallerySection = document.getElementById('gallerySection');
    const techDataSection = document.getElementById('techDataSection');
    
    // Read More - Apre lightbox
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            openLightbox('readMore');
            console.log('Aperto lightbox Read More');
        });
    }
    
    // Gallery - Scroll to section
    if (galleryBtn && gallerySection) {
        galleryBtn.addEventListener('click', function() {
            gallerySection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            console.log('Scroll to Gallery');
        });
    }
    
    // Tech Data - Scroll to section
    if (techDataBtn && techDataSection) {
        techDataBtn.addEventListener('click', function() {
            techDataSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            console.log('Scroll to Tech Data');
        });
    }

    // ============================================
    // LIGHTBOX SYSTEM
    // ============================================
    
    const readMoreLightbox = document.getElementById('readMoreLightbox');
    const galleryLightbox = document.getElementById('galleryLightbox');
    const techLightbox = document.getElementById('techLightbox');
    const lightboxCloses = document.querySelectorAll('.lightbox-close');
    
    function openLightbox(type) {
        let lightbox = null;
        
        switch(type) {
            case 'readMore':
                lightbox = readMoreLightbox;
                break;
            case 'gallery':
                lightbox = galleryLightbox;
                break;
            case 'tech':
                lightbox = techLightbox;
                break;
        }
        
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox(lightbox) {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Bottoni di chiusura
    lightboxCloses.forEach(btn => {
        btn.addEventListener('click', function() {
            const lightbox = this.closest('.lightbox-overlay');
            closeLightbox(lightbox);
            console.log('Lightbox chiuso');
        });
    });
    
    // Chiudi cliccando fuori dal contenuto
    [readMoreLightbox, galleryLightbox, techLightbox].forEach(lightbox => {
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox(lightbox);
                }
            });
        }
    });
    
    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox(readMoreLightbox);
            closeLightbox(galleryLightbox);
            closeLightbox(techLightbox);
        }
    });

    // ============================================
    // GALLERY - LIGHTBOX IMAGE VIEWER
    // ============================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openLightbox('gallery');
            console.log('Aperta immagine gallery');
        });
    });

    // ============================================
    // TECHNICAL DATA - INTERACTIVE ICONS
    // ============================================
    
    const techIcons = document.querySelectorAll('.tech-icon');
    const techLightboxTitle = document.getElementById('techLightboxTitle');
    const techLightboxText = document.getElementById('techLightboxText');
    
    // Database dei dati tecnici
    const techData = {
        speed: {
            title: 'Velocità Massima',
            text: 'La Zonda R raggiunge una velocità massima superiore a 350 km/h, grazie al potente motore V12 AMG e all\'aerodinamica ottimizzata.'
        },
        transmission: {
            title: 'Cambio',
            text: 'XTRAC 672 su specifica progetto, trasversale sequenziale infusione in magnesio; 6 marce ad innesti frontali con sistema dirobotizzazione Automac Engineering'
        },
        chassis: {
            title: 'Telaio',
            text: 'Monoscocca in carbonio-titanio con strutture tubolari anteriori e posteriori in cromo-molibdeno, ottimizzata per la massima rigidità torsionale.'
        },
        engine: {
            title: 'Motore',
            text: 'Mercedes-Benz AMG V12 6.0L aspirato, 750 CV a 7500 rpm, 710 Nm di coppia. Architettura completamente rivista per uso racing.'
        },
        exhaust: {
            title: 'Scarico',
            text: 'Sistema di scarico in titanio ultra-leggero con collettori racing e silenziatori ad alte prestazioni, per massimizzare la potenza e ridurre il peso.'
        },
        dimensions: {
            title: 'Dimensioni',
            text: 'Lunghezza: 4395 mm, Larghezza: 2055 mm, Altezza: 1141 mm. Passo: 2730 mm. Peso a secco: 1070 kg con rapporto peso/potenza di 1,43 kg/CV.'
        },
        wheels: {
            title: 'Ruote',
            text: 'Cerchi forgiati in lega leggera da 19" all\'anteriore e 20" al posteriore, con pneumatici slick da competizione Pirelli PZero Trofeo R.'
        },
        brakes: {
            title: 'Freni',
            title: 'Freni',
            text: 'Dischi carboceramici Brembo da 380mm anteriori e 380mm posteriori, con pinze monoblocco a 6 pistoncini all\'anteriore e 4 al posteriore.'
        },
        suspension: {
            title: 'Sospensioni',
            text: 'Sospensioni a triangoli sovrapposti con ammortizzatori regolabili Öhlins, molle elicoidali e barra antirollio regolabile per setup racing.'
        },
        aerodynamics: {
            title: 'Aerodinamica',
            text: 'Alettone posteriore regolabile in carbonio, diffusore ottimizzato, estrattori d\'aria e fondo piatto per massimo carico aerodinamico e deportanza.'
        }
    };
    
    techIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const techType = this.dataset.tech;
            const data = techData[techType];
            
            if (data && techLightboxTitle && techLightboxText) {
                techLightboxTitle.textContent = data.title;
                techLightboxText.textContent = data.text;
                openLightbox('tech');
                console.log('Aperto lightbox tech:', data.title);
            }
        });
        
        // Animazione hover sulle linee
        icon.addEventListener('mouseenter', function() {
            const line = this.querySelector('.tech-line');
            if (line) {
                line.style.backgroundColor = '#ffffff';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            const line = this.querySelector('.tech-line');
            if (line) {
                line.style.backgroundColor = 'var(--color-yellow)';
            }
        });
    });

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const footer = document.querySelector('.footer-container');
    
    if (scrollToTopBtn && footer) {
        // Nascondi inizialmente
        scrollToTopBtn.classList.add('hidden');
        
        // Click handler
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Scroll to top');
        });
        
        // Scroll handler
        window.addEventListener('scroll', function() {
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
                const socialIcons = document.querySelector('.social-icons');
                if (socialIcons) {
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
                }
            } else {
                const getInTouchBtn = document.querySelector('.btn-get-in-touch');
                if (getInTouchBtn) {
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
            }
        });
    }

    // ============================================
    // STICKY HEADER - HIDE ON SCROLL DOWN
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
    // SMOOTH SCROLL PER LINK INTERNI
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
    document.querySelectorAll('.timeline-section, .gallery-section, .tech-data-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    
    console.log('%cZonda R Script caricato con successo!', 'font-size: 14px; color: #f5c900; font-weight: bold;');
    console.log('✓ Timeline interattiva con navigazione');
    console.log('✓ Menu dropdown modelli');
    console.log('✓ Gallery con lightbox');
    console.log('✓ Dati tecnici interattivi');
    console.log('✓ Sistema lightbox completo');
    console.log('✓ Scroll animations');

});