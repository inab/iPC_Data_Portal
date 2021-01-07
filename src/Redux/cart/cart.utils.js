export const addItemToCart = (cartItems, cartItemToAdd) => {
    // NOT SURE IF THIS WILL WORK...
    const existingCartItem = cartItems.find(
      cartItem => cartItem === cartItemToAdd
    );
  
    if (!existingCartItem) {
        return [...cartItems, ...cartItemToAdd];
    } else {
        return [...cartItems]
    }
};