import dayjs from 'dayjs';

export function convertDate(dateString: string) {
    return dayjs(dateString).format('YYYY-MM-DD HH:mm')
}