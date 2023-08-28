/** @format */

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const CartCheckout = () => {
  const { totalPrice } = useCart();
  const [isLoading, setLoading] = useState(false);
  const t = useTranslations("header");
  const [shipCost, setShipCost] = useState(0);
  const route = useRouter();
  const handleShippingCost = (value) => {
    if (value === "free") {
      setShipCost(0);
    } else {
      setShipCost(value);
    }
  };
  const formattedTotalPrice = (totalPrice + shipCost).toFixed(2);
  const handleCheckout = () => {
    setLoading(true);
  };
  return (
    <div className='tp-cart-checkout-wrapper'>
      <div className='tp-cart-checkout-top d-flex align-items-center justify-content-between'>
        <span className='tp-cart-checkout-top-title'>{t("Subtotal")}</span>
        <span className='tp-cart-checkout-top-price'>
          SAR {formattedTotalPrice}
        </span>
      </div>
      <div className='tp-cart-checkout-shipping'>
        <h4 className='tp-cart-checkout-shipping-title'>{t("Shipping")}</h4>
        <div className='tp-cart-checkout-shipping-option-wrapper'>
          <div className='tp-cart-checkout-shipping-option'>
            <input id='flat_rate' type='radio' name='shipping' />
            <label htmlFor='flat_rate' onClick={() => handleShippingCost(20)}>
              {t("Flat rate")}: <span>SAR 20.00</span>
            </label>
          </div>
          <div className='tp-cart-checkout-shipping-option'>
            <input id='local_pickup' type='radio' name='shipping' />
            <label
              htmlFor='local_pickup'
              onClick={() => handleShippingCost(25)}>
              {t("Local pickup")}: <span>SAR 25.00</span>
            </label>
          </div>
          <div className='tp-cart-checkout-shipping-option'>
            <input id='free_shipping' type='radio' name='shipping' />
            <label
              onClick={() => handleShippingCost("free")}
              htmlFor='free_shipping'>
              {t("Free shipping")}
            </label>
          </div>
        </div>
      </div>
      <div className='tp-cart-checkout-total d-flex align-items-center justify-content-between'>
        <span>{t("Total")}</span>
        <span>SAR {formattedTotalPrice}</span>
      </div>
      <div className='tp-cart-checkout-proceed'>
        <Link
          href='/checkout'
          className='tp-cart-checkout-btn text-white w-100'
          onClick={handleCheckout}
          aria-disabled>
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
