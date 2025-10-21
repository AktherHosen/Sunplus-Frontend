import Banner from "@/components/home/banner";
import Categories from "@/components/home/categories";
import LatestProducts from "@/components/home/latestProducts";

const Home = () => {
  return (
    <div className="container mx-auto px-4 lg:px-0 py-6 space-y-12">
      <Banner />

      <section>
        <Categories />
      </section>

      <section>
        <LatestProducts />
      </section>
    </div>
  );
};

export default Home;
