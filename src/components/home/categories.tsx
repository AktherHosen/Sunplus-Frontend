import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router";
import GangSwitch from "../../assets/img/gangswitchs.jpg";
const categoryImages = {
  "gang-switches": GangSwitch,
};

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  if (!categories.length) {
    return <div className="text-center py-10">Loading categories...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
      {categories.map((category) => (
        <Card key={category.id} className="hover:shadow-lg transition-shadow ">
          <CardHeader>
            <h3 className="text-lg font-bold text-center text-primary">
              {category.name}
            </h3>
          </CardHeader>
          <CardContent className=" p-0">
            <img
              src={
                categoryImages[category.slug] || GangSwitch
              }
              alt={category.name}
              className="w-full h-fit max-h-[300px] object-cover rounded-md mb-2"
            />
          </CardContent>
          <CardFooter className="border-t p-0 flex items-center justify-center">
            <Link
              to={`/category/${category.slug}`}
              className="mx-auto uppercase font-bold">
              See More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
