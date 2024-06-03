import { hrManagementApi } from "src/share/services";
import {localStorageUtil} from 'src/share/utils'
import type {User} from 'src/share/models/accountModels'
import type { Response,getDepartmentsResp,Department } from "src/share/models";
import type { AddDepartmentForm } from "src/layouts/modal-departments/modal-add-department";
import { ProjectResp } from "src/share/models/projectModels";
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
    updateManagerDepartment: build.mutation<Response<{data:boolean}>, {departmentId?: string, managerId?: string}>({
      query({departmentId,managerId}) {
        return {
          url: `departments/admin/update/${departmentId}`,
          method: "PUT",
          headers: {
            authorization: accessToken(),
          },
          body : {managerId}
        };
      },
      invalidatesTags : ['department']
    }),
    getReportDepartments: build.query<ProjectResp,{departmentId?: string}>({
      query: ({departmentId}) => { 
        return {
          url: `gateway/api/access/reportForDepartment/${departmentId}`,
          method: "GET",
          headers : {
            authorization: accessToken()
          },
        };
      },
      transformResponse: (response:Response<ProjectResp>) =>response.data,
    }),
    getAllProjectDepartment: build.query<ProjectResp,{departmentId?: string}>({
      query: ({departmentId}) => { 
        return {
          url: `projects/getAllProjectInDepartment/${departmentId}`,
          method: "GET",
          headers : {
            authorization: accessToken()
          },
        };
      },
      transformResponse: (response:Response<ProjectResp>) =>response.data,
    }),
  }),
  
  
});



export const { useGetDepartmentsQuery, useDeleteDepartmentsMutation,useAddDepartmentMutation,useUpdateManagerDepartmentMutation ,useGetReportDepartmentsQuery,useGetAllProjectDepartmentQuery } = DepartmentServices;
