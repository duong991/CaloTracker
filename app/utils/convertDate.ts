export const dateToString = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const stringToDate = (date: string): Date => {
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
}

export const convertDateBeforeInsertOrUpdate = (date: Date): string => {
    return date.toISOString().slice(0, 10)
}