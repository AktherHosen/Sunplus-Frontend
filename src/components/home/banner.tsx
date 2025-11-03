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

export default function Banner() {
  return (
    <Carousel
      className="w-full overflow-hidden rounded-lg"
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
    >
      <CarouselContent className="flex w-full rounded-lg">
        {/* First Banner */}
        <CarouselItem className="flex-shrink-0 w-full rounded-lg">
          <img
            src={Car1}
            alt="Banner 1"
            className="w-full max-h-[400px] object-cover rounded-lg"
          />
        </CarouselItem>

        {/* Second Banner */}
        <CarouselItem className="flex-shrink-0 w-full rounded-lg">
          <img
            src={Car2}
            alt="Banner 2"
            className="w-full max-h-[400px] object-cover rounded-lg"
          />
        </CarouselItem>

        {/* Third Banner */}
        <CarouselItem className="flex-shrink-0 w-full rounded-lg">
          <img
            src={Car3}
            alt="Banner 3"
            className="w-full max-h-[400px] object-cover rounded-lg"
          />
        </CarouselItem>
      </CarouselContent>

      {/* Navigation */}
      <CarouselPrevious className="bg-transparent border-none text-muted hover:text-primary" />
      <CarouselNext className="bg-transparent border-none text-muted hover:text-primary" />
    </Carousel>
  );
}
