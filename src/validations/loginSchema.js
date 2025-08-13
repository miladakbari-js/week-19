import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("نام کاربری اجباری"),
  password: yup.string().required("رمز عبور اجباری"),
});

export default loginSchema;
