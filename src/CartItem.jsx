import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // Import necessary actions
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        let total = 0;
        cart.forEach(item => {
            const quantity = item.quantity;
            const cost = parseFloat(item.cost.substring(1)); // Convert cost string to number
            total += quantity * cost; // Add to total
        });
        return total.toFixed(2); // Return total as a fixed decimal
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(); // Call the function passed from the parent component
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increment quantity
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrement quantity
        } else {
            dispatch(removeItem(item.name)); // Remove item if quantity drops to 0
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name)); // Remove item from cart
    };

    const calculateTotalCost = (item) => {
        const cost = parseFloat(item.cost.substring(1)); // Convert cost string to number
        return (cost * item.quantity).toFixed(2); // Return total cost for the item
    };

    const handleAddItemFromCart = (item) => {
        dispatch(addItem(item)); // Add item back to the cart
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">${item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                            <button className="cart-item-add" onClick={() => handleAddItemFromCart(item)}>Add Again</button> {/* Button to add item back */}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
        </div>
    );
};

export default CartItem;