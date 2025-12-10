/**
 * Sanitizes input strings to prevent XSS and injection attacks
 */

/**
 * Removes HTML tags and dangerous characters from a string
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: protocol (can be used for XSS)
    .replace(/data:/gi, '')
    // Remove vbscript: protocol
    .replace(/vbscript:/gi, '')
    // Remove on* event handlers (onclick, onerror, etc.)
    .replace(/on\w+\s*=/gi, '')
    // Remove SQL injection patterns
    .replace(/('|('')|(;)|(\-\-)|(\/\*)|(\*\/)|(\+)|(\%27)|(\%00)|(\%1a)|(\%1b)|(\%1c)|(\%1d)|(\%1e)|(\%1f))/gi, '')
    // Trim whitespace
    .trim();
};

/**
 * Sanitizes an email address
 */
export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') {
    return '';
  }

  // Basic email validation and sanitization
  const sanitized = sanitizeString(email.toLowerCase().trim());
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    return '';
  }

  return sanitized;
};

/**
 * Sanitizes a phone number (removes non-digit characters except +)
 */
export const sanitizePhone = (phone: string): string => {
  if (typeof phone !== 'string') {
    return '';
  }

  // Remove all characters except digits, +, spaces, hyphens, and parentheses
  return phone.replace(/[^\d+\-() ]/g, '').trim();
};

/**
 * Sanitizes a URL
 */
export const sanitizeUrl = (url: string): string => {
  if (typeof url !== 'string') {
    return '';
  }

  const sanitized = sanitizeString(url.trim());
  
  // Basic URL validation
  try {
    const urlObj = new URL(sanitized);
    // Only allow http and https protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return '';
    }
    return sanitized;
  } catch {
    // If URL parsing fails, return empty string
    return '';
  }
};

/**
 * Sanitizes an object by applying sanitization to all string values
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]) as any;
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]) as any;
    }
  }
  
  return sanitized;
};

