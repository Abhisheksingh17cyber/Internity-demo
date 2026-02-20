import { prisma } from "@/lib/prisma";
import type { ContactFormData } from "@/lib/validations/contact";

export async function createContactSubmission(data: ContactFormData) {
  return prisma.contactSubmission.create({
    data,
  });
}
