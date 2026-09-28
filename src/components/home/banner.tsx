import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useGetAllBannersQuery } from "@/redux/api/baseApi";

// Fallback static images
import Car1 from "@/assets/carousel/mk.png";
import Car2 from "@/assets/carousel/flora.png";
import Car3 from "@/assets/carousel/floracoffee.png";

export default function Banner() {
  const { data, isLoading } = useGetAllBannersQuery(undefined);

  if (isLoading) {
    return <div className="w-full h-[200px] md:h-[400px] flex items-center justify-center bg-muted rounded-lg">Loading banners...</div>;
  }

  const banners = data?.data || [];

  // Use uploaded banners or fallback to static images
  const displayBanners = banners.length > 0
    ? banners.map((b: any) => ({ _id: b._id, image: `${import.meta.env.VITE_API_URL}${b.image}` }))
    : [
      { _id: 'fallback-1', image: Car1 },
      { _id: 'fallback-2', image: Car2 },
      { _id: 'fallback-3', image: Car3 },
    ];

  return (
    <Carousel
      className="w-full overflow-hidden rounded-lg"
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
    >
      <CarouselContent className="flex w-full ml-0 gap-0">
        {displayBanners.map((banner: any, index: number) => (
          <CarouselItem key={banner._id} className="flex-shrink-0 w-full ml-0 pl-0">
            <img
              src={banner.image}
              alt={`Banner ${index + 1}`}
              className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation */}
      <CarouselPrevious className="bg-transparent border-none text-muted hover:text-primary" />
      <CarouselNext className="bg-transparent border-none text-muted hover:text-primary" />
    </Carousel>
  );
}
