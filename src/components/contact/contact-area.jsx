import React from "react";
import ContactForm from "../forms/contact-form";
import { useTranslations } from "next-intl";
import useLoadingState from "@/hooks/use-loading";
import SearchPrdLoader from "../loader/search-prd-loader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
const ContactArea = (props) => {
  const t = useTranslations("header");
  const { attributes: { Address, email, phoneNumber } = {} } = props;
  const loading = useLoadingState();
  return (
    <>
      {loading ? (
        <div>
          <SearchPrdLoader />
        </div>
      ) : (
        <section className="tp-contact-area pb-50 pt-50">
          <div className="container">
            <div className="">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-contact-wrapper">
                    <h3
                      className="tp-contact-title"
                      style={{ fontSize: "44px" }}
                    >
                      {t("Contact Us")}
                    </h3>
                    <div className="tp-contact-form">
                      <p className="fs-6 py-3">{t("description")}</p>
                      <>
                        <div className="">
                          <a
                            href={`tel:${phoneNumber}`}
                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                            aria-current="true"
                          >
                            <CallIcon
                              sx={{ color: "var(--tp-theme-primary)" }}
                            />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div>
                                <h6 className="mb-0">Phone Number</h6>
                                <p className="mb-0 ">{phoneNumber}</p>
                              </div>
                            </div>
                          </a>
                          <a
                            href={`mailto:${email}`}
                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                            aria-current="true"
                          >
                            <EmailIcon
                              sx={{ color: "var(--tp-theme-primary)" }}
                            />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div>
                                <h6 className="mb-0">Email</h6>
                                <p className="mb-0 ">{email}</p>
                              </div>
                            </div>
                          </a>
                          <a
                            href={`https://www.google.com/maps/place/${encodeURIComponent(
                              Address
                            )}`}
                            target="_blank"
                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                            aria-current="true"
                          >
                            <LocationOnIcon
                              sx={{ color: "var(--tp-theme-primary)" }}
                            />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div>
                                <h6 className="mb-0">Address</h6>
                                <p className="mb-0 ">{Address}</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-contact-wrapper">
                    <div className="tp-contact-form">
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactArea;
