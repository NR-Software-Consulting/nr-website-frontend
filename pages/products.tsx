import Layout from "@/components/layout";
import config, { mapSeoData } from "@/utlis/next-seo.config";
import React from "react";
interface Props {
  seo: any;
  error: boolean;
}
const Products = ({ seo, error }: Props) => {
  return <Layout seo={config}></Layout>;
};

export default Products;
