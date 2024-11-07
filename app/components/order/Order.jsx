"use client";

import { fetchOrders } from "@/app/services/Order";
import { fetchProducts } from "@/app/services/Product";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderProductCard from "./OrderProductCard";

const Order = () => {
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [orderedProducts, setOrderedProducts] = useState(null);

  const fetchOrderedProducts = async () => {
    if (!products.areProductsLoaded) {
      await fetchProducts(dispatch);
    } else {
      const orders = await fetchOrders();
      let tempOrderedProducts = orders.map((order) => {
        const productDetails = products.products.find(
          (product) => product.id === order.productId
        );
        order.productDetails = productDetails;

        return order;
      });

      setOrderedProducts(tempOrderedProducts);
    }
  };

  useEffect(() => {
    fetchOrderedProducts();
  }, [products]);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-6">
      <div className="w-[70%] flex flex-col gap-6">
        <p className="text-4xl font-semibold text-gray-700">Your Orders</p>
        <div className="w-full flex flex-col gap-2">
          {orderedProducts &&
            orderedProducts.map((product, index) => (
              <OrderProductCard
                key={index}
                product={product.productDetails}
                orderedOn={product.createdAt}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
