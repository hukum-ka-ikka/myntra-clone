import data from "../../../categoryData.json";
import ProfileIcon from "./ProfileIcon";
import WishlistIcon from "./WishlistIcon";
import BagIcon from "./BagIcon";
import Declaration from "./Declaration";
import { FiSearch } from "react-icons/fi";
import Category from "./Category";
import CategoryName from "./CategoryName";
import MyntraLogo from "./MyntraLogo";

const NavBar = () => {
  return (
    <div
      className="w-full min-w-[1150px] flex justify-center border sticky top-0 bg-white z-10"
      style={{ boxShadow: "1px -20px 30px #000000" }}
    >
      <Declaration />
      <div className="h-20 max-w-[1250px] w-full items-center  flex justify-between relative">
        <div className="flex gap-4 items-center pl-10 h-full">
          <MyntraLogo />
          <div className="flex items-center h-full">
            {data.map((category, index) => (
              <div className=" h-full flex px-3 items-center group">
                <CategoryName
                  key={index}
                  name={category.category}
                  borderColor={category.color}
                />

                <Category
                  key={index + 100}
                  subCategories={category.subCategories}
                  color={category.color}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#f6f6f5] flex gap-4 text-[#4e4e4c] px-4 py-2 pb-[10px] border rounded">
          <FiSearch className="mt-[6px]" />
          <input
            placeholder="Search for products, brands and more"
            className="w-72 bg-[#f6f6f5] focus:outline-none"
          />
        </div>
        <div className="flex items-center h-full pr-8">
          <ProfileIcon />
          <WishlistIcon />
          <BagIcon />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
