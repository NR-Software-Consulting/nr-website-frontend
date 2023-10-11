import React, { useEffect, useRef, useState } from "react";
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
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
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
      <Grid
        container
        item
        xs={12}
        sx={{
          padding: { xs: "20px 0px 20px 0px", lg: "50px 0px 50px 0px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={11}
          lg={10}
          sx={{
            border: "1px solid #90cbaf",
            borderRadius: "5px",
            backgroundColor: "#d1e7de",
            padding: "15px",
          }}
        >
          <Typography fontSize={"14px"} sx={{ color: "black" }}>
            {t("Thank you")} <strong>{Name}</strong>{" "}
            {t("Your order have been received")}
          </Typography>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "40px",
          }}
          ref={printRef}
        >
          <Grid
            container
            item
            xs={11}
            lg={10}
            sx={{
              border: "1px solid #dee2e6",
              padding: "40px 20px 40px 20px",
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Grid container sx={{ marginBottom: "40px" }}>
              <Grid item xs={12} sm={9.5} md={10} lg={10.6}>
                <Box sx={{ height: 70, width: 220 }}>
                  <NRImage src={logo} alt="logo" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={2.5} md={2} lg={1.4}>
                <Typography
                  fontSize={"40px"}
                  fontWeight={700}
                  sx={{ color: "black" }}
                >
                  {t("Invoice")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{ paddingBottom: "10px" }}>
                <Typography fontSize={"24px"} sx={{ color: "black" }}>
                  {Name}
                </Typography>
              </Grid>
              <Grid container item xs={12} sm={6}>
                <Grid item xs={12}>
                  <Typography sx={{ color: "black" }}>
                    <strong>{t("Invoice ID")}:</strong> {id}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: "black" }}>
                    <strong>{t("Contact")}:</strong> +{phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: "black" }}>
                    <strong>{t("Address")}:</strong> {address.slice(0, 90)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={6}
                sx={{ textAlign: { sm: "end" } }}
              >
                <Grid item xs={12}>
                  <Typography sx={{ color: "black" }}>
                    <strong>{t("City")}:</strong> {city}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: "black" }}>
                    <strong>{t("Country")}:</strong> {country}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: "black" }}>
                    <strong>{t("Date")}:</strong>{" "}
                    {dayjs(publishedAt).format("MMMM D, YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                padding: "30px 0px 30px 0px",
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#f8f9fa",
                  padding: "0.5rem",
                }}
              >
                <Grid
                  item
                  sm={0.5}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {"No."}
                  </Typography>
                </Grid>
                <Grid item sm={5} lg={6}>
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Product Name")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={1.1}
                  md={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Quantity")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={1.9}
                  lg={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Item Price")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={1.1}
                  md={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Discount")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={1.5}
                  lg={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Amount")}
                  </Typography>
                </Grid>
              </Grid>
              <Divider
                sx={{
                  border: "1px solid",
                  width: "100%",
                  opacity: 1,
                }}
              />
              {products.map((item, i) => (
                <Grid
                  container
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    justifyContent: "space-between",
                    padding: "0.5rem",
                  }}
                >
                  <Grid
                    item
                    sm={0.5}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>{i + 1}</Typography>
                  </Grid>
                  <Grid item sm={5} lg={6}>
                    <Typography sx={{ color: "black" }}>
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={1.1}
                    md={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={1.9}
                    lg={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      PKR {item.price}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={1.1}
                    md={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      {item.discount || 0}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={1.5}
                    lg={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "black" }}>
                      PKR{" "}
                      {(
                        (item.price - (item.price * item.discount) / 100) *
                        item.quantity
                      ).toFixed(0)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              sx={{
                padding: "30px 0px 30px 0px",
                display: { xs: "flex", sm: "none" },
              }}
            >
              <Grid container item xs={4}>
                <Grid item xs={12}>
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {"No."}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Product Name")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Quantity")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Item Price")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Discount")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight={700} sx={{ color: "black" }}>
                    {t("Amount")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                {products.map((item, i) => (
                  <Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "black" }}>{i + 1}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "black" }}>
                        {item.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "black" }}>
                        {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "black" }}>
                        PKR {item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "black" }}>
                        {item.discount || 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "black" }}>
                        PKR{" "}
                        {(
                          (item.price - (item.price * item.discount) / 100) *
                          item.quantity
                        ).toFixed(0)}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", marginBottom: "40px" }}>
              <Typography sx={{ color: "black" }}>
                <strong>Note:</strong>
              </Typography>
              <Typography>
                {"Your Order will be Delivered in 3 - 4 Bussiness Days."}
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Typography
                  fontSize={"20px"}
                  fontWeight={700}
                  sx={{ color: "black" }}
                >
                  {t("Payment Method")}
                </Typography>
                <Typography sx={{ color: "black" }}>COD</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  fontSize={"20px"}
                  fontWeight={700}
                  sx={{
                    color: "black",
                    display: "flex",
                    justifyContent: { xs: "start", sm: "center" },
                  }}
                >
                  {"Shipping Charges"}
                </Typography>
                <Typography
                  fontWeight={700}
                  sx={{
                    color: "#DC3545",
                    display: "flex",
                    justifyContent: { xs: "start", sm: "center" },
                  }}
                >
                  PKR {parseInt(shippingCost).toFixed(2) || "0.00"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  fontSize={"20px"}
                  fontWeight={700}
                  sx={{
                    color: "black",
                    display: "flex",
                    justifyContent: { xs: "start", sm: "end" },
                  }}
                >
                  {t("Total Ammount")}
                </Typography>
                <Typography
                  fontWeight={700}
                  sx={{
                    color: "#DC3545",
                    display: "flex",
                    justifyContent: { xs: "start", sm: "end" },
                  }}
                >
                  PKR{" "}
                  {(parseFloat(total) + parseFloat(shippingCost)).toFixed(2) ||
                    "0.00"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            xs={11}
            lg={10}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <ReactToPrint
              trigger={() => (
                <Button
                  type="button"
                  className="tp-invoice-print tp-btn tp-btn-black"
                >
                  <span className="mr-5">
                    <i className="fa-regular fa-print"></i>
                  </span>{" "}
                  {t("Print")}
                </Button>
              )}
              content={() => printRef.current}
              documentTitle={id}
            />
          </Grid>
        </Grid>
      </Grid>
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
