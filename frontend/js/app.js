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
         <div class="container navbar">
            <a href="${prefix}index.html" class="logo">GLAMOUR.</a>
            <nav class="nav-links">
                <a href="${prefix}index.html">Home</a>
                <a href="${prefix}products.html">Shop</a>
                <a href="${prefix}products.html?filter=new">New Arrivals</a>
                <a href="${prefix}cart.html">
                    Cart <span class="cart-count">0</span>
                </a>
            </nav>
        </div>
        `;

        const footer = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>About Us</h4>
                    <p style="color: #999; font-size: 0.9rem;">Your destination for premium beauty essentials. We bring you the world's best cosmetics at your fingertips.</p>
                </div>
                <div class="footer-col">
                    <h4>Customer Care</h4>
                    <ul>
                        <li><a href="#">Contact Support</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Returns & Exchanges</a></li>
                        <li><a href="#">FAQs</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                     <ul>
                        <li><a href="${prefix}index.html">Home</a></li>
                        <li><a href="${prefix}products.html">Shop All</a></li>
                        <li><a href="${prefix}admin/dashboard.html">Admin Login</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Newsletter</h4>
                    <p style="color: #999; margin-bottom: 1rem; font-size: 0.9rem;">Subscribe for latest updates and offers.</p>
                    <div style="display: flex;">
                        <input type="email" placeholder="Your Email" style="padding: 10px; border: none; width: 100%;">
                        <button style="background: var(--color-accent-pink); border: none; color: white; padding: 0 15px; cursor: pointer;">→</button>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 3rem; border-top: 1px solid #333; padding-top: 2rem; color: #555; font-size: 0.8rem;">
                &copy; 2026 Glamour Cosmetics. All Rights Reserved.
            </div>
        </div>
        `;

        // Only inject if elements exist and are empty (optional check)
        const headerEl = document.querySelector('header');
        if (headerEl) headerEl.innerHTML = header;

        const footerEl = document.querySelector('footer');
        if (footerEl) footerEl.innerHTML = footer;

        Utils.updateCartCount();
    }
};

// Initialize layout on load
document.addEventListener('DOMContentLoaded', () => {
    Utils.injectLayout();
});
