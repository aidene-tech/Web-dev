"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    return await prisma.project.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
}

export async function createProject(formData: {
    title: string;
    description: string;
    imageUrl?: string;
    demoLink?: string;
    repoLink?: string;
    tags: string;
}) {
    try {
        await prisma.project.create({
            data: {
                title: formData.title,
                description: formData.description,
                imageUrl: formData.imageUrl,
                demoLink: formData.demoLink,
                repoLink: formData.repoLink,
                tags: formData.tags,
            },
        });
        revalidatePath("/");
        revalidatePath("/projects");
        return { success: true };
    } catch (error) {
        console.error("Failed to create project:", error);
        throw new Error("Failed to create project");
    }
}
