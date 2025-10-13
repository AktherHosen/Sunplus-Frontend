import Banner from "@/components/home/banner";
import Categories from "@/components/home/categories";

const Home = () => {
  return (
    <div className="container mx-auto px-4 lg:px-0 py-2.5">
      <Banner /> <Categories />
    </div>
  );
};

export default Home;
