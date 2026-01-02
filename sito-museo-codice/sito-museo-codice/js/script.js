/* ===================================
   MUSEO PAGANI - JAVASCRIPT RESPONSIVE
   =================================== */

/* ========================================
   EVENTS CAROUSEL (SEAMLESS INFINITE LOOP + RESPONSIVE)
   ======================================== */
class EventsCarousel {
    constructor() {
        // Seleziona gli elementi DOM necessari
        this.track = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');

        // Se manca qualche elemento, esci dal costruttore
        if (!this.track || !this.prevBtn || !this.nextBtn) return;

        // Salva le card originali presenti nell'HTML
        this.originalCards = Array.from(document.querySelectorAll('.event-card'));
        this.originalCount = this.originalCards.length;

        // Dimensioni delle card
        this.cardWidth = 440; // Larghezza base di una card
        this.gap = 20; // Spazio tra le card
        
        // Indice corrente (iniziamo dopo i cloni iniziali)
        this.currentIndex = this.originalCount;
        
        // Flag per evitare click multipli durante l'animazione
        this.isTransitioning = false;

        // RESPONSIVE: Determina se siamo su mobile
        this.isMobile = window.innerWidth <= 768;

        // Inizializza il carousel
        this.init();
    }

    init() {
        // ===== 1. CREAZIONE CLONI PER LOOP INFINITO =====
        // Per creare un loop infinito, duplichiamo le card:
        // Struttura finale: [Cloni A] [Card Originali] [Cloni B]
        
        // Cloni B: alla fine (per scroll a destra infinito)
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone-end');
            this.track.appendChild(clone);
        });

        // Cloni A: all'inizio (per scroll a sinistra infinito)
        const fragmentStart = document.createDocumentFragment();
        this.originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone-start');
            fragmentStart.appendChild(clone);
        });
        this.track.insertBefore(fragmentStart, this.track.firstChild);

        // Aggiorna la lista di tutte le card (originali + cloni)
        this.allCards = document.querySelectorAll('.event-card');

        // ===== 2. POSIZIONAMENTO INIZIALE =====
        this.updateLayout();
        this.updateCarousel(false); // false = senza animazione

        // ===== 3. EVENT LISTENERS =====
        
        // Click sui bottoni prev/next
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Listener per il reset del loop (quando la transizione finisce)
        this.track.addEventListener('transitionend', () => this.handleTransitionEnd());

        // Listener per il resize della finestra
        window.addEventListener('resize', () => this.handleResize());

        // Supporto touch per swipe su mobile
        this.addTouchSupport();
    }

    // ===== AGGIORNA DIMENSIONI E RESPONSIVE =====
    updateLayout() {
        // Controlla se siamo su mobile
        this.isMobile = window.innerWidth <= 768;
        
        // RESPONSIVE: Calcola la larghezza effettiva delle card
        if (this.allCards.length > 0) {
            const cardStyleWidth = window.getComputedStyle(this.allCards[0]).width;
            const actualCardWidth = parseInt(cardStyleWidth);
            
            if (!isNaN(actualCardWidth) && actualCardWidth > 0) {
                this.cardWidth = actualCardWidth;
            }
        }
        
        // RESPONSIVE: Aggiorna il gap in base alla dimensione schermo
        if (window.innerWidth <= 576) {
            this.gap = 12; // Gap ridotto per schermi molto piccoli
        } else if (window.innerWidth <= 768) {
            this.gap = 15; // Gap medio per mobile
        } else {
            this.gap = 20; // Gap standard per desktop/tablet
        }
        
        console.log(`Layout aggiornato: cardWidth=${this.cardWidth}px, gap=${this.gap}px, isMobile=${this.isMobile}`);
    }

    // ===== GESTIONE RESIZE FINESTRA =====
    handleResize() {
        // Debounce per evitare troppi aggiornamenti
        clearTimeout(this.resizeTimer);
        
        this.resizeTimer = setTimeout(() => {
            const wasMobile = this.isMobile;
            
            // Aggiorna dimensioni
            this.updateLayout();
            
            // IMPORTANTE: Se passiamo da mobile a desktop o viceversa,
            // riposiziona il carousel senza animazione
            if (wasMobile !== this.isMobile) {
                console.log('Cambio modalità: ' + (this.isMobile ? 'Desktop → Mobile' : 'Mobile → Desktop'));
                this.updateCarousel(false);
            } else {
                // Altrimenti aggiorna solo la posizione
                this.updateCarousel(false);
            }
        }, 250);
    }

    // ===== NAVIGAZIONE: SLIDE PRECEDENTE =====
    prev() {
        // Se stiamo già animando, ignora il click
        if (this.isTransitioning) return;
        
        // Decrementa l'indice
        this.currentIndex--;
        
        // Imposta flag di transizione
        this.isTransitioning = true;
        
        // Aggiorna la posizione con animazione
        this.updateCarousel(true);
        
        console.log('Prev: currentIndex=' + this.currentIndex);
    }

    // ===== NAVIGAZIONE: SLIDE SUCCESSIVA =====
    next() {
        // Se stiamo già animando, ignora il click
        if (this.isTransitioning) return;
        
        // Incrementa l'indice
        this.currentIndex++;
        
        // Imposta flag di transizione
        this.isTransitioning = true;
        
        // Aggiorna la posizione con animazione
        this.updateCarousel(true);
        
        console.log('Next: currentIndex=' + this.currentIndex);
    }

    // ===== GESTIONE FINE TRANSIZIONE (LOOP INFINITO) =====
    handleTransitionEnd() {
        // Reset del flag di transizione
        this.isTransitioning = false;

        // ===== LOGICA DEL LOOP INFINITO =====
        // Struttura indici: [0..N-1 Cloni A] [N..2N-1 Originali] [2N..3N-1 Cloni B]
        // Dove N = numero di card originali
        
        // Se siamo arrivati ai Cloni B (fine del carousel)
        if (this.currentIndex >= this.originalCount * 2) {
            // Torna istantaneamente all'inizio delle card originali
            this.currentIndex = this.originalCount;
            this.updateCarousel(false); // false = nessuna animazione
            console.log('Reset loop: torno alle card originali (fine → inizio)');
        }

        // Se siamo arrivati ai Cloni A (inizio del carousel)
        if (this.currentIndex < this.originalCount) {
            // Torna istantaneamente alla fine delle card originali
            this.currentIndex = this.originalCount * 2 - 1;
            this.updateCarousel(false);
            console.log('Reset loop: torno alle card originali (inizio → fine)');
        }
    }

    // ===== AGGIORNA POSIZIONE CAROUSEL =====
    updateCarousel(animate) {
        // ===== GESTIONE ANIMAZIONE =====
        if (!animate) {
            // Se animate è false, rimuovi la transizione CSS
            // per rendere lo spostamento istantaneo (usato per il reset del loop)
            this.track.classList.add('no-transition');
            
            // Forza il browser a ricalcolare lo stile (reflow)
            // Necessario per applicare immediatamente la classe no-transition
            this.track.offsetHeight;
        } else {
            // Rimuovi la classe no-transition per animare normalmente
            this.track.classList.remove('no-transition');
        }

        // ===== CALCOLO POSIZIONE =====
        // Formula: -currentIndex * (larghezza card + gap)
        const translateX = -this.currentIndex * (this.cardWidth + this.gap);
        
        // Applica la trasformazione CSS
        this.track.style.transform = `translateX(${translateX}px)`;
        
        if (animate) {
            console.log(`Spostamento animato a: ${translateX}px`);
        }
    }

    // ===== SUPPORTO TOUCH PER MOBILE =====
    addTouchSupport() {
        let startX = 0; // Posizione iniziale del touch
        let currentX = 0; // Posizione corrente durante il drag
        let isDragging = false; // Flag per sapere se stiamo trascinando
        
        // ===== INIZIO TOUCH =====
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        // ===== MOVIMENTO TOUCH =====
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        // ===== FINE TOUCH =====
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            // Calcola la differenza tra inizio e fine
            const diff = startX - currentX;
            
            // Se il movimento è stato significativo (più di 50px)
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe verso sinistra → vai avanti
                    this.next();
                } else {
                    // Swipe verso destra → vai indietro
                    this.prev();
                }
            }
            
            isDragging = false;
        });
        
        console.log('Supporto touch aggiunto per swipe su mobile');
    }
}

