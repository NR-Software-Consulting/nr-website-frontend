import ApiError from "@/components/PageError";
import ImageSlider from "@/components/home/carousel/ImageSlider";
import Category from "@/components/home/catagory";
import DiscountsTag from "@/components/home/discounts";
import Heading from "@/components/home/heading";
import Layout from "@/components/layout";
import config, { mapSeoData } from "@/utlis/next-seo.config";
import { Box } from "@mui/material";
interface Props {
  seo: any;
  error: boolean;
}
const Home = ({ seo, error }: Props) => {
  return (
    <>
      {error === true ? (
        <Layout seo={config}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={config}>
          <Box sx={{ marginTop: "100px" }}>
            <ImageSlider />
            <DiscountsTag />
            <Heading title={"Category:"} />
            <Category />
            {/* <Heading title={"Hot Selling Products:"} /> */}
          </Box>
        </Layout>
      )}
    </>
  );
};
export default Home;
