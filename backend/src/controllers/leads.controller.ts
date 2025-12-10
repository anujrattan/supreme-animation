import { Request, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

export const getLeads = async (req: Request, res: Response) => {
  try {
    const { status, limit = '100', offset = '0', sortBy = 'created_at', sortOrder = 'desc' } = req.query;

    const supabase = getSupabaseClient();
    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' });

    // Always filter by source starting with 'supreme_'
    query = query.like('source', 'supreme_%');

    // Apply status filter if provided
    if (status && typeof status === 'string') {
      query = query.eq('status', status);
    }

    // Apply sorting
    const validSortBy = ['created_at', 'updated_at', 'email', 'first_name', 'last_name', 'status'];
    const sortColumn = validSortBy.includes(sortBy as string) ? sortBy as string : 'created_at';
    const order = sortOrder === 'asc' ? 'asc' : 'desc';

    query = query.order(sortColumn, { ascending: order === 'asc' });

    // Apply pagination
    const limitNum = Math.min(parseInt(limit as string, 10) || 100, 500); // Max 500
    const offsetNum = parseInt(offset as string, 10) || 0;

    query = query.range(offsetNum, offsetNum + limitNum - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch leads',
        details: error.message
      });
    }

    res.json({
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
        hasMore: (count || 0) > offsetNum + limitNum
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

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .like('source', 'supreme_%')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Lead not found'
        });
      }

      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch lead',
        details: error.message
      });
    }

    res.json({
      success: true,
      data
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

export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .like('source', 'supreme_%')
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Lead not found'
        });
      }

      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update lead status',
        details: error.message
      });
    }

    res.json({
      success: true,
      message: 'Lead status updated successfully',
      data
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

