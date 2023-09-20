import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@assets/img/logo/headerlogo.png";
import pay from "@assets/img/footer/footer-pay.png";
import { Email, Location } from "@/svg";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";

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
      <div className="primary_style pt-100">
        <div className="tp-footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-3 col-md-5 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-20">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Image
                          src={logo}
                          alt="logo"
                          style={{
                            height: 45,
                            width: 155,
                          }}
                        />
                      </Link>
                    </div>
                    <p className="tp-footer-desc">
                      {t(
                        "Elevate Your Workspace: Where Office Efficiency Meets Quality Excellence"
                      )}
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
                      {socialLinks?.attributes?.linkedInUrl && (
                        <Link
                          href={socialLinks?.attributes?.linkedInUrl}
                          target="_blank"
                          aria-label="linkedin"
                        >
                          <i className="fa-brands fa-linkedin-in" />
                        </Link>
                      )}
                      {socialLinks?.attributes?.pinterestUrl && (
                        <Link
                          href={socialLinks?.attributes?.pinterestUrl}
                          target="_blank"
                          aria-label="pintrest"
                        >
                          <i className="fa-brands fa-pinterest" />
                        </Link>
                      )}
                      {socialLinks?.attributes?.twitterUrl && (
                        <Link
                          href={socialLinks?.attributes?.twitterUrl}
                          target="_blank"
                          aria-label="twitter"
                        >
                          <i className="fa-brands fa-twitter" />
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
                      <Link href="/privacy-policy">{t("Privacy Policy")}</Link>
                    </div>
                    <div>
                      <Link href="./terms-and-condition">
                        {t("Terms & Conditions")}
                      </Link>
                    </div>
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
                        <Link href="tel:923160430485">+92 316 0430485</Link>
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
                      <div className="tp-footer-contact-item d-flex align-items-center text-align-center">
                        <div className="tp-footer-contact-icon">
                          <span>
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p className="mb-0">
                            <Link
                              href={"https://maps.app.goo.gl/m5BARCbA3v4AB2ym7"}
                              target="_blank"
                              className="list-group-item list-group-item-action d-flex gap-3"
                              aria-current="true"
                            >
                              NR Mobiles, Millat Road, Sandha, Lahore Pakistan.
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
