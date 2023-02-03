export const debounce = <T>(func: (args: T) => void, wait = 0) => {
    let handle: number;

    const debounced = (args: T) => {
        if (handle) {
            window.clearTimeout(handle);
        }

        handle = window.setTimeout(() => func(args), wait);
    };

    debounced.clear = () => {
        window.clearTimeout(handle);
    };

    return debounced;
};

export const normalizeString = (value: string) =>
    value
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');
