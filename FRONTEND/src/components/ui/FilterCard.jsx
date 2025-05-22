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
    options: ["React", "Node", "Java", "Python", "Mern", "Django"],
  },
  {
    category: "Salary",
    options: [
      "3",
      "5",
      "10",
      "15",
      "20",
      "50 ",
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
            <div className="flex flex-col">
              <h1 className="font-bold text-blue-500">{data.category}</h1>
              {data.options.map((item, index) => {
                return (
                  <div className="flex flex-col md:flex-row md:gap-3 items-center">
                    <RadioGroupItem
                      value={item}
                      id={item}
                      className="cursor-pointer border-2 border-green-500"
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
