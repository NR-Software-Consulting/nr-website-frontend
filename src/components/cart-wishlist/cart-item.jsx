import React from "react";
import Link from "next/link";
import { Minus, Plus, Close } from "@/svg";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";
import { notifySuccess } from "@/utils/toast";
import { Box } from "@mui/material";
import NRImage from "../NRImage";

const CartItem = ({ product }) => {
  const t = useTranslations("header");
  const slug = product?.attributes?.product?.data?.attributes?.slug;
  const title = product?.attributes?.product?.data?.attributes?.title;
  const { deleteCartItem, onAddToCart, onUpdateCart, cartItems } = useCart();
  const isAddedToCart =
    cartItems?.some(
      (prd) => prd?.attributes?.product?.data?.id === product?.id
    ) || false;
  const cartItem =
    cartItems?.find(
      (prd) =>
        prd?.attributes?.product?.data?.id ===
        product?.attributes?.product?.data?.id
    ) || {};
  const image =
    product?.attributes?.product?.data?.attributes?.images?.data[0]?.attributes
      ?.url;
  const price = product?.attributes?.product?.data?.attributes?.price;
  const discount = product?.attributes?.product?.data?.attributes?.discount;
  const orderQuantity = product?.attributes?.quantity;
  const _id = product.id;
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
  const handleRemovePrd = async () => {
    deleteCartItem(cartItem.id);
    notifySuccess("Successfully Removed from cart");
  };
  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/product/${slug}`}>
          <Box sx={{ width: 110, height: 110 }}>
            <NRImage src={image} alt="product img" />
          </Box>
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link href={`/product/${slug}`}>{title}</Link>
      </td>
      <td className="tp-cart-price">
        <span>
          PKR {((price - (price * discount) / 100) * orderQuantity).toFixed(2)}
        </span>
      </td>
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
