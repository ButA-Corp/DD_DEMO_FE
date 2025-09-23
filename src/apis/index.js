import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://4rbwkfw9-5242.asse.devtunnels.ms/api",
  prepareHeaders: (headers, { getState }) => {
    // Lấy token từ Redux state hoặc localStorage
    const token =
      getState().auth?.token ||
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmgiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3NTg2MzY3NzUsImV4cCI6MTc1ODY1NDc3NSwiaWF0IjoxNzU4NjM2Nzc1LCJpc3MiOiJ5b3VyYXBwIiwiYXVkIjoieW91cmFwcF91c2VycyJ9.kgFfVeG10uYvE-JYVmN7PhRGqtewI2w7HRvwzZ7WeN8";

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
      query: (id) => ({
        url: `/accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = apiSlice;
