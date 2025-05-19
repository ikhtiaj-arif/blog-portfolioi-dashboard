
"use client";

import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "@/app/features/blogs/blogApi";
import TiptapEditor from "@/components/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleImageUpload } from "@/utils/imageUploader";
import { useState } from "react";




// Your image upload function
export interface Blog {
  _id: string;
  title: string;
  content: string;
  user: string;
  image: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Blogs = () => {
  const { data, isLoading, error } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();

  const blogs = data?.data || [];

  const [form, setForm] = useState<Partial<Blog>>({
    title: "",
    content: "",
    user: "",
    image: "",
    isPublished: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setForm((prev) => ({ ...prev, isPublished: checked }));
  };

  const handleSubmit = async () => {
    let imageUrl = form.image;

    if (file) {
      const uploadedUrl = await handleImageUpload(file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert("Image upload failed");
        return;
      }
    }

    const payload = {
      ...form,
      image: imageUrl,
    };

    if (editMode && editingId) {
      await updateBlog({ id: editingId, blogData: payload });
    } else {
      await createBlog(payload);
    }

    setForm({
      title: "",
      content: "",
      user: "",
      image: "",
      isPublished: false,
    });
    setFile(null);
    setEditMode(false);
    setEditingId(null);
    setOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setForm(blog);
    setEditMode(true);
    setEditingId(blog._id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditMode(false);
              setForm({
                title: "",
                content: "",
                user: "",
                image: "",
                isPublished: false,
              });
              setFile(null);
            }}>
              Add Blog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {editMode ? "Edit Blog" : "Create New Blog"}
              </h2>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input name="title" value={form.title} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                {/* <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows={4}
                /> */}
                <TiptapEditor
                  value={form.content || ""}
                  onChange={(newContent) =>
                    setForm((prev) => ({ ...prev, content: newContent }))
                  }
                />



              </div>

              <div className="space-y-2">
                <Label>User (Email)</Label>
                <Input name="user" value={form.user} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label>Image Upload</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {form.image && !file && (
                  <img src={form.image} alt="Preview" className="w-24 mt-2 rounded" />
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={form.isPublished}
                  onCheckedChange={(val) => handleCheckboxChange(!!val)}
                  id="published"
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <Button onClick={handleSubmit}>
                {editMode ? "Update" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading blogs</p>}

      {!isLoading && blogs.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog: Blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <img className="h-12 w-12" src={blog.image} alt="" />
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.user}</TableCell>
                <TableCell>{blog.isPublished ? "Published" : "Draft"}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Blogs;
