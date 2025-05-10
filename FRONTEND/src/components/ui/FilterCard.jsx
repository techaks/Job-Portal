import { RadioGroup } from "@radix-ui/react-radio-group";
import React from "react";
import { RadioGroupItem } from "./radio-group";

const filterData = [
  {
    category: "Location",
    options: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    category: "skills",
    options: ["React", "Node", "Java", "Python", "Mernin", "Django"],
  },
  {
    category: "Salary",
    options: [
      "3-5 LPA",
      "5-8 LPA",
      "8-10 LPA",
      "10-15 LPA",
      "15-20 LPA",
      "20+ LPA",
    ],
  },
];

const FilterCard = () => {
  return (
    <div>
      <p className="font-bold text-xl ">Filter</p>
      <div>
        {filterData.map((item, index) => (
          <div>
            <p className="text-[#FF9A00] font-bold">{item.category}</p>

            <RadioGroup>
              {item.options.map((option, index) => (
                <div className="flex gap-2 items-center " key={index}>
                  <RadioGroupItem key={index} value={option} id={option}>
                  </RadioGroupItem>
                    <label id={option} htmlFor={option} className="text-[#155DFC] font-bold cursor-pointer">{option}</label>
                   
                  
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
