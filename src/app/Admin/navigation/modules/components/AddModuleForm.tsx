"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { IModules } from "../types/IModules";
import { useAddModule } from "../hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Toast } from "@/components/Toast/toast";
import { AxiosError } from "axios";
import { InputElement } from "@/components/Input/InputElement";
import { Cross } from "lucide-react";
type Props = {
  form: UseFormReturn<IModules>;
  onClose: () => void;
};
const AddModuleForm = ({ form, onClose }: Props) => {
  const addModule = useAddModule();

  const onSubmit: SubmitHandler<IModules> = async (data) => {
    try {
      await addModule.mutateAsync(data);
      Toast.success("Successfully added Module");
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError) {
        Toast.error(error.response?.data || "Failed to add journal entry");
      } else {
        Toast.error("Failed to add module" + error);
      }
    } finally {
      onClose();
    }
  };
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
                <h1 className="text-lg  font-semibold">Add Module</h1>
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
                />
              </div>

              <div className="mb-4">
                <InputElement
                  label="Target Url"
                  layout="column"
                  form={form}
                  name="TargetUrl"
                  placeholder="Enter target URl"
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Icon Url"
                  layout="column"
                  form={form}
                  name="IconUrl"
                  placeholder="Enter Icon URl"
                />
              </div>
              <div className="mb-4">
                <InputElement
                  label="Rank"
                  layout="column"
                  form={form}
                  name="Rank"
                  placeholder="Enter Rank"
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

export default AddModuleForm;
