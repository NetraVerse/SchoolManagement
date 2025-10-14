"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ISubModules } from "../types/ISubModules";
import { useAddSubModule } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useGetAllModules } from "../../modules/hooks";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useState } from "react";
import { X } from "lucide-react";
type Props = {
  form: UseFormReturn<ISubModules>;
  onClose: () => void;
};
const AddSubModuleForm = ({ form, onClose }: Props) => {
  const addSubModule = useAddSubModule();
  const [moduleId, setModuleId] = useState("");
  const handleSelectModule = (moduleId: string) => {
    form.setValue("modulesId", moduleId);
  };
  const handleClose = () => {
    form.reset();
    setModuleId("");
    onClose();
  };
  const onSubmit: SubmitHandler<ISubModules> = async (data) => {
    try {
      await addSubModule.mutateAsync(data);
      Toast.success("Successfully added Sub Module");
      handleClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to add Sub Module" + error);
      }
    }
  };

  const { data: modules } = useGetAllModules();
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
                <h1 className="text-lg  font-semibold">Add SubModule</h1>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-red-400 text-2xl hover:text-red-500 "
                >
                  <X strokeWidth={3} />
                </button>
              </div>
              <div>
                <div className="mb-4">
                  <InputElement
                    label="Name"
                    layout="column"
                    form={form}
                    name="name"
                    placeholder="Enter submodule name"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Icon Url"
                    layout="column"
                    form={form}
                    name="iconUrl"
                    placeholder="Enter Icon Url"
                    customStyle="placeholder:text-red-300"
                  />
                </div>
                <div className="mb-4">
                  <InputElement
                    label="Target Url"
                    layout="column"
                    form={form}
                    name="targetUrl"
                    placeholder="Enter target URl"
                  />
                </div>
                <div className="mb-4">
                  <AppCombobox
                    value={moduleId}
                    dropDownWidth="w-full"
                    name="modulesId"
                    dropdownPositionClass="absolute"
                    label="Modules"
                    options={modules?.Items}
                    selected={
                      modules?.Items.find((g) => g.Id === moduleId) || null
                    }
                    onSelect={(group) => {
                      if (group) {
                        setModuleId(group.Id || "");
                        handleSelectModule(group.Id || "");
                      } else {
                        setModuleId("");
                      }
                    }}
                    getLabel={(g) => g?.Name || ""}
                    getValue={(g) => g?.Id ?? ""}
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
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubModuleForm;
