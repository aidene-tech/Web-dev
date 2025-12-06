import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

const samplePosts = [
    {
        title: "Building Modern Web Apps with Next.js 15",
        slug: "/blog/building-modern-web-apps-with-nextjs-15",
        excerpt: "Exploring the latest features in Next.js 15 including Turbopack, improved caching, and the new App Router enhancements.",
        content: `Next.js 15 brings exciting new features that make building web applications faster and more enjoyable.

## Key Features

### Turbopack
The new Turbopack bundler is now stable and provides incredible build speeds. Development server startup is up to 10x faster compared to Webpack.

### Improved Caching
Next.js 15 introduces a more intuitive caching system that gives developers better control over how data is fetched and cached.

### App Router Enhancements
The App Router continues to evolve with better error handling, improved loading states, and more powerful layouts.

## Getting Started

To upgrade to Next.js 15, simply run:
\`\`\`bash
npm install next@latest react@latest react-dom@latest
\`\`\`

Happy coding!`,
        date: "Dec 5, 2025"
    },
    {
        title: "Mastering TypeScript: Advanced Patterns",
        slug: "/blog/mastering-typescript-advanced-patterns",
        excerpt: "Deep dive into advanced TypeScript patterns including generics, conditional types, and mapped types.",
        content: `TypeScript has become an essential tool for modern JavaScript development. Let's explore some advanced patterns.

## Generic Constraints

Generics allow us to create reusable components that work with multiple types while maintaining type safety.

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
\`\`\`

## Conditional Types

Conditional types enable type transformations based on conditions:

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

## Mapped Types

Create new types by transforming existing ones:

\`\`\`typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
\`\`\`

Master these patterns to write more robust TypeScript code!`,
        date: "Dec 3, 2025"
    },
    {
        title: "The Art of Clean Code Architecture",
        slug: "/blog/the-art-of-clean-code-architecture",
        excerpt: "Learn how to structure your projects for maintainability, scalability, and developer happiness.",
        content: `Clean architecture is not just about writing clean code—it's about designing systems that are easy to understand, test, and modify.

## Core Principles

### Separation of Concerns
Each module should have a single, well-defined responsibility. This makes code easier to understand and test.

### Dependency Inversion
High-level modules should not depend on low-level modules. Both should depend on abstractions.

### Interface Segregation
Many client-specific interfaces are better than one general-purpose interface.

## Folder Structure

A clean project structure might look like:
\`\`\`
src/
├── components/    # UI components
├── hooks/         # Custom React hooks
├── services/      # API and business logic
├── utils/         # Utility functions
└── types/         # TypeScript definitions
\`\`\`

Remember: Clean code is not an end goal, it's a continuous practice.`,
        date: "Nov 28, 2025"
    },
    {
        title: "CSS Grid vs Flexbox: When to Use What",
        slug: "/blog/css-grid-vs-flexbox-when-to-use-what",
        excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.",
        content: `Both CSS Grid and Flexbox are powerful layout tools, but they excel in different scenarios.

## When to Use Flexbox

Flexbox is ideal for:
- **One-dimensional layouts** (row OR column)
- **Navigation menus**
- **Centering content**
- **Distributing space between items**

\`\`\`css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
\`\`\`

## When to Use CSS Grid

CSS Grid shines for:
- **Two-dimensional layouts** (rows AND columns)
- **Complex page layouts**
- **Card grids with consistent sizing**
- **Overlapping elements**

\`\`\`css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
\`\`\`

## The Golden Rule

Use Flexbox for UI components, use Grid for page layouts. But remember—you can (and should) combine them!`,
        date: "Nov 20, 2025"
    },
    {
        title: "Self-Hosting: Take Control of Your Data",
        slug: "/blog/self-hosting-take-control-of-your-data",
        excerpt: "A beginner's guide to self-hosting applications and services on your own infrastructure.",
        content: `Self-hosting gives you complete control over your data and services. Here's how to get started.

## Why Self-Host?

- **Privacy**: Your data stays on your servers
- **Cost savings**: Avoid subscription fees for enterprise features
- **Learning**: Understand how services really work
- **Customization**: Modify apps to fit your needs

## Essential Self-Hosted Apps

### Nextcloud
A complete productivity suite including file storage, calendar, contacts, and more.

### Gitea
A lightweight Git server perfect for personal projects and small teams.

### Jellyfin
Open-source media server for your movies, TV shows, and music.

### Uptime Kuma
Beautiful monitoring dashboard for all your services.

## Getting Started

1. Set up a VPS or home server
2. Install Docker and Docker Compose
3. Use reverse proxy (Nginx, Traefik, or Caddy)
4. Secure with SSL certificates (Let's Encrypt)

Start small and grow your homelab over time. Happy hosting!`,
        date: "Nov 15, 2025"
    }
];

async function main() {
    console.log('Seeding database with sample blog posts...');

    for (const post of samplePosts) {
        const existing = await prisma.post.findFirst({
            where: { slug: post.slug }
        });

        if (!existing) {
            await prisma.post.create({
                data: post
            });
            console.log(`Created: ${post.title}`);
        } else {
            console.log(`Skipped (exists): ${post.title}`);
        }
    }

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
