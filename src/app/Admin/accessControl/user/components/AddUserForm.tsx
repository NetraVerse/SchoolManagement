"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IUserResponse } from "../types/IUserResponse";
import { useAddUser, useGetAllUsers } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useState, useRef, useEffect } from "react";
import AssignRoleForAddUser from "./AssignRoleForAddUser";
// import InstitutionFormForAddUser from "./InstitutionFormForAddUser";
import { X } from "lucide-react";

type Props = {
  form: UseFormReturn<IUserResponse>;
  onClose: () => void;
};

const AddUserForm = ({ form, onClose }: Props) => {
  const addUser = useAddUser();
  const { refetch } = useGetAllUsers();
  const [selectedRole, setSelectedRole] = useState<string | undefined>("");
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(
    null
  );
  const [roleName, setRoleName] = useState<string | undefined>("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>("");
  useEffect(() => {
    localStorage.setItem("companyId", selectedCompany ?? "");
  }, [selectedCompany]);
  const [activeTab, setActiveTab] = useState("Assign roles");
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companyName, setCompanyName] = useState<string | null>("");
  const [institutionName, setInstitutionName] = useState<string | null>("");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (selectedRole) {
      form.setValue("rolesId", [selectedRole], {
        shouldValidate: true,
      });
    }
    if (selectedInstitution) {
      form.setValue("InstitutionId", selectedInstitution, {
        shouldValidate: true,
      });
    }
    if (selectedCompany) {
      form.setValue("companyIds", [selectedCompany], {
        shouldValidate: true,
      });
    }
  }, [selectedCompany, selectedInstitution, selectedRole, form]);

  const onSubmit: SubmitHandler<IUserResponse> = async (data) => {
    try {
      await addUser.mutateAsync(data);
      Toast.success("Successfully added User");
      onClose();
      refetch();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data
          : `Failed to add user: ${error}`;
      Toast.error(errorMessage);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex justify-center items-center bg-opacity-30 backdrop-blur-sm"
    >
      <div className="w-full sm:w-[24rem] md:w-[28rem] lg:w-[30rem] xl:w-[32rem] h-[90vh] overflow-y-auto">
        <div className="rounded-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="bg-white p-6 border border-gray-200 shadow-lg rounded-lg max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Add User</h1>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-red-400 text-2xl hover:text-red-500"
                >
                  <X strokeWidth={3} color="red" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 grid gap-4">
                  <InputElement
                    label="User Name"
                    form={form}
                    layout="row"
                    name="UserName"
                    placeholder="Enter your name here"
                  />
                  <InputElement
                    label="Email"
                    form={form}
                    layout="row"
                    name="Email"
                    placeholder="Enter your email here"
                  />
                  <InputElement
                    label="Password"
                    form={form}
                    layout="row"
                    name="Password"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center self-start">
                  <img
                    src={profileImage}
                    alt="add profile"
                    className="object-cover w-18 h-14 cursor-pointer pr-6"
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="border-b-4 border-teal-500 mb-6 rounded-t-md">
                <div className="flex">
                  {(role === "superadmin"
                    ? ["Assign roles", "Institution"]
                    : ["Assign roles", "Company"]
                  ).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`py-2 px-4 rounded-t-md transition-all ${
                        activeTab === tab ? "bg-teal-500 text-white" : ""
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "Assign roles" ? (
                <>
                  <InputElement
                    label="Role"
                    form={form}
                    name="rolesId"
                    value={roleName || ""}
                  />
                  <AssignRoleForAddUser
                    setRoleName={setRoleName}
                    userId=""
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                  />
                </>
              ) : role === "superadmin" && activeTab === "Institution" ? (
                <>
                  <InputElement
                    label="Institution"
                    form={form}
                    name="InstitutionId"
                    value={institutionName || ""}
                  />
                  {/* <InstitutionFormForAddUser
                    setInstitutionName={setInstitutionName}
                    userId=""
                    selectedInstitution={selectedInstitution}
                    setSelectedInstitution={setSelectedInstitution}
                  /> */}
                </>
              ) : (
                <>
                  <InputElement
                    label="Company"
                    form={form}
                    name="companyIds"
                    value={companyName || ""}
                  />
                  {/* <CompanyFormForAddUser
                    userId=""
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                    setCompanyName={setCompanyName}
                  /> */}
                </>
              )}

              <div className="flex mt-4 justify-center space-x-2">
                <ButtonElement type="submit" text="submit" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
