import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { signUp } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signUp({ name, email, password });
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
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="container px-5 md:px-12 mx-auto py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            {t("register.title")}
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* NAME */}
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-dark-light font-semibold block"
              >
                {t("register.name")}
              </label>
              <input
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: t("register.errors.name.length"),
                  },
                  required: {
                    value: true,
                    message: t("register.errors.name.required"),
                  },
                })}
                type="text"
                id="name"
                placeholder={t("register.namePlaceholder")}
                className={`placeholder:text-gray-placeholder text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-gray-border"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              )}
            </div>
            {/* EMAIL */}
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-dark-light font-semibold block"
              >
                {t("register.email")}
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: t("register.errors.email.required"),
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t("register.errors.email.pattern"),
                  },
                })}
                {...register("email")}
                type="email"
                id="email"
                placeholder={t("register.emailPlaceholder")}
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
                {t("register.password")}
              </label>
              <input
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: t("register.errors.password.length"),
                  },
                  required: {
                    value: true,
                    message: t("register.errors.password.required"),
                  },
                })}
                type="password"
                id="password"
                placeholder={t("register.passwordPlaceholder")}
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
            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-dark-light font-semibold block"
              >
                {t("register.confirmPassword")}
              </label>
              <input
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: t("register.errors.confirmPassword.required"),
                  },
                  validate: (value) => {
                    if (value !== password) return t("register.errors.confirmPassword.validate");
                  },
                })}
                type="password"
                id="confirmPassword"
                placeholder={t("register.confirmPasswordPlaceholder")}
                className={`placeholder:text-gray-placeholder text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-border"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            {/* REGISTER BUTTON */}
            <button
              disabled={!isValid || isLoading}
              type="submit"
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {t("register.button")}
            </button>
            <p className="text-sm font-semibold text-dark-light">
              {t("register.haveAccount")}{" "}
              <Link to="/login" className="text-primary">
                {t("register.login")}{" "}
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
