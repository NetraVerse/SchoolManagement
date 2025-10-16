"use client";
import { useEffect, useState } from "react";
import { ICompany } from "../types/ICompany";
import { useGetAllCompany, useGetFilterCompanyByDate } from "../hooks";
import { useForm } from "react-hook-form";
import Pagination from "@/components/Pagination";
import { EditButton } from "@/components/Buttons/EditButton";
import EditCompany from "../pages/Edit";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { useRemoveCompany } from "../hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Edit, Plus, Trash } from "lucide-react";
import { IFilterCompanyByDate } from "../types/ICompany";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { UserName } from "./UserName";
import { useRouter } from "next/navigation";
import Add from "../pages/Add";
const AllCompanyForm = () => {
  const [modal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [addModal, setAddModal] = useState(false);
  const buttonElement = (id: string) => {
    return (
      <ButtonElement
        icon={<Edit size={14} />}
        type="button"
        text=""
        handleClick={() => {
          setShowModal(true);
          setSelectedId(id);
        }}
        customStyle="!text-xs font-bold !bg-teal-500"
      />
    );
  };

  const [state, setState] = useState({
    loading: true,
    Company: [] as ICompany[],
    errorMessage: "",
  });
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 5,
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
  const { data: allCompany, error, refetch } = useGetAllCompany(query);

  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const deleteCompany = useRemoveCompany();

  const handleDelete = async (id: string | undefined) => {
    setIsLoading(true);
    try {
      await deleteCompany.mutateAsync(id);
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
  }, [paginationParams]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, Company: [] });
  };

  return (
    <div className="m-[20px]">
      <div
        style={{
          margin: "20px",
          overflowX: "auto",
        }}
        className="p-4"
      >
        <div className="flex w-full justify-between p-3 px-4 pt-4 items-center ">
          <h1 className=" text-xl font-semibold ">All Permission</h1>
          <ButtonElement
            icon={<Plus size={24} />}
            type="button"
            text="Add New Company"
            onClick={() => setAddModal(true)}
            className="!text-md !font-bold"
          />
        </div>

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
                Address
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Short Name
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Contact Number
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Contact Person
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Assigned Users
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Pan
              </th>

              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allCompany && allCompany?.Items?.length > 0 ? (
              allCompany?.Items.map((Company: ICompany, index: number) => (
                <tr key={index}>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                    className="break-words"
                  >
                    {Company.name}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {Company.address}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                    className="break-words"
                  >
                    {Company.email}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {Company.shortName}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {Company.contactNumber}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {Company.contactPerson}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {Company.Users.map((item, index) => (
                      <div key={index} className="flex">
                        <UserName userId={item.userId} /> , &nbsp;
                      </div>
                    ))}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {Company.pan}
                  </td>

                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    <div className="flex space-x-2">
                      <DeleteButton
                        onConfirm={() => handleDelete(Company.id)}
                        headerText={<Trash color="red" />}
                        content="Are you sure you want to delete this company?"
                      />
                      <EditButton button={buttonElement(Company.id ?? "")} />

                      {selectedId && selectedId !== "" && (
                        <EditCompany
                          visible={modal}
                          onClose={() => setShowModal(false)}
                          CompanyId={selectedId}
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
            <Add visible={addModal} onClose={() => setAddModal(!addModal)} />
          </tbody>
        </table>

        {allCompany && allCompany?.Items?.length > 0 && (
          <Pagination
            form={handleSubmit}
            pagination={{
              currentPage: Array.isArray(allCompany)
                ? 1
                : allCompany?.PageIndex ?? 1,
              firstPage: Array.isArray(allCompany)
                ? 1
                : allCompany?.FirstPage ?? 1,
              lastPage: Array.isArray(allCompany)
                ? 1
                : allCompany?.LastPage ?? 1,
              nextPage: Array.isArray(allCompany)
                ? 1
                : allCompany?.NextPage ?? 1,
              previousPage: Array.isArray(allCompany)
                ? 1
                : allCompany?.PreviousPage ?? 1,
            }}
            handleSearch={handleSearch}
          />
        )}
      </div>
    </div>
  );
};
export default AllCompanyForm;
