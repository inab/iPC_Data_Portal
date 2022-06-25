export const addItemToCart = (cartItems, itemToAdd) => {
    let cartIDs = cartItems.map(item => item.file_ID);
    let newItem = itemToAdd.filter((item) => !cartIDs.includes(item.file_ID));
    return [...cartItems, ...newItem]
};

export const removeItemFromCart = (cartItems, itemToDelete) => {
    let itemToDeleteID = itemToDelete.map(item => item._id);
    return cartItems.filter((el) => !el.file_ID.includes(itemToDeleteID))
};