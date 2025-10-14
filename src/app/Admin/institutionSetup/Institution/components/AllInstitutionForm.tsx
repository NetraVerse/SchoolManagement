"use client";
import { useEffect, useState } from "react";
import { IInstitution } from "../types/IInstitution";
import { useGetAllInstitution } from "../hooks";
import { useForm } from "react-hook-form";
import Pagination from "@/components/Pagination";
import { EditButton } from "@/components/Buttons/EditButton";
import EditInstitution from "../pages/Edit";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { useRemoveInstitution } from "../hooks";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
const AllInstitutionForm = () => {
  const [modal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
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
    institutions: [] as IInstitution[],
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
  const { data: allInstitution, error, refetch } = useGetAllInstitution(query);
  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const deleteInstitution = useRemoveInstitution();

  const handleDelete = async (id: string | undefined) => {
    try {
      await deleteInstitution.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Error deleting:", error);
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
    updateState({ loading: true, institutions: [] });
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
              Address
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Email
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Short Name
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              company
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Contact Number
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              Contact Person
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
          {allInstitution && allInstitution?.Items?.length > 0 ? (
            allInstitution?.Items?.map(
              (institution: IInstitution, index: number) => (
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
                    {institution.name}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {institution.address}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #ddd",
                    }}
                    className="break-words"
                  >
                    {institution.email}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {institution.shortName}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    {/* <CompanyName id={institution.id} /> */}
                  </td>

                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {institution.contactNumber}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {institution.contactPerson}
                  </td>
                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                    className="break-words"
                  >
                    {institution.pan}
                  </td>

                  <td
                    style={{ padding: "12px", borderBottom: "1px solid #ddd" }}
                  >
                    <div className="flex space-x-2">
                      <DeleteButton
                        onConfirm={() => handleDelete(institution.id)}
                        headerText={<Trash />}
                        content="You cannot undo it. Do you really want to delete this Institution?"
                      />
                      <EditButton
                        button={buttonElement(institution.id ?? "")}
                      />

                      {selectedId && selectedId !== "" && (
                        <EditInstitution
                          visible={modal}
                          onClose={() => setShowModal(false)}
                          institutionId={selectedId}
                          currentPageIndex={paginationParams.pageIndex}
                          organizationId={institution.organizationId}
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

      {allInstitution && allInstitution?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.PageIndex ?? 1,
            firstPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.FirstPage ?? 1,
            lastPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.LastPage ?? 1,
            nextPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.NextPage ?? 1,
            previousPage: Array.isArray(allInstitution)
              ? 1
              : allInstitution?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllInstitutionForm;
