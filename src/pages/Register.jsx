import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validations/registerSchema";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data.username, data.password);
      console.log("Register successful:", res);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User already exists");
      }
    }
  };
  return (
    <div>
      <h3>Register Page</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
