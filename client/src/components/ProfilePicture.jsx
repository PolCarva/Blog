import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";

import stables from "../constants/stables";
import CropEasy from "./crop/CropEasy";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../services/index/users";
import { userActions } from "../store/reducers/userReducers";
import { images } from "../constants";
import { useTranslation } from "react-i18next";



const ProfilePicture = ({ avatar }) => {
  const { t } = useTranslation();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries("profile");
      toast.success("Profile Photo removed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto({ url: URL.createObjectURL(file), file: file });
      setOpenCrop(true);
    }
  };
  const handleDeleteImage = () => {
    openConfirmationModal();
  };

  const confirmDeleteProfilePicture = () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", undefined);
      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
    finally {
      closeConfirmationModal();
    }
  }

  return (
    <div className="w-full flex items-center gap-x-4 ">
      {showConfirmationModal && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[51]">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="font-bold text-lg mb-2">
              {t("profile.deletePicture")}
            </h3>
            <p className="text-sm mb-4">{t("profile.deletePictureConfirmation")}</p>
            <div className="flex justify-end gap-x-4">
              <button
                onClick={confirmDeleteProfilePicture}
                type="button"
                className="border border-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out rounded-lg px-4 py-2 text-red-500"
              >
                {t("profile.deletePicture")}
              </button>
              <button
                onClick={closeConfirmationModal}
                type="button"
                className="border border-primary hover:bg-primary hover:text-white transition-all ease-in-out rounded-lg px-4 py-2 text-primary"
              >
                {t("profile.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.querySelector("#portal")
        )}
      <div className="flex items-center gap-5">
        <div className="flex relative flex-col gap-1">
          <span className="text-sm text-gray-400 absolute z-50 -top-6 w-full text-center rigth-0">Max 2MB</span>
          <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 overflow-hidden outline-primary">
            <label
              htmlFor="profilePicture"
              className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
            >
              {avatar ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images.defaultProfile;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="w-7 h-auto text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              id="profilePicture"
              className="sr-only"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button
          onClick={handleDeleteImage}
          type="button"
          className="border border-red-500 hover:bg-red-500 hover:text-white transition-all ease-in-out rounded-lg px-4 py-2 text-red-500"
        >
          {t("profile.deletePicture")}
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
