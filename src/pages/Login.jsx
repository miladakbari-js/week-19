import { useForm } from "react-hook-form";
import { loginUser } from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validations/loginSchema";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h3>Welcome to LoginPage</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="User name" {...register("username")} />
        <div>{errors.username && <p>{errors.username.message}</p>}</div>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <div>{errors.password && <p>{errors.password.message}</p>}</div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading . . ." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
