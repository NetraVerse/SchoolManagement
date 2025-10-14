"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IModules } from "../types/IModules";
import { useEditModule, useGetAllModules, useGetModulesById } from "../hooks";
import { InputElement } from "@/components/Input/InputElement";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { useEffect } from "react";

type Props = {
  form: UseFormReturn<IModules>;
  moduleId: string;
  onClose: () => void;
};
const EditModuleForm = ({ form, onClose, moduleId }: Props) => {
  const editModule = useEditModule();
  const { data: moduleData } = useGetModulesById(moduleId);
  const onSubmit: SubmitHandler<IModules> = async (form) => {
    try {
      await editModule.mutateAsync({
        id: moduleId,
        data: form,
      });
      Toast.success("Successfully Updated Module");
      onClose();
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data);
      } else {
        Toast.error("Failed to update module" + error);
      }
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (moduleData) {
      form.reset({
        Id: moduleData?.Id ?? "",
        Name: moduleData?.Name ?? "",
        TargetUrl: moduleData?.TargetUrl ?? "",
        IsActive: moduleData?.isActive ?? false,
        IconUrl: moduleData?.IconUrl ?? "",
        Rank: moduleData?.Rank ?? "",
        createdAt: moduleData?.createdAt,
      });
    }
  }, [moduleData, form]);
  return (
    <div
      id="container"
      className=" fixed inset-0 flex justify-center items-center border-rounded-lg bg-opacity-30 backdrop-blur-sm"
    >
      <div className=" max-h-screen w-[25rem]">
        <div className="rounded-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className="bg-white p-6 border-solid border-gray-200 border shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg  font-semibold">Update Module</h1>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-red-400 text-2xl hover:text-red-500 "
                >
                  <img alt="close" className="w-8 h-7" />
                </button>
              </div>
              <div className="mb-4">
                <InputElement
                  label="Name"
                  layout="column"
                  form={form}
                  name="Name"
                  placeholder="Enter module name"
                  defaultValue={moduleData?.Name}
                />
              </div>

              <div className="mb-4">
                <InputElement
                  label="Target Url"
                  layout="column"
                  form={form}
                  name="TargetUrl"
                  placeholder="Enter target URl"
                  defaultValue={moduleData?.TargetUrl}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Icon Url"
                  layout="column"
                  form={form}
                  name="IconUrl"
                  placeholder="Enter Icon URl"
                  defaultValue={moduleData?.IconUrl}
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Rank"
                  layout="column"
                  form={form}
                  name="Rank"
                  placeholder="Enter Rank"
                  defaultValue={moduleData?.Rank}
                />
              </div>
              <div className="mb-2 flex ml-4 items-center">
                <InputElement
                  label=""
                  layout="column"
                  form={form}
                  inputTypeCheckBox="checkbox"
                  name="isActive"
                  customStyle="!border-0 after:!content-none"
                  defaultValue={moduleData?.isActive}
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

export default EditModuleForm;
