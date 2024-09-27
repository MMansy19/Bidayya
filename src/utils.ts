export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000); // Fixed the use of date.getTime()

  const intervals: { [key: string]: number } = {
    year: 31536000, // 60 * 60 * 24 * 365
    month: 2592000, // 60 * 60 * 24 * 30
    week: 604800, // 60 * 60 * 24 * 7
    day: 86400, // 60 * 60 * 24
    hour: 3600, // 60 * 60
    minute: 60, // 60
    second: 1,
  };

  for (const interval in intervals) {
    const value = Math.floor(seconds / intervals[interval]);
    if (value > 1) {
      return `${value} ${interval}s ago`;
    } else if (value === 1) {
      return `${value} ${interval} ago`;
    }
  }

  return 'just now';
}
