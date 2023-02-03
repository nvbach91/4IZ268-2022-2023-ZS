import axios from 'axios';
import { GameInfo } from '../types';

interface RawgQueryParameters {
    search: string;
    page: number;
    pageSize: number;
}

interface RawgResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<GameInfo>;
    user_platforms: boolean;
}

export const rawg = (value: RawgQueryParameters | string) => {
    if (typeof value === 'string') {
        return axios<RawgResponse>(value);
    }
    const { search, page, pageSize } = value;
    return axios<RawgResponse>(
        `https://rawg.io/api/games?token&key=${process.env.REACT_APP_RAWG_API_KEY}&search=${search}&page=${page}&page_size=${pageSize}&search_precise=true`
    );
};
