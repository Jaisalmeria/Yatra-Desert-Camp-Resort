// Yatra Desert Camp & Resort - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Modal functionality
    initModals();
    
    // Gallery filtering
    initGallery();
    
    // Contact form
    initContactForm();
    
    // B2B form
    initB2BForm();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // WhatsApp functionality
    initWhatsApp();
    
    // B2B Navigation fix
    initB2BNavigation();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// B2B Navigation fix
function initB2BNavigation() {
    const b2bLinks = document.querySelectorAll('.b2b-link, a[href="#b2b-form"], .footer-section a[href="#b2b-form"]');
    
    b2bLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Log for debugging
            console.log('B2B Inquiries link clicked, scrolling to B2B form');
            
            // Scroll to B2B form section
            const b2bSection = document.getElementById('b2b-form');
            if (b2bSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = b2bSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggle = document.querySelector('.nav-toggle');
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            } else {
                console.error('B2B form section not found');
            }
        });
    });
}

// WhatsApp functionality
function initWhatsApp() {
    const whatsappBtn = document.querySelector('.whatsapp-chat a');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default to ensure our handler works
            
            const phoneNumber = '917737657595';
            const message = encodeURIComponent("Hello! I'm interested in booking a stay at Yatra Desert Camp & Resort. Could you please share more details?");
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Log for debugging
            console.log('WhatsApp chat initiated:', whatsappUrl);
            
            // Try multiple methods to ensure WhatsApp opens
            try {
                // Method 1: Direct window.open
                const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                
                // Method 2: Fallback if window.open fails
                if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed == 'undefined') {
                    // Create a temporary link and click it
                    const tempLink = document.createElement('a');
                    tempLink.href = whatsappUrl;
                    tempLink.target = '_blank';
                    tempLink.rel = 'noopener noreferrer';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                }
            } catch (error) {
                console.error('Error opening WhatsApp:', error);
                // Final fallback - change window location
                window.location.href = whatsappUrl;
            }
        });
        
        // Add visual feedback on hover
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Modal functionality
function initModals() {
    const bookingBtns = document.querySelectorAll('.booking-btn, .inquiry-btn');
    const bookingModal = document.getElementById('bookingModal');
    const modalClose = document.querySelector('.modal-close');

    // Open modal when booking buttons are clicked
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            openModal(bookingModal);
        });
    });

    // Close modal when close button is clicked
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal(bookingModal);
        });
    }

    // Close modal when clicking outside
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                closeModal(bookingModal);
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bookingModal && !bookingModal.classList.contains('hidden')) {
            closeModal(bookingModal);
        }
    });
    
    // Fix WhatsApp links in modal
    const modalWhatsAppLinks = document.querySelectorAll('.contact-option[href*="wa.me"]');
    modalWhatsAppLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            console.log('Modal WhatsApp link clicked:', url);
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
}

function openModal(modal) {
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Gallery filtering functionality
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items with animation
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    // Trigger reflow for animation
                    item.offsetHeight;
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateContactForm()) {
                // Submit form
                submitContactForm();
            }
        });
    }
}

// B2B form functionality
function initB2BForm() {
    const b2bForm = document.getElementById('b2bForm');
    
    if (b2bForm) {
        b2bForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateB2BForm()) {
                // Submit form
                submitB2BForm();
            }
        });
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    // Remove existing error messages
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Remove error styling
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        } else {
            field.classList.add('success');
        }
    });
    
    return isValid;
}

function validateB2BForm() {
    const form = document.getElementById('b2bForm');
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    // Remove existing error messages
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Remove error styling
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        } else {
            field.classList.add('success');
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--space-4)';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage(form, 'contact');
        
        // Reset form
        form.reset();
        
        // Remove success styling
        const successInputs = form.querySelectorAll('.success');
        successInputs.forEach(input => input.classList.remove('success'));
        
        // Send email data to support email (in real implementation, this would be handled by backend)
        const emailData = {
            type: 'contact',
            to: 'support@yatradesertcamp.com',
            subject: 'New Contact Form Submission - Yatra Desert Camp',
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            dates: formData.get('dates'),
            guests: formData.get('guests'),
            message: formData.get('message')
        };
        
        console.log('Contact form submitted with data:', emailData);
        
    }, 2000);
}

function submitB2BForm() {
    const form = document.getElementById('b2bForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage(form, 'b2b');
        
        // Reset form
        form.reset();
        
        // Remove success styling
        const successInputs = form.querySelectorAll('.success');
        successInputs.forEach(input => input.classList.remove('success'));
        
        // Send email data to support email (in real implementation, this would be handled by backend)
        const emailData = {
            type: 'b2b',
            to: 'support@yatradesertcamp.com',
            subject: 'New B2B Partnership Inquiry - Yatra Desert Camp',
            company: formData.get('company'),
            contactName: formData.get('contactName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            businessType: formData.get('businessType'),
            volume: formData.get('volume'),
            message: formData.get('message')
        };
        
        console.log('B2B form submitted with data:', emailData);
        
    }, 2000);
}

function showSuccessMessage(form, type) {
    const existingMessage = form.querySelector('.success-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    
    if (type === 'b2b') {
        successDiv.innerHTML = `
            <strong>Thank you for your B2B partnership inquiry!</strong><br>
            We have received your submission and our business development team will get back to you within 24 hours. 
            For urgent matters, please call us at <a href="tel:7737657595">7737657595</a>.
        `;
    } else {
        successDiv.innerHTML = `
            <strong>Thank you for your inquiry!</strong><br>
            We have received your message and will get back to you within 24 hours. 
            For immediate assistance, please call us at <a href="tel:7737657595">7737657595</a> 
            or message us on <a href="https://wa.me/917737657595" target="_blank">WhatsApp</a>.
        `;
    }
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .footer-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggle = document.querySelector('.nav-toggle');
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Scroll animations (fade in effect)
function initScrollAnimations() {
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.accommodation-card, .experience-card, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
window.addEventListener('load', function() {
    initScrollAnimations();
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(216, 197, 178, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(216, 197, 178, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize navbar scroll effect
initNavbarScroll();

// Fix all external links to ensure they open properly
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"], a[href^="tel:"], a[href^="mailto:"]');
    
    externalLinks.forEach(link => {
        // Ensure external links have proper attributes
        if (link.href.includes('http') || link.href.includes('wa.me')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add click tracking
        link.addEventListener('click', function() {
            console.log('External link clicked:', this.href);
        });
    });
}

// Initialize external links
document.addEventListener('DOMContentLoaded', function() {
    initExternalLinks();
});

// Google Maps integration
function initGoogleMaps() {
    // The Google Maps iframe is already embedded in the HTML
    // This function can be used for additional map functionality if needed
    console.log('Google Maps embedded and functional');
}

// Initialize Google Maps
document.addEventListener('DOMContentLoaded', function() {
    initGoogleMaps();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (if real images are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

// Print functionality (if needed)
function initPrintStyles() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}

// Form reset functionality
function resetAllForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.reset();
        // Remove validation classes
        const inputs = form.querySelectorAll('.error, .success');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        // Remove error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initPrintStyles();
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateContactForm,
        validateB2BForm,
        isValidEmail,
        isValidPhone,
        openModal,
        closeModal,
        resetAllForms
    };
}