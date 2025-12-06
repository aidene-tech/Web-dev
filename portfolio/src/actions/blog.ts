"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
}

export async function createPost(data: { title: string; excerpt: string; content: string; date: string }) {
    // Generate slug from title
    const slug = "/blog/" + data.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    await prisma.post.create({
        data: {
            ...data,
            slug
        }
    });

    revalidatePath("/");
    revalidatePath("/blog");
    return { success: true };
}
