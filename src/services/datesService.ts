import dayjs from 'dayjs';

export function convertDate(dateString: string) {
    const date = dayjs(dateString).format('YYYY-MM-DD HH:mm');
    
    if (date === 'Invalid Date') {
        throw new Error('Invalid Date');
    }

    return date;
}