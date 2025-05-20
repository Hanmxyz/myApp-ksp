export function toWIB(utcString) {
    const utcDate = new Date(utcString);
    const wibOffset = 7 * 60; // 7 jam dalam menit
    const wibDate = new Date(utcDate.getTime() + wibOffset * 60000);
    return wibDate;
}
