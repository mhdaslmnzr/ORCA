/**
 * Utility functions for the ORCA application
 */

/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string or Date object
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

/**
 * Formats Remaining Useful Life (RUL) from hours to a readable format
 * @param rulHours - Remaining useful life in hours
 * @returns Formatted RUL string
 */
export function formatRUL(rulHours: number): string {
  if (rulHours < 0) return 'Expired';
  if (rulHours === 0) return 'Critical';
  
  if (rulHours < 24) {
    return `${Math.round(rulHours)} hours`;
  }
  
  const days = Math.floor(rulHours / 24);
  const remainingHours = rulHours % 24;
  
  if (days < 7) {
    if (remainingHours === 0) {
      return `${days} days`;
    }
    return `${days} days, ${Math.round(remainingHours)} hours`;
  }
  
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  
  if (weeks < 4) {
    if (remainingDays === 0) {
      return `${weeks} weeks`;
    }
    return `${weeks} weeks, ${remainingDays} days`;
  }
  
  const months = Math.floor(weeks / 4);
  const remainingWeeks = weeks % 4;
  
  if (remainingWeeks === 0) {
    return `${months} months`;
  }
  return `${months} months, ${remainingWeeks} weeks`;
}

/**
 * Formats a number with appropriate units (K, M, B)
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Formats a percentage value
 * @param value - Value between 0 and 1
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Safely format a date to prevent hydration mismatches
 * Returns a placeholder on server-side, actual time on client-side
 */
export function formatTimeSafe(date: Date, options?: Intl.DateTimeFormatOptions): string {
  if (typeof window === 'undefined') {
    return '--:--:--';
  }
  return date.toLocaleTimeString(undefined, options);
}

/**
 * Safely format a date to prevent hydration mismatches
 * Returns a placeholder on server-side, actual date on client-side
 */
export function formatDateSafe(date: Date, options?: Intl.DateTimeFormatOptions): string {
  if (typeof window === 'undefined') {
    return '--/--/----';
  }
  return date.toLocaleDateString(undefined, options);
}
