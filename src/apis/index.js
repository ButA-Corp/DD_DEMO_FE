import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://02503lhg-5242.asse.devtunnels.ms/api",
  prepareHeaders: (headers, { getState }) => {
    // Lấy token từ Redux state hoặc localStorage
    const token =
      getState().auth?.token ||
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmgiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3NTg2OTM3MzEsImV4cCI6MTc1ODcxMTczMSwiaWF0IjoxNzU4NjkzNzMxLCJpc3MiOiJ5b3VyYXBwIiwiYXVkIjoieW91cmFwcF91c2VycyJ9.5ssgWKqeSH5Q11aC5HPjxyIK4ZTHvQhQMlwmzVJz-Is";
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Account", "Employee"],
  endpoints: (builder) => ({
    // login (lấy token)
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // accounts
    getAccounts: builder.query({
      query: (params) => ({
        url: "/accounts",
        method: "GET",
        params,
      }),
      providesTags: ["Account"],
    }),
    createAccount: builder.mutation({
      query: (body) => ({
        url: "/accounts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    updateAccount: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/accounts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    deleteAccount: builder.mutation({
      query: (params) => ({
        url: `/accounts/${params?.id}?mode=${params?.mode}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
    }),
    getEmployees: builder.query({
      query: (params) => ({
        url: "/employees",
        method: "GET",
        params,
      }),
      providesTags: ["Employees"],
    }),
    importAccounts: builder.mutation({
      query: (body) => ({
        url: "/accounts/import",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    getAccountDetail: builder.query({
      query: (id) => ({
        url: `/accounts/${id}`,
        method: "GET",
      }),
      providesTags: ["AccountDetail"],
    }),
    createEmployee: builder.mutation({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
    uploadProfile: builder.mutation({
      query: ({body}) => ({
        url: `/accounts/upload-profile`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  useGetEmployeesQuery,
  useImportAccountsMutation,
  useLazyGetAccountDetailQuery,
  useCreateEmployeeMutation,
  useUploadProfileMutation,
} = apiSlice;
