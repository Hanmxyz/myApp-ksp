export function toWIB(utcString) {
    const utcDate = new Date(utcString);
    const wibOffset = 7 * 60; // 7 jam dalam menit
    const wibDate = new Date(utcDate.getTime() + wibOffset * 60000);
    return wibDate;
}

export function convertWIBtoUTC(dateStr, hour, minute = 0, second = 0, ms = 0) {
        // Buat waktu lokal WIB
        const local = new Date(`${dateStr}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}.${String(ms).padStart(3, '0')}`);
        // Kurangi 7 jam untuk jadi UTC
        return new Date(local.getTime() - (7 * 60 * 60 * 1000));
    }
