import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MainLayout from "../../components/MainLayout";
import { getUserProfile, updateProfile } from "../../services/index/users";
import ProfilePicture from "../../components/ProfilePicture";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "react-hot-toast";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password, bio, phone, specialization }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password, bio, phone, specialization },
        userId: userState.userInfo._id,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      phone: "",
      specialization: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData?.name,
        email: profileIsLoading ? "" : profileData?.email,
        bio: profileIsLoading ? "" : profileData?.bio,
        phone: profileIsLoading ? "" : profileData?.phone,
        specialization: profileIsLoading ? "" : profileData?.specialization,
      };
    }, [profileData?.email, profileData?.name, profileData?.bio, profileData?.phone, profileData?.specialization, profileIsLoading]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password, bio, phone, specialization } = data;
    mutate({ name, email, password, bio, phone, specialization });
  };

  return (
    <MainLayout>
      <section className="container px-5 md:px-12 mx-auto py-10">
        <div className="w-full md:w-8/12 flex flex-col mx-auto">
          <div className="mx-auto md:mx-0">
            <ProfilePicture avatar={profileData?.avatar} />
          </div>
          <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-12 w-full md:gap-12 items-start">
            <div className="md:col-span-6">
              <h3 className="font-bold text-2xl mt-5">{t("profile.personal")}</h3>
              {/* NAME */}
              <div className="flex flex-col mb-6 mt-6 w-full">
                <label
                  htmlFor="name"
                  className="text-[#5a7184] font-semibold block"
                >
                  {t("profile.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    minLength: {
                      value: 1,
                      message: t("profile.errors.name.length"),
                    },
                    required: {
                      value: true,
                      message: t("profile.errors.name.required"),
                    },
                  })}
                  placeholder={t("profile.placeholders.name")}
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.name ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              {/* EMAIL */}
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="email"
                  className="text-[#5a7184] font-semibold block"
                >
                  {t("profile.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: t("profile.errors.email.pattern"),
                    },
                    required: {
                      value: true,
                      message: t("profile.errors.email.required"),
                    },
                  })}
                  placeholder={t("profile.placeholders.email")}
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              {/* NEW PASS */}
              <div className="flex flex-col mb-6 w-full">
                <label
                  htmlFor="password"
                  className="text-[#5a7184] font-semibold block"
                >
                  {t("profile.newPassword")}
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  id="password"
                  {...register("password")}
                  placeholder={t("profile.placeholders.password")}
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.password ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              {/* BIO */}
              <div className="flex flex-col mb-6 w-full">
                <label htmlFor="bio" className="text-[#5a7184] font-semibold block">
                  {t("profile.aboutMe")}
                </label>
                <textarea
                  id="bio"
                  {...register("bio")}
                  placeholder={t("profile.placeholders.bio")}
                  className={`placeholder:text-[#959ead] min-h-16 text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.bio ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                />
                {errors.bio?.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.bio?.message}</p>
                )}
              </div>

            </div>
            <div className="col-span-6">
              <h3 className="font-bold text-2xl mt-5">{t("profile.contact")}</h3>
              {/* PHONE */}
              <div className="flex flex-col mb-6 mt-6 w-full">
                <label htmlFor="phone" className="text-[#5a7184] font-semibold block">
                  {t("profile.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  placeholder={t("profile.placeholders.phone")}
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.phone ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                />
                {errors.phone?.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
                )}
              </div>
              {/* SPECIALIZATION */}
              <div className="flex flex-col mb-6 w-full">
                <label htmlFor="specialization" className="text-[#5a7184] font-semibold block">
                  {t("profile.specializedIn")}
                </label>
                <input
                  type="text"
                  id="specialization"
                  {...register("specialization")}
                  placeholder={t("profile.placeholders.specializedIn")}
                  className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.specialization ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                />
                {errors.specialization?.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.specialization?.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || profileIsLoading || updateProfileIsLoading}
                className="bg-primary hover:bg-primary-hover transition-colors ease-in-out col-span-2 text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {t("profile.update")}
              </button>
            </div>

          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
