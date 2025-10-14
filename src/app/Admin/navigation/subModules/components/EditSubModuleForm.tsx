"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ISubModules } from "../types/ISubModules";
import { useEditSubModule } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useGetAllModules } from "../../modules/hooks";
import { useState } from "react";
import { X } from "lucide-react";
type Props = {
  form: UseFormReturn<ISubModules>;
  subModulesId: string;
  onClose: () => void;
  modulesId: string;
};

const EditSubModuleForm = ({ form, subModulesId, onClose }: Props) => {
  const editSubModule = useEditSubModule();
  const { data: modules } = useGetAllModules();
  const [moduleId, setModuleId] = useState("");
  const handleSelectModule = (moduleId: string) => {
    form.setValue("modulesId", moduleId);
  };
  const handleClose = () => {
    form.reset();
    setModuleId("");
    onClose();
  };
  const onSubmit: SubmitHandler<ISubModules> = async (form) => {
    try {
      await editSubModule.mutateAsync({
        id: subModulesId,
        data: form,
      });
      Toast.success("Successfully Updated SubModule");
      handleClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update SubModule" + error);
      }
    }
  };

  return (
    <div
      id="container"
      className="fixed inset-0 flex justify-center items-center border-rounded-lg  backdrop-blur-sm"
    >
      <div className=" max-h-screen w-[25rem]">
        <div className="rounded-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="bg-white p-6 border-solid border-gray-200 border shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg  font-semibold">Update SubModule</h1>
                <button
                  type="button"
                  onClick={onClose}
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

export default EditSubModuleForm;
