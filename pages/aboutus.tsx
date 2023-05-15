import Layout from "@/components/layout";
import { mapSeoData } from "@/utlis/next-seo.config";
import React from "react";
interface Props {
  seo: any;
  error: boolean;
}
const Aboutus = ({ seo, error }: Props) => {
  return <Layout seo={mapSeoData(seo)}>cdscdsvc</Layout>;
};

export default Aboutus;
