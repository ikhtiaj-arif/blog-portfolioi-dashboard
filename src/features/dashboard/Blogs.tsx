import { useGetBlogsQuery } from "@/app/api/apiSlice";

const Blogs = () => {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Blogs</h1>
      <ul className="space-y-2 mt-4">
        {blogs?.map((blog) => (
          <li key={blog.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p>{blog.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
