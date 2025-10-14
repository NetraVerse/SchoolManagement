"use client";
import { useEffect, useState } from "react";
import {
  useDeleteUser,
  useGetAllUsers,
  useGetFilterUserByDate,
} from "../hooks";
import { IUserResponse, IFilterUserByDate } from "../types/IUserResponse";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { EditButton } from "@/components/Buttons/EditButton";
import { ButtonElement } from "@/components/Buttons/ButtonElement";
import EditUser from "../pages/Edit";
import { Edit, Trash, UserRoundPen } from "lucide-react";
import AssignRoleForm from "./AssignRoleForm";
import { usePermissions } from "@/context/auth/PermissionContext";
import useMenuPermissionData from "@/app/Admin/navigation/hooks/useMenuPermissionData";
import toast, { Toaster } from "react-hot-toast";
import { AppCombobox } from "@/components/Input/ComboBox";
import { useRouter } from "next/navigation";

const AllUserForm = () => {
  const navigate = useRouter();
  const { menuStatus } = usePermissions();
  const { canDelete, canEdit, canAssign } = useMenuPermissionData(menuStatus);
  const [modal, setShowModal] = useState(false);
  const [modalForAssignRole, setModalForAssignRole] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedIdForAssignRole, setSelectedIdForAssignRole] = useState("");

  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const { data: allcompany } = useGetAllUsers();

  const [formData, setFormData] = useState<IFilterUserByDate>({
    companyId: "",
    email: "",
    userName: "",
  });

  const {
    data: allUsers,
    refetch,
    error,
    isLoading,
  } = useGetFilterUserByDate(
    formData.companyId,
    formData.email,
    formData.userName
  );

  // 🔹 Auth redirect
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate.push("/");
  }, [navigate]);

  const deleteUser = useDeleteUser();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser.mutateAsync(id);
      refetch();
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  const handleAssignRole = (userId: string) => {
    setSelectedIdForAssignRole((prev) => {
      const newId = prev === userId ? "" : userId;
      setModalForAssignRole(newId !== "");
      return newId;
    });
  };

  const buttonElement = (userId: string) => (
    <ButtonElement
      icon={<Edit size={14} />}
      type="button"
      text=""
      onClick={() => {
        setShowModal(true);
        setSelectedUserId(userId);
      }}
      className="!text-xs font-bold !bg-teal-500"
    />
  );

  const handleSubmit = () => {
    setFormData({
      companyId: selectedCompany,
      email: selectedEmail,
      userName: selectedUserName,
    });
    toast.success("Users fetched successfully!");
  };

  const handleClear = () => {
    setSelectedUserName("");
    setSelectedEmail("");
    setSelectedCompany("");
    setFormData({ companyId: "", email: "", userName: "" });
  };

  return (
    <div className="p-4 max-w-screen mx-auto">
      <Toaster position="top-right" />
      {error && <p className="text-red-500 text-center">{error.message}</p>}

      <div className="mb-4 w-full flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-wrap items-center gap-4 w-full max-w-6xl"
        >
          <div className="flex gap-4 flex-1 min-w-[200px]">
            <AppCombobox
              dropDownWidth="w-52"
              dropdownPositionClass="absolute"
              label="UserName"
              name="userName"
              value={selectedUserName}
              options={allUsers ?? []}
              selected={
                selectedUserName
                  ? allUsers?.find((g) => g.UserName === selectedUserName) ??
                    null
                  : null
              }
              onSelect={(user) => setSelectedUserName(user?.UserName ?? "")}
              getLabel={(g) => g?.UserName ?? ""}
              getValue={(g) => g?.Id ?? ""}
            />

            <AppCombobox
              dropDownWidth="w-52"
              dropdownPositionClass="absolute"
              label="Email"
              name="email"
              value={selectedEmail}
              options={allUsers ?? []}
              selected={
                selectedEmail
                  ? allUsers?.find((g) => g.Email === selectedEmail) ?? null
                  : null
              }
              onSelect={(user) => setSelectedEmail(user?.Email ?? "")}
              getLabel={(g) => g?.Email ?? ""}
              getValue={(g) => g?.Email ?? ""}
            />

            <AppCombobox
              dropDownWidth="w-52"
              dropdownPositionClass="absolute"
              label="Company"
              name="companyId"
              value={selectedCompany}
              options={allUsers ?? []}
              selected={
                selectedCompany
                  ? allUsers?.find((g) => g.CompanyId === selectedCompany) ??
                    null
                  : null
              }
              onSelect={(user) => setSelectedCompany(user?.CompanyId ?? "")}
              getLabel={(g) =>
                allcompany?.Items.find((i) => i.Id === g?.CompanyId)
                  ?.UserName ?? ""
              }
              getValue={(g) => g?.CompanyId ?? ""}
            />
          </div>

          <div className="flex gap-3">
            <ButtonElement type="button" text="Submit" onClick={handleSubmit} />
            <ButtonElement
              type="button"
              text="Clear"
              onClick={handleClear}
              className="!bg-red-600"
            />
          </div>
        </form>
      </div>
      <div className="w-full overflow-x-auto rounded-md shadow-sm">
        <table
          className="w-full border-collapse text-sm sm:text-base"
          style={{ minWidth: 600, tableLayout: "fixed" }}
        >
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border-b-2">S.N</th>
              <th className="p-2 border-b-2">Company</th>
              <th className="p-2 border-b-2">UserName</th>
              <th className="p-2 border-b-2">Email</th>
              <th className="p-2 border-b-2">Created At</th>
              <th className="p-2 border-b-2">Expires At</th>
              <th className="p-2 border-b-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers && allUsers.length > 0 ? (
              allUsers.map((user: IUserResponse, index: number) => (
                <tr
                  key={user.Id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-2 border-b">{index + 1}</td>
                  <td className="p-2 border-b break-words">
                    {allcompany?.Items.find(
                      (i) =>
                        i.Id ===
                        allUsers.find((u) => u.Id === user.Id)?.CompanyId
                    )?.UserName ?? ""}
                  </td>
                  <td className="p-2 border-b break-words">{user.UserName}</td>
                  <td className="p-2 border-b break-words">{user.Email}</td>
                  <td className="p-2 border-b">{/* CreatedAt */}</td>
                  <td className="p-2 border-b">{/* ExpiresAt */}</td>
                  <td className="p-2 border-b">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* {canDelete && ( */}
                      <DeleteButton
                        onConfirm={() => handleDelete(user.Id)}
                        headerText={<Trash />}
                        content="Are you sure you want to delete this user?"
                      />
                      {/* )} */}
                      {/* {canEdit && ( */}
                      <EditButton button={buttonElement(user.Id ?? "")} />
                      {/* )} */}
                      {/* {canAssign && ( */}
                      <ButtonElement
                        icon={<UserRoundPen size={14} />}
                        type="button"
                        text=""
                        onClick={() => handleAssignRole(user.Id)}
                        className="!text-xs font-bold !bg-teal-500 py-[0.65rem]"
                      />
                      {/* )} */}

                      {selectedIdForAssignRole === user.Id &&
                        modalForAssignRole && (
                          <AssignRoleForm
                            userId={user.Id}
                            key={selectedIdForAssignRole}
                            onClose={() => {
                              setModalForAssignRole(false);
                              setSelectedIdForAssignRole("");
                            }}
                            visible={modalForAssignRole}
                          />
                        )}

                      {selectedUserId && (
                        <EditUser
                          visible={modal}
                          onClose={() => setShowModal(false)}
                          userId={selectedUserId}
                          currentPageIndex={1}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUserForm;
