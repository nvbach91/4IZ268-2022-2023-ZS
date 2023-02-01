interface Platform {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface GameInfo {
    slug: string;
    name: string;
    platforms: Array<Platform> | null;
    released: string | null;
    metacritic: number | null;
    genres: Array<Genre> | null;
}

interface UserInput {
    estimatedLength?: number;
    owned?: boolean;
    excitement?: number;
    playing?: boolean;
    finished?: boolean;
}

export type RowData = GameInfo & UserInput;
