import { useForm } from "react-hook-form";
import AddCompanyForm from "../components/AddCompanyForm";
import { ICompany } from "../types/ICompany";

interface Props {
  visible: boolean;
  onClose: () => void;
}
const Add = ({ visible, onClose }: Props) => {
  const form = useForm<ICompany>({
    defaultValues: {
      id: "",
      name: "",
      address: "",
      email: "",
      shortName: "",
      contactNumber: "",
      contactPerson: "",
      pan: "",
      imageUrl: "",
      isEnable: true,
      isDeleted: false,
      fiscalYearId: "",
      institutionId: "",
      billNumberGenerationTypeForPurchase: 0,
      billNumberGenerationTypeForSales: 0,
    },
    //resolver: yupResolver(SubModuleValidator),
  });
  const handleFormClose = () => {
    form.reset();
    if (onClose) {
      onClose();
    }
  };

  if (!visible) return null;
  return <AddCompanyForm form={form} onClose={handleFormClose} />;
};
export default Add;
