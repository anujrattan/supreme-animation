import { Request, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { sanitizeEmail } from '../utils/sanitize';

// Lazy-load Supabase client
let supabaseClient: SupabaseClient | null = null;

const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICEROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }

  return supabaseClient;
};

// Get Supabase client with anon key for client-side auth operations
const getSupabaseAnonClient = (): SupabaseClient => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase ANON_KEY environment variable');
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: false
    }
  });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    // Use anon key client for auth operations
    const supabase = getSupabaseAnonClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password
    });

    if (error) {
      console.error('Login error:', error);
      return res.status(401).json({
        success: false,
        error: error.message || 'Invalid email or password'
      });
    }

    if (!data.session || !data.user) {
      return res.status(401).json({
        success: false,
        error: 'Failed to create session'
      });
    }

    // Return session token and user info
    res.json({
      success: true,
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email
        }
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

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    const sanitizedName = name.trim().substring(0, 200);

    // Use anon key client for auth operations
    const supabase = getSupabaseAnonClient();

    const { data, error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: {
        data: {
          name: sanitizedName
        }
      }
    });

    if (error) {
      console.error('Signup error:', error);
      return res.status(400).json({
        success: false,
        error: error.message || 'Failed to create account'
      });
    }

    if (!data.user) {
      return res.status(400).json({
        success: false,
        error: 'Failed to create user'
      });
    }

    // If email confirmation is required, user will need to confirm
    // Otherwise, return session if available
    res.json({
      success: true,
      message: data.session 
        ? 'Account created successfully' 
        : 'Account created. Please check your email to confirm your account.',
      data: data.session ? {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: sanitizedName
        }
      } : {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: sanitizedName
        }
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

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({
        success: false,
        error: 'Access token is required'
      });
    }

    const supabase = getSupabaseAnonClient();

    const { data: { user }, error } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email
        }
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

export const logout = async (req: Request, res: Response) => {
  try {
    // Logout is handled client-side by clearing the token
    // This endpoint is just for consistency
    res.json({
      success: true,
      message: 'Logged out successfully'
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

