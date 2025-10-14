"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IMenu } from "../types/IMenu";
import { useAddMenu } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useGetAllSubModules } from "../../subModules/hooks";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useState } from "react";
import { X } from "lucide-react";
type Props = {
  form: UseFormReturn<IMenu>;
  onClose: () => void;
};
const AddMenuForm = ({ form, onClose }: Props) => {
  const addMenu = useAddMenu();
  const [subModuleId, setSubModuleId] = useState("");
  const handleSelectSubModule = (moduleId: string) => {
    form.setValue("subModulesId", moduleId);
  };
  const handleClose = () => {
    form.reset();
    setSubModuleId("");
    onClose();
  };
  const onSubmit: SubmitHandler<IMenu> = async (data) => {
    try {
      await addMenu.mutateAsync(data);
      Toast.success("Successfully added Menu");
      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add Menu" + error);
      }
    }
  };

  const { data: submodules } = useGetAllSubModules();
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
                <h1 className="text-lg  font-semibold">Add Menu</h1>
                <button
                  type="button"
                  onClick={onClose}
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
                  options={submodules?.Items}
                  selected={
                    submodules?.Items.find((g) => g.id === subModuleId) || null
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

export default AddMenuForm;
