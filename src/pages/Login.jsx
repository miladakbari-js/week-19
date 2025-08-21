import { useForm } from "react-hook-form";
import { loginUser } from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validations/loginSchema";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data.username, data.password);
      localStorage.setItem("auth_token", res.token);
      toast.success("Login successful!");
      navigate("/dashboard");
      console.log("Login successful: ", res);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage =
          error.response?.data.message || "Invalid username or password";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3>بوت کمپ بوتواستارت</h3>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src="./union.svg" alt="logo icon" />
          <span>فرم ورود</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
          />
          <div className={styles.error}>{errors.username && <p>{errors.username.message}</p>}</div>

          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password")}
          />
          <div className={styles.error}>{errors.password && <p>{errors.password.message}</p>}</div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "شکیبا باشید ..." : "ورود"}
          </button>
        </form>
        <div className={styles.reglink}>
          <Link to="/register">ایجاد حساب کاربری</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
