/**
 * AL TAMAM EQUIPMENT RENTAL
 * Interactive Engine & UI Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Hero Background Slider & Content Sync
    // -------------------------------------------------------------------------
    const heroSlides = [
        {
            image: 'images/image_1.jpg',
            title: 'Reliable Heavy Equipment & Temporary Power Solutions',
            desc: 'Supplying heavy-duty soundproof diesel generators (20 kVA to 2000 kVA), industrial air compressors, mobile tower lights, and complete site logistics across the UAE with 24/7 technical field support.'
        },
        {
            image: 'images/image_2.jpg',
            title: 'Mobile Telescopic Crane Trucks & Heavy Site Logistics',
            desc: 'Dedicated transport fleet featuring boom cranes and utility trucks for safe self-loading, rapid mobilization, and precision placement across demanding job sites.'
        },
        {
            image: 'images/image_6.jpg',
            title: 'Super-Silent Acoustic Diesel Power Generators',
            desc: 'High-ambient tropicalized canopies engineered to deliver continuous prime power under extreme Middle Eastern heat, equipped with Leroy Somer alternators.'
        },
        {
            image: 'images/image_4.jpg',
            title: 'Certified Diagnostic Engineering & In-House Support',
            desc: 'Factory-calibrated digital Deep Sea controllers, automated multi-megawatt synchronizing panels, and 24/7 rapid breakdown response teams.'
        },
        {
            image: 'images/image_3.jpg',
            title: 'Heavy Industrial Continuous Power Packages',
            desc: 'Built for oil & gas shutdowns, infrastructure megaprojects, and marine shipyards with auxiliary fuel tank systems and round-the-clock reliability.'
        }
    ];

    let currentSlideIndex = 0;
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const bgElements = document.querySelectorAll('.hero-background-image');
    const indicators = document.querySelectorAll('.slide-indicator');
    let slideTimer;

    // Initialize first slide background
    if (bgElements.length >= 2) {
        bgElements[0].style.backgroundImage = `url('${heroSlides[0].image}')`;
        bgElements[0].classList.add('active');
    }

    function goToSlide(newIndex) {
        if (newIndex === currentSlideIndex) return;

        const activeBg = document.querySelector('.hero-background-image.active');
        const inactiveBg = document.querySelector('.hero-background-image:not(.active)');

        if (inactiveBg && activeBg) {
            inactiveBg.style.backgroundImage = `url('${heroSlides[newIndex].image}')`;
            inactiveBg.classList.add('active');
            activeBg.classList.remove('active');
        }

        // Fade out text slightly, update, fade back in
        if (heroTitle && heroDesc) {
            heroTitle.style.opacity = '0.3';
            heroDesc.style.opacity = '0.3';

            setTimeout(() => {
                heroTitle.textContent = heroSlides[newIndex].title;
                heroDesc.textContent = heroSlides[newIndex].desc;
                heroTitle.style.opacity = '1';
                heroDesc.style.opacity = '1';
            }, 250);
        }

        // Update indicator dots
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === newIndex);
        });

        currentSlideIndex = newIndex;
    }

    function startSlider() {
        slideTimer = setInterval(() => {
            const nextIndex = (currentSlideIndex + 1) % heroSlides.length;
            goToSlide(nextIndex);
        }, 5000); // 5 seconds per slide
    }

    function resetSlider() {
        clearInterval(slideTimer);
        startSlider();
    }

    indicators.forEach((ind) => {
        ind.addEventListener('click', () => {
            const index = parseInt(ind.dataset.index, 10);
            goToSlide(index);
            resetSlider();
        });
    });

    startSlider();

    // -------------------------------------------------------------------------
    // 2. Mobile Menu Drawer Toggle
    // -------------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking nav links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // -------------------------------------------------------------------------
    // 3. Equipment Category Filter Tabs
    // -------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const equipmentCards = document.querySelectorAll('.equipment-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            equipmentCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 4. FAQ Accordion
    // -------------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all other items
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // -------------------------------------------------------------------------
    // 5. Quote Modal & Spec Modal Management
    // -------------------------------------------------------------------------
    const quoteModal = document.getElementById('quoteModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const openQuoteBtns = document.querySelectorAll('.open-quote-btn');
    const modalEquipmentSelect = document.getElementById('modalEquipment');

    function openQuoteModal(preferredEquipment = '') {
        if (quoteModal) {
            quoteModal.classList.add('active');
            quoteModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            if (preferredEquipment && modalEquipmentSelect) {
                // Try matching or set nearest
                let found = false;
                for (let option of modalEquipmentSelect.options) {
                    if (option.value.toLowerCase().includes(preferredEquipment.toLowerCase()) ||
                        preferredEquipment.toLowerCase().includes(option.value.toLowerCase())) {
                        modalEquipmentSelect.value = option.value;
                        found = true;
                        break;
                    }
                }
            }
        }
    }

    function closeQuoteModal() {
        if (quoteModal) {
            quoteModal.classList.remove('active');
            quoteModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    openQuoteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const equipmentName = btn.getAttribute('data-equipment') || btn.getAttribute('data-service') || '';
            openQuoteModal(equipmentName);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuoteModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeQuoteModal);

    // Spec Modal
    const specModal = document.getElementById('specModal');
    const specModalBackdrop = document.getElementById('specModalBackdrop');
    const specModalCloseBtn = document.getElementById('specModalCloseBtn');
    const specModalTitle = document.getElementById('specModalTitle');
    const specModalBody = document.getElementById('specModalBody');
    const specModalQuoteBtn = document.getElementById('specModalQuoteBtn');
    let currentSpecEquipment = '';

    const viewSpecBtns = document.querySelectorAll('.view-spec-btn');

    viewSpecBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = btn.getAttribute('data-title');
            const specText = btn.getAttribute('data-spec');
            currentSpecEquipment = title;

            if (specModalTitle) specModalTitle.textContent = title;
            if (specModalBody) specModalBody.textContent = specText;

            if (specModal) {
                specModal.classList.add('active');
                specModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeSpecModal() {
        if (specModal) {
            specModal.classList.remove('active');
            specModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (specModalCloseBtn) specModalCloseBtn.addEventListener('click', closeSpecModal);
    if (specModalBackdrop) specModalBackdrop.addEventListener('click', closeSpecModal);

    if (specModalQuoteBtn) {
        specModalQuoteBtn.addEventListener('click', () => {
            closeSpecModal();
            openQuoteModal(currentSpecEquipment);
        });
    }

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQuoteModal();
            closeSpecModal();
        }
    });

    // -------------------------------------------------------------------------
    // 6. Toast Notifications
    // -------------------------------------------------------------------------
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message) {
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4500);
        }
    }

    // -------------------------------------------------------------------------
    // 7. Interactive Form Submissions
    // -------------------------------------------------------------------------
    const mainQuoteForm = document.getElementById('quoteForm');
    const modalQuoteForm = document.getElementById('modalQuoteForm');
    const formFeedback = document.getElementById('formFeedback');

    if (mainQuoteForm) {
        mainQuoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitQuoteBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing Request...';
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Rental Request';
                }
                if (formFeedback) {
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = '✓ Quote request received! Our equipment manager will contact you within 30 minutes.';
                }
                mainQuoteForm.reset();
                showToast('Quote request sent successfully! We will contact you shortly.');
            }, 800);
        });
    }

    if (modalQuoteForm) {
        modalQuoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeQuoteModal();
            modalQuoteForm.reset();
            showToast('Quote inquiry submitted! Our operations desk will call you shortly.');
        });
    }

    // -------------------------------------------------------------------------
    // 8. Navigation Active State on Scroll
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
