export const formatDateToString = (date: Date) => {
    const month = date.getMonth() + 1; // Lưu ý, tháng bắt đầu từ 0
    const day = date.getDate();

    // Lấy giờ và phút
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const result = `${day} tháng ${month} - ${hours}:${minutes}`;
    return result;
}