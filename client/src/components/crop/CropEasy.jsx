import React, { useState } from "react";
import Cropper from "react-easy-crop";

import getCroppedImg from "./cropImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateProfilePicture } from "../../services/index/users";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";

const CropEasy = ({ photo, setOpenCrop }) => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
      toast.success("Profile Photo updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCropImage = async () => {
    try {
      const cropImg = await getCroppedImg(photo.url, croppedAreaPixels);
      const file = new File([cropImg.file], `${photo.file.name}`, {
        type: photo?.file.type,
      });

      const formData = new FormData();
      formData.append("profilePicture", file);
      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (err) {
        toast.error(err.message);
        console.log(err);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  return (
    <div className="fixed z-[1000] inset-0 bg-black/50 flex justify-center p-5 overflow-hidden">
      <div className="bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg">
        <h2 className="font-semibold text-dark-hard mb-2">Crop Image</h2>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div>
          <label
            htmlFor="zoomRange"
            className="block mt-2 mb-0.5 text-sm font-medium text-gray-900"
          >
            Zoom: {`${Math.round(zoom * 100)}%`}
          </label>
          <input
            type="range"
            id="zoomRange"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <button
          disabled={isLoading}
            className="px-5 py-2.5 rounded-lg text-red-500 border border-red-500 text-sm disabled:opacity-70"
            onClick={() => {
              setOpenCrop(false);
            }}
          >
            Cancel
          </button>
          <button
          disabled={isLoading}
            className="px-5 py-2.5 rounded-lg text-white bg-primary text-sm disabled:opacity-70"
            onClick={handleCropImage}
          >
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
