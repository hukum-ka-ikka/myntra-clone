import axios from "axios";
import toast from "react-hot-toast";

export function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Verify the Payment
export const verifyPayment = async (bodyData) => {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const response = await axios.post("/api/verifyPayment", bodyData);

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response);

    toast.success("Payment Successful!", { id: toastId });
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error);
    toast.error("Could Not Verify Payment.");
  }
  toast.dismiss(toastId);
};