// ===== INIZIALIZZAZIONE =====
document.addEventListener('DOMContentLoaded', function() {
    // Crea una nuova istanza del carousel quando il DOM è pronto
    new EventsCarousel();
    console.log('Carousel eventi inizializzato');
});

/* ========================================
   SCROLL TO TOP BUTTON
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollTopBtn) return;
    
    // ===== MOSTRA/NASCONDI BOTTONE BASATO SULLO SCROLL =====
    window.addEventListener('scroll', function() {
        // Se l'utente ha scrollato più di 500px
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // ===== SCROLL TO TOP AL CLICK =====
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Animazione smooth
        });
    });
    
    console.log('Bottone Scroll to Top inizializzato');
});

/* ========================================
   SMOOTH SCROLL PER LINK ANCHOR
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti i link che iniziano con #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Non bloccare il comportamento per link placeholder (#)
            if (href === '#') return;
            
            // Previeni il comportamento di default
            e.preventDefault();
            
            // Ottieni l'ID del target (rimuovi il #)
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            // Se l'elemento esiste, scrolla verso di esso
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Smooth scroll per anchor links inizializzato');
});

/* ========================================
   INTERSECTION OBSERVER PER ANIMAZIONI
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    // ===== CONFIGURAZIONE OBSERVER =====
    const observerOptions = {
        root: null, // Viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger quando il 10% dell'elemento è visibile
    };
    
    // ===== CALLBACK QUANDO L'ELEMENTO È VISIBILE =====
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'elemento è entrato nel viewport → mostralo
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    // ===== CREA OBSERVER =====
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // ===== OSSERVA TUTTE LE SEZIONI =====
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Imposta stato iniziale (nascosto)
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Inizia a osservare
        observer.observe(section);
    });
    
    console.log('Intersection Observer inizializzato per ' + sections.length + ' sezioni');
});

/* ========================================
   NAVIGAZIONE CON TASTIERA PER CAROUSEL
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (!carouselContainer) return;
    
    // ===== LISTENER PER TASTI FRECCIA =====
    document.addEventListener('keydown', function(e) {
        // Controlla se il carousel è nel viewport
        const rect = carouselContainer.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        // Se il carousel non è visibile, ignora i tasti
        if (!isInView) return;
        
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        // FRECCIA SINISTRA → Precedente
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevBtn.click();
        }
        
        // FRECCIA DESTRA → Successivo
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextBtn.click();
        }
    });
    
    console.log('Navigazione con tastiera abilitata per carousel');
});

/* ========================================
   LAZY LOADING IMMAGINI (PER IL FUTURO)
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Questa funzione sarà utile quando sostituirai i placeholder con immagini reali
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Se l'immagine ha un attributo data-src, caricala
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img); // Smetti di osservare questa immagine
                    }
                }
            });
        });
        
        // Osserva tutte le immagini con data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
        
        if (lazyImages.length > 0) {
            console.log('Lazy loading abilitato per ' + lazyImages.length + ' immagini');
        }
    }
});

/* ========================================
   CONSOLE MESSAGE
   ======================================== */
console.log('%cMuseo Horacio Pagani', 'font-size: 24px; font-weight: bold; color: #f5c900;');
console.log('%cWebsite Responsive Ready', 'font-size: 14px; color: #1e1e1e;');