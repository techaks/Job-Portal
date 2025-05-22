import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { Button } from "./button";
import { useDispatch } from "react-redux";
import { setQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = [
    "Software Developer",
    "Android Developer",
    "Frontend Developer",
    "Data scientist",
    "Designer",
    "Data Science",
    "React Js",
    "Backend Developer",
    "Machine Learning",
    "IT Security",
    "Python"
  ];

   const findJobs = (category) => {
      dispatch(setQuery(category))
      navigate("/browse");
    };
  return (
    <div>
      <Carousel className=" w-1/2 mx-auto mt-10">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem  className="md:basis-1/2 lg:basis-1/3 " key={index}>
              <Button onClick={()=>findJobs(category)} variant="outline" className="cursor-pointer">{category}</Button>
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
