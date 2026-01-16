/* ===================================
   HEADER JAVASCRIPT - RESPONSIVE
   Menu Hamburger + Switcher Lingua
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Header JavaScript inizializzato');

// ============================================
    // 1. MENU MOBILE - APERTURA E CHIUSURA CON ANIMAZIONI SIMMETRICHE
    // ============================================
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    // APRI MENU MOBILE
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Rimuovi classe closing se presente
            mobileMenu.classList.remove('closing');
            
            // Aggiungi classe active per mostrare il menu
            mobileMenu.classList.add('active');
            
            // Blocca lo scroll della pagina
            body.style.overflow = 'hidden';
            
            console.log('Menu mobile aperto con animazioni');
        });
    }

    // FUNZIONE PER CHIUDERE IL MENU CON ANIMAZIONE SIMMETRICA
    function closeMenu() {
        if (!mobileMenu.classList.contains('active')) return;
        
        // Aggiungi classe closing per animazione di chiusura
        mobileMenu.classList.add('closing');
        
        console.log('Menu mobile in chiusura con animazioni...');
        
        // Dopo l'animazione di chiusura (400ms), rimuovi tutte le classi
        setTimeout(function() {
            mobileMenu.classList.remove('active');
            mobileMenu.classList.remove('closing');
            body.style.overflow = '';
            console.log('Menu mobile chiuso');
        }, 400); // Durata sincronizzata con CSS transition
    }

    // CHIUDI MENU MOBILE - Bottone X
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }


    // ============================================
    // 2. CHIUDI MENU QUANDO CLICCO SU UN LINK
    // ============================================
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
            console.log('Link cliccato, menu in chiusura');
        });
    });

    // ============================================
    // 3. CHIUDI MENU CON TASTO ESC (ESCAPE)
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenu();
            console.log('Menu chiuso con tasto ESC');
        }
    });

    // ============================================
    // 4. CHIUDI MENU CLICCANDO FUORI DALL'OVERLAY
    // ============================================
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMenu();
                console.log('Menu chiuso cliccando fuori');
            }
        });
    }

    // ============================================
    // 5. GESTIONE RESIZE FINESTRA
    // ============================================
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(function() {
            // Se la finestra è più larga di 991px (dimensione desktop)
            if (window.innerWidth > 991) {
                // Chiudi il menu mobile se è aperto
                if (mobileMenu.classList.contains('active')) {
                    // Chiusura immediata senza animazione quando si passa a desktop
                    mobileMenu.classList.remove('active');
                    mobileMenu.classList.remove('closing');
                    body.style.overflow = '';
                    console.log('Menu chiuso automaticamente (passaggio a desktop)');
                }
            }
        }, 250);
    });

    // ============================================
    // 6. PREVIENI SCROLL QUANDO IL MENU È APERTO
    // ============================================
    if (mobileMenu) {
        mobileMenu.addEventListener('touchmove', function(e) {
            // Permetti lo scroll solo dentro il menu
            if (e.target === mobileMenu) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // ============================================
    // 7. SWITCHER LINGUA (Funziona sia desktop che mobile)
    // ============================================
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Rimuovi classe active da tutti i bottoni (desktop e mobile)
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Aggiungi classe active al bottone cliccato
            this.classList.add('active');
            
            // Ottieni la lingua selezionata
            const selectedLang = this.getAttribute('data-lang');
            console.log('Lingua selezionata:', selectedLang);
            
            // Sincronizza la selezione tra desktop e mobile
            const allLangButtons = document.querySelectorAll(`.lang-btn[data-lang="${selectedLang}"]`);
            allLangButtons.forEach(btn => btn.classList.add('active'));
            
            // QUI PUOI AGGIUNGERE LA LOGICA PER CAMBIARE LINGUA
            // Esempio: changeLanguage(selectedLang);
        });
    });

       // ============================================
    // 8. ANIMAZIONE HAMBURGER ICON HOVER
    // ============================================
    if (hamburgerBtn) {
        const hamburgerIcon = hamburgerBtn.querySelector('.hamburger-icon');
        
        if (hamburgerIcon) {
            hamburgerBtn.addEventListener('mouseenter', function() {
                hamburgerIcon.style.transform = 'rotate(90deg)';
            });
            
            hamburgerBtn.addEventListener('mouseleave', function() {
                hamburgerIcon.style.transform = 'rotate(0deg)';
            });
        }
    }

    // ============================================
    // 9. ANIMAZIONE CLOSE BUTTON HOVER
    // ============================================
    if (closeMenuBtn) {
        const closeIcon = closeMenuBtn.querySelector('.close-icon');
        
        if (closeIcon) {
            closeMenuBtn.addEventListener('mouseenter', function() {
                closeIcon.style.transform = 'rotate(90deg)';
            });
            
            closeMenuBtn.addEventListener('mouseleave', function() {
                closeIcon.style.transform = 'rotate(0deg)';
            });
        }
    }

    // ============================================
    // 10. LIGHTBOX SELEZIONE BIGLIETTO
    // ============================================
    const ticketLightbox = document.getElementById('ticketLightbox');
    const ticketLightboxClose = document.getElementById('ticketLightboxClose');
    const ticketButtons = document.querySelectorAll('.btn-ticket');

    // Funzione per aprire la lightbox
    function openTicketLightbox() {
        if (ticketLightbox) {
            ticketLightbox.classList.add('active');
            body.style.overflow = 'hidden';
            console.log('Lightbox biglietto aperta');
        }
    }

    // Funzione per chiudere la lightbox
    function closeTicketLightbox() {
        if (ticketLightbox && ticketLightbox.classList.contains('active')) {
            ticketLightbox.classList.remove('active');
            body.style.overflow = '';
            console.log('Lightbox biglietto chiusa');
        }
    }

    // Apri lightbox al click su tutti i bottoni "Biglietto"
    ticketButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openTicketLightbox();
        });
    });

    // Chiudi lightbox con bottone X
    if (ticketLightboxClose) {
        ticketLightboxClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeTicketLightbox();
        });
    }

    // Chiudi lightbox cliccando sull'overlay
    if (ticketLightbox) {
        ticketLightbox.addEventListener('click', function(e) {
            if (e.target === ticketLightbox) {
                closeTicketLightbox();
            }
        });
    }

    // Chiudi lightbox con tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && ticketLightbox && ticketLightbox.classList.contains('active')) {
            closeTicketLightbox();
        }
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%cHeader caricato con successo!', 'font-size: 14px; color: #f5c900; font-weight: bold;');
    console.log('✓ Menu hamburger con animazioni');
    console.log('✓ Switcher lingua sincronizzato');
    console.log('✓ Chiusura con ESC e click fuori');
    console.log('✓ Lightbox selezione biglietto');

});