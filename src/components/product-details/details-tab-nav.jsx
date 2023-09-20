import React, { useRef, useEffect } from "react";
import ReviewForm from "../forms/review-form";
import ReviewItem from "./review-item";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DetailsTabNav = ({ product }) => {
  const { _id, reviews } = product || {};
  const activeRef = useRef(null);
  const marker = useRef(null);
  const t = useTranslations("header");
  const handleActive = (e) => {
    if (e.target.classList.contains("active")) {
      marker.current.style.left = e.target.offsetLeft + "px";
      marker.current.style.width = e.target.offsetWidth + "px";
    }
  };
  useEffect(() => {
    if (activeRef.current?.classList.contains("active")) {
      marker.current.style.left = activeRef.current.offsetLeft + "px";
      marker.current.style.width = activeRef.current.offsetWidth + "px";
    }
  }, []);
  // nav item
  function NavItem({ active = false, id, title, linkRef }) {
    return (
      <button
        ref={linkRef}
        className={`nav-link ${active ? "active" : ""}`}
        id={`nav-${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#nav-${id}`}
        type="button"
        role="tab"
        aria-controls={`nav-${id}`}
        aria-selected={active ? "true" : "false"}
        tabIndex="-1"
        onClick={(e) => handleActive(e)}
      >
        {title}
      </button>
    );
  }

  return (
    <>
      <div className="tp-product-details-tab-nav tp-tab">
        <nav>
          <div
            className="nav nav-tabs d-flex justify-content-evenly p-relative tp-product-tab"
            id="navPresentationTab"
            role="tablist"
          >
            <NavItem
              active={true}
              linkRef={activeRef}
              id="desc"
              title={t("Description")}
            />
            <span
              ref={marker}
              id="productTabMarker"
              className="tp-product-details-tab-line"
            ></span>
          </div>
        </nav>
        <div className="tab-content" id="navPresentationTabContent">
          {/* nav-desc */}
          <div
            className="tab-pane fade show active"
            id="nav-desc"
            role="tabpanel"
            aria-labelledby="nav-desc-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-desc-wrapper pt-60">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-product-details-desc-item">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="tp-product-details-desc-content">
                          {product[0]?.attributes?.description?.length > 0 ? (
                            <ReactMarkdown
                              children={product[0]?.attributes?.description}
                              remarkPlugins={[remarkGfm]}
                              className="markdown"
                              components={{
                                h1: ({ node, ...props }) => (
                                  <h1
                                    style={{ fontSize: "32px", color: "black" }}
                                    {...props}
                                  />
                                ),
                                h2: ({ node, ...props }) => (
                                  <h2
                                    style={{ fontSize: "20px", color: "black" }}
                                    {...props}
                                  />
                                ),
                                h3: ({ node, ...props }) => (
                                  <h3
                                    style={{ fontSize: "24px", color: "black" }}
                                    {...props}
                                  />
                                ),
                                h4: ({ node, ...props }) => (
                                  <h4
                                    style={{ fontSize: "20px", color: "black" }}
                                    {...props}
                                  />
                                ),
                                h5: ({ node, ...props }) => (
                                  <h5
                                    style={{ fontSize: "18px", color: "black" }}
                                    {...props}
                                  />
                                ),
                                h6: ({ node, ...props }) => (
                                  <h6
                                    style={{ fontSize: "18px", color: "black" }}
                                    {...props}
                                  />
                                ),
                                p: ({ node, ...props }) => (
                                  <p
                                    style={{ fontSize: "16px", color: "black" }}
                                    {...props}
                                  />
                                ),
                                ul: ({ node, ...props }) => (
                                  <p
                                    style={{ fontSize: "16px", color: "black" }}
                                    fontWeight={"400"}
                                    {...props}
                                  />
                                ),
                              }}
                            />
                          ) : (
                            "No Description"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTabNav;
