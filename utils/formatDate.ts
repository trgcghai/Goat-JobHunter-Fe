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

function formatLastMessageTime(timestamp: string | null): string {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  // Nếu trong vòng 24h → hiển thị giờ:phút
  if (diffInHours < 24) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  // Nếu xa hơn → hiển thị dd/MM
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit"
  });
}

export { formatDate, formatDateTime, getDaysSinceCreation, getTimeLabel, formatLastMessageTime };
