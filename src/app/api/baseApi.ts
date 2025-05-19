import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-server-l2a3.vercel.app/api",
  }),
  tagTypes: ["Blogs", "Projects"],
  endpoints: () => ({}),
});
