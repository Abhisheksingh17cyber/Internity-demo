import { NextResponse } from "next/server";
import { z } from "zod";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    // When database is connected, uncomment:
    // import { createContactSubmission } from "@/lib/db/contacts";
    // const submission = await createContactSubmission(validated);

    // For now, just log and return success
    console.log("Contact submission:", validated);

    return NextResponse.json(
      { success: true, message: "Submission received" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
