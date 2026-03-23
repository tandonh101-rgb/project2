// E-commerce Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Initialize all components
    initNavigation();
    initProductData();
    initCart();
    initWishlist();
    initFilters();
    initModals();
    initForms();
    initCountdown();
    
    // Load initial data
    loadFeaturedProducts();
    loadShopProducts();
    updateCartCount();
    updateWishlistCount();
    
    // Set active page
    setActivePage('home');
}

// ============================================
// Navigation
// ============================================

function initNavigation() {
    // Handle navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            setActivePage(page);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            document.querySelector('.mobile-menu').classList.remove('active');
        });
    });
    
    // Handle mobile menu
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
        document.querySelector('.mobile-menu').classList.add('active');
    });
    
    document.querySelector('.mobile-menu-close').addEventListener('click', function() {
        document.querySelector('.mobile-menu').classList.remove('active');
    });
    
    // Handle search
    document.querySelector('.search-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.search-container').style.display = 'block';
        document.getElementById('search-input').focus();
    });
    
    document.getElementById('search-close').addEventListener('click', function() {
        document.querySelector('.search-container').style.display = 'none';
    });
    
    document.getElementById('search-submit').addEventListener('click', function(e) {
        e.preventDefault();
        const query = document.getElementById('search-input').value.trim();
        if (query) {
            searchProducts(query);
        }
    });
    
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                searchProducts(query);
            }
        }
    });
    
    // Handle cart toggle
    document.querySelector('.cart-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.cart-sidebar').classList.add('active');
    });
    
    document.querySelector('.cart-close').addEventListener('click', function() {
        document.querySelector('.cart-sidebar').classList.remove('active');
    });
    
    // Handle wishlist toggle
    document.querySelector('.wishlist-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.wishlist-sidebar').classList.add('active');
    });
    
    document.querySelector('.wishlist-close').addEventListener('click', function() {
        document.querySelector('.wishlist-sidebar').classList.remove('active');
    });
    
    // Handle user modal
    document.querySelector('.user-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('user-modal').classList.add('active');
    });
    
    // Handle auth switch
    document.getElementById('show-register').addEventListener('click', function(e) {
        e.preventDefault();
        const loginForm = document.getElementById('login-form');
        const switchText = document.querySelector('.auth-switch');
        
        if (loginForm.innerHTML.includes('Login')) {
            loginForm.innerHTML = `
                <div class="form-group">
                    <label for="register-name">Full Name</label>
                    <input type="text" id="register-name" required>
                </div>
                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input type="email" id="register-email" required>
                </div>
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <input type="password" id="register-password" required>
                </div>
                <div class="form-group">
                    <label for="register-confirm">Confirm Password</label>
                    <input type="password" id="register-confirm" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Register</button>
            `;
            switchText.innerHTML = 'Already have an account? <a href="#" id="show-login">Login</a>';
            
            document.getElementById('show-login').addEventListener('click', function(e) {
                e.preventDefault();
                initLoginForm();
            });
        }
    });
}

function setActivePage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(pageElement => {
        pageElement.classList.remove('active');
    });
    
    // Show selected page
    const activePage = document.getElementById(`${page}-page`);
    if (activePage) {
        activePage.classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Load page-specific content
        if (page === 'shop') {
            loadShopProducts();
        }
    }
}

// ============================================
// Product Data
// ============================================

let products = [];
let categories = ['electronics', 'fashion', 'home', 'sports', 'beauty', 'books'];

