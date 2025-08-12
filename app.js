// Shopifi.in Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.background = 'var(--color-surface)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
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

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.feature-card, .step, .testimonial-card, .trust-badge');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showMessage('Please enter your email address.', 'error');
            return;
        }
        
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showMessage('Thank you for subscribing! You\'ll receive exclusive deals soon.', 'success');
            emailInput.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });

    // Function to show success/error messages
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        
        if (type === 'error') {
            messageDiv.style.background = 'var(--color-bg-4)';
            messageDiv.style.color = 'var(--color-error)';
            messageDiv.style.padding = 'var(--space-12) var(--space-16)';
            messageDiv.style.borderRadius = 'var(--radius-base)';
            messageDiv.style.marginTop = 'var(--space-12)';
            messageDiv.style.textAlign = 'center';
        }
        
        newsletterForm.appendChild(messageDiv);
        
        // Show the message
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 100);
        
        // Hide the message after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
    }

    // CTA Button click handlers
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Start Shopping') || this.textContent.includes('Browse Categories')) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Show a demo message (in a real app, this would redirect to the shopping page)
                showDemoMessage('Welcome to Shopifi.in! This is a demo landing page. In a real implementation, this would redirect to the shopping platform.');
            }
        });
    });

    // Demo message function
    function showDemoMessage(message) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '10000';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        
        const modal = document.createElement('div');
        modal.style.background = 'var(--color-surface)';
        modal.style.padding = 'var(--space-32)';
        modal.style.borderRadius = 'var(--radius-lg)';
        modal.style.maxWidth = '500px';
        modal.style.textAlign = 'center';
        modal.style.border = '1px solid var(--color-card-border)';
        modal.style.boxShadow = 'var(--shadow-lg)';
        
        modal.innerHTML = `
            <h3 style="color: var(--color-primary); margin-bottom: var(--space-16);">Demo Mode</h3>
            <p style="color: var(--color-text); margin-bottom: var(--space-24);">${message}</p>
            <button class="btn btn--primary" onclick="this.parentElement.parentElement.remove()">Got it!</button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Show the overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
        
        // Close with Escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Testimonial cards stagger animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Trust badges pulse effect
    const trustBadges = document.querySelectorAll('.trust-badge');
    trustBadges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.animation = 'pulse 0.6s ease-in-out';
        }, index * 200);
    });

    // Add pulse keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .error-message {
            opacity: 0;
            transition: opacity var(--duration-normal) var(--ease-standard);
        }
        
        .error-message.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Counter animation for hero card
    const heroCard = document.querySelector('.hero-card h3');
    if (heroCard && heroCard.textContent.includes('10M+')) {
        let count = 0;
        const target = 10;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        
        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(counter);
            }
            heroCard.textContent = Math.floor(count) + 'M+ Products';
        }, 16);
    }

    // Lazy loading for better performance (if images were present)
    const lazyLoad = function() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    };

    // Add scroll listener for lazy loading
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    lazyLoad(); // Initial call

    // Console welcome message
    console.log('%c🛍️ Welcome to Shopifi.in Landing Page!', 'color: #218E8D; font-size: 16px; font-weight: bold;');
    console.log('This is a demo landing page created with modern web technologies.');
});