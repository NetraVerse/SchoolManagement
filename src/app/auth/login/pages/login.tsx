"use client";

import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { InputElement } from "@/components/Input/InputElement";
import { NormalizeStringCase } from "@/components/helpers/normalizeStringCase";
import {
  ILoginType,
  ITokenPayload,
  ITokenPayloadObject,
} from "../types/loginResponse";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AuthContext } from "@/context/auth/AuthContext";
import { Toast } from "@/components/Toast/toast";
import { IUserRole } from "../types/userRoles";
import { useLogin } from "../hooks";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/end-user";

  const form = useForm<ILoginType>({
    defaultValues: { email: "", password: "" },
  });

  const { updateUserDetails } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const handleSubmit = async (values: ILoginType) => {
    setIsSubmitting(true);
    try {
      const response = await login.mutateAsync(values);
      const token = response.token;
      if (!token) throw new Error("No token returned from login");
      const tokenPayload: ITokenPayload = jwtDecode(token);
      const userDetails: ITokenPayloadObject = {
        username:
          tokenPayload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
        role: NormalizeStringCase(
          tokenPayload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
          false
        ) as IUserRole,
        email: tokenPayload.email,
        id: tokenPayload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        companyId: tokenPayload.CompanyId,
        institutionId: tokenPayload.InstitutionId,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      updateUserDetails(userDetails);
      const role = localStorage.getItem("role");
      const roleToDashboardMap: Partial<Record<IUserRole, string>> = {
        superadmin: "/Admin/dashboard",
        developeruser: "/developer",
      };
      const dashboardRoute = roleToDashboardMap[userDetails.role]
        ? roleToDashboardMap[userDetails.role]
        : role === "admin"
        ? "/end-user/dashboard/institution"
        : role === "demoexpiryrole"
        ? "/end-user/expired"
        : "/end-user";
      if (dashboardRoute) setTimeout(() => router.push(dashboardRoute), 200);
    } catch (error: any) {
      Toast.error(error.response?.data || error.message || "Failed to login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex-1 flex flex-col justify-center items-center bg-orange-300 p-6 md:px-10">
          <div className="bg-white  h-full w-full max-w-md md:max-w-none md:h-[97%] md:w-[100%] rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center h-full p-6">
              <img
                alt="System Logo"
                className="w-32 md:w-[21%] mb-2 rounded-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center bg-teal-500 p-6 md:px-10">
          <div className="bg-white dark:bg-[#303135] h-full w-full max-w-md md:max-w-none md:h-[97%] md:w-[100%] rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center h-full p-6 border-2 border-teal-500">
              <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-6">
                {"login"}
              </h2>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="bg-[#FBFBFB] dark:text-white dark:bg-[#27272a] border-2 border-teal-500 lg:min-w-[500px] sm:min-w-[200px] p-10 rounded-lg pb-7 "
              >
                <div className="mb-3">
                  <InputElement
                    form={form}
                    label={"Email"}
                    name="email"
                    preview={false}
                    placeholder="प्रयोगकर्ता नाम प्रविष्ट गर्नुहोस्"
                    size="large"
                    value={form.watch("email") || ""}
                    className="mb-2"
                    inputType="text"
                  />
                </div>

                <div className="mb-3 relative">
                  <InputElement
                    label={"password"}
                    form={form}
                    name="password"
                    inputType={showPassword ? "text" : "password"}
                    preview={false}
                    placeholder="पासवर्ड प्रविष्ट गर्नुहोस्"
                    size="large"
                    value={form.watch("password") || ""}
                    className="mb-2 pr-16"
                  />

                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center text-teal-600 text-sm gap-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span>{showPassword ? `${"Hide"}` : `${"Show"}`}</span>
                  </button>
                </div>

                <div className="flex items-center mt-4 flex-col">
                  <ButtonElement
                    className="hover:bg-teal-50 transition-all duration-200 ease-in-out"
                    isLoading={isSubmitting}
                    type="submit"
                    text={"login"}
                  />
                  <p className="text-center mt-4">
                    {"No Account"}?<Link href="/register">Register Here</Link>
                  </p>
                  <p className="text-red-500 hover:underline transition-all duration-200 ease-in-out">
                    {"Forgot Password"}?
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
