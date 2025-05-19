import {
    useCreateExperienceMutation,
    useDeleteExperienceMutation,
    useGetExperienceQuery,
} from "@/app/features/experience/experienceApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleImageUpload } from "@/utils/imageUploader";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export interface Experience {
    _id: string;
    company_logo: string;
    company_name: string;
    job_title: string;
    duration: string;
    bullet_points: string[];
    createdAt: string;
    updatedAt: string;
}

const Experiences = () => {
    const { data: experiences, isLoading } = useGetExperienceQuery();

    const [createExperience] = useCreateExperienceMutation();
    const [deleteExperience] = useDeleteExperienceMutation();

    const [form, setForm] = useState<Partial<Experience>>({});
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);

    const resetForm = () => {
        setForm({});
        setFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const logoUrl = file ? await handleImageUpload(file) : form.company_logo;
        const payload = { ...form, company_logo: logoUrl };

        await createExperience(payload);
        resetForm();
        setOpen(false);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Experience</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                resetForm();
                                setOpen(true);
                            }}
                        >
                            Add Experience
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                            <Input
                                placeholder="Company Name"
                                value={form.company_name || ""}
                                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                            />
                            <Input
                                placeholder="Job Title"
                                value={form.job_title || ""}
                                onChange={(e) => setForm({ ...form, job_title: e.target.value })}
                            />
                            <Input
                                placeholder="Duration (e.g. JAN 2023 - APRIL 2023)"
                                value={form.duration || ""}
                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                            />
                          <Textarea
                                placeholder="Bullet points (separate by /)"
                                value={(form.bullet_points || []).join("/ ")}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        bullet_points: e.target.value.split("/").map((tag) => tag.trim()),
                                    })
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
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {experiences?.data?.map((exp: Experience) => (
                    <div key={exp._id} className="bg-white p-4 rounded shadow space-y-2">
                        <div className="flex items-center gap-4">
                            <img
                                src={exp.company_logo}
                                alt={exp.company_name}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">{exp.company_name}</h3>
                                <h4 className="italic">{exp.job_title}</h4>
                                <time className="text-sm text-gray-500">{exp.duration}</time>
                            </div>
                        </div>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                            {exp.bullet_points.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                        <div className="flex gap-2 mt-2">
                            <Button
                                variant="destructive"
                                onClick={() => deleteExperience(exp._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experiences;
