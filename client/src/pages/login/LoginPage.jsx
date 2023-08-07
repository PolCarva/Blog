import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { logIn } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return logIn({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Log In{" "}
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* EMAIL */}
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-dark-light font-semibold block"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email is invalid",
                  },
                })}
                {...register("email")}
                type="email"
                id="email"
                placeholder="Enter email"
                className={`placeholder:text-gray-placeholder text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-gray-border"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              )}
            </div>
            {/* PASSWORD */}
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-dark-light font-semibold block"
              >
                Password
              </label>
              <input
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 character",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                type="password"
                id="password"
                placeholder="Enter password"
                className={`placeholder:text-gray-placeholder text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-gray-border"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <Link
              to="/forget-password"
              className="text-sm text-semibold text-primary"
            >
              Forgot password?
            </Link>
            <button
              disabled={!isValid || isLoading}
              type="submit"
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
            <p className="text-sm font-semibold text-dark-light">
              Don not have an account?{" "}
              <Link to="/register" className="text-primary">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
