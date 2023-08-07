import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";

import stables from "../constants/stable";
import CropEasy from "./crop/CropEasy";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../services/index/users";
import { userActions } from "../store/reducers/userReducers";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

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
    if (
      window.confirm("Are you sure you want to delete your profile picture?")
    ) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);
        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    }
  };
  return (
    <div className="w-full flex items-center gap-x-4 ">
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.querySelector("#portal")
        )}
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
      <button
        onClick={handleDeleteImage}
        type="button"
        className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default ProfilePicture;
