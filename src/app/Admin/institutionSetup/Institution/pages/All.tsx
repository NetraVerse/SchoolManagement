"use client";
import TitleHeader from "@/components/TitleHeader";
import AllInstitutionForm from "../components/AllInstitutionForm";
import Add from "./Add";
import { useState } from "react";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
const AllInstitution = () => {
  const [modal, setShowModal] = useState(false);

  const buttonElement = () => {
    return (
      <ButtonElement
        type="button"
        text="Add New"
        handleClick={() => setShowModal(true)}
        customStyle="!text-xs font-bold !bg-teal-500"
      />
    );
  };

  return (
    <div>
      <TitleHeader title="All Institution" button={buttonElement()} />
      <AllInstitutionForm />
      <Add visible={modal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AllInstitution;
