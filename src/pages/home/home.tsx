import Banner from "@/components/home/banner";
import Categories from "@/components/home/categories";
import Features from "@/components/home/features";
import LatestProducts from "@/components/home/latestProducts";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Sunplus - Home</title>
        <meta
          name="description"
          content="Discover the latest electrical products and solutions at Sunplus, Bangladesh's #1 electrical brand. Shop now for quality and reliability."
        />
      </Helmet>

      <div className="container mx-auto px-4 lg:px-0 py-6 space-y-12">
      <Banner />

      <section>
        <Categories />
      </section>

      <section>
        <LatestProducts />
      </section>

      <section>
        <Features/>
      </section>
    </div>
    </>
    
  );
};

export default Home;
