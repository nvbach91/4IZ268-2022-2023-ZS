export const normalizeNumber = value => {
    if (!value) {
        return '';
    }
    return value.replace(/[^\d.]/g, '');
};
