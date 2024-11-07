import axios from "axios";
import toast from "react-hot-toast";
import { emptyBag, updateBag, updateCart } from "../redux/reducers/bagSlice";
import { dbConnect } from "@/configs/database";
import {
  addProductToBag,
  removeProductFromBag,
} from "../redux/reducers/productSlice";

export const fetchBag = async (dispatch) => {
  await dbConnect();
  try {
    const response = await axios.get("/api/fetchBag");
    const userBag = response.data.userBag;

    dispatch(updateBag(userBag));
    return userBag;
  } catch (error) {
    console.log(error);
  }
};

export const addToBag = async (product, dispatch) => {
  await dbConnect();

  const toastId = toast.loading("Adding item to bag");
  try {
    const response = await axios.post("/api/addToBag", { product });
    toast.success("Added to Bag!", { id: toastId });
    dispatch(updateBag(response.data.newBag));
    dispatch(addProductToBag(product.id));

    return response.data.newBag;
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data.message
        ? error.response?.data.message
        : "Unexpected error occured",
      { id: toastId }
    );
  }
};

export const removeFromBag = async (product, dispatch) => {
  await dbConnect();

  const toastId = toast.loading("Removing item from bag");
  try {
    const response = await axios.put("/api/removeFromBag", { product });
    toast.success("Removed!", { id: toastId });
    if (response.data.newBag === null) {
      dispatch(emptyBag());
      dispatch(removeProductFromBag(product.id));

    } else {
      dispatch(updateBag(response.data.newBag));
      dispatch(removeProductFromBag(product.id));
    }

    return response.data.newBag;
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data.message
        ? error.response?.data.message
        : "Unexpected error occured",
      { id: toastId }
    );
  }
};

export const clearBag = async (dispatch) => {
  const toastId = toast.loading("Clearing Bag...");
  try {
    const response = await axios.delete("/api/clearBag");
    toast.success("Cleared Bag", { id: toastId });
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data.message
        ? error.response?.data.message
        : "Unexpected error occured",
      { id: toastId }
    );
  }
};