function initProductData() {
    // Generate sample product data
    products = [
        {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            category: 'electronics',
            price: 89.99,
            originalPrice: 129.99,
            rating: 4.5,
            reviews: 128,
            description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
            brand: 'Sony',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: true,
            stock: 15
        },
        {
            id: 2,
            name: 'Smart Watch Series 5',
            category: 'electronics',
            price: 299.99,
            originalPrice: 349.99,
            rating: 4.7,
            reviews: 256,
            description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.',
            brand: 'Apple',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80',
            featured: true,
            stock: 8
        },
        {
            id: 3,
            name: 'Running Shoes',
            category: 'sports',
            price: 79.99,
            originalPrice: 99.99,
            rating: 4.3,
            reviews: 89,
            description: 'Lightweight running shoes with cushioning technology for maximum comfort.',
            brand: 'Nike',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: true,
            stock: 25
        },
        {
            id: 4,
            name: 'Designer Handbag',
            category: 'fashion',
            price: 199.99,
            originalPrice: 249.99,
            rating: 4.8,
            reviews: 42,
            description: 'Elegant leather handbag with multiple compartments and adjustable strap.',
            brand: 'Gucci',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: true,
            stock: 5
        },
        {
            id: 5,
            name: 'Ceramic Coffee Mug Set',
            category: 'home',
            price: 34.99,
            originalPrice: 49.99,
            rating: 4.6,
            reviews: 76,
            description: 'Set of 4 ceramic mugs with elegant design, perfect for your morning coffee.',
            brand: 'IKEA',
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: true,
            stock: 40
        },
        {
            id: 6,
            name: 'Organic Face Cream',
            category: 'beauty',
            price: 29.99,
            originalPrice: 39.99,
            rating: 4.4,
            reviews: 103,
            description: 'Natural face cream with organic ingredients for hydrated and glowing skin.',
            brand: 'The Body Shop',
            image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false,
            stock: 32
        },
        {
            id: 7,
            name: 'Best-Selling Novel',
            category: 'books',
            price: 14.99,
            originalPrice: 19.99,
            rating: 4.9,
            reviews: 312,
            description: 'Award-winning novel by contemporary author, now in paperback edition.',
            brand: 'Penguin',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false,
            stock: 100
        },
        {
            id: 8,
            name: 'Yoga Mat Premium',
            category: 'sports',
            price: 49.99,
            originalPrice: 69.99,
            rating: 4.5,
            reviews: 67,
            description: 'Non-slip yoga mat with carrying strap, perfect for all types of yoga.',
            brand: 'Adidas',
            image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false,
            stock: 18
        },
        {
            id: 9,
            name: 'Wireless Charging Pad',
            category: 'electronics',
            price: 24.99,
            originalPrice: 34.99,
            rating: 4.2,
            reviews: 54,
            description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
            brand: 'Samsung',
            image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false,
            stock: 60
        },
        {
            id: 10,
            name: 'Men\'s Casual Shirt',
            category: 'fashion',
            price: 39.99,
            originalPrice: 49.99,
            rating: 4.3,
            reviews: 45,
            description: 'Comfortable cotton shirt with modern fit, perfect for casual occasions.',
            brand: 'Zara',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false,
            stock: 55
        },
        {
            id: 11,
            name: 'Desk Lamp with USB Port',
            category: 'home',
            price: 42.99,
            originalPrice: 59.99,
            rating: 4.6,
            reviews: 38,
            description: 'Modern desk lamp with adjustable brightness and built-in USB charging port.',
            brand: 'IKEA',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false,
            stock: 22
        },
        {
            id: 12,
            name: 'Vitamin C Serum',
            category: 'beauty',
            price: 32.99,
            originalPrice: 44.99,
            rating: 4.7,
            reviews: 91,
            description: 'Potent Vitamin C serum for brightening and anti-aging benefits.',
            brand: 'The Ordinary',
            image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            featured: false,
            stock: 28
        }
    ];
}

function loadFeaturedProducts() {
    const featuredProducts = products.filter(product => product.featured);
    const container = document.getElementById('featured-products');
    
    if (container) {
        container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
        
        // Add event listeners to product buttons
        addProductEventListeners();
    }
}

function loadShopProducts(filteredProducts = null) {
    const productsToShow = filteredProducts || products;
    const container = document.getElementById('shop-products');
    
    if (container) {
        container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
        
        // Update products count
        document.getElementById('products-count').textContent = `Showing ${productsToShow.length} products`;
        
        // Add event listeners to product buttons
        addProductEventListeners();
        
        // Initialize pagination
        initPagination(productsToShow);
    }
}

