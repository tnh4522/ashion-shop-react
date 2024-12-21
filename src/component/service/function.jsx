export const addProductToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        cart.push(product);
    } else {
        const index = cart.findIndex(p => p.id === product.id);
        if (index === -1) {
            cart.push(product);
        } else {
            cart[index].quantity += product.quantity;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}