"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IRolePermission } from "../types/IRolePermission";
import { useAddPermission } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useGetAllRoles } from "../../roles/hooks";
import { useState } from "react";
import { Cross, X } from "lucide-react";

type Props = {
  form: UseFormReturn<IRolePermission>;
  onClose: () => void;
};

const AddPermissionForm = ({ form, onClose }: Props) => {
  const addPermission = useAddPermission();
  const { data: roles } = useGetAllRoles();
  const [roleId, setRoleId] = useState("");
  const handleSelectRole = (roleId: string) => {
    form.setValue("roleId", roleId);
  };
  const handleClose = () => {
    form.reset();
    setRoleId("");
    onClose();
  };
  const onSubmit: SubmitHandler<IRolePermission> = async (data) => {
    try {
      await addPermission.mutateAsync(data);
      Toast.success("Successfully added User");
      handleClose();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data
          : `Failed to add user: ${error}`;
      Toast.error(errorMessage);
    }
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex justify-center items-center border-rounded-lg bg-opacity-30 backdrop-blur-sm"
    >
      <div className="max-h-screen w-[20rem]">
        <div className="rounded-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="bg-white p-6 border-solid border-gray-200 border shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg  font-semibold">Add Permission</h1>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-red-400 text-2xl hover:text-red-500 "
                >
                  <X className="w-8 h-7" strokeWidth={3} />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="grid grid-rows-2 gap-4 flex-1">
                  <InputElement
                    label="Name"
                    form={form}
                    layout="row"
                    name="name"
                    placeholder="Enter permission name"
                  />
                  <div className="mb-4">
                    <AppCombobox
                      value={roleId}
                      dropDownWidth="w-full"
                      name="roleId"
                      dropdownPositionClass="absolute"
                      label="Roles"
                      options={roles?.Items}
                      selected={
                        roles?.Items.find((g) => g.Id === roleId) || null
                      }
                      onSelect={(group) => {
                        if (group) {
                          setRoleId(group.Id || "");
                          handleSelectRole(group.Id || "");
                        } else {
                          setRoleId("");
                        }
                      }}
                      getLabel={(g) => g?.Name || ""}
                      getValue={(g) => g?.Id ?? ""}
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-4 justify-center space-x-2">
                <ButtonElement
                  type="submit"
                  customStyle="hover:bg-teal-700 transition-all !text-xm font-bold !bg-teal-500"
                  text="Submit"
                />
                <ButtonElement
                  type="button"
                  customStyle="hover:bg-gray-700 transition-all !text-xm font-bold !bg-gray-400 "
                  text="Discard"
                  handleClick={handleClose}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPermissionForm;
