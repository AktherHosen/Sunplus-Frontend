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
      <CarouselContent className="w-full  ml-0 ">
        {[Car1, Car2, Car3].map((img, idx) => (
          <CarouselItem key={idx} className="w-full ml-0 pl-0">
            <img
              src={img}
              alt={`Banner ${idx + 1}`}
              className="
                w-full 
                max-h-[450px] 
                object-cover 
                rounded-lg 
              "
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="bg-transparent border-none text-muted hover:text-primary" />
      <CarouselNext className="bg-transparent border-none text-muted hover:text-primary" />
    </Carousel>
  );
}
