export function isNumberObj(value: any): value is number {
    return typeof value === 'number' && !isNaN(value);
}

export function isNumber(numberStr: string) {
    const regex = /^-?\d*\.?\d+$/
    if (regex.test(numberStr)) return true
    return false
}