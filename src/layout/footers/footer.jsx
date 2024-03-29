import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "@assets/img/logo/headerlogo.png";
import { Email, Location } from "@/svg";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";
import { Box } from "@mui/material";
import NRImage from "@/components/NRImage";

const Footer = ({ socialLinks }) => {
  const t = useTranslations("header");
  const authChecked = useAuthCheck();
  const [encodedAddress, setEncodedAddress] = useState("");
  useEffect(() => {
    const address = "NR Mobiles, Millat Road, Sandha, Lahore Pakistan.";
    setEncodedAddress(encodeURIComponent(address));
  }, []);
  return (
    <footer>
      <div className="primary_style pt-50">
        <div className="tp-footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-3 col-md-5 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-20">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Box
                          sx={{
                            height: 66,
                            width: 200,
                          }}
                        >
                          <NRImage
                            src={logo}
                            alt="Footer-logo"
                            ObjectFit="contain"
                          />
                        </Box>
                      </Link>
                    </div>
                    <p className="tp-footer-desc" style={{ fontSize: "14px" }}>
                      A Website where you can find the best quality products.
                      Which can help you in your daily life style.
                    </p>
                    <div className="tp-footer-social">
                      {socialLinks?.attributes?.facebookUrl && (
                        <Link
                          href={socialLinks?.attributes?.facebookUrl}
                          target="_blank"
                          aria-label="Facebook"
                        >
                          <i className="fa-brands fa-facebook-f" />
                        </Link>
                      )}
                      {socialLinks?.attributes?.instagramUrl && (
                        <Link
                          href={socialLinks?.attributes?.instagramUrl}
                          target="_blank"
                          aria-label="instagram"
                        >
                          <i className="fa-brands fa-instagram" />
                        </Link>
                      )}
                      {socialLinks?.attributes?.whatsappNumber && (
                        <Link
                          href={`https://wa.me/${socialLinks?.attributes.whatsappNumber}`}
                          target="_blank"
                          aria-label="whatsapp"
                        >
                          <i className="fa-brands fa-whatsapp" />
                        </Link>
                      )}
                      {socialLinks?.attributes?.youtubeUrl && (
                        <Link
                          href={socialLinks?.attributes?.youtubeUrl}
                          target="_blank"
                          style={{ marginTop: "5px" }}
                          aria-label="youtube"
                        >
                          <i className="fa-brands fa-youtube" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6">
                <div className="tp-footer-widget footer-col-2 pb-20">
                  <h4 className="tp-footer-widget-title">{t("My Account")}</h4>
                  <div
                    className="tp-footer-widget-content"
                    style={{
                      fontWeight: 600,
                      listStyle: "none",
                      lineHeight: "2.5",
                      fontFamily: "var(--tp-ff-roboto)",
                    }}
                  >
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("Cart")}</Link>
                      ) : (
                        <Link href="/cart">{t("Cart")}</Link>
                      )}
                    </div>
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("Wishlist")}</Link>
                      ) : (
                        <Link href="/wishlist">{t("Wishlist")}</Link>
                      )}
                    </div>
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("My Account")}</Link>
                      ) : (
                        <Link href="/profile">{t("My Account")}</Link>
                      )}
                    </div>
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("My Orders")}</Link>
                      ) : (
                        <Link href="/orders">{t("My Orders")}</Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 pb-20">
                  <h4 className="tp-footer-widget-title">{t("Information")}</h4>
                  <div
                    className="tp-footer-widget-content"
                    style={{
                      fontWeight: 600,
                      listStyle: "none",
                      lineHeight: "2.5",
                      fontFamily: "var(--tp-ff-roboto)",
                    }}
                  >
                    <div>
                      <Link href="/contact">{t("Contact Us")}</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-20">
                  <h4 className="tp-footer-widget-title">{t("Talk To Us")}</h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-15">
                      <span>{t("Got Questions? Call us")}</span>
                      <h4 className="pt-10">
                        <Link href="https://wa.me/+923160430485">
                          +92 316 0430485
                        </Link>
                      </h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content text-align-center">
                          <p>
                            <Link href="mailto:nrmobiles23@gmail.com">
                              nrmobiles23@gmail.com
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="tp-footer-copyright">
                    <p>
                      © {new Date().getFullYear()}{" "}
                      {t(
                        "All Rights Reserved by NR Mobiles & Accessories Company"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
