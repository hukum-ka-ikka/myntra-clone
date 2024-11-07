import React from "react";

const Category = ({ subCategories, color }) => {
  return (
    <div className=" absolute top-[78px] w-[1130px] h-[430px] ml-16 pl-10 bg-white hidden left-0 border group-hover:flex group-hover:flex-col flex-wrap z-10">
      {subCategories.map((subCategory, index) => (
        <div key={index} className="flex flex-col pt-4 w-max">
          <p className="text-sm font-semibold" style={{ color: `${color}` }}>
            {subCategory.name}
          </p>
          <div className="flex flex-col gap-1">
            {subCategory.items.map((item, index) => (
              <p key={index} className="hover:font-bold text-sm">
                {item}
              </p>
            ))}
          </div>
          <div className="border-b mt-4 w-40"></div>
        </div>
      ))}
    </div>
  );
};

export default Category;
