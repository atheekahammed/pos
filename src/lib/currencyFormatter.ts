export function currencyFormatter(
    number: number,
    locale: string = 'en-US',
    minimumFractionDigits: number = 2,
    maximumFractionDigits: number = 2
): string {
    return new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(number);
}