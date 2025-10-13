import { InputElement } from "@/components/FormComponents/input";
import { IFilterMenusByDate } from "../types/IMenu";
import { UseFormReturn } from "react-hook-form";
import { ButtonElement } from "@/components/FormComponents/Button";

type Props = {
  form: UseFormReturn<IFilterMenusByDate>;
  setFormData: (data: IFilterMenusByDate) => void;
};

const FilterMenusForm = ({ form, setFormData }: Props) => {
  const { handleSubmit, getValues, reset } = form;

  const onSubmit = () => {
    const formData = getValues();
    setFormData(formData);
  };

  const handleClear = () => {
    setFormData({
      startDate: "",
      endDate: "",
      name: "",
    });
    reset({
      startDate: "",
      endDate: "",
      name: "",
    });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full  gap-4 w-[87%] mb-4 mr-2">
          <InputElement
            label="Start Date"
            form={form}
            inputType="date"
            name="startDate"
            placeholder="Enter Start Date"
          />
          <InputElement
            label="End Date"
            form={form}
            inputType="date"
            name="endDate"
            placeholder="Enter End Date"
          />
          <InputElement
            label="Filter Name"
            form={form}
            name="name"
            placeholder="Enter Name"
          />
        </div>

        <div className="flex justify-center items-center  h-full mt-1">
          <ButtonElement className="flex " type="submit" text="Submit" />
          <ButtonElement
            className="flex "
            onClick={handleClear}
            type="button"
            text="Clear"
          />
        </div>
      </form>
    </div>
  );
};

export default FilterMenusForm;
