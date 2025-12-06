"use server";

import { prisma } from "@/lib/prisma";

export async function saveContact(data: { email: string; message: string }) {
    await prisma.contact.create({
        data: {
            email: data.email,
            message: data.message
        }
    });

    return { success: true };
}

export async function getContacts() {
    return await prisma.contact.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
}

export async function markContactAsRead(id: string) {
    await prisma.contact.update({
        where: { id },
        data: { read: true }
    });
}
