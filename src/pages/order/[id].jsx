import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import ReactToPrint from "react-to-print";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import logo from "@assets/img/logo/headerlogo.png";
import ErrorMsg from "@/components/common/error-msg";
import Header from "@/layout/headers/header";
import { useLazyQuery } from "@apollo/client";
import { GET_ORDER_DETAIL } from "@/graphql/query/orderdetails";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import SearchPrdLoader from "@/components/loader/search-prd-loader";
import { Box } from "@mui/material";
import NRImage from "@/components/NRImage";

const SingleOrder = ({ params }) => {
  const t = useTranslations("header");
  const orderId = params.id;
  const token = getCookie("token");
  const [shippingCost, setShippingCost] = useState(250);
  const printRef = useRef();
  const [Order, { loading, error, data }] = useLazyQuery(GET_ORDER_DETAIL);

  useEffect(() => {
    Order({
      variables: {
        orderId: orderId,
      },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  }, [Order, orderId]);
  let content = null;
  if (loading) {
    content = <SearchPrdLoader loading={loading} />;
  }
  if (error) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!loading && !error && data && data.order) {
    const {
      attributes: {
        Name,
        status,
        total,
        publishedAt,
        products,
        city,
        country,
        address,
        phoneNumber,
      },
      id,
    } = data.order.data;
    content = (
      <>
        <section className="invoice__area pt-120 pb-120">
          <div className="container">
            <div className="invoice__msg-wrapper">
              <div className="row">
                <div className="col-xl-12">
                  <div className="invoice_msg mb-40">
                    <p className="text-black alert alert-success">
                      {t("Thank you")} <strong>{Name}</strong>{" "}
                      {t("Your order have been received")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={printRef}
              className="invoice__wrapper pt-40 pb-40 pl-10 pr-10 tp-invoice-print-wrapper border"
            >
              <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="invoice__header pb-20">
                      <div className="row align-items-end">
                        <div className="col-md-4 col-sm-6">
                          <div className="invoice__left">
                            <Box sx={{ height: 70, width: 220 }}>
                              <NRImage src={logo} alt="logo" />
                            </Box>
                          </div>
                        </div>
                        <div className="col-md-8 col-sm-6">
                          <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                            <h3 className="text-uppercase font-70 mb-20">
                              {t("Invoice")}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice__customer mb-30">
                <div className="row">
                  <div className="col-md-6 col-sm-8">
                    <div className="invoice__customer-details">
                      <h4 className="mb-10 text-uppercase">{Name}</h4>
                      <p className="mb-0">
                        <strong>{t("City")}:</strong> {city}
                      </p>
                      <p className="mb-0">
                        <strong>{t("Country")}:</strong> {country}
                      </p>
                      <p className="mb-0">
                        <strong>{t("Contact")}:</strong> {phoneNumber}
                      </p>
                      <p className="mb-0">
                        <strong>{t("Address")}:</strong> {address.slice(0, 90)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-4">
                    <div className="invoice__details mt-md-0 mt-20 text-md-end">
                      <p className="mb-0">
                        <strong>{t("Invoice ID")}:</strong> #{id}
                      </p>
                      <p className="mb-0">
                        <strong>{t("Status")}:</strong>{" "}
                        <span className="text-primary">{status}</span>
                      </p>
                      <p className="mb-0">
                        <strong>{t("Date")}:</strong>{" "}
                        {dayjs(publishedAt).format("MMMM D, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice__order-table table-responsive pt-30 pb-30 pl-10 pr-10 bg-white mb-30">
                <table className="table overflow-scroll">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">{t("SL")}</th>
                      <th scope="col">{t("Product Name")}</th>
                      <th scope="col">{t("Quantity")}</th>
                      <th scope="col">{t("Item Price")}</th>
                      <th scope="col">{t("Discount")}</th>
                      <th scope="col">{t("Amount")}</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {products.map((item, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.quantity}</td>
                        <td>PKR {item.price}</td>
                        <td>{item.discount || 0}</td>
                        <td>
                          PKR{" "}
                          {(item.price - (item.price * item.discount) / 100) *
                            item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex">
                <strong>Note:</strong>{" "}
                {"Your Order will be Delivered in 3 - 4 Bussiness Days"}
              </div>
              <div className="invoice__total pt-40 pb-10 alert-success pl-10 pr-10 mb-30">
                <div className="row d-flex justify-content-between">
                  <div className="col-lg-3 col-md-4">
                    <div className="invoice__payment-method mb-30">
                      <h5 className="mb-0">{t("Payment Method")}</h5>
                      <p className="tp-font-medium text-uppercase">COD</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="invoice__total-ammount mb-30">
                      <h5 className="mb-0">{"Shipping Charges"}</h5>
                      <p className="tp-font-medium text-danger">
                        <strong>
                          PKR {parseInt(shippingCost).toFixed(2) || "0.00"}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="invoice__total-ammount mb-30">
                      <h5 className="mb-0">{t("Total Ammount")}</h5>
                      <p className="tp-font-medium text-danger">
                        <strong>
                          PKR{" "}
                          {(
                            parseFloat(total) + parseFloat(shippingCost)
                          ).toFixed(2) || "0.00"}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice__print text-end mt-3">
              <div className="row">
                <div className="col-xl-12">
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        className="tp-invoice-print tp-btn tp-btn-black"
                      >
                        <span className="mr-5">
                          <i className="fa-regular fa-print"></i>
                        </span>{" "}
                        {t("Print")}
                      </button>
                    )}
                    content={() => printRef.current}
                    documentTitle={id}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <Wrapper>
        <SEO pageTitle={"Order Details"} />
        <Header />
        {content}
        <Footer primary_style={true} />
      </Wrapper>
    </>
  );
};

export default SingleOrder;

export const getServerSideProps = async (context) => {
  let messages = (await import(`../../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const params = context.params;
    if (response) {
      return {
        props: {
          params,
          category,
          messages,
          footerLinks,
        },
      };
    } else {
      console.log("error");
      return { props: { error: true, messages } };
    }
  } catch (error) {
    console.log("error", error);
    return { props: { error: true, messages } };
  }
};
