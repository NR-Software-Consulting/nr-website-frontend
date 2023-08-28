import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";

const CheckoutOrderArea = ({ checkoutData }) => {
  const t = useTranslations("header");
  const { isCheckoutSubmit, shippingCost, isLoading } = checkoutData;
  const { cartItems, totalPrice } = useCart();
  const cart_products = cartItems;
  let totalDiscount = 0;
  cart_products.forEach((item) => {
    const discountValue =
      parseInt(item.attributes.product.data.attributes.discount) || 0;
    totalDiscount += discountValue;
  });
  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">{t("Your Order")}</h3>
      <div className="tp-order-info-list">
        <ul>
          <li className="tp-order-info-list-header">
            <h4>{t("Product")}</h4>
            <h4>{t("Total")}</h4>
          </li>
          {cart_products.map((item) => (
            <li key={item.id} className="tp-order-info-list-desc">
              <p>
                {item.attributes.product.data.attributes.title.slice(0, 30)}{" "}
                <span> x {item.attributes.quantity}</span>
              </p>
              {/* <span>
                SAR {item.attributes.product.data.attributes.discount || 0}
              </span> */}
              <span>
                SAR{" "}
                {(
                  item.attributes.product.data.attributes.price *
                  item.attributes.quantity
                ).toFixed(2)}
              </span>
            </li>
          ))}
          {/* <li className='tp-order-info-list-shipping'>
            <span>Shipping</span>
            <div className='tp-order-info-list-shipping-item d-flex flex-column align-items-end'>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id='flat_shipping'
                  type='radio'
                  name='shippingOption'
                />
                <label
                  onClick={() => handleShippingCost(60)}
                  htmlFor='flat_shipping'>
                  Delivery: Today Cost :<span>SAR 60.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id='flat_rate'
                  type='radio'
                  name='shippingOption'
                />
                <label
                  onClick={() => handleShippingCost(20)}
                  htmlFor='flat_rate'>
                  Delivery: 7 Days Cost: <span>SAR 20.00</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li> */}

          {/*  subtotal */}
          <li className="tp-order-info-list-subtotal">
            <span>{t("Subtotal")}</span>
            <span>SAR {totalPrice?.toFixed(2)}</span>
          </li>
          {/*  shipping cost */}
          <li className="tp-order-info-list-subtotal">
            <span>{t("Shipping Cost")}</span>
            <span>SAR {shippingCost.toFixed(2)}</span>
          </li>
          {/* discount */}
          <li className="tp-order-info-list-subtotal">
            <span>{t("Discount")}</span>
            <span>SAR {totalDiscount.toFixed(2)}</span>
          </li>
          {/* total */}
          <li className="tp-order-info-list-total">
            <span>{t("Total")}</span>
            <span>
              SAR{" "}
              {parseFloat(totalPrice + shippingCost - totalDiscount).toFixed(2)}
            </span>
          </li>
        </ul>
      </div>
      {/* <div className='tp-checkout-payment'>
        <div className='tp-checkout-payment-item'>
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type='radio'
            id='back_transfer'
            name='payment'
            value='Card'
          />
          <label
            onClick={() => setShowCard(true)}
            htmlFor='back_transfer'
            data-bs-toggle='direct-bank-transfer'>
            Credit Card
          </label>
          {showCard && (
            <div className='direct-bank-transfer'>
              <div className='payment_card'>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className='tp-checkout-payment-item'>
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type='radio'
            id='cod'
            name='payment'
            value='COD'
          />
          <label htmlFor='cod'>Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div> */}
      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          {isLoading ? (
            <span>{t("loading")}...</span>
          ) : (
            <span>{t("Place Order")}</span>
          )}{" "}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
