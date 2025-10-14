"use client";
import TitleHeader from "@/components/TitleHeader";
import AllRolePermissionForm from "../components/AllPermissionForm";
import Add from "./Add";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { useState } from "react";
import { usePermissions } from "@/context/auth/PermissionContext";
import useMenuPermissionData from "@/app/Admin/navigation/hooks/useMenuPermissionData";
const AllRolePermission = () => {
  const { menuStatus } = usePermissions();
  const { canAdd } = useMenuPermissionData(menuStatus);
  const [modal, setShowModal] = useState(false);
  const buttonElement = () => {
    return (
      <div>
        {/* {canAdd && ( */}
        <div>
          <ButtonElement
            type="button"
            text="Add New"
            handleClick={() => setShowModal(true)}
            customStyle="!text-xs font-bold !bg-teal-500"
          />
        </div>
        {/* )} */}
      </div>
    );
  };
  return (
    <div>
      <TitleHeader title="All Roles Permission" button={buttonElement()} />
      <AllRolePermissionForm />
      <Add visible={modal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AllRolePermission;
