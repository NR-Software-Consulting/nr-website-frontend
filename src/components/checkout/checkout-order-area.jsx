import { useCart } from "@/hooks/use-cart";
import { Typography } from "@mui/material";
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

              <span>
                PKR{" "}
                {(
                  item?.attributes?.product?.data?.attributes?.price -
                  (item?.attributes?.product?.data?.attributes?.price *
                    item?.attributes?.product?.data?.attributes?.discount) /
                    100
                )?.toFixed(2)}
              </span>
            </li>
          ))}
          <div className="d-flex justify-content-between mt-5 mb-5">
            <Typography fontSize={"14px"}>{t("Total")}</Typography>
            <Typography fontSize={"14px"}>
              PKR {totalPrice.toFixed(2)}
            </Typography>
          </div>
          <div className="d-flex justify-content-between mb-5">
            <Typography fontSize={"14px"}>{"Shipping"}</Typography>
            <Typography fontSize={"14px"}>
              PKR {shippingCost.toFixed(2)}
            </Typography>
          </div>
          <div className="d-flex justify-content-between mb-5">
            <Typography
              fontSize={"16px"}
              fontWeight={500}
              sx={{ color: "black" }}
            >
              {"SubTotal"}
            </Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={500}
              sx={{ color: "black" }}
            >
              PKR {parseFloat(totalPrice + shippingCost).toFixed(2)}
            </Typography>
          </div>
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
