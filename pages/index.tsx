import ApiError from "@/components/PageError";
import Progressbar from "@/components/ProgressBar/Progressbar";
import Layout from "@/components/layout";
import { mapSeoData } from "@/utlis/next-seo.config";
interface Props {
  seo: any;
  error: boolean;
}
const Home = ({ seo, error }: Props) => {
  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={mapSeoData(seo)}>
          <Progressbar />
        </Layout>
      )}
    </>
  );
};
export default Home;