function createProductCard(product) {
    const discount = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ''}
                <button class="product-wishlist" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="product-stars">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="product-reviews">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? 
                        `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-outline btn-sm quick-view" data-id="${product.id}">
                        Quick View
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Quick view buttons
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            showQuickView(productId);
        });
    });
    
    // Wishlist buttons
    document.querySelectorAll('.product-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            toggleWishlist(productId);
        });
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    // Category cards large
    document.querySelectorAll('.category-card-large').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    setActivePage('shop');
    
    // Update active category filter
    document.querySelectorAll('.filter-category').forEach(filter => {
        filter.classList.remove('active');
        if (filter.getAttribute('data-category') === category) {
            filter.classList.add('active');
        }
    });
    
    // Filter products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    loadShopProducts(filteredProducts);
}

function searchProducts(query) {
    const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
    );
    
    setActivePage('shop');
    
    // Update products count
    document.getElementById('products-count').textContent = 
        `Found ${searchResults.length} products for "${query}"`;
    
    // Show results
    loadShopProducts(searchResults);
    
    // Hide search container
    document.querySelector('.search-container').style.display = 'none';
    document.getElementById('search-input').value = '';
}

// ============================================
// Shopping Cart
// ============================================

let cart = JSON.parse(localStorage.getItem('shopsphere_cart')) || [];

function initCart() {
    // Load cart from localStorage
    cart = JSON.parse(localStorage.getItem('shopsphere_cart')) || [];
    updateCartDisplay();
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Check stock
        if (existingItem.quantity + quantity > product.stock) {
            showToast(`Only ${product.stock} items available in stock`, 'error');
            return;
        }
        existingItem.quantity += quantity;
    } else {
        // Check stock
        if (quantity > product.stock) {
            showToast(`Only ${product.stock} items available in stock`, 'error');
            return;
        }
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    
    // Update display
    updateCartCount();
    updateCartDisplay();
    
    // Show success message
    showToast(`${product.name} added to cart`, 'success');
    
    // Open cart sidebar if not already open
    if (!document.querySelector('.cart-sidebar').classList.contains('active')) {
        document.querySelector('.cart-sidebar').classList.add('active');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showToast('Item removed from cart', 'info');
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const product = products.find(p => p.id === productId);
        
        // Check stock
        if (quantity > product.stock) {
            showToast(`Only ${product.stock} items available in stock`, 'error');
            quantity = product.stock;
        }
        
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyContainer = document.getElementById('cart-empty');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartEmptyContainer.style.display = 'block';
        cartSubtotal.textContent = '$0.00';
        return;
    }
    
    cartEmptyContainer.style.display = 'none';
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to cart items
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// ============================================
// Wishlist
// ============================================

let wishlist = JSON.parse(localStorage.getItem('shopsphere_wishlist')) || [];

function initWishlist() {
    // Load wishlist from localStorage
    wishlist = JSON.parse(localStorage.getItem('shopsphere_wishlist')) || [];
    updateWishlistDisplay();
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.indexOf(productId);
    const wishlistButton = document.querySelector(`.product-wishlist[data-id="${productId}"] i`);
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push(productId);
        showToast(`${product.name} added to wishlist`, 'success');
        if (wishlistButton) {
            wishlistButton.classList.remove('far', 'fa-heart');
            wishlistButton.classList.add('fas', 'fa-heart');
            wishlistButton.closest('.product-wishlist').classList.add('active');
        }
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showToast(`${product.name} removed from wishlist`, 'info');
        if (wishlistButton) {
            wishlistButton.classList.remove('fas', 'fa-heart');
            wishlistButton.classList.add('far', 'fa-heart');
            wishlistButton.closest('.product-wishlist').classList.remove('active');
        }
    }
    
    // Save to localStorage
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
    
    // Update display
    updateWishlistCount();
    updateWishlistDisplay();
}

function updateWishlistCount() {
    document.querySelector('.wishlist-count').textContent = wishlist.length;
}

function updateWishlistDisplay() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistEmptyContainer = document.getElementById('wishlist-empty');
    
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '';
        wishlistEmptyContainer.style.display = 'block';
        return;
    }
    
    wishlistEmptyContainer.style.display = 'none';
    
    // Get wishlist products
    const wishlistProducts = products.filter(product => wishlist.includes(product.id));
    
    // Render wishlist items
    wishlistItemsContainer.innerHTML = wishlistProducts.map(product => `
        <div class="wishlist-item" data-id="${product.id}">
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="wishlist-item-details">
                <h4 class="wishlist-item-title">${product.name}</h4>
                <div class="wishlist-item-price">$${product.price.toFixed(2)}</div>
                <div class="wishlist-item-actions">
                    <button class="btn btn-primary btn-sm add-to-cart-from-wishlist" data-id="${product.id}">
                        Add to Cart
                    </button>
                    <button class="remove-from-wishlist" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to wishlist items
    document.querySelectorAll('.add-to-cart-from-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.remove-from-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            toggleWishlist(productId);
        });
    });
}

