import { useGetBlogsQuery } from "@/app/api/apiSlice";

const Projects = () => {
    const { data: projects, isLoading, error } = useGetBlogsQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading projects</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold">Blogs</h1>
            <ul className="space-y-2 mt-4">
                {projects?.map((project) => (
                    <li key={project.id} className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p>{project.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;
