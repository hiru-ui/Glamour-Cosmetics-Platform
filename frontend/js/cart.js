const Cart = {
    init: () => {
        Cart.renderCart();
        window.addEventListener('cartUpdated', Cart.renderCart);
    },

    renderCart: () => {
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total');
        const cart = Utils.getCart();

        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; padding: 4rem 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🛍️</div>
                        <h3 style="margin-bottom: 0.5rem;">Your bag is empty</h3>
                        <p style="color: #777; margin-bottom: 2rem;">Looks like you haven't added any beauty essentials yet.</p>
                        <a href="products.html" class="btn">Start Shopping</a>
                    </td>
                </tr>`;
            if (totalEl) totalEl.textContent = Utils.formatCurrency(0);
            return;
        }

        let total = 0;

        container.innerHTML = cart.map(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            return `
                <tr>
                    <td style="width: 50%;">
                        <div style="display: flex; align-items: center; gap: 2rem;">
                            <img src="${item.imageUrl}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--radius-sm); background: #f8f8f8;">
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
