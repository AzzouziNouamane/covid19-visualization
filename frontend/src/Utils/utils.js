export const computeDifferenceInDays =(date1, date2) => {
    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
}

export const linear = (x1, y1, x2, y2, x) => {
    if (x2 - x1 === 0) {
        return 0;
    }
    return ((y2 - y1) / (x2 - x1)) * x + (y2 - ((y2 - y1) / (x2 - x1)) * x2);
}
