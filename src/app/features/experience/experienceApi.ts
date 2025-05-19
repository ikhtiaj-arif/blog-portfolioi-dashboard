/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../api/baseApi";

const experienceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperience: builder.query<any, void>({
      query: () => ({
        url: "/experience",
        method: "GET",
      }),
      providesTags: ["Experience"],
    }),
    createExperience: builder.mutation({
      query: (blogData) => ({
        url: "/experience",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["Experience"],
    }),

    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
