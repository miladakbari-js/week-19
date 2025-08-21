import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, addProduct, updateProduct, deleteProduct, deleteMultiplieProducts } from "../services/productService";
import toast from "react-hot-toast";

export function useProducts({ page, limit, search }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["products", page, search],
    () => getProducts(page, limit, search),
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message || "مشکلی در دریافت محصولات پیش آمد";
        toast.error(message);
      },
    }
  );

  const add = useMutation(addProduct, {
    onSuccess: () => {
      toast.success("محصول با موفقیت اضافه شد");
      queryClient.invalidateQueries(["products"]);
    },
  });

  const update = useMutation(updateProduct, {
    onSuccess: () => {
      toast.success("محصول ویرایش شد");
      queryClient.invalidateQueries(["products"]);
    },
  });

  const remove = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success("محصول حذف شد");
      queryClient.invalidateQueries(["products"]);
    },
  });

  const removeMultiplieProducts = useMutation(deleteMultiplieProducts, {
    onSuccess: () => {
      toast.success("محصولات حذف شدند");
      queryClient.invalidateQueries(["products"]);
    },
  });

  return { data, isLoading, add, update, remove, removeMultiplieProducts };
}
