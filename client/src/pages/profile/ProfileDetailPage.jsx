import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "../../components/MainLayout";
import { getUserById, updateProfile } from "../../services/index/users";
import { useTranslation } from "react-i18next";
import stables from "../../constants/stables";
import { images } from "../../constants";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const ProfileDetailPage = () => {
    const { t } = useTranslation();
    const userId = useParams().id;

    const { data: profileData, isLoading: profileIsLoading } = useQuery({
        queryFn: () => {
            return getUserById({ userId });
        },
        queryKey: ["profile"],
    });

    const getRole = () => {
        if (profileData?.op) {
            return <span className="font-bold text-red-500">Op 👑</span>;
        } else if (profileData?.admin) {
            return <span className="font-bold text-primary">Admin</span>;
        } else {
            return t("profile.user");
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0 });
      }, []);

    return (
        <MainLayout>
            <section className="container px-5 md:px-12 mx-auto py-10">
                <div className="flex flex-col gap-10 items-center">
                    <div className="w-full flex flex-col gap-5 items-center justify-center max-w-sm mx-auto">
                        <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 overflow-hidden outline-primary">
                            {profileData?.avatar ? (
                                <img
                                    src={stables.UPLOAD_FOLDER_BASE_URL + profileData?.avatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = images.defaultProfile;
                                    }}
                                />
                            ) : (
                                <img
                                    src={images.defaultProfile}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            )}

                        </div>
                        <h2 className="font-bold text-2xl">
                            {profileData?.name}
                            <div className="flex items-center gap-x-2 justify-center">
                                <span
                                    className={`${profileData?.verified ? "bg-green-success" : "bg-gray-detail"
                                        } w-fit bg-opacity-20 p-0.5 rounded-full`}
                                >
                                    {profileData?.verified ? (
                                        <BsCheckLg className="w-3 h-3 text-green-success bold" />
                                    ) : (
                                        <AiOutlineClose className="w-3 h-3 text-gray-placeholder" />
                                    )}
                                </span>
                                <span className="italic text-dark-light text-sm">
                                    {profileData?.verified ? t("admin.common.verified") : t("admin.common.notVerified")}
                                </span>
                            </div>
                        </h2>
                    </div>
                    {
                        profileData?.bio &&
                        <div className="flex flex-col w-full gap-2 px-10 max-w-2xl mx-auto">
                            <h3 className="font-bold text-xl">
                                {t("profile.aboutMe")}
                            </h3>
                            <p className="whitespace-pre-line">
                                {profileData?.bio}
                            </p>
                        </div>
                    }
                    <div className="flex flex-col md:flex-row p-4 md:items-center bg-primary bg-opacity-10 md:p-10 rounded-lg w-full gap-2 max-w-2xl mx-auto">
                        <div className="flex flex-col gap-4 md:gap-2 md:w-1/2">
                            <h3 className="font-bold text-xl">
                                {t("profile.information")}
                            </h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center w-full">
                                    <p className="font-bold">
                                        {t("profile.specializedIn")}:
                                    </p>
                                    <p className="line-clamp-1">
                                        {profileData?.specialization || t("profile.noAnswer")}
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <p className="font-bold">
                                        {t("profile.role")}:
                                    </p>
                                    <p>
                                        {getRole()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 md:w-1/2">
                            <h3 className="font-bold text-xl">
                                {t("profile.contact")}
                            </h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <p className="font-bold">
                                        {t("profile.email")}:
                                    </p>
                                    <a className="text-primary hover:text-primary-hover transition-colors ease-in-out" href={`mailto:${profileData?.email}`}>
                                        {profileData?.email}
                                    </a>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <p className="font-bold">
                                        {t("profile.phone")}:
                                    </p>
                                    <p>
                                        {profileData?.phone || t("profile.noAnswer")}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ProfileDetailPage;