// ============================================
// Filters & Sorting
// ============================================

function initFilters() {
    // Price slider
    const priceSlider = document.getElementById('price-slider');
    const priceMax = document.getElementById('price-max');
    
    priceSlider.addEventListener('input', function() {
        priceMax.textContent = `$${this.value}`;
    });
    
    // Apply filters button
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    
    // Reset filters button
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // Sort select
    document.getElementById('sort-select').addEventListener('change', applySorting);
    
    // View options
    document.querySelectorAll('.view-option').forEach(option => {
        option.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            setViewMode(view);
        });
    });
    
    // Category filters
    document.querySelectorAll('.filter-category').forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            // Update active category
            document.querySelectorAll('.filter-category').forEach(f => {
                f.classList.remove('active');
            });
            this.classList.add('active');
            
            // Apply category filter
            applyFilters();
        });
    });
}

function applyFilters() {
    const selectedCategory = document.querySelector('.filter-category.active').getAttribute('data-category');
    const maxPrice = parseFloat(document.getElementById('price-slider').value);
    const selectedBrands = Array.from(document.querySelectorAll('.brand-filter:checked'))
        .map(checkbox => checkbox.value);
    
    let filteredProducts = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Filter by brand
    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand.toLowerCase()));
    }
    
    // Apply sorting
    applySorting(filteredProducts);
}

function resetFilters() {
    // Reset category
    document.querySelectorAll('.filter-category').forEach(filter => {
        filter.classList.remove('active');
        if (filter.getAttribute('data-category') === 'all') {
            filter.classList.add('active');
        }
    });
    
    // Reset price slider
    const priceSlider = document.getElementById('price-slider');
    priceSlider.value = 1000;
    document.getElementById('price-max').textContent = '$1000';
    
    // Reset brand filters
    document.querySelectorAll('.brand-filter').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset sort
    document.getElementById('sort-select').value = 'default';
    
    // Reload products
    loadShopProducts();
}

function applySorting(filteredProducts = null) {
    const sortBy = document.getElementById('sort-select').value;
    let sortedProducts = filteredProducts || products;
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Default sorting (by id)
            sortedProducts.sort((a, b) => a.id - b.id);
    }
    
    if (filteredProducts) {
        loadShopProducts(sortedProducts);
    } else {
        loadShopProducts(sortedProducts);
    }
}

function setViewMode(view) {
    const container = document.getElementById('shop-products');
    const viewOptions = document.querySelectorAll('.view-option');
    
    // Update active view button
    viewOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-view') === view) {
            option.classList.add('active');
        }
    });
    
    // Apply view mode
    if (view === 'list') {
        container.classList.add('list-view');
    } else {
        container.classList.remove('list-view');
    }
}

// ============================================
// Pagination
// ============================================

const productsPerPage = 8;
let currentPage = 1;

