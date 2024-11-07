import toast from "react-hot-toast";
import { loadScript, verifyPayment } from "./Payment";
import axios from "axios";
import { clearBag } from "./Bag";

export const fetchOrders = async () => {
  const toastId = toast.loading("Fetching Orders...");
  try {
    const response = await axios.get("/api/fetchOrders");

    const userOrders = response.data.userOrders;

    toast.success("Fetched Orders", { id: toastId });
    return userOrders;
  } catch (error) {
    console.log(error.message);
    toast.error(
      error.response?.data.message
        ? error.response?.data.message
        : "Unexpected error occured",
      { id: toastId }
    );
  }
};

export const addToOrders = async (products, total, user, dispatch) => {
  console.log(user);
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      );
      return;
    }
    const response = await axios.post("/api/createOrder", { total });
    console.log("Printing Create order response", response.data.order);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: `${response.data.order.amount}`,
      currency: "INR",
      name: "Myntra",
      description: "Test Transaction",
      order_id: response.data.order.id,
      handler: async function (response) {
        await verifyPayment({ ...response, products });
        await clearBag(dispatch);
      },
      prefill: {
        name: `${user.name}`,
        email: `${user.email}`,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error) {
    console.log(error.message);
    toast.error(
      error.response?.data.message
        ? error.response?.data.message
        : "Unexpected error occured"
    );
  }
};
