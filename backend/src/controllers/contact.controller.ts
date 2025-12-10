import { Request, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { sanitizeString, sanitizeEmail } from '../utils/sanitize';

// Lazy-load Supabase client to ensure env vars are loaded
let supabaseClient: SupabaseClient | null = null;

const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICEROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase environment variables (SUPABASE_URL and SUPABASE_SERVICEROLE_KEY are required)');
    }

    // Use service role key for server-side operations with elevated permissions
    supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }

  return supabaseClient;
};

/**
 * Splits a full name into first and last name
 */
const splitName = (fullName: string): { firstName: string; lastName: string } => {
  const sanitized = sanitizeString(fullName).trim();
  const parts = sanitized.split(/\s+/).filter(part => part.length > 0);
  
  if (parts.length === 0) {
    return { firstName: 'Unknown', lastName: 'User' };
  }
  
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: 'N/A' };
  }
  
  // Take first part as first name, rest as last name
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  
  return { firstName, lastName };
};

/**
 * Builds notes from form data (only budget now, company and service_need have their own columns)
 */
const buildNotes = (budget?: string): string => {
  if (budget) {
    return `Budget: ${sanitizeString(budget)}`;
  }
  return '';
};

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, company, projectNeed, budget, message } = req.body;

    // Sanitize all inputs
    const sanitizedName = sanitizeString(name);
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedCompany = company ? sanitizeString(company) : undefined;
    const sanitizedProjectNeed = sanitizeString(projectNeed);
    const sanitizedBudget = budget ? sanitizeString(budget) : undefined;
    const sanitizedMessage = sanitizeString(message);

    // Validate required fields after sanitization
    if (!sanitizedName || !sanitizedEmail || !sanitizedProjectNeed || !sanitizedMessage) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input: required fields are missing or invalid after sanitization'
      });
    }

    // Split name into first and last name
    const { firstName, lastName } = splitName(sanitizedName);

    // Build notes from budget only (company and service_need have their own columns)
    const notes = buildNotes(sanitizedBudget);

    // Get Supabase client (lazy-loaded)
    const supabase = getSupabaseClient();

    // Prepare lead data for insertion
    const leadData = {
      first_name: firstName,
      last_name: lastName, // Already handled in splitName function
      email: sanitizedEmail,
      phone: 'Not provided', // Required field - using placeholder since phone not in form
      message: sanitizedMessage,
      property_url: process.env.FRONTEND_URL || 'https://supremeanimation.com', // Required field - using frontend URL
      company_name: sanitizedCompany || null, // New column for company name
      service_need: sanitizedProjectNeed, // New column for service/project need
      whatsapp_same: false, // Default value
      source: 'supreme_animation_website', // Custom source identifier
      status: 'New' as const, // Default status
      notes: notes || null // Optional field (now only contains budget)
    };

    // Insert into leads table
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to submit contact form',
        details: error.message
      });
    }

    console.log('✅ Lead submitted successfully:', {
      id: data[0]?.id,
      email: sanitizedEmail,
      firstName,
      lastName,
      source: leadData.source
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: data[0]?.id,
        email: sanitizedEmail,
        status: data[0]?.status
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

