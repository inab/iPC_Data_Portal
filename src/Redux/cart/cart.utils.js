export const addItemToCart = (cartItems, cartItemToAdd) => {

    var cartIDs = cartItems.map(item => item.id);
    var filtered_items = cartItemToAdd.filter((el) => !cartIDs.includes(el["id"]));
    
    return [...cartItems, ...filtered_items]
    
    /*const existingCartItem = cartItems.find(
      cartItem => cartItem === cartItemToAdd
    );*/
    /*
    if (!existingCartItem) {
        return [...cartItems, ...cartItemToAdd];
    } else {
        return [...cartItems]
    }*/

};