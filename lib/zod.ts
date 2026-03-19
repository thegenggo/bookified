import { z } from "zod";
import {
  MAX_FILE_SIZE,
  ACCEPTED_PDF_TYPES,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
  voiceOptions,
} from "@/lib/constants";

const voiceIds = Object.keys(voiceOptions) as [string, ...string[]];

export const UploadSchema = z.object({
  pdf: z
    .instanceof(File, { message: "Please upload a PDF file" })
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file.type),
      "File must be a PDF"
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File must be less than 50MB"
    ),
  coverImage: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Image must be JPEG, PNG, or WebP"
    )
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      "Image must be less than 10MB"
    )
    .optional(),
  title: z.string().min(1, "Title is required").max(200),
  author: z.string().min(1, "Author name is required").max(200),
  voice: z.enum(voiceIds, { message: "Please select a voice" }),
});
