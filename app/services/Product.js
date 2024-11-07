import axios from "axios";
import { loadProducts } from "../redux/reducers/productSlice";
import toast from "react-hot-toast";
import { fetchBag } from "./Bag";
import { updateCategories } from "../redux/reducers/categorySlice";

export const fetchProducts = async (dispatch) => {
  const toastId = toast.loading("Loading Products...");
  try {
    const userBag = await fetchBag(dispatch);
    const bagProducts = userBag.products;

    const productResponse = await axios.get(
      process.env.NEXT_PUBLIC_PRODUCT_API
    );
    let categories = { all: productResponse.data.products };

    // Update added to bag status and update in redux state
    const productsToLoad = productResponse.data.products.map((product) => {
      if (bagProducts.includes(product.id)) {
        product.addedToBag = true;
      } else {
        product.addedToBag = false;
      }
      if (!categories[product.category]) {
        categories[product.category] = [product];
      } else {
        categories[product.category].push(product);
      }

      return product;
    });

    dispatch(updateCategories(categories));
    dispatch(loadProducts(productsToLoad));
    toast.success("Loaded", { id: toastId });
    return productResponse.data.products;
  } catch (error) {
    console.log(error);
    toast.error("Couldn't load products", { id: toastId });
  }
};
