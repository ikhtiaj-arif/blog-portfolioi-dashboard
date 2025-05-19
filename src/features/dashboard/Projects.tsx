import {
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useGetProjectsQuery,
    useUpdateProjectMutation,
} from "@/app/features/projects/projectsApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleImageUpload } from "@/utils/imageUploader";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export interface Project {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    live_link: string;
    source_code_link_client: string;
    source_code_link_server: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}

const Projects = () => {
    const { data: projects, isLoading } = useGetProjectsQuery();

    const [createProject] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();

    const [form, setForm] = useState<Partial<Project>>({});
    const [file, setFile] = useState<File | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false); // CONTROL DIALOG OPEN STATE

    const resetForm = () => {
        setForm({});
        setFile(null);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const imageUrl = file ? await handleImageUpload(file) : form.image;
        const payload = { ...form, image: imageUrl };

        if (editMode && form._id) {
            await updateProject({ id: form._id, projectData: payload });
        } else {
            await createProject(payload);
        }

        resetForm();
        setOpen(false); // CLOSE MODAL
    };

    const handleEdit = (project: Project) => {
        setForm(project);
        setEditMode(true);
        setOpen(true); // OPEN MODAL ON EDIT
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Dialog open={open}  onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                resetForm();
                                setOpen(true);
                            }}
                        >
                            Create Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                            <Input
                                placeholder="Title"
                                value={form.title || ""}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                            <Textarea
                                placeholder="Description"
                                value={form.description || ""}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                            <Input
                                placeholder="Tags (comma separated)"
                                value={(form.tags || []).join(", ")}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        tags: e.target.value.split(",").map((tag) => tag.trim()),
                                    })
                                }
                            />
                            <Input
                                placeholder="Live link"
                                value={form.live_link || ""}
                                onChange={(e) => setForm({ ...form, live_link: e.target.value })}
                            />
                            <Input
                                placeholder="Client Repository link"
                                value={form.source_code_link_client || ""}
                                onChange={(e) =>
                                    setForm({ ...form, source_code_link_client: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Server Repository link"
                                value={form.source_code_link_server || ""}
                                onChange={(e) =>
                                    setForm({ ...form, source_code_link_server: e.target.value })
                                }
                            />
                            <Input
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            <div className="flex justify-between">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit">{editMode ? "Update" : "Create"}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects?.data?.map((project: Project) => (
                    <div key={project._id} className="p-4 bg-white rounded shadow space-y-2">
                        <img src={project.image} alt={project.title} className="h-32 object-cover rounded" />
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="flex gap-2 flex-wrap">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-gray-200 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <a href={project.live_link} className="text-blue-600 underline mr-2" target="_blank" rel="noopener noreferrer">
                            Live Preview
                        </a>
                        {project.source_code_link_client && (
                            <>
                                <a href={project.source_code_link_client} className="text-blue-600 underline mr-2" target="_blank" rel="noopener noreferrer">
                                    Client Repository
                                </a>
                                <a href={project.source_code_link_server} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                                    Server Repository
                                </a>
                            </>
                        )}
                        <div className="flex gap-2 mt-2">
                            <Button onClick={() => handleEdit(project)}>Edit</Button>
                            <Button variant="destructive" onClick={() => deleteProject(project._id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
