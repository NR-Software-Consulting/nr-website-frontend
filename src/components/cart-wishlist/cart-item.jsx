/** @format */

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Minus, Plus, Close } from "@/svg";
import { useMutation } from "@apollo/client";
import { getCookie } from "cookies-next";
import { UPDATE_CART_QUANTITY } from "@/graphql/mutation/cart";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";
import { notifySuccess } from "@/utils/toast";

const CartItem = ({ product }) => {
  const t = useTranslations("header");
  const slug = product.attributes.product.data.attributes.slug;
  const title = product.attributes.product.data.attributes.title;
  const { deleteCartItem, onAddToCart, onUpdateCart, cartItems } = useCart();
  const isAddedToCart =
    cartItems?.some((prd) => prd.attributes.product.data.id === product.id) ||
    false;

  const cartItem =
    cartItems?.find(
      (prd) =>
        prd.attributes.product.data.id === product.attributes.product.data.id
    ) || {};
  const image =
    product.attributes.product.data.attributes.images.data[0].attributes.url;
  const price = product.attributes.product.data.attributes.price;
  const orderQuantity = product.attributes.quantity;
  const _id = product.id;

  // Define your useMutation hook

  // Handle add product
  const handleAddProduct = async () => {
    const updatedQuantity = orderQuantity + 1;

    const productId = product.attributes.product.id;
    try {
      await onUpdateCart({
        updateCartId: cartItem.id,
        data: {
          quantity: updatedQuantity,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  // Handle decrement product
  const handleDecrement = async () => {
    if (orderQuantity > 1) {
      const updatedQuantity = orderQuantity - 1;

      try {
        await onUpdateCart({
          updateCartId: cartItem.id,
          data: {
            quantity: updatedQuantity,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // Handle remove product
  const handleRemovePrd = async () => {
    deleteCartItem(cartItem.id);
    notifySuccess("Successfully Removed from cart");
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/product-details/${_id}`}>
          <Image src={image} alt="product img" width={70} height={100} />
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link href={`/product-details/${slug}`}>{title}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>SAR {(price * orderQuantity).toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={handleDecrement} className="tp-cart-minus">
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={orderQuantity}
            readOnly
          />
          <span onClick={handleAddProduct} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button onClick={handleRemovePrd} className="tp-cart-action-btn">
          <Close />
          <span> {t("Remove")}</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;