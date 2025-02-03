export type Recipe = {
    Id: number;
    title: string;
    description?: string; 
    authorId: number;
    ingredients?: string[];
    instructions: string;
};
