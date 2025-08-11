import { useForm } from "react-hook-form";
import { loginUser } from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validations/loginSchema";
import { useState } from "react";

function Login() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res = await loginUser(data.username, data.password);
      console.log("Login successful: ", res);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Login failed, please try again.");
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
        {serverError && <p>{serverError}</p>}
      </form>
    </div>
  );
}

export default Login;
