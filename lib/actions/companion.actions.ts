"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

//create a companion
export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    if (!author) throw new Error("Unauthorized");

    const { data, error } = await supabase
    .from("companions")
    .insert({
        ...formData,
        author
    }).select();

    if (error || !data) throw new Error(error?.message || "Failed to create companion");
    return data[0];
};

//get all companions
export const getCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    let query = supabase.from("companions").select();

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    query = query.range((page - 1) * limit, page * limit - 1);
    const { data: companions, error } = await query;

    if (error || !companions) throw new Error(error?.message || "Failed to get companions");
    return companions;
};

//get companion by id
export const getCompanionById = async (id: string) => {
    const { data: companion, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id)
    .single();

    if (error || !companion) throw new Error(error?.message || "Failed to get companion");
    
    return companion;
};

//add to session history
export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const { data, error } = await supabase
    .from("session_history")
    .insert({
        companion_id: companionId,
        user_id: userId
    });

    if (error || !data) throw new Error(error?.message || "Failed to add to session history");
    return data;
};

//get session history
export const getSessionHistory = async (limit = 10) => {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order('created_at', { ascending: false })
    .limit(limit)

    if (error || !data) throw new Error(error?.message || "Failed to get session history");
    return data.map(({ companions }) => companions);
};

//get user sessions
export const getUserSessions = async (userId: string, limit = 10) => {
    const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order('created_at', { ascending: false })
    .limit(limit)

    if (error || !data) throw new Error(error?.message || "Failed to get user sessions");
    return data.map(({ companions }) => companions);
};

//get user companions
export const getUserCompanions = async (userId: string) => {
    const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId)

    if (error || !data) throw new Error(error?.message || "Failed to get user companions");
    return data;
};

//companion permissions/subscription
export const newCompanionPermission = async () => {
    const { userId, has } = await auth();

    if (!userId) throw new Error("Unauthorized");

    let limit = 0;
    if(has({ plan: 'pro' })) {
        return true;
    } else if(has({ feature: "3_companion_limit" })) {
        limit = 3;
    } else if(has({ feature: "10_companion_limit" })) {
        limit = 10;
    }

    const { data, error } = await supabase
    .from("companion_permissions")
    .select('id', {count: 'exact'})
    .eq("author", userId)

    if (error || !data) throw new Error(error?.message || "Failed to create companion permission");
    const companionCount = data?.length;

    if (companionCount >= limit) {
        return false;
    } else {
        return true;
    }
}; 
 

