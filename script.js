// script.js 

document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();

    setupHeaderScrollBehavior();

    setupProductCardHover();

    setupAddToCartButtons();

    setupContactForm();

    setupScrollAnimations();
});


function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


function setupHeaderScrollBehavior() {
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
}


function setupProductCardHover() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}


function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    let cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;

            cartItems.push({ name: productName, price: productPrice });

            showNotification(`${productName} added to cart`);

            updateCartCount(cartItems.length);
        });
    });
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            animation: slideIn 0.5s ease-out;
            z-index: 1000;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes slideOut {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 500);
    }, 3000);
}


function updateCartCount(count) {
    let cartCount = document.querySelector('.cart-count');
    if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        document.querySelector('.nav-buttons').appendChild(cartCount);
    }
    cartCount.textContent = count;
}


function setupContactForm() {
    const contactForm = document.getElementById('contacto-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        if (validateForm(data)) {
            showNotification('Thank you for your message! We’ll contact you soon.');
            contactForm.reset();
        }
    });
}


// --- Helper: Validate form input fields ---
function validateForm(data) {
    if (!data.nombre || !data.email || !data.mensaje) {
        showNotification('Please fill out all required fields.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.');
        return false;
    }

    return true;
}


// ===========================================================
// 🔹 6. Animate Elements on Scroll (Fade-in Effect)
// ===========================================================
function setupScrollAnimations() {
    // Add base animation style for all animated elements
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .product-card, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);

    // Define the animation function
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefit-card, .product-card, .testimonial-card');

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Run animation once on load and again whenever user scrolls
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}
