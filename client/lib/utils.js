import { clsx } from 'clsx';
import { AVERAGE_SERVICE_TIME, SERVICES } from './constants';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatTime(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function getServiceDuration(serviceName) {
  return SERVICES.find((service) => service.value === serviceName)?.duration ?? AVERAGE_SERVICE_TIME;
}

export function estimateWaitMinutes(queue, token) {
  if (!token) {
    return 0;
  }

  const waitingAhead = queue.filter((entry) => {
    if (entry.id === token.id || entry.status === 'done') {
      return false;
    }

    if (entry.status === 'in_progress') {
      return true;
    }

    return new Date(entry.created_at).getTime() < new Date(token.created_at).getTime();
  });

  const total = waitingAhead.reduce((sum, entry) => sum + getServiceDuration(entry.service), 0);
  return Math.max(total, AVERAGE_SERVICE_TIME);
}

export function getQueueStats(queue) {
  const waiting = queue.filter((item) => item.status === 'waiting').length;
  const inProgress = queue.find((item) => item.status === 'in_progress');

  return {
    waiting,
    inProgress,
    totalActive: queue.filter((item) => item.status !== 'done').length,
  };
}
