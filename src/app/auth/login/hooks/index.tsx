import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/instance";
import { IPaginationResponse } from "@/types/IPaginationResponse";
import { ILoginType } from "../types/loginResponse";
const loginEndPoint = {
  register: "/api/Authentication/Register",
  login: "/api/Authentication/login",
  allUser: "/api/Authentication/all-users",
  editUser: "/api/Authentication/UpdateUser",
  userById: "/api/Authentication/User",
  deleteUser: "/api/Authentication/DeleteUser",
  addUsers: "/api/Authentication/AddUser",
  assignRoles: "/api/Authentication/AssignRoles",
  userByRoleId: "/api/Authentication/GetUserByRole",
  filterUserByDate: "/api/Authentication/FilterUserByDate",
};

const queryKey = "user";
const queryFilter = "filteredUser";
type LoginRequest = {
  email: string;
  password: string;
  Email?: string;
  Password?: string;
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [queryKey + id],
    queryFn: async () => {
      const response = await api.get<ILoginType[]>(
        `${loginEndPoint.userById}/${id}`
      );

      return response.data;
    },
    enabled: !!id,
    staleTime: 0,
    retry: false,
  });
};

export const useGetAllUsers = (params?: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const url = params
        ? `${loginEndPoint.allUser}${params}`
        : `${loginEndPoint.allUser}`;
      const response = await api.get<IPaginationResponse<ILoginType>>(url);
      return response.data;
    },
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ILoginType, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest): Promise<ILoginType> => {
      const response = await api.post(loginEndPoint.addUsers, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("Error adding module:", error);
    },
  });
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<ILoginType, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest): Promise<ILoginType> => {
      const response = await api.post(loginEndPoint.login, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => {
      console.error("Error adding module:", error);
    },
  });
};
export const useEditUser = () => {
  return useMutation<
    ILoginType,
    Error,
    { id: string | unknown; data: LoginRequest }
  >({
    mutationFn: async ({ id, data }): Promise<ILoginType> => {
      if (!id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.patch(`${loginEndPoint.editUser}/${id}`, data);
      return response.data;
    },
  });
};

export const useRemoveUser = () => {
  return useMutation<ILoginType, Error, string | undefined>({
    mutationFn: async (Id: string | undefined): Promise<ILoginType> => {
      if (!Id) {
        throw new Error("Id is required to edit a role");
      }
      const response = await api.delete(`${loginEndPoint.deleteUser}/${Id}`);
      return response.data;
    },
  });
};
export const useFilterUserByDate = (params?: string) => {
  return useQuery({
    queryKey: [queryFilter, params],

    queryFn: async () => {
      try {
        const url = params
          ? `${loginEndPoint.filterUserByDate}${params}`
          : loginEndPoint.filterUserByDate;
        const response = await api.get<IPaginationResponse<ILoginType>>(url);
        return response.data;
      } catch {
        throw new Error("Failed to fetch Filtered Sales Item ");
      }
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
