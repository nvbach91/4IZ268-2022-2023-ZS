export function getFromLocalStorage(key, defaultValue) {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        // If error also return initialValue
        console.log(error); // eslint-disable-line
        return defaultValue;
    }
}