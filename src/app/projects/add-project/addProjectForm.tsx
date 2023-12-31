"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  CreateProjectSchema,
  createProjectSchema,
} from "@/lib/validation/project";
import * as ProjectApi from "@/network/api/project";
import { handleError } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddProjectForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
  });
  async function onSubmit(data: CreateProjectSchema) {
    try {
      const project = await ProjectApi.createProject(data);
      toast.success(`Project '${project.title}' created`);
      router.refresh();
      router.push("/projects");
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
          {...register("title")}
        />
        {errors.title && (
          <p className="mb-1 text-red-500">{errors.title.message}</p>
        )}

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <input
          placeholder="Image Url"
          className="input input-bordered mb-3 w-full"
          {...register("imageUrl")}
        />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl.message}</p>
        )}

        <LoadingButton type="submit" loading={isSubmitting}>
          Add project
        </LoadingButton>
      </form>
    </div>
  );
}
