export interface Project {
    title: string;
    description: string;
    tech: string[];
    link: string;
    year: string;
}

export const projects: Project[] = [
    {
        title: "E-Commerce Platform",
        description: "A high-performance e-commerce solution built with Next.js and Stripe, featuring real-time inventory and AI recommendations.",
        tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
        link: "#",
        year: "2024",
    },
    {
        title: "AI Dashboard",
        description: "Analytics dashboard providing insights into model performance with interactive visualizations.",
        tech: ["React", "D3.js", "Python", "FastAPI"],
        link: "#",
        year: "2023",
    },
    {
        title: "Social Network",
        description: "Decentralized social platform utilizing generic protocols for censorship-resistant communication.",
        tech: ["Vue.js", "GraphQL", "Node.js", "IPFS"],
        link: "#",
        year: "2023",
    },
    {
        title: "Portfolio v1",
        description: "Previous iteration of my personal website, focused on minimalism and typography.",
        tech: ["Gatsby", "Styled Components", "Netlify"],
        link: "#",
        year: "2022",
    },
];
