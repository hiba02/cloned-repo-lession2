import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.style.scss';


const CartDropDown = ( {cartItems} ) => {
    console.log("CartDropDown: ", cartItems)
    return (<div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
            }
        </div>

        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>)
};


// const maptStateToProps = ({ cart: { cartItems }}) => ({
//     cartItems
// }) 

const maptStateToProps = (state) => ({
    cartItems: selectCartItems(state)
}) 


export default connect(maptStateToProps)(CartDropDown);
