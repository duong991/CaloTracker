export const gramOfProtein = (caloNeedPerDay: number, protein: number) => {
    return (caloNeedPerDay * protein) / 4
}

export const gramOfFat = (caloNeedPerDay: number, fat: number) => {
    return (caloNeedPerDay * fat) / 9
}

export const gramOfCarb = (caloNeedPerDay: number, carb: number) => {
    return (caloNeedPerDay * carb) / 4
}