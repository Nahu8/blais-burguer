document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-outline-success');
    const cartIcon = document.getElementById('cart-icon');
    const finalizePurchaseButton = document.querySelector('.btn-primary');

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.card');
            const productName = productCard.querySelector('.card-title').innerText;
            const productPrice = parseFloat(productCard.querySelector('.card-text').innerText.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
            };

            cart.push(product);
            updateCart();
        });
    });

    cartIcon.addEventListener('click', () => {
        updateCart();
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    });

    finalizePurchaseButton.addEventListener('click', () => {
        if (cart.length > 0) {
            const toast = new bootstrap.Toast(document.getElementById('purchaseToast'));
            toast.show();

            cart.length = 0;
            updateCart();

            const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
            cartModal.hide();
        }
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((product, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
                <span>${product.name}</span>
                <span>$${product.price.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += product.price;
        });

        cartTotalElement.innerText = total.toFixed(2);
        cartCountElement.innerText = cart.length;

        const removeButtons = document.querySelectorAll('.btn-danger');
        removeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});
