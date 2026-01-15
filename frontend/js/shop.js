const Shop = {
    // Mock Data for development until Backend is ready
    mockProducts: [
        {
            id: 1,
            name: "Velvet Matte Lipstick",
            description: "A rich, long-lasting matte lipstick that glides on smoothly.",
            price: 24.99,
            category: "Lips",
            imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80"
        },
        {
            id: 2,
            name: "Luminous Foundation",
            description: "Full coverage foundation with a natural, glowing finish.",
            price: 45.00,
            category: "Face",
            imageUrl: "https://images.unsplash.com/photo-1631729371254-42c2a89ddf0d?w=400&q=80"
        },
        {
            id: 3,
            name: "Rose Gold Eyeshadow Palette",
            description: "12 highly pigmented shades for day and night looks.",
            price: 55.00,
            category: "Eyes",
            imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=400&q=80"
        },
        {
            id: 4,
            name: "Hydrating Facial Serum",
            description: "Infused with hyaluronic acid for deep hydration.",
            price: 38.50,
            category: "Skincare",
            imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80"
        },
        {
            id: 5,
            name: "Volumizing Mascara",
            description: "Intense black mascara for dramatic volume.",
            price: 22.00,
            category: "Eyes",
            imageUrl: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?w=400&q=80"
        }
    ],

    // Switch to true to use real API
    useApi: true,

    fetchProducts: async () => {
        if (Shop.useApi) {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/products`);
                if (!response.ok) throw new Error('Network response was not ok');
                return await response.json();
            } catch (error) {
                console.error("Error fetching products:", error);
                // Return empty but also trigger a UI notification if possible, 
                // or let the caller handle empty state. 
                // Better: UI handling:
                const container = document.getElementById('featured-products') || document.getElementById('product-list');
                if (container) {
                    container.innerHTML = `
                        <div style="text-align: center; grid-column: 1 / -1; padding: 2rem; background: #fff1f1; border-radius: 8px; border: 1px solid #ffcdd2;">
                            <h3 style="color: #d32f2f;">Connection Failed</h3>
                            <p>Could not connect to the Backend API.</p>
                            <p style="font-size: 0.9rem; margin-top: 0.5rem;">Is the Spring Boot server running?</p>
                        </div>
                     `;
                }
                return [];
            }
        } else {
            // Simulate network delay
            return new Promise(resolve => setTimeout(() => resolve(Shop.mockProducts), 500));
        }
    },

    loadFeaturedProducts: async (limit = 4) => {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const products = await Shop.fetchProducts();
        const featured = products.slice(0, limit);

        container.innerHTML = featured.map(product => Shop.createProductCard(product)).join('');
    },

    loadAllProducts: async () => {
        const container = document.getElementById('product-list');
        if (!container) return;

        container.innerHTML = '<div class="loading">Loading products...</div>';
        const products = await Shop.fetchProducts();

        container.innerHTML = products.map(product => Shop.createProductCard(product)).join('');
    },

    getProductById: async (id) => {
        if (Shop.useApi) {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/products/${id}`);
                return await response.json();
            } catch (error) {
                console.error("Error fetching product:", error);
                return null;
            }
        } else {
            return Shop.mockProducts.find(p => p.id == id);
        }
    },

    createProductCard: (product) => {
        // Mocking some badges for variety
        const isNew = product.id % 2 === 0;
        const isSale = product.id % 3 === 0;
        const badgeHTML = isSale
            ? '<span class="product-badge">SALE</span>'
            : (isNew ? '<span class="product-badge new">NEW</span>' : '');

        return `
            <div class="product-card fade-in">
                ${badgeHTML}
                <div class="product-image">
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.imageUrl}" alt="${product.name}">
                    </a>
                    <div class="quick-actions">
                        <button class="action-btn" onclick="Utils.addToCart({id: ${product.id}, name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}, imageUrl: '${product.imageUrl}'})" title="Add to Cart">
                             🛒
                        </button>
                        <button class="action-btn" title="Quick View">
                             👁️
                        </button>
                        <button class="action-btn" title="Wishlist">
                             ❤️
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
                    <div class="stars">★★★★★</div>
                    <p class="product-price">${Utils.formatCurrency(product.price)}</p>
                </div>
            </div>
        `;
    },

    loadProductDetailView: async () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const container = document.getElementById('product-detail-container');

        if (!id || !container) return;

        const product = await Shop.getProductById(id);

        if (!product) {
            container.innerHTML = '<p>Product not found.</p>';
            return;
        }

        // Render Product Details
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 4rem; align-items: start;">
                 <div style="background: #f0f0f0; border-radius: 4px; overflow: hidden;">
                    <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: auto; display: block;">
                 </div>
                 <div>
                    <span style="color: var(--color-text-light); text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem;">${product.category}</span>
                    <h1 style="font-size: 3rem; margin: 0.5rem 0 1.5rem;">${product.name}</h1>
                    <p style="font-size: 2rem; color: var(--color-secondary); font-weight: 600; margin-bottom: 2rem;">${Utils.formatCurrency(product.price)}</p>
                    <p style="font-size: 1.1rem; color: #555; margin-bottom: 2rem; line-height: 1.8;">${product.description}</p>
                    
                    <div style="margin-bottom: 2rem;">
                        <label style="display: block; margin-bottom: 0.5rem;">Quantity</label>
                        <input type="number" id="qty-${product.id}" value="1" min="1" max="100" style="width: 80px; margin-right: 1rem;">
                    </div>

                    <button onclick="const qty = document.getElementById('qty-${product.id}').value; Utils.addToCart({id: ${product.id}, name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}, imageUrl: '${product.imageUrl}'}, parseInt(qty))" class="btn" style="padding: 16px 40px; font-size: 1.1rem;">Add to Cart</button>
                 </div>
            </div>
        `;
    }

};
