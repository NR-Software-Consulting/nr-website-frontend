import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";

const CartCheckout = () => {
  const { totalPrice } = useCart();
  const [isLoading, setLoading] = useState(false);
  const t = useTranslations("header");
  const [shipCost, setShipCost] = useState(250);
  const formattedTotalPrice = (totalPrice + shipCost).toFixed(2);
  const handleCheckout = () => {
    setLoading(true);
  };
  return (
    <div className="tp-cart-checkout-wrapper">
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <Typography className="tp-cart-checkout-top-title">
          {"Total"}
        </Typography>
        <Typography className="tp-cart-checkout-top-price">
          PKR {totalPrice}
        </Typography>
      </div>
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <Typography className="tp-cart-checkout-top-title">
          {"Shipping"}
        </Typography>
        <Typography className="tp-cart-checkout-top-price">
          PKR {shipCost}
        </Typography>
      </div>
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">{"SubTotal"}</span>
        <span className="tp-cart-checkout-top-price">
          PKR {formattedTotalPrice}
        </span>
      </div>
      <div className="tp-cart-checkout-proceed">
        <Link
          href="/checkout"
          className="tp-cart-checkout-btn text-white w-100"
          onClick={handleCheckout}
          aria-disabled
        >
          {isLoading ? (
            <span>{t("loading")}...</span>
          ) : (
            <span>{t("Proceed to Checkout")}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
