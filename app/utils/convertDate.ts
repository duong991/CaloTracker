export const dateToString = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const stringToDate = (date: string): Date => {
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
}

export const convertDateBeforeInsertOrUpdate = (date: Date): string => {
    if (date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    }
    return '';
}