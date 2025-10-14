"use client";
import TitleHeader from "@/components/TitleHeader";
import AllSubModuleForm from "../components/AllSubModuleForm";
import { useState } from "react";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import AddSubModule from "./Add";

const AllSubModule = () => {
  const [modal, setShowModalForAdd] = useState(false);
  const buttonElement = () => {
    return (
      <ButtonElement
        type="button"
        text="Add New"
        onClick={() => setShowModalForAdd(true)}
        className="!text-xs font-bold !bg-teal-500"
      />
    );
  };

  return (
    <div>
      <TitleHeader title="Sub Modules" button={buttonElement()} />
      <AllSubModuleForm />
      <AddSubModule visible={modal} onClose={() => setShowModalForAdd(false)} />
    </div>
  );
};

export default AllSubModule;
