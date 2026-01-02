/* ===================================
   HEADER JAVASCRIPT - RESPONSIVE
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SWITCHER LINGUA (Funziona sia desktop che mobile)
    // ============================================
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Rimuovi classe active da tutti i bottoni
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Aggiungi classe active al bottone cliccato
            this.classList.add('active');
            
            // Ottieni la lingua selezionata
            const selectedLang = this.getAttribute('data-lang');
            console.log('Lingua selezionata:', selectedLang);
            
            // QUI PUOI AGGIUNGERE LA LOGICA PER CAMBIARE LINGUA
            // Esempio: changeLanguage(selectedLang);
        });
    });

    // ============================================
    // MENU MOBILE - APERTURA E CHIUSURA
    // ============================================
    
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    // APRI MENU MOBILE
    // Quando clicco sul bottone hamburger
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            // Aggiungi classe 'active' per mostrare il menu
            mobileMenu.classList.add('active');
            
            // Blocca lo scroll della pagina quando il menu è aperto
            body.style.overflow = 'hidden';
            
            console.log('Menu mobile aperto');
        });
    }

    // CHIUDI MENU MOBILE
    // Quando clicco sul bottone X
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            // Rimuovi classe 'active' per nascondere il menu
            mobileMenu.classList.remove('active');
            
            // Riabilita lo scroll della pagina
            body.style.overflow = '';
            
            console.log('Menu mobile chiuso');
        });
    }

    // ============================================
    // CHIUDI MENU QUANDO CLICCO SU UN LINK
    // ============================================
    // Utile per la navigazione: quando l'utente clicca su un link del menu,
    // il menu si chiude automaticamente
    
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Chiudi il menu
            mobileMenu.classList.remove('active');
            
            // Riabilita lo scroll
            body.style.overflow = '';
            
            console.log('Link cliccato, menu chiuso');
        });
    });

    // ============================================
    // CHIUDI MENU CON TASTO ESC (ESCAPE)
    // ============================================
    // Migliora l'usabilità: l'utente può chiudere il menu premendo ESC
    
    document.addEventListener('keydown', function(e) {
        // Controlla se il tasto premuto è ESC e se il menu è aperto
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            // Chiudi il menu
            mobileMenu.classList.remove('active');
            
            // Riabilita lo scroll
            body.style.overflow = '';
            
            console.log('Menu chiuso con tasto ESC');
        }
    });

    // ============================================
    // CHIUDI MENU CLICCANDO FUORI DALL'OVERLAY
    // ============================================
    // Permette di chiudere il menu cliccando sullo sfondo scuro
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            // Controlla se il click è stato fatto direttamente sull'overlay
            // (e non sui suoi elementi figli come links o bottoni)
            if (e.target === mobileMenu) {
                // Chiudi il menu
                mobileMenu.classList.remove('active');
                
                // Riabilita lo scroll
                body.style.overflow = '';
                
                console.log('Menu chiuso cliccando fuori');
            }
        });
    }

    // ============================================
    // GESTIONE RESIZE FINESTRA
    // ============================================
    // Chiude il menu mobile se l'utente ridimensiona la finestra
    // passando da mobile a desktop mentre il menu è aperto
    
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        // Debounce: aspetta che l'utente finisca di ridimensionare
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(function() {
            // Se la finestra è più larga di 991px (dimensione desktop)
            if (window.innerWidth > 991) {
                // Chiudi il menu mobile se è aperto
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    body.style.overflow = '';
                    console.log('Menu chiuso automaticamente (passaggio a desktop)');
                }
            }
        }, 250);
    });

    // ============================================
    // PREVIENI SCROLL QUANDO IL MENU È APERTO
    // ============================================
    // Previene che l'utente possa scrollare il contenuto dietro il menu
    
    if (mobileMenu) {
        mobileMenu.addEventListener('touchmove', function(e) {
            // Permetti lo scroll solo dentro il menu
            if (e.target === mobileMenu) {
                e.preventDefault();
            }
        }, { passive: false });
    }

});