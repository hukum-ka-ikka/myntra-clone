"use client";

import { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Declaration = () => {
  const [showDeclaration, setShowDeclaration] = useState(true);

  return (
    <div className="absolute top-0 flex w-full">
      {showDeclaration && (
        <div className="flex w-full gap-3 items-center justify-center z-10 bg-[#FF3F6C] pl-3 pr-1 text-white text-sm py-1 font-semibold">
          This project is intended solely for educational purposes and does not
          seek to replicate the Myntra app in any commercial context.
          <button onClick={() => setShowDeclaration(false)}>
            <AiOutlineCloseSquare className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Declaration;
