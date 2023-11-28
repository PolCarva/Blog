import React from "react";
import HeaderAdmin from "./components/HeaderAdmin";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    isError: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("You are not allowed to access admin panel");
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/");
      toast.error("You are not allowed to access admin panel");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-700">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <HeaderAdmin />
      <main className="bg-gray-border/30 flex-1 p-4 lg:p-6 h-fit min-h-[100svh]">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AdminLayout;
