const Cart = {
    init: () => {
        Cart.renderCart();
        window.addEventListener('cartUpdated', Cart.renderCart);
    },

    renderCart: () => {
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total');
        const subtotalEl = document.getElementById('cart-subtotal');
        const itemCountEl = document.getElementById('item-count');
        const emptyState = document.getElementById('empty-cart-state');
        const tableSection = document.getElementById('cart-table-section');
        const summarySection = document.getElementById('cart-summary-section');

        const cart = Utils.getCart();

        if (!container) return;

        let total = 0;
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (itemCountEl) itemCountEl.textContent = totalItems;

        if (cart.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            if (tableSection) tableSection.style.display = 'none';
            if (summarySection) summarySection.style.display = 'none';

            if (totalEl) totalEl.textContent = Utils.formatCurrency(0);
            if (subtotalEl) subtotalEl.textContent = Utils.formatCurrency(0);
            // Fallback clear
            container.innerHTML = '';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (tableSection) tableSection.style.display = 'block';
        if (summarySection) summarySection.style.display = 'flex';

        container.innerHTML = cart.map((item) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            // Handle both remote and local images gracefully
            const imageSrc = item.imageUrl ? item.imageUrl : 'img/placeholder.jpg';
            return `
                <tr>
                    <td style="width: 50%;">
                        <div style="display: flex; align-items: center; gap: 2rem;">
                            <img src="${imageSrc}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-sm); background: #f8f8f8;">
                            <div>
                                <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${item.name}</h4>
                                <button onclick="Cart.removeItem(${item.id})" style="border: none; background: none; text-decoration: underline; color: var(--color-text-muted); cursor: pointer; padding: 0; font-family: var(--font-body); font-size: 0.85rem;">Remove</button>
                            </div>
                        </div>
                    </td>
                    <td>${Utils.formatCurrency(item.price)}</td>
                    <td>
                        <input type="number" min="1" value="${item.quantity}" onchange="Cart.updateQuantity(${item.id}, this.value)" style="width: 60px; text-align: center; border: 1px solid #ddd; padding: 8px;">
                    </td>
                    <td style="font-weight: 600; font-family: var(--font-heading); font-size: 1.1rem;">${Utils.formatCurrency(subtotal)}</td>
                </tr>
            `;
        }).join('');

        if (totalEl) totalEl.textContent = Utils.formatCurrency(total);
        if (subtotalEl) subtotalEl.textContent = Utils.formatCurrency(total);
    },

    updateQuantity: (id, quantity) => {
        const cart = Utils.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity < 1) item.quantity = 1;
            Utils.saveCart(cart);
            // Render will be triggered by event from saveCart if we changed app.js, 
            // but Utils.saveCart only updates count. Let's force render or dispatch event.
            // Actually Utils.saveCart calls updateCartCount but NOT dispatchEvent in my previous code.
            // I should update app.js or just dispatch here.
            window.dispatchEvent(new Event('cartUpdated'));
        }
    },

    removeItem: (id) => {
        let cart = Utils.getCart();
        cart = cart.filter(item => item.id !== id);
        Utils.saveCart(cart);
        window.dispatchEvent(new Event('cartUpdated'));
    }
};

document.addEventListener('DOMContentLoaded', Cart.init);
