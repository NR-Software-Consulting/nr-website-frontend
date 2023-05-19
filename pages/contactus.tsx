import Layout from "@/components/layout";
import config, { mapSeoData } from "@/utlis/next-seo.config";
import React from "react";
interface Props {
  seo: any;
  error: boolean;
}
const Contactus = ({ seo, error }: Props) => {
  return <Layout seo={config}>cdscdsvc</Layout>;
};

export default Contactus;
