"use client";
import { useEffect, useState } from "react";
import { ISubModules } from "../types/ISubModules";
import { useGetAllSubModules } from "../hooks";
import { useForm } from "react-hook-form";
import { useRemoveSubModule } from "../hooks";
import Pagination from "@/components/Pagination";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { Edit, Trash } from "lucide-react";
import EditSubModule from "../pages/Edit";
import { EditButton } from "@/components/Buttons/EditButton";
import { useRouter } from "next/navigation";
const AllSubModuleForm = () => {
  const [modal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const buttonElement = (id: string) => {
    return (
      <ButtonElement
        icon={<Edit size={14} />}
        type="button"
        text=""
        onClick={() => {
          setShowModal(true);
          setSelectedId(id);
        }}
        className="!text-xs font-bold !bg-teal-500"
      />
    );
  };
  const [state, setState] = useState({
    loading: true,
    subModules: [] as ISubModules[],
    errorMessage: "",
  });
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 10,
    pageIndex: 1,
    isPagination: true,
  });
  const navigate = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate.push("/");
    }
  }, [navigate]);
  const updateState = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };
  const query = `?pagesize=${paginationParams.pageSize}&pageIndex=${paginationParams.pageIndex}&IsPagination=${paginationParams.isPagination}`;
  const { data: allSubModules, error, refetch } = useGetAllSubModules(query);
  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const handleSubmit = useForm<SearchParam>({
    defaultValues: {},
  });
  const deleteSubModule = useRemoveSubModule();
  const handleDelete = async (id: string | undefined) => {
    try {
      await deleteSubModule.mutateAsync(id);
      refetch();
    } catch (error) {
      console.log("Error Deleting: ", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [paginationParams]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, subModules: [] });
  };

  return (
    <div className="p-6 md:p-8 bg-white rounded-lg shadow-sm border border-gray-100">
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <table className="min-w-full table-auto text-left border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-50 text-gray-700 uppercase text-sm font-semibold border-b border-gray-200">
            <th className="py-3 px-4">SN</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">ICON URL</th>
            <th className="py-3 px-4">TARGET URL</th>
            <th className="py-3 px-4">Rank</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {allSubModules && allSubModules?.Items?.length > 0 ? (
            allSubModules.Items?.map(
              (subModule: ISubModules, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {subModule.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {subModule.iconUrl}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {subModule.targetUrl}
                  </td>

                  <td className="py-3 px-4 text-gray-600">{subModule.rank}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center space-x-3">
                      <DeleteButton
                        headerText={<Trash className="w-4 h-4" />}
                        content="By confirming, you will permanently delete this module. Proceed?"
                        onConfirm={() => handleDelete(subModule.id)}
                      />
                      <EditButton button={buttonElement(subModule.id ?? "")} />
                      {selectedId && (
                        <EditSubModule
                          visible={modal}
                          onClose={() => setShowModal(false)}
                          subModulesId={selectedId}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan={3}
                style={{
                  padding: "12px",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              ></td>
            </tr>
          )}
        </tbody>
      </table>
      {allSubModules && allSubModules?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.PageIndex ?? 1,
            firstPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.FirstPage ?? 1,
            lastPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.LastPage ?? 1,
            nextPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.NextPage ?? 1,
            previousPage: Array.isArray(allSubModules)
              ? 1
              : allSubModules?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllSubModuleForm;
