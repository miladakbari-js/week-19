import * as yup from "yup";

const registerSchema = yup.object().shape({
  username: yup.string().required("نام کاربری الزامی است"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(4, "رمز عبور باید حداقل 4 کاراکتر باشد"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "تکرار رمز عبور یکی نیست")
    .required("تکرار رمز عبور الزامی است"),
});

export default registerSchema;
