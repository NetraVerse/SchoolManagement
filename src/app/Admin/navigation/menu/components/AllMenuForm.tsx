"use client";
import { useEffect, useState } from "react";
import { IMenu } from "../types/IMenu";
import { useGetAllMenus } from "../hooks";
import { useForm } from "react-hook-form";
import { useRemoveMenu } from "../hooks";
import Pagination from "@/components/Pagination";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { Edit, Trash } from "lucide-react";
import EditMenu from "../pages/Edit";
import { EditButton } from "@/components/Buttons/EditButton";
import { useRouter } from "next/navigation";
const AllMenuForm = () => {
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
    menus: [] as IMenu[],
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
  const { data: allMenus, error, refetch } = useGetAllMenus(query);
  type SearchParam = {
    pageSize: number;
    pageIndex: number;
    isPagination: boolean;
  };
  const deleteMenu = useRemoveMenu();
  const handleSubmit = useForm<SearchParam>({
    defaultValues: {},
  });
  const handleDelete = async (id: string) => {
    try {
      await deleteMenu.mutateAsync(id);
      const updatedMenus = state.menus.filter((menu) => menu.id !== id);
      updateState({ menus: updatedMenus });
    } catch (error) {
      console.log("Error deleting: ", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [paginationParams]);

  const handleSearch = (params: SearchParam) => {
    params.pageSize = paginationParams.pageSize;
    setPaginationParams(params);
    updateState({ loading: true, menus: [] });
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
        style={{
          minWidth: "600px",
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
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
              TargetUrl
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
          {allMenus && allMenus?.Items?.length > 0 ? (
            allMenus?.Items?.map((menu: IMenu, index: number) => (
              <tr key={index}>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {menu.name}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {menu.targetUrl}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {menu.iconUrl}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {menu.rank}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  <div className="flex space-x-2">
                    <DeleteButton
                      onConfirm={() => handleDelete(menu.id)}
                      headerText={<Trash />}
                      content="Are you sure you want to delete this menu?"
                    />
                    <EditButton button={buttonElement(menu.id ?? "")} />
                    {selectedId && selectedId !== "" && (
                      <EditMenu
                        visible={modal}
                        onClose={() => setShowModal(false)}
                        menuId={selectedId}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))
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
      {allMenus && allMenus?.Items?.length > 0 && (
        <Pagination
          form={handleSubmit}
          pagination={{
            currentPage: Array.isArray(allMenus) ? 1 : allMenus?.PageIndex ?? 1,
            firstPage: Array.isArray(allMenus) ? 1 : allMenus?.FirstPage ?? 1,
            lastPage: Array.isArray(allMenus) ? 1 : allMenus?.LastPage ?? 1,
            nextPage: Array.isArray(allMenus) ? 1 : allMenus?.NextPage ?? 1,
            previousPage: Array.isArray(allMenus)
              ? 1
              : allMenus?.PreviousPage ?? 1,
          }}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};
export default AllMenuForm;
