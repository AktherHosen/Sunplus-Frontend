import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Circuit from "../../assets/img/circuit-breaker-3.jpg";
import Socket from "../../assets/img/socket.png";

const banners = [Socket, Circuit, "/images/banner3.jpg"];

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
                className="w-full h-[400px] object-cover rounded-lg transition-transform duration-700 ease-in-out"
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
