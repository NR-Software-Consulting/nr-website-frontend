import ApiError from "@/components/PageError";
import Layout from "@/components/layout";
import config, { mapSeoData } from "@/utlis/next-seo.config";
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
        <Layout seo={config}>{/* <Progressbar /> */}</Layout>
      )}
    </>
  );
};
export default Home;
