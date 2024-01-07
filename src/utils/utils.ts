import { TooManyRequestsError } from "@/network/http-errors";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export function generateFormData(input: Record<string, any>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) formData.append(key, value);
  }

  return formData;
}

export function handleError(error: unknown) {
  if (error instanceof TooManyRequestsError) {
    toast.error("Too many requests, please wait a while");
  } else if (isAxiosError(error)) {
    const axiosError = error as AxiosError<{ error: string }>;
    if (axiosError.response?.data?.error) {
      toast.error(axiosError.response.data.error);
    } else {
      toast.error("An error occurred.");
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else if (typeof error === "string") {
    toast.error(error);
  } else {
    toast.error("An error occurred.");
  }
}

export function isServer() {
  return typeof window === "undefined";
}

export function toFormData(data: Record<string, any>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    }
  });

  return formData;
}
