"use client";
import { useEffect, useState } from "react";
import { IModules } from "../types/IModules";
import { useGetAllModules, useGetFilterModulesByDate } from "../hooks";
import { useForm } from "react-hook-form";
import { EditButton } from "@/components/Buttons/EditButton";
import EditModule from "../pages/Edit";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { useRemoveModule } from "../hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Edit } from "lucide-react";
import Pagination from "@/components/Pagination";
import { IFilterModulesByDate } from "../types/IModules";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { useRouter } from "next/router";
const AllModuleForm = () => {
  const [modal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
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
    modules: [] as IModules[],
    errorMessage: "",
  });
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 5,
    pageIndex: 1,
    isPagination: true,
  });
  // const navigate = useRouter();
  // useEffect(() => {
  //   if (!token) {
  //     navigate.push("/");
  //   }
  // }, [token]);
  const updateState = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const query = `?pagesize=${paginationParams.pageSize}&pageIndex=${paginationParams.pageIndex}&IsPagination=${paginationParams.isPagination}`;
  const { data: allModules, error, refetch } = useGetAllModules(query);
  // useEffect(() => {
  //   setState({
  //     loading: false,
  //     modules: allModules?.Items,
  //     errorMessage: error ? "Failed to fetch Modules" : "",
  //   });
  // }, [allModules, error]);

  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const deleteModule = useRemoveModule();

  const handleDelete = async (id: string | undefined) => {
    setIsLoading(true);
    try {
      await deleteModule.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = useForm<SearchParam>({
    defaultValues: {},
  });

  useEffect(() => {
    refetch();
  }, [paginationParams, refetch]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, modules: [] });
  };

  return (
    <div
      style={{
        margin: "20px",
      }}
      className="p-4"
    >
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <table
        className="w-full border-collapse mb-4 "
        style={{
          minWidth: "600px",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              SN
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Name
            </th>

            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              TargetURl
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              IconUrl
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Rank
            </th>

            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allModules && allModules.Items?.length > 0 ? (
            state?.modules?.map((module: IModules, index: number) => (
              <tr key={index}>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {module.Name}{" "}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {module.TargetUrl}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {module.IconUrl}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {module.Rank}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <div className="flex space-x-2">
                    <DeleteButton
                      headerText="Delete Module"
                      content="By Confirming you will delete the selected module. Are you sure about it?"
                      onConfirm={() => handleDelete(module.Id)}
                    />
                    <EditButton button={buttonElement(module.Id ?? "")} />

                    {selectedId && selectedId !== "" && (
                      <EditModule
                        visible={modal}
                        onClose={() => setShowModal(false)}
                        modulesId={selectedId}
                        currentPageIndex={paginationParams.pageIndex}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
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

      {allModules && allModules?.Items.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allModules)
              ? 1
              : allModules?.PageIndex ?? 1,
            firstPage: Array.isArray(allModules)
              ? 1
              : allModules?.FirstPage ?? 1,
            lastPage: Array.isArray(allModules) ? 1 : allModules?.LastPage ?? 1,
            nextPage: Array.isArray(allModules) ? 1 : allModules?.NextPage ?? 1,
            previousPage: Array.isArray(allModules)
              ? 1
              : allModules?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllModuleForm;
