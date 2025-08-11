import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validations/registerSchema";
import { registerUser } from "../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate()



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });



  const onSubmit = async (data) => {
    setServerError("");


    try {
      const res = await registerUser(data.username, data.password);
      console.log("Register successful:", res);
    navigate("/login")
    }catch (error) {


      if (error.response && error.response.status === 400) {
        setServerError("User already exists");
      } else {
        setServerError("Registration failed, please try again.");
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

        {serverError && <p>{serverError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
