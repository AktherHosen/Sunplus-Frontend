import Car1 from "@/assets/carousel/car1.png";
import Car2 from "@/assets/carousel/car2.png";
import Car3 from "@/assets/carousel/car3.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const banners = [Car1, Car2, Car3];

export default function Banner() {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="rounded-lg overflow-hidden">
        {banners.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full flex justify-center overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="bg-transparent border-none text-muted hover:text-primary" />
      <CarouselNext className="bg-transparent border-none text-muted hover:text-primary" />
    </Carousel>
  );
}
