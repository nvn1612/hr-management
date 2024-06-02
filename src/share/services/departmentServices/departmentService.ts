import { hrManagementApi } from "src/share/services";
import {localStorageUtil} from 'src/share/utils'
import type {User} from 'src/share/models/accountModels'
import type { Response,getDepartmentsResp } from "src/share/models";
import type { AddDepartmentForm } from "src/layouts/modal-departments/modal-add-department";
const accessToken = () => localStorageUtil.get("accessToken");

export const DepartmentServices = hrManagementApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query<getDepartmentsResp,{itemsPerPage?: number, page?: number, search?: string}>({
      query: ({itemsPerPage, page, search}) => { 
        return {
          url: `departments/admin/getAll`,
          method: "GET",
          headers : {
            authorization: accessToken()
          },
          params: {
            item_per_page: itemsPerPage? itemsPerPage : 5,
            page: page? page : 1,
            search: search? search : ""
          }
        };
      },
      transformResponse: (response:Response<getDepartmentsResp>) =>response.data,
      providesTags: ['department']
    }),


    deleteDepartments: build.mutation<Response<Department>, Partial<{departmentId : string}>>({
      query({departmentId}) {
        return {
          url: `departments/admin/delete/${departmentId}`,
          method: "DELETE",
          headers: {
            authorization: accessToken(),
          }
        };
      },
      invalidatesTags : ['department']
    }),
    addDepartment: build.mutation<Response<Department>, Partial<AddDepartmentForm>>({
      query(body) {
        return {
          url: `departments/admin/create`,
          method: "POST",
          headers: {
            authorization: accessToken(),
          },
          body
        };
      },
      invalidatesTags : ['department']
    }),
    getInfoManager: build.query<User,{id?: string}>({
      query: ({id}) => {
        return {
          url: `users/admin/detail/${id}`,
          method: "GET",
          headers : {
            authorization: accessToken()
          }
        };
      },
      transformResponse: (response:Response<User>) =>response.data
    })
  }),
  
});



export const { useGetDepartmentsQuery, useDeleteDepartmentsMutation,useAddDepartmentMutation,useGetInfoManagerQuery  } = DepartmentServices;
