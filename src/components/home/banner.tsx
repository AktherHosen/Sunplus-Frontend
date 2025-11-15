import Car1 from "@/assets/carousel/car1.png";
import Car2 from "@/assets/carousel/car2.png";
import Car3 from "@/assets/carousel/car3.png";
import Car4 from "@/assets/carousel/car4.png";
import Car5 from "@/assets/carousel/car5.png";
import Car6 from "@/assets/carousel/car6.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Banner() {
  return (
    <Carousel
      className="w-full overflow-hidden rounded-lg "
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
    >
      <CarouselContent className="flex w-full  ml-0 gap-0">
        <CarouselItem className="flex-shrink-0 w-full ml-0 pl-0">
          <img
            src={Car1}
            alt="Banner 1"
            className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
          />
        </CarouselItem>
        <CarouselItem className="flex-shrink-0 w-full pl-0 ml-0">
          <img
            src={Car2}
            alt="Banner 2"
            className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
          />
        </CarouselItem>
        <CarouselItem className="flex-shrink-0 w-full pl-0 ml-0">
          <img
            src={Car3}
            alt="Banner 3"
            className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
          />
        </CarouselItem>
        <CarouselItem className="flex-shrink-0 w-full pl-0 ml-0">
          <img
            src={Car4}
            alt="Banner 4"
            className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
          />
        </CarouselItem>
        <CarouselItem className="flex-shrink-0 w-full pl-0 ml-0">
          <img
            src={Car5}
            alt="Banner 5"
            className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
          />
        </CarouselItem>
        <CarouselItem className="flex-shrink-0 w-full pl-0 ml-0">
          <img
            src={Car6}
            alt="Banner 6"
            className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
          />
        </CarouselItem>
      </CarouselContent>

      {/* Navigation */}
      <CarouselPrevious className="bg-transparent border-none text-muted hover:text-primary" />
      <CarouselNext className="bg-transparent border-none text-muted hover:text-primary" />
    </Carousel>
  );
}
