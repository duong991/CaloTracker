export const BMI = (weight: number, height: number): number => {
    return Math.round((weight * 10) / ((height / 100) * (height / 100))) / 10
}

export const BMR_MALE = (weight: number, height: number, old: number): number => {
    return Math.round(9.99 * weight + 6.25 * height - 4.92 * old + 5)
}
export const BMR_FEMALE = (weight: number, height: number, old: number): number => {
    return Math.round(9.99 * weight + 6.25 * height - 4.92 * old - 161)
}
export const TDEE = (BMR: number, R: number): number => {
    return Math.round(BMR * R)
}
export const water = (weight: number): number => {
    return Math.round(weight * 2 * 0.5 * 0.03 * 1000) // return ml
}
