export function formatTimestamp(timestamp) {
    const now = new Date();
    const createdAtDate = new Date(timestamp.replace(' ', 'T'));
    const timeDifference = now - createdAtDate;
    
    // Define time units in milliseconds
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    
    if (timeDifference < 0) {
        // If the time is in the future (e.g., a post from the future)
        return "Just now";
      } else if (timeDifference < 1000) {
        // If the time difference is less than 1 second, display in milliseconds
        return `${Math.floor(timeDifference)} milisegundos`;
      } else if (timeDifference < 60000) {
        // If the time difference is less than 1 minute, display in seconds
        return `${Math.floor(timeDifference / 1000)} segundos`;
      } else if (timeDifference < 3600000) {
        // If the time difference is less than 1 hour, display in minutes
        return `${Math.floor(timeDifference / 60000)} minutos`;
      } else if (timeDifference < 86400000) {
        // If the time difference is less than 1 day, display in hours
        return `${Math.floor(timeDifference / 3600000)} horas`;
      } else if (timeDifference < week) {
        // If the time difference is less than 1 week, display in days
        const days = Math.floor(timeDifference / day);
        if (days === 1) {
          return "1 dia";
        } else {
          return `${days} dias`;
        }
      } else if (timeDifference >= week) {
        // If the time difference is more than or equal to a week, display in weeks
        const weeks = Math.floor(timeDifference / week);
        if (weeks === 1) {
          return "1 semana";
        } else {
          return `${weeks} semanas`;
        }
      } else {
        // If the time difference is more than a week, display the date
        return createdAtDate.toLocaleDateString();
      }
}