export const normalizeNumber = value => {
    if (!value) {
        return '';
    }
    if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        return value.slice(1);
    }
    return value.replace(/[^\d.]/g, '');
};

export const formatAmount = value => {
    // add space after every 3 digits
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