function initPagination(productsToPaginate) {
    const totalPages = Math.ceil(productsToPaginate.length / productsPerPage);
    const pageNumbersContainer = document.getElementById('page-numbers');
    
    // Clear previous pagination
    pageNumbersContainer.innerHTML = '';
    
    // Create page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number';
        if (i === currentPage) pageNumber.classList.add('active');
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => goToPage(i, productsToPaginate));
        pageNumbersContainer.appendChild(pageNumber);
    }
    
    // Update pagination buttons
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
    
    document.getElementById('prev-page').onclick = () => {
        if (currentPage > 1) goToPage(currentPage - 1, productsToPaginate);
    };
    
    document.getElementById('next-page').onclick = () => {
        if (currentPage < totalPages) goToPage(currentPage + 1, productsToPaginate);
    };
    
    // Show current page products
    showPageProducts(currentPage, productsToPaginate);
}

function goToPage(page, productsToPaginate) {
    currentPage = page;
    showPageProducts(page, productsToPaginate);
    initPagination(productsToPaginate);
}

function showPageProducts(page, productsToPaginate) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = productsToPaginate.slice(startIndex, endIndex);
    
    const container = document.getElementById('shop-products');
    container.innerHTML = pageProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to product buttons
    addProductEventListeners();
}

// ============================================
// Modals & Quick View
// ============================================

function initModals() {
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Close modals with close button
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Close cart and wishlist with outside click
    document.addEventListener('click', function(e) {
        const cartSidebar = document.querySelector('.cart-sidebar');
        const wishlistSidebar = document.querySelector('.wishlist-sidebar');
        
        if (cartSidebar.classList.contains('active') && 
            !e.target.closest('.cart-sidebar') && 
            !e.target.closest('.cart-btn')) {
            cartSidebar.classList.remove('active');
        }
        
        if (wishlistSidebar.classList.contains('active') && 
            !e.target.closest('.wishlist-sidebar') && 
            !e.target.closest('.wishlist-btn')) {
            wishlistSidebar.classList.remove('active');
        }
    });
}

function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const discount = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    const modalContent = document.getElementById('quick-view-content');
    modalContent.innerHTML = `
        <div class="quick-view-content">
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="quick-view-details">
                <div class="product-category">${product.category}</div>
                <h2>${product.name}</h2>
                <div class="product-rating">
                    <div class="product-stars">
                        ${generateStarRating(product.rating)}
                    </div>
                    <span class="product-reviews">(${product.reviews} reviews)</span>
                </div>
                <div class="quick-view-price">
                    $${product.price.toFixed(2)}
                    ${product.originalPrice ? 
                        `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    ${discount > 0 ? `<span class="product-badge">-${discount}%</span>` : ''}
                </div>
                <p class="quick-view-description">${product.description}</p>
                <div class="quick-view-meta">
                    <p><strong>Brand:</strong> ${product.brand}</p>
                    <p><strong>Availability:</strong> 
                        <span class="${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                            ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </p>
                </div>
                <div class="quantity-selector">
                    <label for="quantity">Quantity:</label>
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn increase">+</button>
                </div>
                <div class="quick-view-actions">
                    <button class="btn btn-primary add-to-cart-quick" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-outline toggle-wishlist-quick" data-id="${product.id}">
                        <i class="${wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i> Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to quick view buttons
    const quantityInput = modalContent.querySelector('#quantity');
    modalContent.querySelector('.decrease').addEventListener('click', () => {
        if (quantityInput.value > 1) quantityInput.value--;
    });
    
    modalContent.querySelector('.increase').addEventListener('click', () => {
        if (quantityInput.value < product.stock) quantityInput.value++;
    });
    
    modalContent.querySelector('.add-to-cart-quick').addEventListener('click', () => {
        addToCart(productId, parseInt(quantityInput.value));
        document.getElementById('quick-view-modal').classList.remove('active');
    });
    
    modalContent.querySelector('.toggle-wishlist-quick').addEventListener('click', () => {
        toggleWishlist(productId);
        const wishlistIcon = modalContent.querySelector('.toggle-wishlist-quick i');
        if (wishlist.includes(productId)) {
            wishlistIcon.classList.remove('far');
            wishlistIcon.classList.add('fas');
        } else {
            wishlistIcon.classList.remove('fas');
            wishlistIcon.classList.add('far');
        }
    });
    
    // Show modal
    document.getElementById('quick-view-modal').classList.add('active');
}

