import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import styles from "./AddProductForm.module.css";

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
  }, [defaultValues, reset]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <h5>{defaultValues ? "ویرایش محصول" : "ایجاد محصول جدید"}</h5>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label>نام کالا</label>
            <input type="text" placeholder="نام کالا" {...register("name")} />
            <div className={styles.error}>
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <label>تعداد موجودی</label>
            <input
              type="number"
              placeholder="تعداد"
              {...register("quantity")}
            />
            <div className={styles.error}>
              {errors.quantity && <p>{errors.quantity.message}</p>}
            </div>

            <label>قیمت</label>
            <input type="number" placeholder="قیمت" {...register("price")} />
            <div className={styles.error}>
              {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div className={styles.control}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.select}
              >
                {defaultValues ? "ویرایش" : "ایجاد"}
              </button>
              <button type="button" onClick={onClose}>
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
