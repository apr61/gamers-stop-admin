import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormValues } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  createNewUser,
  selectCurrentUser,
  setAuthStatus,
} from "../../redux/slice/authSlice";

const SignUpForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SignUpFormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector(selectCurrentUser);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    await dispatch(createNewUser(data));
  };

  const EmailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (status === "succeeded") {
      reset();
      navigate("/");
      dispatch(setAuthStatus("idle"));
    }
  }, [dispatch, reset, navigate, status]);

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center text-xl font-bold">Sign up</h2>
      <Input
        label="Name"
        placeholder="Your name"
        {...register("name", {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be atleast 3 characters",
          },
          validate: (value) => value.trim().length >= 3 || "Name is required",
        })}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
        disabled={isSubmitting || status === "pending"}
        loading={isSubmitting || status === "pending"}
      >
        Sign Up
      </Button>
      <p>
        Already have an account ? Login{" "}
        <Link to="/login" className="hover:underline  text-blue-600">
          Here
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
