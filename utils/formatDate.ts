import dayjs from 'dayjs';

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

function getDaysSinceCreation(createdAt?: string) {
    if (!createdAt) return 0;

    return dayjs().startOf('day').diff(dayjs(createdAt).startOf('day'), 'day');
}

function getTimeLabel(createdAt?: string): string {
    if (!createdAt) return '';

    const days = getDaysSinceCreation(createdAt);

    if (days === 0) return 'Hôm nay';
    return `${days} ngày trước`;
}

export { formatDate, formatDateTime, getDaysSinceCreation, getTimeLabel };
