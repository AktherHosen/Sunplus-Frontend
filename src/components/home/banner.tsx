import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Socket from "../../assets/img/socket.png";
import Circuit from "../../assets/img/circuit-breaker-3.jpg";

const banners = [Socket, Circuit, "/images/banner3.jpg"];

export default function Banner() {
  return (
    <Carousel
      className="w-full "
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="rounded-xl ">
        {banners.map((src, index) => (
          <CarouselItem key={index} className="rounded-xl ">
            <div className="relative w-full flex justify-center overflow-hidden">
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