// ============================================
// Forms
// ============================================

function initForms() {
    // Contact form
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real app, you would send this data to a server
        showToast('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });
    
    // Newsletter form
    document.getElementById('newsletter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real app, you would send this to a newsletter service
        showToast('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
    });
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.innerHTML.includes('Login')) {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (email && password) {
                showToast('Login successful!', 'success');
                document.getElementById('user-modal').classList.remove('active');
                this.reset();
            }
        } else {
            // Registration form
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            
            // Simple validation
            if (name && email && password && confirm) {
                if (password === confirm) {
                    showToast('Registration successful!', 'success');
                    document.getElementById('user-modal').classList.remove('active');
                    initLoginForm();
                } else {
                    showToast('Passwords do not match', 'error');
                }
            }
        }
    });
    
    // Checkout button
    document.getElementById('checkout').addEventListener('click', function(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            showToast('Your cart is empty', 'error');
            return;
        }
        
        // In a real app, this would redirect to checkout page
        showToast('Proceeding to checkout...', 'info');
        
        // Simulate checkout process
        setTimeout(() => {
            // Clear cart
            cart = [];
            localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            
            // Close cart sidebar
            document.querySelector('.cart-sidebar').classList.remove('active');
            
            // Show success message
            showToast('Order placed successfully! Thank you for your purchase.', 'success');
        }, 1500);
    });
}

function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const switchText = document.querySelector('.auth-switch');
    
    loginForm.innerHTML = `
        <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" required>
        </div>
        <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Login</button>
    `;
    switchText.innerHTML = 'Don\'t have an account? <a href="#" id="show-register">Register</a>';
    
    // Re-add event listener for register link
    document.getElementById('show-register').addEventListener('click', function(e) {
        e.preventDefault();
        initRegistrationForm();
    });
}

function initRegistrationForm() {
    const loginForm = document.getElementById('login-form');
    const switchText = document.querySelector('.auth-switch');
    
    loginForm.innerHTML = `
        <div class="form-group">
            <label for="register-name">Full Name</label>
            <input type="text" id="register-name" required>
        </div>
        <div class="form-group">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" required>
        </div>
        <div class="form-group">
            <label for="register-password">Password</label>
            <input type="password" id="register-password" required>
        </div>
        <div class="form-group">
            <label for="register-confirm">Confirm Password</label>
            <input type="password" id="register-confirm" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Register</button>
    `;
    switchText.innerHTML = 'Already have an account? <a href="#" id="show-login">Login</a>';
    
    // Re-add event listener for login link
    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        initLoginForm();
    });
}

// ============================================
// Countdown Timer
// ============================================

function initCountdown() {
    // Set countdown to 3 days from now
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 3);
    countdownDate.setHours(23, 59, 59, 0);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance < 0) {
            // Countdown finished
            document.querySelectorAll('.countdown-value').forEach(el => {
                el.textContent = '00';
            });
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        const countdownValues = document.querySelectorAll('.countdown-value');
        if (countdownValues.length >= 4) {
            countdownValues[0].textContent = days.toString().padStart(2, '0');
            countdownValues[1].textContent = hours.toString().padStart(2, '0');
            countdownValues[2].textContent = minutes.toString().padStart(2, '0');
            countdownValues[3].textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Add close button event
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }
    }, 5000);
}

// ============================================
// Utility Functions
// ============================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Debounce function for search
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

// Initialize debounced search
const debouncedSearch = debounce(searchProducts, 300);
document.getElementById('search-input').addEventListener('input', function() {
    debouncedSearch(this.value);
});