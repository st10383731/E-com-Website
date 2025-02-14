// References to elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartCount = document.getElementById('cartCount');

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart icon
function updateCartIcon() {
    cartCount.textContent = cart.length;
}

// Function to update cart modal
function updateCartModal() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            ${item.name} - $${item.price}
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);

    // Add event listeners to the "Remove" buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Remove item from cart
function removeFromCart(index) {
    // Remove item from the cart array
    cart.splice(index, 1);

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart modal and icon
    updateCartModal();
    updateCartIcon();
}

// Open Cart
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    updateCartModal();
});

// Close Cart
closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Add Product to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));
        const productImage = button.getAttribute('data-product-image');

        const newProduct = { id: productId, name: productName, price: productPrice, image: productImage };
        cart.push(newProduct);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartIcon();
    });
});

// Checkout Button
checkoutBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'flex';
});

// Close Checkout Modal
closeCheckoutBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

// Submit Order (Placeholder functionality)
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    checkoutModal.style.display = 'none';
});
