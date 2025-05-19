/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../api/baseApi";

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<any, void>({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
       providesTags: ["Blogs"],
    }),
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs",
        method: "POST",
        body: blogData,
      }),
        invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, blogData }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: blogData,
      }),
        invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
        invalidatesTags: ["Blogs"],
    }),
  }),
   overrideExisting: false,
});
export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
