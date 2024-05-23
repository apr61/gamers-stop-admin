import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  loginUser,
  selectCurrentUser,
  setAuthStatus,
} from "../../redux/slice/authSlice";
import { useEffect } from "react";

const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<LoginFormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await dispatch(loginUser(data));
    reset();
    navigate("/admin");
  };

  const EmailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (status === "succeeded") {
      reset();
      navigate("/admin");
      dispatch(setAuthStatus("idle"));
    }
  }, [dispatch, reset, navigate, status]);

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-xl font-bold">Login</h2>
      <Input
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: EmailRegex,
            message: "Email must be valid",
          },
        })}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Input
        label="Password"
        placeholder="Enter password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be of 6 characters",
          },
        })}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <Button
        type="submit"
        className="w-full"
        disabled={status === "pending" || isSubmitting}
        loading={status === "pending" || isSubmitting}
      >
        Login
      </Button>
      <p>
        New here ? Signup{" "}
        <Link to="/signup" className="hover:underline text-blue-600">
          Here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
