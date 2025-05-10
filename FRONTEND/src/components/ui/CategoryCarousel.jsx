import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { Button } from "./button";

const CategoryCarousel = () => {
  const categories = [
    "Software Development",
    "Android Development",
    "Frontend Development",
    "Data scientist",
    
    "Designer",

    "Backend Development",

   

    "Machine Learning",

    "IT Security",
  ];
  return (
    <div>
      <Carousel className=" w-1/2 mx-auto mt-10">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 " key={index}>
              <Button variant="outline" className="cursor-pointer">{category}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
