import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { notifySuccess } from "@/utils/toast";
import { CONTACT_US } from "@/graphql/mutation/contact";
import { useTranslations } from "next-intl";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import ErrorMsg from "../common/error-msg";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email")
    .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/gi, "Only number is allowed")
    .min(10),
  message: Yup.string().required("Message is required"),
});
const ContactForm = () => {
  const t = useTranslations("header");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [createContact, { loading, error }] = useMutation(CONTACT_US);
  const [phoneNumber, setPhoneNumber] = useState('')
  const onSubmit = async (data) => {
    try {
      await createContact({
        variables: {
          data: {
            name: data.name,
            email: data.email,
            phoneNumber: data.phone,
            message: data.message,
          },
        },
      });
      notifySuccess("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error while sending the message:", error);
    }
  };

  return (
    <div className="border tp-contact-inner rounded-3 p-3 p-lg-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-center">
          <h3 className="tp-contact-title fw-bolder">{t("Send a Message")}</h3>
        </div>
        <div className="mb-md-3 mb-2">
          <label
            htmlFor="name"
            className="form-label text-black fw-semibold p-0 m-0"
          >
            {t("Name")} <span className="text-danger">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            className={`form-control border-0 bg-light shadow-none ${errors.name ? "is-invalid" : ""
              }`}
            id="name"
            placeholder={t("Enter your Name")}
            aria-describedby="nameHelp"
            onChangeCapture={(e) => {
              setValue(
                "name",
                e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
              );
            }}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-md-3 mb-2">
          <label
            htmlFor="email"
            className="form-label text-black fw-semibold p-0 m-0"
          >
            {t("Email")} <span className="text-danger">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            className={`form-control border-0 bg-light shadow-none ${errors.email ? "is-invalid" : ""
              }`}
            id="email"
            placeholder={t("Enter Your Email")}
            aria-describedby="emailHelp"
            onChangeCapture={(e) => {
              setValue(
                "email",
                e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
              );
            }}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-md-3 mb-2">
          <div className="tp-checkout-input">
            <label
              htmlFor="phone"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Phone")} <span className="text-danger">*</span>
            </label>
            <IntlTelInput
              containerClassName={`intl-tel-input form-control border-0 bg-light p-1 ${errors.phone ? 'is-invalid' : ''}`}
              inputClassName="form-control shadow-none border-0 bg-light"
              type="text"
              id="phone"
              fieldName="phone"
              defaultCountry="sa"
              value={phoneNumber}
              placeholder={t("Enter your phone here")}
              onPhoneNumberChange={(isValid, value, selectedCountryData, fullNumber, countryData) => {
                let dialNumber = selectedCountryData?.dialCode
                let temp = value.trimStart()
                  .replace(/[^\d\s]/g, "").trim().replace(/^0+/, '')
                if (!temp) {
                  setPhoneNumber("")
                  setValue("phone", '');
                  return <ErrorMsg msg={errors?.phone?.message} />
                } else {
                  let concatenatedNumber = `${dialNumber}${temp}`;
                  setValue("phone", concatenatedNumber);
                  setPhoneNumber(temp)
                }
              }}
              {...register("phone", {
                required: t("Contact Number is required"),
              })}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone.message}</div>
            )}
          </div>
        </div>
        <div className="mb-md-3 mb-2">
          <label
            htmlFor="message"
            className="form-label text-black fw-semibold p-0 m-0"
          >
            {t("Message")} <span className="text-danger">*</span>
          </label>
          <textarea
            {...register("message")}
            className={`form-control border-0 bg-light shadow-none h-25 ${errors.message ? "is-invalid" : ""
              }`}
            placeholder={t("Write Your Message")}
            id="message"
            rows={5}
            onChangeCapture={(e) => {
              setValue(
                "message",
                e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
              );
            }}
          />
          {errors.message && (
            <div className="invalid-feedback">{errors.message.message}</div>
          )}
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
        )}
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            type="submit"
            className="btn btn-primary form-control py-md-3 py-2 shadow-none bg-primary text-white"
          >
            {loading ? t("Sending") + "..." : t("Send")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
