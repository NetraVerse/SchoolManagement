"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IMenu } from "../types/IMenu";
import { useEditMenu, useGetMenuById } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useGetAllSubModules } from "../../subModules/hooks";
type Props = {
  form: UseFormReturn<IMenu>;
  menuId: string;
  onClose: () => void;
  subModulesId: string;
};

const EditMenuForm = ({ form, menuId, onClose }: Props) => {
  const editMenu = useEditMenu();
  const { data: subModules } = useGetAllSubModules();
  const [subModuleId, setSubModuleId] = useState("");
  const handleSelectSubModule = (moduleId: string) => {
    form.setValue("subModulesId", moduleId);
  };
  const { data: MenuData } = useGetMenuById(menuId);
  const handleClose = () => {
    form.reset();
    setSubModuleId("");
    onClose();
  };
  useEffect(() => {
    if (MenuData) {
      form.reset({
        name: MenuData?.name ?? "",
        targetUrl: MenuData?.targetUrl ?? "",
        iconUrl: MenuData?.iconUrl ?? "",
        subModulesId: MenuData?.subModulesId ?? "",
        rank: MenuData?.rank ?? 0,
        isActive: MenuData?.isActive ?? true,
      });
      setSubModuleId(MenuData?.subModulesId);
    }
  }, [MenuData]);
  const onSubmit: SubmitHandler<IMenu> = async (form) => {
    try {
      await editMenu.mutateAsync({
        id: menuId,
        data: form,
      });
      handleClose();
      Toast.success("Successfully Updated menu");
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update menu" + error);
      }
    }
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex justify-center items-center border-rounded-lg bg-opacity-30 backdrop-blur-sm"
    >
      <div className=" max-h-screen w-[25rem]">
        <div className="rounded-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="bg-white p-6 border-solid border-gray-200 border shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg  font-semibold">Update Menu</h1>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-red-400 text-2xl hover:text-red-500 "
                >
                  <X strokeWidth={3} />
                </button>
              </div>
              <div className="mb-4">
                <InputElement
                  label="Name"
                  layout="column"
                  form={form}
                  name="name"
                  placeholder="Enter menu name"
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Target Url"
                  layout="column"
                  form={form}
                  name="targetUrl"
                  placeholder="Enter Target Url"
                  customStyle="placeholder:text-red-300"
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Icon Url"
                  layout="column"
                  form={form}
                  name="iconUrl"
                  placeholder="Enter Icon URl"
                />
              </div>
              <div className="mb-4">
                <AppCombobox
                  value={subModuleId}
                  dropDownWidth="w-full"
                  name="sub"
                  dropdownPositionClass="absolute"
                  label="Sub Modules"
                  options={subModules?.Items}
                  selected={
                    subModules?.Items.find((g) => g.id === subModuleId) || null
                  }
                  onSelect={(group) => {
                    if (group) {
                      setSubModuleId(group.id || "");
                      handleSelectSubModule(group.id || "");
                    } else {
                      setSubModuleId("");
                    }
                  }}
                  getLabel={(g) => g?.name || ""}
                  getValue={(g) => g?.id ?? ""}
                />
              </div>

              <div className="mb-4">
                <InputElement
                  label="Rank"
                  layout="column"
                  form={form}
                  name="rank"
                  placeholder="Enter rank name"
                />
              </div>
              <div className="mb-2 flex items-center">
                <InputElement
                  label=""
                  layout="column"
                  form={form}
                  inputTypeCheckBox="checkbox"
                  name="isActive"
                  customStyle="!border-0 after:!content-none"
                />
                <p className="ml-4 ">Is Active</p>
              </div>
              <div className="flex mt-4 justify-center space-x-2">
                <ButtonElement
                  type="submit"
                  className="hover:bg-teal-700 transition-all !text-xm font-bold !bg-teal-500"
                  text="Submit"
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenuForm;
