/* ===================================
   STORE PAGE JAVASCRIPT
   Lightbox + Color Selector + Scroll to Top
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Store JavaScript inizializzato');

    // ============================================
    // 1. COLOR SELECTOR
    // ============================================
    
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Rimuovi active da tutti
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Aggiungi active al selezionato
            this.classList.add('active');
            
            const selectedColor = this.getAttribute('data-color');
            console.log('Colore selezionato:', selectedColor);
        });
    });

    // ============================================
    // 2. LIGHTBOX GALLERY
    // ============================================
    
    const galleryBoxes = document.querySelectorAll('.gallery-box');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxImage = document.getElementById('lightboxImage');
    
    let currentImageIndex = 0;
    const totalImages = galleryBoxes.length;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Apri lightbox
    galleryBoxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateLightboxImage();
        console.log('Lightbox aperta, immagine:', currentImageIndex);
    }
    
    // Chiudi lightbox
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Lightbox chiusa');
    }
    
    // Bottone chiudi
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Clicca fuori per chiudere
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', function(e) {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
    }
    
    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
        
        // Navigazione con frecce tastiera (solo desktop)
        if (lightboxOverlay.classList.contains('active') && window.innerWidth >= 768) {
            if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    // Aggiorna immagine lightbox
    function updateLightboxImage() {
        // Qui aggiornerai con l'immagine reale
        // Per ora mostra solo il placeholder rosso
        console.log('Mostra immagine:', currentImageIndex);
    }
    
    // Immagine precedente
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        updateLightboxImage();
        console.log('Immagine precedente:', currentImageIndex);
    }
    
    // Immagine successiva
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        updateLightboxImage();
        console.log('Immagine successiva:', currentImageIndex);
    }
    
    // Frecce navigazione (solo desktop)
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            showPreviousImage();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
    }
    
    // Touch swipe per mobile
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('touchstart', function(e) {
            if (e.target.closest('.lightbox-image-container')) {
                touchStartX = e.changedTouches[0].screenX;
            }
        }, { passive: true });
        
        lightboxOverlay.addEventListener('touchend', function(e) {
            if (e.target.closest('.lightbox-image-container')) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                showNextImage();
            } else {
                // Swipe right - previous
                showPreviousImage();
            }
        }
    }

    // ============================================
    // 3. SCROLL TO TOP BUTTON - FIXED UNTIL FOOTER
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
    // 4. STICKY HEADER - HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
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
    // 5. SMOOTH SCROLL PER LINK INTERNI
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
    // 6. FADE IN ANIMATIONS ON SCROLL
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
    document.querySelectorAll('.product-section, .gallery-section, .related-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ============================================
    // 7. ADD TO CART BUTTON FEEDBACK
    // ============================================
    
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Ottieni valori selezionati
            const size = document.getElementById('size-select').value;
            const quantity = document.getElementById('quantity-select').value;
            const selectedColorOption = document.querySelector('.color-option.active');
            const color = selectedColorOption ? selectedColorOption.getAttribute('data-color') : 'white';
            
            console.log('Prodotto aggiunto al carrello:');
            console.log('- Taglia:', size);
            console.log('- Colore:', color);
            console.log('- Quantità:', quantity);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = '✓ Aggiunto!';
            this.style.backgroundColor = '#22c55e';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    }

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    
    console.log('%cStore Script caricato con successo!', 'font-size: 14px; color: #f5c900; font-weight: bold;');
    console.log('✓ Lightbox gallery con touch swipe');
    console.log('✓ Color selector');
    console.log('✓ Scroll to top button');
    console.log('✓ Smooth scroll e animazioni');

});
