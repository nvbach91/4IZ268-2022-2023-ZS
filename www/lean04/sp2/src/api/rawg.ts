import axios from 'axios';
import { GameInfo } from '../types';

const apiKey = 'b705c5897b954f31954253bedbeaa46b';

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
        `https://rawg.io/api/games?token&key=${apiKey}&search=${search}&page=${page}&page_size=${pageSize}&search_precise=true`
    );
};
