"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IRolePermission } from "../types/IRolePermission";
import { useEditRolePermission, useGetPermissionByPermission } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useGetAllRoles, useGetRolesByRoleId } from "../../roles/hooks";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  form: UseFormReturn<IRolePermission>;
  Id: string | undefined;
  onClose: () => void;
};
const EditRolePermissionForm = ({ form, Id, onClose }: Props) => {
  const updateRole = useEditRolePermission(Id);
  const { data: roles } = useGetAllRoles();
  const [roleId, setRoleId] = useState("");
  const handleSelectRole = (roleId: string) => {
    form.setValue("roleId", roleId);
  };
  const { data: RoleData } = useGetPermissionByPermission(Id || "");
  const handleClose = () => {
    form.reset();
    setRoleId("");
    onClose();
  };
  useEffect(() => {
    if (RoleData) {
      form.reset({
        name: RoleData?.name ?? "",
        roleId: RoleData?.roleId ?? "",
      });
      setRoleId(RoleData.roleId);
    }
  }, [RoleData]);
  const onSubmit: SubmitHandler<IRolePermission> = async (form) => {
    try {
      await updateRole.mutateAsync(form);
      Toast.success("Successfully updated Role");
      handleClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add module" + error);
      }
    }
  };
  return (
    <div
      id="container"
      className=" fixed inset-0 flex justify-center items-center border-rounded-lg bg-opacity-30 z-[5] backdrop-blur-sm"
    >
      <div className="w-[20rem] flex justify-center bg-white rounded-lg drop-shadow-lg py-4">
        <div>
          <h1 className="mb-4 text-lg font-semibold flex justify-between">
            Update Permission
            <X className="w-8 h-7" strokeWidth={3} color="red" />
          </h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <InputElement
                label="Name"
                layout="row"
                form={form}
                name="name"
                placeholder="Enter Permission Name"
              />
            </div>
            <div className="mb-4">
              <AppCombobox
                value={roleId}
                dropDownWidth="w-full"
                name="roleId"
                dropdownPositionClass="absolute"
                label="Roles"
                options={roles?.Items}
                selected={roles?.Items.find((g) => g.Id === roleId) || null}
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
            <div className="flex justify-center ">
              <ButtonElement
                type="submit"
                customStyle="hover:bg-teal-700 transition-all !text-xs font-bold !bg-teal-500"
                text={"Submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRolePermissionForm;
