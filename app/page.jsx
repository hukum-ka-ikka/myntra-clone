import Image from "next/image";
import myntraCoupon from "../public/Images/myntra-coupon.png";
import myntraFooter from "../public/Images/myntra-footer.png";
import SlideShow from "./components/HomePage/SlideShow";
import FirstProductFeed from "./components/HomePage/FirstProductFeed.jsx";
import SecondProductFeed from "./components/HomePage/SecondProductFeed";
import ShopByCategory from "./components/HomePage/ShopByCategory";

export const metadata = {
  title: "Myntra Clone",
  description:
    "This project is intended solely for educational purposes and does not seek to replicate the Myntra app in any commercial context.",
};
const page = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center gap-10">
        <Image src={myntraCoupon} alt="Loading..." className="mt-10" />
        <FirstProductFeed />
        <SlideShow />
        <SecondProductFeed />
        <ShopByCategory />
        <Image src={myntraFooter} alt="Loading..." />
      </div>
    </div>
  );
};

export default page;
