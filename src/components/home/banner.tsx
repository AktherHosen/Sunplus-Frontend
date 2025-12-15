import Car1 from "@/assets/carousel/mk.png";
import Car2 from "@/assets/carousel/flora.png";
import Car3 from "@/assets/carousel/floracoffee.png";
import Car4 from "@/assets/carousel/ultrathin.png";
import Car5 from "@/assets/carousel/crowngrey.png";
import Car6 from "@/assets/carousel/crownwhite.png";
import Car7 from "@/assets/carousel/platinum.png";
import Car8 from "@/assets/carousel/goldplatinum.png";
import Car9 from "@/assets/carousel/deluxcoffee.png";
import Car10 from "@/assets/carousel/deluxgold.png";
import Car11 from "@/assets/carousel/whitevip.png";
import Car12 from "@/assets/carousel/circuitbreaker.png";
import Car13 from "@/assets/carousel/ips.png";
import Car14 from "@/assets/carousel/diamondled.png";
import Car15 from "@/assets/carousel/dbbox.png";
import Car16 from "@/assets/carousel/fan.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Banner() {
  const images = [
    Car1,
    Car2,
    Car13,
    Car3,
    Car4,
    Car14,
    Car5,
    Car6,
    Car7,
    Car15,
    Car8,
    Car9,
    Car16,
    Car10,
    Car11,
    Car12,
  ];

  return (
    <Carousel
      className="w-full overflow-hidden rounded-lg"
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}>
      <CarouselContent className="flex w-full ml-0 gap-0">
        {images.map((img, index) => (
          <CarouselItem key={index} className="flex-shrink-0 w-full ml-0 pl-0">
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full max:h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
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
