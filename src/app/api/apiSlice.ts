/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.example.com" }),
  endpoints: (builder) => ({
    getBlogs: builder.query<any[], void>({
      query: () => "/blogs",
    }),
    getProjects: builder.query<any[], void>({
      query: () => "/projects",
    }),
  }),
});

export const { useGetBlogsQuery, useGetProjectsQuery } = apiSlice;
