"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  CreateProjectSchema,
  createProjectSchema,
} from "@/lib/validation/project";
import * as ProjectApi from "@/network/api/project";
import { handleError } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AddProjectFormProps {
  projectToEdit?: Project;
}

export default function AddProjectForm({ projectToEdit }: AddProjectFormProps) {
  const router = useRouter();

  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    // defaultValues: {
    //   ...projectToEdit,
    // },
  });

  async function onSubmit(data: CreateProjectSchema) {
    try {
      if (projectToEdit) {
        const project = await ProjectApi.updateProject({
          ...data,
          id: projectToEdit.id,
        });
        toast.success(`Project '${project.title}' updated`);
      } else {
        const project = await ProjectApi.createProject(data);
        toast.success(`Project '${project.title}' created`);
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteProject() {
    if (!projectToEdit) return;
    try {
      //confirm?
      setDeleteInProgress(true);
      await ProjectApi.deleteProject(projectToEdit.id);
    } catch (error) {
      handleError(error);
    } finally {
      setDeleteInProgress(false);
      toast.warning("Project deleted");
      router.replace("/projects");
      router.refresh();
    }
  }

  return (
    <div>
      <h1 className="mb-3 text-center text-lg font-bold">
        {projectToEdit ? "Update" : "Add"} project
      </h1>
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

        <Controller
          control={control}
          name={"imageUrl"}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <input
                {...field}
                onChange={(event) => {
                  if (event.target?.files?.[0]) onChange(event.target.files[0]);
                }}
                placeholder="Image"
                type="file"
                id="imageUrl"
                className="file-input file-input-bordered mb-3 w-full"
                accept="image/*"
              />
            );
          }}
        />
        {errors.imageUrl && (
          <p className="text-red-500">{errors.imageUrl.message}</p>
        )}

        <LoadingButton
          disabled={deleteInProgress ? true : undefined}
          type="submit"
          loading={isSubmitting}
        >
          {projectToEdit ? "Update" : "Add"} project
        </LoadingButton>
      </form>
      {projectToEdit && (
        <LoadingButton
          disabled={isSubmitting ? true : undefined}
          className="btn btn-error btn-block mt-3"
          loading={deleteInProgress}
          onClick={deleteProject}
        >
          Delete project
        </LoadingButton>
      )}
    </div>
  );
}
