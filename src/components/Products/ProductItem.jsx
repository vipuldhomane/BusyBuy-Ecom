import React from "react";
import "./ProductItem.scss";
import { useValue } from "../../Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ProductItem({ item }) {
  const { signIn, cartItems, setCartItems, totalAmt, setTotalAmt } = useValue();
  const navigate = useNavigate();
  // const { price, title, image, description } = item;
  // console.log(title);

  const handleAddToCart = async () => {
    if (signIn) {
      // Check if the item is already in the cart
      const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

      if (itemInCart) {
        // Item already exists in the cart, update its quantity
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        setCartItems(updatedCartItems);
        setTotalAmt(totalAmt + item.price);
      } else {
        // Item doesn't exist in the cart, add it with a quantity of 1
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
        setTotalAmt(totalAmt + item.price);
      }

      // Send the data to Firebase Firestore
      try {
        await addDoc(collection(db, "cartItems"), {
          name: item.title,
          price: item.price,
          img: item.image,
          quantity: itemInCart ? itemInCart.quantity + 1 : 1,
        });
        toast.success(`${item.title} added to cart`);
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error("Failed to add item to cart");
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="productItem">
        <img src={item.image} alt="productimg" />
        <p>{item.title}</p>
        <h3>$ {item.price}</h3>
        <button className="btn" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </>
  );
}
