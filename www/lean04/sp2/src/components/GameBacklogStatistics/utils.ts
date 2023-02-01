import { RowData } from '../../types';

export const getCountOf = (key: keyof RowData, dataSource: Array<RowData>) =>
    dataSource.reduce((previousValue, data) => {
        switch (key) {
            case 'estimatedLength': {
                const value = data[key];
                return value && !data.finished ? previousValue + value : previousValue;
            }
            case 'owned':
            case 'playing':
            case 'finished': {
                const value = data[key];
                return previousValue + (value ? 1 : 0);
            }
            default:
                return previousValue;
        }
    }, 0);
