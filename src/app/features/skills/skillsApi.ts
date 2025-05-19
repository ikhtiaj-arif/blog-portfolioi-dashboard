/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../api/baseApi";

const SkillsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<any, void>({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
      providesTags: ["Skills"],
    }),
    createSkills: builder.mutation({
      query: (blogData) => ({
        url: "/skills",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["Skills"],
    }),

    deleteSkills: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetSkillsQuery,
  useCreateSkillsMutation,
  useDeleteSkillsMutation,
} = SkillsApi;
