"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

//create a companion
export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    if (!author) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();
    const { data, error } = await supabase
    .from("companions")
    .insert({
        ...formData,
        author
    }).select();

    if (error || !data) throw new Error(error?.message || "Failed to create companion");
    return data[0];
};
