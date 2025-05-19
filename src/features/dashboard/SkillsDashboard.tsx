// components/SkillsDashboard.tsx
import { useCreateSkillsMutation, useDeleteSkillsMutation, useGetSkillsQuery } from '@/app/features/skills/skillsApi';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { handleImageUpload } from '@/utils/imageUploader';
import { DialogClose } from '@radix-ui/react-dialog';
import React, { useState } from 'react';

export interface Skill {
    _id: string;
    icon: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const SkillsDashboard = () => {
    const { data: skills, isLoading } = useGetSkillsQuery();
    const [createSkill] = useCreateSkillsMutation();
    const [deleteSkill] = useDeleteSkillsMutation();

    const [form, setForm] = useState<{ name: string }>({ name: '' });
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);

    const resetForm = () => {
        setForm({ name: '' });
        setFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert('Please select an icon image.');
            return;
        }

        // Upload the image and get the URL
        const iconUrl = await handleImageUpload(file); // Implement this function accordingly

        const payload = {
            name: form.name,
            icon: iconUrl,
        };

        await createSkill(payload);
        resetForm();
        setOpen(false);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Skills</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpen(true)}>Add Skill</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                            <Input
                                placeholder="Skill Name"
                                value={form.name}
                                onChange={(e) => setForm({ name: e.target.value })}
                            />
                            <Input
                                type="file"
                                accept="image/*"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skills?.data?.map((skill: Skill) => (
                    <div key={skill._id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={skill.icon} alt={skill.name} className="h-10 w-10 object-contain" />
                            <span className="text-lg font-medium">{skill.name}</span>
                        </div>
                        <Button variant="destructive" onClick={() => deleteSkill(skill._id)}>
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsDashboard;
