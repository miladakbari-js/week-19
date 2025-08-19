import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object({
  name: yup.string().required("نام کالا الزامی است"),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .required("قیمت الزامی است"),
  quantity: yup
    .number()
    .typeError("موجودی باید عدد باشد")
    .required("موجودی الزامی است"),
});

function AddProductForm({ onSubmit, onClose, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues , reset]);

  return (
    <div>
      <h5>{defaultValues ? "ویرایش محصول" : "ایجاد محصول جدید"}</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>نام کالا</label>
        <input type="text" placeholder="نام کالا" {...register("name")} />

        <label>تعداد موجودی</label>
        <input type="number" placeholder="تعداد" {...register("quantity")} />

        <label>قیمت</label>
        <input type="number" placeholder="قیمت" {...register("price")} />

        <button type="submit" disabled={isSubmitting}>
          {defaultValues ? "ویرایش" : "ایجاد"}
        </button>
        <button type="button" onClick={onClose}>
          انصراف
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
