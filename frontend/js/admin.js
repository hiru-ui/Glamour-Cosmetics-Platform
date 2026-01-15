const Admin = {
    init: () => {
        Admin.loadProducts();
    },

    loadProducts: async () => {
        const tbody = document.getElementById('admin-products-list');
        if (!tbody) return;

        tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading products...</td></tr>';

        const products = await Shop.fetchProducts();

        tbody.innerHTML = products.map(product => `
            <tr>
                <td style="padding: 1rem; border-bottom: 1px solid var(--color-border);">${product.id}</td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--color-border);">
                    <img src="${product.imageUrl}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--color-border); font-weight: 500;">${product.name}</td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--color-border);">${Utils.formatCurrency(product.price)}</td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--color-border);">${product.category}</td>
                <td style="padding: 1rem; border-bottom: 1px solid var(--color-border);">
                    <a href="form.html?id=${product.id}" class="btn-secondary" style="padding: 5px 10px; font-size: 0.8rem; margin-right: 0.5rem;">Edit</a>
                    <button onclick="Admin.deleteProduct(${product.id})" class="btn-secondary" style="padding: 5px 10px; font-size: 0.8rem; color: var(--color-error); border-color: var(--color-error);">Delete</button>
                </td>
            </tr>
        `).join('');
    },

    deleteProduct: async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        if (Shop.useApi) {
            try {
                await fetch(`${CONFIG.API_BASE_URL}/products/${id}`, { method: 'DELETE' });
                alert('Product deleted successfully');
                Admin.loadProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        } else {
            console.log(`Mock delete product ${id}`);
            // Mock delete: filter out from internal mock data if we could, but Shop.mockProducts is static. 
            // In a real app this works. For now just alert.
            alert(`Product ${id} deleted (Mock)`);
            // To simulate UI update we could filter the rendered list but since it re-fetches from static mock, it repeats.
            // Let's just leave it as alert for mock.
        }
    },

    loadForm: async () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const titleEl = document.getElementById('form-title');
        const btnEl = document.getElementById('save-btn');

        if (id) {
            titleEl.textContent = 'Edit Product';
            btnEl.textContent = 'Update Product';

            // Fetch product data
            const product = await Shop.getProductById(id);
            if (product) {
                document.getElementById('product-id').value = product.id;
                document.getElementById('name').value = product.name;
                document.getElementById('price').value = product.price;
                document.getElementById('category').value = product.category;
                document.getElementById('description').value = product.description;
                document.getElementById('imageUrl').value = product.imageUrl;
            }
        } else {
            titleEl.textContent = 'Add New Product';
            btnEl.textContent = 'Create Product';
        }
    },

    saveProduct: async (event) => {
        event.preventDefault();

        const id = document.getElementById('product-id').value;
        const product = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            imageUrl: document.getElementById('imageUrl').value,
        };

        if (Shop.useApi) {
            try {
                const url = id ? `${CONFIG.API_BASE_URL}/products/${id}` : `${CONFIG.API_BASE_URL}/products`;
                const method = id ? 'PUT' : 'POST';

                await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                });

                alert('Product saved successfully!');
                window.location.href = 'dashboard.html';
            } catch (error) {
                console.error('Error saving product:', error);
                alert('Failed to save product');
            }
        } else {
            console.log(`Mock save product (ID: ${id})`, product);
            alert('Product saved successfully (Mock)!');
            window.location.href = 'dashboard.html';
        }
    }
};

// Check which page we are on to init correct logic
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', Admin.init);
} else if (window.location.pathname.includes('form.html')) {
    document.addEventListener('DOMContentLoaded', Admin.loadForm);
    document.getElementById('product-form').addEventListener('submit', Admin.saveProduct);
}
