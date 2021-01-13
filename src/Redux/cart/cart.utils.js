export const addItemToCart = (cartItems, cartItemToAdd) => {
    var cartIDs = cartItems.map(item => item.file_ID);
    var filtered_items = cartItemToAdd.filter((el) => !cartIDs.includes(el["file_ID"]));
    return [...cartItems, ...filtered_items]
};