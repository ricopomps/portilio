"use client";

import * as ProjectApi from "@/network/api/project";
import { ProjectFormData } from "@/network/api/project";
import { handleError } from "@/utils/utils";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function AddProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>();
  async function onSubmit(data: ProjectFormData) {
    // Call your addProject function here
    //addProject(data);
    try {
      const project = await ProjectApi.createProject(data);
      toast.success(`Project '${project.title}' created`);
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div>
      <h1 className="mb-3 text-center text-lg font-bold">Add project</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          className="input input-bordered mb-3 w-full"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="mb-1 text-red-500">{errors.title.message}</p>
        )}

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <input
          placeholder="Image Url"
          className="input input-bordered mb-3 w-full"
          {...register("imageUrl", { required: "Image URL is required" })}
        />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl.message}</p>
        )}

        <button type="submit" className="btn btn-primary btn-block">
          Add project
        </button>
      </form>
    </div>
  );
}
