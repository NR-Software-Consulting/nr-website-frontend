import ApiError from "@/components/PageError";
import Layout from "@/components/layout";
import config, { mapSeoData } from "@/utlis/next-seo.config";
import React from "react";
interface Props {
  seo: any;
  error: boolean;
}
const Contactus = ({ seo, error }: Props) => {
  return (
    <>
      {error === true ? (
        <Layout seo={config}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={config}></Layout>
      )}
    </>
  );
};

export default Contactus;
