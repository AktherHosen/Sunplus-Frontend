import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Quote } from "lucide-react";

export default function ChairmanMessagePage() {
  const membersRow1 = [
    {
      name: "Nur Mohammad Modhu",
      role: "Managing Director (MD)",
      image: "/images/nur-mohammad-modhu.jpg",
      message:
        "Our commitment to excellence drives SunPlus forward as we continue to innovate, grow, and deliver sustainable value.",
      activitiesTitle: "Key Positions & Activities",
      activities: [
        "Chairmen – MS Sunplus Electric Company Ltd.",
        "Co-Chairman – Electric and Electronics Merchandise Standing Committee (FBCCI)",
        "Co-Chairman – Bangladesh Kachamal Aratdar Malik Samity Standing Committee (FBCCI)",
        "Associate Member – Chattogram Chamber of Commerce and Industries",
        "Vice President – Bangladesh Dokan Malik Samity Central Committee, Dhaka",
        "Ex-President – Chattogram Boiddutic Soronghjam Bebosayee Group",
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

  const CardBox = ({ person, hasImage }: any) => (
    <Card className="border shadow-sm hover:shadow-md transition bg-white pt-0">
      {hasImage && (
        <div className="relative h-52 w-full overflow-hidden bg-muted">
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage
              loading="lazy"
              src={person.image}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="text-4xl">
              {person.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-xl font-bold">{person.name}</CardTitle>
        <div className="flex items-center gap-2 font-semibold text-primary">
          <Briefcase className="w-4 h-4" /> {person.role}
        </div>
      </CardHeader>

      <CardContent className="py-0!">
        {person.activities ? (
          <>
            <h4 className="font-semibold mb-2">{person.activitiesTitle}</h4>
            {/* <ScrollArea className="h-64 pr-2 border rounded-md p-3"> */}
            <ul className="space-y-2 text-sm">
              {person.activities.map((item: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {/* </ScrollArea> */}
          </>
        ) : (
          <div className="p-4 bg-muted rounded-md relative">
            <Quote className="absolute top-2 left-2 text-primary/30 w-5 h-5" />
            <p className="italic pl-6">{person.message}</p>
            <Quote className="absolute bottom-2 right-2 text-primary/30 w-5 h-5 rotate-180" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary/90 text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Leadership Team
        </h1>
        <p className="text-lg mt-2">
          The visionaries guiding{" "}
          <span className="font-bold">SunPlus Group</span>
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* MD */}
        <div className="max-w-4xl mx-auto">
          <CardBox person={membersRow1[0]} hasImage />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membersRow2.map((person, i) => (
            <CardBox key={i} person={person} hasImage />
          ))}
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {membersRow3.map((person, i) => (
            <CardBox key={i} person={person} hasImage={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
