const CONFIG = {
    API_BASE_URL: 'http://localhost:8080/api'
};

const Utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    getCart: () => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    },

    saveCart: (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        Utils.updateCartCount();
    },

    addToCart: (product, quantity = 1) => {
        const cart = Utils.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        Utils.saveCart(cart);
        // Dispatch event for UI updates
        window.dispatchEvent(new Event('cartUpdated'));
        alert('Product added to cart!'); // Simple notification for now

        // Redirect to cart page
        window.location.href = 'cart.html';
    },

    updateCartCount: () => {
        const cart = Utils.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const badge = document.querySelector('.cart-count');
        if (badge) {
            badge.textContent = count;
        }
    },

    // Inject Navigation and Footer to avoid code duplication
    injectLayout: () => {
        const isPageAdmin = window.location.pathname.includes('/admin/');
        const prefix = isPageAdmin ? '../' : '';

        const header = `
         <style>
            .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
            .nav-links { display: flex; gap: 2rem; align-items: center; }
            .nav-links a { text-decoration: none; color: var(--color-text-dark); font-weight: 500; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
            .nav-links a:hover { color: var(--color-accent-pink); }
            .btn-small { background: var(--color-primary); color: white !important; padding: 8px 20px; border-radius: 50px; font-size: 0.8rem !important; }
            .btn-small:hover { background: var(--color-accent-pink); transform: translateY(-2px); }
            .logout-link { color: #d4a5a5 !important; font-weight: 600 !important; cursor: pointer; }
            .logout-link:hover { color: #b08080 !important; text-decoration: underline !important; }
            .cart-count { background: var(--color-accent-pink); color: white; padding: 2px 6px; border-radius: 10px; font-size: 0.7rem; vertical-align: top; margin-left: -5px; }
         </style>
         <div class="container navbar">
            <a href="${prefix}index.html" class="logo">GLAMOUR.</a>
            <nav class="nav-links">
                <a href="${prefix}index.html">Home</a>
                <a href="${prefix}products.html">Shop</a>
                <a href="${prefix}products.html?filter=new">New Arrivals</a>
                <a href="${prefix}cart.html">
                    Cart <span class="cart-count">0</span>
                </a>
                ${Auth.isLoggedIn() ?
                `<a href="#" onclick="Auth.logout()" class="logout-link">Logout</a>` :
                `<a href="${prefix}login.html" class="btn-small">Login</a>`
            }
            </nav>
        </div>
        `;

        const footer = `
        <style>
            footer { background: #111; color: white; padding: 5rem 0 2rem; }
            .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.5fr; gap: 4rem; }
            .footer-col h4 { font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 2rem; color: #d4a5a5; letter-spacing: 2px; text-transform: uppercase; }
            .footer-links { list-style: none; padding: 0; }
            .footer-links li { margin-bottom: 1rem; }
            .footer-links a { color: #888; text-decoration: none; transition: 0.3s; font-size: 0.95rem; }
            .footer-links a:hover { color: #d4a5a5; transform: translateX(5px); display: inline-block; }
            .social-links { display: flex; gap: 1.5rem; margin-top: 2rem; }
            .social-links a { color: #888; text-decoration: none; font-size: 0.9rem; transition: 0.3s; padding: 10px; border: 1px solid #333; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
            .social-links a:hover { color: white; border-color: #d4a5a5; background: rgba(212, 165, 165, 0.1); }
            .newsletter-title { font-size: 0.9rem; color: #888; margin-bottom: 1.5rem; line-height: 1.6; }
            .newsletter-form { display: flex; gap: 0; border-bottom: 1px solid #333; padding-bottom: 5px; transition: 0.3s; }
            .newsletter-form:focus-within { border-color: #d4a5a5; }
            .newsletter-form input { flex: 1; padding: 12px 0; background: transparent; border: none; color: white; outline: none; font-size: 0.9rem; }
            .newsletter-form button { background: transparent; border: none; color: #d4a5a5; font-weight: 600; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; padding: 0 10px; }
            .footer-bottom { text-align: center; margin-top: 5rem; padding-top: 2rem; border-top: 1px solid #222; color: #444; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; }
            @media (max-width: 968px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
            @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }
        </style>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <a href="${prefix}index.html" class="logo" style="color: white; font-size: 1.8rem; display: block; margin-bottom: 1.5rem;">GLAMOUR.</a>
                    <p style="color: #777; font-size: 1rem; line-height: 1.8; margin-bottom: 1.5rem;">Crafting beauty experiences that inspire confidence and radiance in every individual.</p>
                    <div class="social-links">
                        <a href="#" title="Instagram">IG</a>
                        <a href="#" title="Facebook">FB</a>
                        <a href="#" title="Pinterest">PT</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Explore</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}index.html">Home</a></li>
                        <li><a href="${prefix}products.html">Shop All</a></li>
                        <li><a href="${prefix}categories.html">Collections</a></li>
                        <li><a href="${prefix}about.html">Our Story</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Support</h4>
                    <ul class="footer-links">
                        <li><a href="${prefix}contact.html">Contact Us</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="${prefix}admin/dashboard.html">Admin Access</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Newsletter</h4>
                    <p class="newsletter-title">Subscribe to unlock early access to new collections and exclusive beauty tips.</p>
                    <div class="newsletter-form">
                        <input type="email" placeholder="Your Email Address">
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Glamour Cosmetics. Elevated Beauty.
            </div>
        </div>
        `;

        // Protect admin routes
        if (isPageAdmin && !Auth.isAdmin()) {
            alert('Access Denied. Admin privileges required.');
            window.location.href = prefix + 'login.html';
            return;
        }

        // Only inject if elements exist and are empty (optional check)
        const headerEl = document.querySelector('header');
        if (headerEl) headerEl.innerHTML = header;

        const footerEl = document.querySelector('footer');
        if (footerEl) footerEl.innerHTML = footer;

        Utils.updateCartCount();

        // Check if we need to show admin link in user view
        if (!isPageAdmin && Auth.isAdmin()) {
            const nav = document.querySelector('.nav-links');
            if (nav) {
                const adminLink = document.createElement('a');
                adminLink.href = 'admin/dashboard.html';
                adminLink.textContent = 'Dashboard';
                adminLink.style.color = 'var(--color-accent-pink)';
                nav.prepend(adminLink);
            }
        }
    }
};

// Initialize layout on load
document.addEventListener('DOMContentLoaded', () => {
    Utils.injectLayout();
});
