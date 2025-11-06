import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText } from "lucide-react";

const mediaArticles = [
  {
    title: "SunPluS Launches New Smart Switches",
    description: "Our latest smart electrical switches are designed to make homes smarter, safer, and more energy-efficient.",
    image: "/images/media/smart-switches.jpg",
    date: "2025-09-01",
  },
  {
    title: "Awarded Best Electrical Brand 2025",
    description: "SunPluS recognized for innovation, quality, and customer satisfaction at the annual Electrical Excellence Awards.",
    image: "/images/media/brand-award.jpg",
    date: "2025-08-15",
  },
];

const events = [
  {
    title: "SunPluS Tech Expo 2025",
    description: "Join us for a showcase of the latest innovations in electrical solutions and smart home technologies.",
    image: "/images/events/tech-expo.jpg",
    date: "2025-11-10",
    location: "Dhaka International Convention Center",
  },
  {
    title: "Sustainability Workshop",
    description: "A seminar on sustainable manufacturing and eco-friendly electrical solutions led by our experts.",
    image: "/images/events/sustainability.jpg",
    date: "2025-12-05",
    location: "SunPluS HQ, Dhaka",
  },
];

export default function MediaEventsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Media & <span className="text-primary">Events</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Stay up-to-date with the latest news, press releases, and upcoming events from SunPluS.
          </p>
        </div>

        <Separator className="bg-primary/20 mb-12" />

        {/* Media Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <FileText className="text-primary w-6 h-6" /> Latest Media
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaArticles.map((article) => (
              <Card
                key={article.title}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-white/90 backdrop-blur-sm"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <CardContent className="p-6">
                  <CardTitle className="text-lg font-semibold text-gray-800">{article.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed mb-3">{article.description}</CardDescription>
                  <div className="flex items-center text-gray-500 text-xs gap-2">
                    <Calendar className="w-4 h-4" /> {new Date(article.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Calendar className="text-primary w-6 h-6" /> Upcoming Events
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card
                key={event.title}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-white/90 backdrop-blur-sm"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <CardContent className="p-6">
                  <CardTitle className="text-lg font-semibold text-gray-800">{event.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed mb-3">{event.description}</CardDescription>
                  <div className="flex flex-col gap-1 text-gray-500 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" /> {event.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
