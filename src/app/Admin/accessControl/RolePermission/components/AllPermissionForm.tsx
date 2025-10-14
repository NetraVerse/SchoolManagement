"use client";
import { useEffect, useState } from "react";
import { IRolePermission } from "../types/IRolePermission";
import { useGetAllPermission } from "../hooks";
import { useForm } from "react-hook-form";
import Pagination from "@/components/Pagination";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { EditButton } from "@/components/Buttons/EditButton";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import { useRemoveRolePermission } from "../hooks";
import { Edit, FileLock, Trash, X } from "lucide-react";
import EditRolePermission from "../Pages/Edit";
import AddPermissionToRole from "./AddPermissionToRoleForm";
import AssignedRole from "./AssignedRole";
import { usePermissions } from "@/context/auth/PermissionContext";
import useMenuPermissionData from "@/app/Admin/navigation/hooks/useMenuPermissionData";
import { useRouter } from "next/navigation";

const AllRolePermissionForm = () => {
  const [state, setState] = useState({
    loading: true,
    roles: [] as IRolePermission[],
    errorMessage: "",
  });
  const { menuStatus } = usePermissions();
  const { canEdit, canDelete, canAssign } = useMenuPermissionData(menuStatus);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState("");
  const [modalForRole, setModalForRole] = useState(false);
  const [selectedIdForRole, setSelectedIdForRole] = useState("");
  const [paginationParams, setPaginationParams] = useState({
    pageSize: 5,
    pageIndex: 1,
    isPagination: true,
  });

  const query = `?pageSize=${paginationParams.pageSize}&pageIndex=${paginationParams.pageIndex}&IsPagination=${paginationParams.isPagination}`;

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

  const { data, isLoading, error, refetch } = useGetAllPermission(query);
  useEffect(() => {
    if (data?.Items) {
      updateState({
        loading: true,
        roles: data.Items,
        errorMessage: "",
      });
    } else if (error) {
      updateState({
        loading: false,
        roles: [],
        errorMessage: "Failed to fetch roles",
      });
    }
  }, [data, error]);

  type SearchParams = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };

  const handleSubmit = useForm<SearchParams>({
    defaultValues: {},
  });
  const deleteRole = useRemoveRolePermission();
  const handleDelete = async (Id: string) => {
    try {
      await deleteRole.mutateAsync(Id);
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  const buttonElement = (id: string) => {
    return (
      <ButtonElement
        icon={<Edit size={14} />}
        type="button"
        text=""
        handleClick={() => {
          setSelectedIdEdit(id);
          setModalEdit(true);
        }}
        customStyle="!text-xs font-bold !bg-teal-500"
      />
    );
  };

  useEffect(() => {
    refetch();
  }, [paginationParams, refetch]);

  const handleSearch = (params: SearchParams) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, roles: [] });
  };

  const handleGrantPermission = (roleId: string) => {
    setSelectedIdForRole(selectedIdForRole === roleId ? "" : roleId);
    setModalForRole(selectedIdForRole !== roleId);
  };

  return (
    <div style={{ margin: "15px", overflowX: "auto" }}>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {isLoading && <p>Loading users...</p>}
      <table
        className="w-full border-collapse mb-4"
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
              PERMISSION NAME
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              ROLE NAME
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              ACTION
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
              ASSIGN ROLE TO USER
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data?.Items?.length > 0 ? (
            state?.roles?.map((permission: IRolePermission, index: number) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } `}
              >
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b">{permission.name}</td>
                <td className="p-3 border-b">
                  <AssignedRole permissionId={permission.id} />
                </td>
                <td className="p-3 border-b">
                  <div className="flex space-x-2">
                    <div className="tooltip">
                      {/* <span className="tooltiptext">Delete Role</span> */}
                      <DeleteButton
                        onConfirm={() => handleDelete(permission.id)}
                        headerText={<Trash strokeWidth={3} />}
                        content="Are you sure you want to delete it? You cannot undo it."
                      />
                    </div>
                    <div className="tooltip">
                      {/* <span className="tooltiptext">Edit Role</span> */}
                      <EditButton button={buttonElement(permission.id ?? "")} />
                      {selectedIdEdit && selectedIdEdit.trim() !== "" ? (
                        <EditRolePermission
                          permissionId={selectedIdEdit}
                          visible={modalEdit}
                          onClose={() => setModalEdit(false)}
                          Id={selectedIdEdit}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3 border-b">
                  <div className="tooltip">
                    <ButtonElement
                      icon={<FileLock size={14} />}
                      type="button"
                      text=""
                      handleClick={() => {
                        handleGrantPermission(permission.id);
                      }}
                      customStyle="!text-xs font-bold !bg-teal-500"
                    />
                  </div>

                  {selectedIdForRole === permission.id && modalForRole && (
                    <div className="">
                      <AddPermissionToRole
                        permissionId={permission.id}
                        key={selectedIdForRole}
                        onClose={() => {
                          setModalForRole(false);
                          setSelectedIdForRole("");
                        }}
                        visible={modalForRole}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ padding: "12px", textAlign: "center" }}>
                No roles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {data && data?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: data?.PageIndex,
            firstPage: data?.FirstPage,
            lastPage: data?.LastPage,
            nextPage: data?.NextPage,
            previousPage: data?.PreviousPage,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default AllRolePermissionForm;
