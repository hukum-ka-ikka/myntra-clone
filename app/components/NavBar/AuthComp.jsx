"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const AuthComp = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging Out...");
    try {
      await signOut();
      toast.success("Logged Out", { id: toastId });
    } catch (error) {
      toast.error("Error while logging out", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col overflow-visible">
      {session ? (
        <>
          <p className="text-sm font-bold">Hello, {session.user.name}</p>
          <button
            onClick={handleLogout}
            className="text-sm appearance-none text-left w-max hover:font-bold hover:text-red-500"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="text-sm font-bold">Welcome</p>
          <p className="text-sm ">To access account and manage orders</p>
          <button
            onClick={() => signIn("google")}
            className="text-[#FF3F6C] text-sm font-bold px-5 py-2 mt-2 border hover:border hover:border-[#FF3F6C] w-max"
          >
            LOGIN/SIGNUP
          </button>
        </>
      )}
    </div>
  );
};

export default AuthComp;
