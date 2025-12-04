import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, Quote } from "lucide-react";
import { useState } from "react";

export default function ChairmanMessagePage() {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const membersRow1 = [
    {
      name: "Nur Mohammad Modhu",
      role: "Managing Director (MD)",
      image: "/images/nur-mohammad-modhu.jpg",
      message:
        "Our commitment to excellence drives SunPlus forward as we continue to innovate, grow, and deliver sustainable value.",
      activitiesTitle: "Key Positions & Activities",
      activities: [
        "Managing Director – Sunplus Electrical Equipments Manufacturing Company Ltd.",
        "Co-Chairman – Electric and Electronics Merchandise Standing Committee (FBCCI)",
        "Co-Chairman – Bangladesh Kachamal Aratdar Malik Samity Standing Committee (FBCCI)",
        "Associate Member – Chattogram Chamber of Commerce and Industries",
        "Vice President – Bangladesh Dokan Malik Samity Central Committee, Dhaka",
        "Ex-President – Chattogram Boiddutic Sorongham Bebosayee Group",
        "Director – Sea Food Export Buying Agent's Association of Bangladesh",
        "Member – Bangladesh Electrical Association, Nawabpur Road, Dhaka",
        "Vice President – Bangladesh Dokan Malik Samity, Chattogram City",
        "Co-Chairman – Bebosayee Jagroto Jonotha Foundation, Central Committee, Dhaka",
        "Vice President – Bangladesh Information and Human Rights, Chattogram City",
        "General Body Member – Federation of Bangladesh Chamber of Commerce and Industries (FBCCI)",
        "Ex-President – Kader Tower Babosayee Kallan Samity",
        "Ex-Secretary – Chattogram Electrical Import & Export Association",
        "Advancer – Gurdian Forum, Chattogram",
        "Chairman – Paira Dairy Firm",
        "Ex-President – Moddom Shikolbaha Govt. Primary School Management Committee",
      ],
    },
  ];

  const membersRow2 = [
    {
      name: "Anowar Hossain Manik",
      role: "Deputy Managing Director (DMD)",
      image: "/images/anowar-hossain-manik.jpg",
      message: "Working together to build a stronger, smarter organization.",
    },
    {
      name: "Shadat Hossain Sagor",
      role: "Director",
      image: "/images/shadat-hossain-sagor.jpg",
      message: "Dedicated to ensuring progress with integrity and vision.",
    },
    {
      name: "Mohiuddin Turjo",
      role: "General Manager (GM)",
      image: "/images/mohiuddin-turjo.jpg",
      message: "Leading teams to achieve operational excellence every day.",
    },
  ];

  const membersRow3 = [
    {
      name: "Jane Alam",
      role: "Senior Manager",
      message: "Focused on delivering consistent quality and performance.",
    },
    {
      name: "Minar Mishu",
      role: "Senior HR Officer",
      message: "Committed to building a motivated and empowered workforce.",
    },
  ];

  const CardBox = ({ person, index, hasImage }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Card className="group h-full hover:shadow-lg border py-0 border-border overflow-hidden relative bg-background transition-all duration-500">
        {/* Image Section */}
        {hasImage && person.image && (
          <div className="relative w-full overflow-hidden bg-muted  h-48 sm:h-56 md:h-64">
            {!imageError[person.name] ? (
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={() =>
                  setImageError({ ...imageError, [person.name]: true })
                }
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg">
                    {person.name.charAt(0)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <CardContent className="p-4 sm:p-6 flex flex-col">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {person.name}
            </h3>
            <div className="flex items-center gap-2 text-primary font-medium">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm sm:text-base">{person.role}</span>
            </div>
          </div>

          {person.activities ? (
            <div className="flex-1">
              <h4 className="text-sm sm:text-base font-semibold text-foreground mb-3 flex items-center gap-2 pb-2 border-b border-border">
                📋 {person.activitiesTitle}
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-foreground/80 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {person.activities.map((item: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 hover:bg-primary/10 p-1 sm:p-2 rounded-md transition-colors duration-200"
                  >
                    <span className="text-primary mt-1 font-bold min-w-[6px]">
                      •
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ) : person.message ? (
            <div className="flex-1">
              <div className="relative p-4 sm:p-6 rounded-md bg-muted">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/30" />
                <p className="text-sm sm:text-base italic text-foreground/90 pl-4 sm:pl-6">
                  "{person.message}"
                </p>
                <Quote className="absolute -bottom-1 -right-1 w-6 h-6 text-primary/30 rotate-180" />
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold"
          >
            Leadership Team
          </motion.h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            The visionaries guiding{" "}
            <span className="font-bold">SunPlus Group</span> toward innovation
            and excellence.
          </p>
        </div>
      </div>

      {/* Leadership Grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-12">
        {/* Managing Director */}
        <div className="max-w-5xl mx-auto">
          {membersRow1.map((person, index) => (
            <CardBox key={index} person={person} index={index} hasImage />
          ))}
        </div>

        {/* Deputy MD, Director, GM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membersRow2.map((person, index) => (
            <CardBox key={index} person={person} index={index} hasImage />
          ))}
        </div>

        {/* Senior Managers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {membersRow3.map((person, index) => (
            <CardBox
              key={index}
              person={person}
              index={index}
              hasImage={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
