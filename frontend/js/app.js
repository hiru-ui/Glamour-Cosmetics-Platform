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
                <div class="footer-col" style="max-width: 300px;">
                    <a href="${prefix}index.html" class="logo" style="color: white; font-size: 1.5rem; display: block; margin-bottom: 1rem;">GLAMOUR.</a>
                    <p style="color: #999; font-size: 0.9rem; line-height: 1.8;">Redefining beauty with premium cosmetics. Join our community of radiance and style.</p>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                        <a href="#" style="color: white; opacity: 0.7; font-size: 1.2rem;">IG</a>
                        <a href="#" style="color: white; opacity: 0.7; font-size: 1.2rem;">FB</a>
                        <a href="#" style="color: white; opacity: 0.7; font-size: 1.2rem;">TW</a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4 style="color: white; opacity: 0.9;">Customer Care</h4>
                    <ul style="list-style: none; padding: 0;">
                        <li><a href="#" style="color: #888; text-decoration: none; transition: 0.3s; display: block; margin-bottom: 0.5rem;">Contact Support</a></li>
                        <li><a href="#" style="color: #888; text-decoration: none; transition: 0.3s; display: block; margin-bottom: 0.5rem;">Shipping Policy</a></li>
                        <li><a href="#" style="color: #888; text-decoration: none; transition: 0.3s; display: block; margin-bottom: 0.5rem;">Returns</a></li>
                        <li><a href="#" style="color: #888; text-decoration: none; transition: 0.3s; display: block;">FAQ</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 style="color: white; opacity: 0.9;">Explore</h4>
                     <ul style="list-style: none; padding: 0;">
                        <li><a href="${prefix}index.html" style="color: #888; text-decoration: none; transition: 0.3s; display: block; margin-bottom: 0.5rem;">Home</a></li>
                        <li><a href="${prefix}products.html" style="color: #888; text-decoration: none; transition: 0.3s; display: block; margin-bottom: 0.5rem;">Shop All</a></li>
                        <li><a href="${prefix}products.html?filter=new" style="color: #888; text-decoration: none; transition: 0.3s; display: block; margin-bottom: 0.5rem;">New Arrivals</a></li>
                        <li><a href="${prefix}admin/dashboard.html" style="color: #888; text-decoration: none; transition: 0.3s; display: block;">Admin Access</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 style="color: white; opacity: 0.9;">Stay in the loop</h4>
                    <p style="color: #888; margin-bottom: 1rem; font-size: 0.9rem;">Exclusive offers and beauty tips.</p>
                    <div style="display: flex; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 50px;">
                        <input type="email" placeholder="Your Email" style="flex: 1; padding: 10px 15px; background: transparent; border: none; color: white; outline: none;">
                        <button style="background: var(--color-accent-pink); border: none; color: white; padding: 8px 20px; border-radius: 50px; cursor: pointer; font-weight: 600;">Join</button>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 4rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; color: #555; font-size: 0.85rem;">
                &copy; 2026 Glamour Cosmetics. Designed for elegance.
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
