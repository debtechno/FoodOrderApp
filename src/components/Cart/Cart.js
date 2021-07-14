import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import StripeCheckout from 'react-stripe-checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [userDataInfo, setUserDataInfo] = useState();
  const [totalAmountValue, setTotalAmountValue] = useState(cartCtx.totalAmount.toFixed(2));


  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const backendTotalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  console.log("backendTotalAmount",backendTotalAmount);
  const paymentAmount = parseInt(`${cartCtx.totalAmount.toFixed(2)}`)
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    console.log('inside submit handler....')
    const userDetails = {
      user_name: userData.user_name,
      street: userData.street,
      city: userData.city,
      postalCode: userData.postalCode
    }
    setIsSubmitting(true);
    await fetch('http://localhost:8080/confirmOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userDetails,
        items: cartCtx.items,
        totalAmount: backendTotalAmount,
      }),
    });
    console.log('body....', JSON.stringify({
      user: userDetails,
      items: cartCtx.items,
      totalAmount: backendTotalAmount,
    }),);
    setUserDataInfo(userData)
    setTotalAmountValue(cartCtx.totalAmount.toFixed(2))
    setIsSubmitting(false);
    setDidSubmit(true);
    // cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  // const didSubmitModalContent = (
  //   <React.Fragment>
  //     <p>Successfully sent the order!</p>
  //     <div className={classes.actions}>
  //     <button className={classes.button} onClick={props.onClose}>
  //       Close
  //     </button>
  //   </div>
  //   </React.Fragment>
  // );
  
  const onToken = async (token) => {
    console.log(token);
    const paymentDetails = {
      customerName: userDataInfo.user_name,
      customerMailId: token.email,
      last4Digit: token.card.last4,
      totalPayment: totalAmountValue
    }
    console.log('pyadetails...', paymentDetails);
    await fetch('http://localhost:8082/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName: userDataInfo.user_name,
        customerMailId: token.email,
        last4Digit: token.card.last4,
        totalPayment: totalAmountValue
      }),
    });
    setIsPaid(true);
    cartCtx.clearCart();

  }

  const didSubmitModalContent = (
    
    <React.Fragment>
      {!isPaid && (<StripeCheckout 
      token={onToken}
      name = "Exotic Meals Payment"
      currency = "INR"
      amount = {paymentAmount * 100}
      stripeKey="pk_test_51J0hT1SIV9vCXPrmVb9ohfz9Egy1270FcesyvW8oB0X865AeNd8Nopm1ue9PPx0fsg9nolUVRV0ctrtwWfJPtSWn00cOzaAllz"
    />)}
    
    </React.Fragment>
  );

  const didFinalSubmitModalContent = (
    <React.Fragment>
      {!isPaid && (<p className={classes.doPayment}>Please click on Pay With Card to initiate payment!</p>)}
      {isPaid && (<p className={classes.afterPayment}>Payment Successful!</p>)}
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {!isSubmitting && didSubmit && didFinalSubmitModalContent}
    </Modal>
  );
};

export default Cart;
