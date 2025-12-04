// src/components/Card.types.ts
export interface CardProps {
    title: string;
    subtitle?: string;
    description: string;
    imageUrl?: string;
    // Using React.ReactNode allows passing complex children (other components, HTML)
    children?: React.ReactNode;
}
