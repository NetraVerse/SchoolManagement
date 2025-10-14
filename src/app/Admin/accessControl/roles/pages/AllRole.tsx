"use client";
import TitleHeader from "@/components/TitleHeader";
import AllRoleForm from "../components/AllRoles";
import Add from "./Add";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { useState } from "react";
import { usePermissions } from "@/context/auth/PermissionContext";
import useMenuPermissionData from "@/app/Admin/navigation/hooks/useMenuPermissionData";

const AllRole = () => {
  const [modal, setShowModal] = useState(false);
  const { menuStatus } = usePermissions();
  const { canAdd } = useMenuPermissionData(menuStatus);

  const buttonElement = () => {
    return (
      <>
        {canAdd && (
          <ButtonElement
            type="button"
            text="Add New"
            onClick={() => setShowModal(true)}
            className="!text-xs sm:!text-sm md:!text-base font-bold !bg-teal-500"
          />
        )}
      </>
    );
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      <TitleHeader title="All Roles" button={buttonElement()} />

      <div className="w-full overflow-x-auto">
        <AllRoleForm />
      </div>

      <Add visible={modal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AllRole;
