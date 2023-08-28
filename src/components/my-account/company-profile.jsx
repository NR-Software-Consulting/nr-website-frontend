import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";
import {
  UPDATE_COMPANY_PROFILE,
  UPLOAD_PROFILE_IMAGE,
} from "@/graphql/mutation/auth";
import { useMutation } from "@apollo/client";
import { getCookie, setCookie } from "cookies-next";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { uploadFileClient } from "@/graphql/apollo-client";
import IntlTelInput from "react-intl-tel-input";
import 'react-intl-tel-input/dist/main.css';

const schema = Yup.object().shape({
  companyName: Yup.string().label("Company Name").required(),
  crNumber: Yup.string().label("CR Number").required(),
  taxNumber: Yup.string().label("Tax Number").required(),
  email: Yup.string()
    .email()
    .label("Email")
    .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
  phoneNumber: Yup.string().label("Phone").required().min(7),
  shipping_address: Yup.string().label("Address").required(),
});
const CompanyProfile = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const t = useTranslations("header");
  const [updateProfile, { error, data: userProfile, loading }] = useMutation(
    UPDATE_COMPANY_PROFILE
  );
  const selectedCountryRef = useRef(null);

  const [profileImage, setProfileImage] = useState({
    id: data?.attributes.profile_image?.data?.id,
    url: data?.attributes.profile_image?.data?.attributes?.url,
  });
  const token = getCookie("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userProfile || loading) {
      return;
    }
    const userInfo = JSON.parse(getCookie("userInfo"));
    let userData = {
      ...userInfo,
      name: userProfile?.updateCompanyProfile?.data?.attributes?.companyName,
      profile_image:
        userProfile?.updateCompanyProfile?.data?.attributes.profile_image.data.attributes,
      company_profile: {
        ...userProfile?.updateCompanyProfile?.data?.attributes,
        id: userProfile?.updateCompanyProfile?.data.id,
        profile_image:
          userProfile?.updateCompanyProfile?.data?.attributes.profile_image.data.attributes,
      },
    };
    dispatch(
      userLoggedIn({
        accessToken: token,
        user: userData,
      })
    );
    setCookie("userInfo", userData);
  }, [userProfile, loading]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: data?.attributes?.companyName,
      crNumber: data?.attributes?.CRNumber,
      taxNumber: data?.attributes?.taxNumber,
      phoneNumber: data?.attributes?.phoneNumber,
      shipping_address: data?.attributes?.shipping_address,
      profile_image: data?.attributes.profile_image?.data?.attributes?.url,
    },
  });

  const [uploading, setUploading] = useState(false);
  const onUploadImage = async ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    try {
      setUploading(true);
      let response = await uploadFileClient.mutate({
        mutation: UPLOAD_PROFILE_IMAGE,
        variables: { file },
      });
      setProfileImage({
        id: response?.data?.upload?.data?.id,
        url: response?.data?.upload?.data?.attributes?.url,
      });
    } finally {
      setUploading(false);
    }
  };
  const onSubmit = async (data) => {
    const selectedCountryData = selectedCountryRef.current;

    try {
      await updateProfile({
        variables: {
          data: {
            CRNumber: data?.crNumber,
            companyName: data?.companyName,
            taxNumber: data?.taxNumber,
            calling_code: selectedCountryData?.dialCode,
            country_code: selectedCountryData?.iso2,
            phoneNumber: data?.phoneNumber,
            shipping_address: data?.shipping_address,
            profile_image: profileImage.id,
          },
          updateCompanyProfileId: user?.company_profile?.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      notifySuccess("Profile Updated successfully!");
    } catch (error) {
      console.error("Error while sending the message:", error);
      notifyError("Unable to Update Profile!");
    }
  };

  return (
    <div className="profile__info">
      <h3 className="profile__info-title">{t("Personal Details")}</h3>
      <div className="profile__info-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="mb-10 d-flex flex-column justify-content-center align-items-center">
              {uploading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  {profileImage?.url && (
                    <img
                      src={profileImage.url}
                      alt="Uploaded Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </>
              )}
              <input
                name="profile_image"
                type="file"
                accept=".png, .jpg, jpeg"
                onChangeCapture={onUploadImage}
                {...register("profile_image")}
              />
              <ErrorMsg msg={errors.profile_image?.message} />
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Company Name")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    {...register("companyName")}
                    name="companyName"
                    type="text"
                    placeholder="Enter your Company Name"
                    onChangeCapture={(e) => {
                      setValue(
                        "companyName",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.companyName?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Email")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    disabled
                    placeholder="Enter your email"
                    defaultValue={user?.email}
                    onChangeCapture={(e) => {
                      setValue(
                        "email",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.email?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("CR Number")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="crNumber"
                    type="number"
                    placeholder="Enter your CR Number"
                    {...register("crNumber")}
                    onChangeCapture={(e) => {
                      setValue(
                        "crNumber",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.crNumber?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Tax Number")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="taxNumber"
                    type="number"
                    placeholder="Enter your Tax Number"
                    {...register("taxNumber")}
                    onChangeCapture={(e) => {
                      setValue(
                        "taxNumber",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.taxNumber?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Phone Number")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <IntlTelInput
                    containerClassName={`intl-tel-input form-control   ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    inputClassName="form-control shadow-none border-0 "
                    id="phoneNumber"
                    fieldName="phoneNumber"
                    defaultCountry={`${data.attributes.country_code}`}
                    defaultValue={`${data.attributes.phoneNumber}`}
                    ref={selectedCountryRef}
                    onPhoneNumberChange={(isValid, value, selectedCountryData, fullNumber, countryData) => {
                      setValue("phoneNumber", value);
                      selectedCountryRef.current = selectedCountryData;
                    }}
                    {...register("phoneNumber")}

                  />
                  {/* <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter your number"
                    {...register("phoneNumber")}
                    onChangeCapture={(e) => {
                      setValue(
                        "phoneNumber",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                          .replace(/[^\d\s+]/g, "")
                      );
                    }}
                  /> */}
                  <ErrorMsg msg={errors.phoneNumber?.message} />
                </div>
              </div>
            </div>

            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Address")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    name="shipping_address"
                    type="text"
                    placeholder="Enter your address"
                    {...register("shipping_address")}
                    onChangeCapture={(e) => {
                      setValue(
                        "shipping_address",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />

                  <ErrorMsg msg={errors.shipping_address?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile__btn">
                <button type="submit" className="tp-btn" disabled={loading}>
                  {loading ? t("loading") + "..." : t("Update Profile")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
