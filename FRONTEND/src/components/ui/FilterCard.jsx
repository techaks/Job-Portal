import { RadioGroup } from "@radix-ui/react-radio-group";
import React, { useEffect, useState } from "react";
import { RadioGroupItem } from "./radio-group";
import { useDispatch } from "react-redux";
import { setQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

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
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const valueChanged = (value) => {
    setValue(value);
  
    
  };

  useEffect(() => {
   dispatch(setQuery(value))
    
  }, [value]);

  return (
    <div>
      <p className="font-bold text-xl ">Filter</p>
      <div>
        <RadioGroup value={value} onValueChange={valueChanged} > 
          {filterData.map((data, index) => (
            <div>
              <h1>{data.category}</h1>
              {data.options.map((item, index) => {
                return (
                  <div>
                    <RadioGroupItem
                      value={item}
                      id={item}
                      className="cursor-pointer"
                    />
                    <label htmlFor="">{item}</label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
