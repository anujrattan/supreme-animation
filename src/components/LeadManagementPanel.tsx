'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  property_url: string;
  company_name: string | null;
  service_need: string;
  whatsapp_same: boolean;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface LeadsResponse {
  success: boolean;
  data: Lead[];
  error?: string;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

const statusColors: Record<string, string> = {
  New: '#3b82f6',
  Contacted: '#f59e0b',
  Qualified: '#10b981',
  Converted: '#8b5cf6',
  Lost: '#ef4444'
};

const statusOptions: Lead['status'][] = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export default function LeadManagementPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0,
    hasMore: false
  });
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchLeads = async (status?: string, offset = 0) => {
    try {
      setLoading(true);
      setError(null);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const limit = 50; // Fixed limit for now
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy: 'created_at',
        sortOrder: 'desc'
      });

      if (status && status !== 'all') {
        params.append('status', status);
      }

      const response = await fetch(`${backendUrl}/api/leads?${params.toString()}`);
      const data: LeadsResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch leads');
      }

      setLeads(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(selectedStatus === 'all' ? undefined : selectedStatus);
  }, [selectedStatus]);

  const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
    try {
      setUpdatingStatus(leadId);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update status');
      }

      // Update the lead in the list
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));

      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusCounts = () => {
    const counts: Record<string, number> = {};
    statusOptions.forEach(status => {
      counts[status] = leads.filter(lead => lead.status === status).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          color: '#fff', 
          marginBottom: '0.5rem' 
        }}>
          Lead Management
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem' }}>
          Manage and track all leads from the contact form
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '1rem'
      }}>
        <button
          onClick={() => setSelectedStatus('all')}
          style={{
            padding: '0.5rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: selectedStatus === 'all' ? '#C41E3A' : 'rgba(255,255,255,0.1)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
        >
          All ({pagination.total})
        </button>
        {statusOptions.map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: selectedStatus === status ? statusColors[status] : 'rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            {status} ({statusCounts[status] || 0})
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#ef4444',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.6)' }}>
          Loading leads...
        </div>
      )}

      {/* Leads Table */}
      {!loading && !error && (
        <div style={{
          backgroundColor: '#080808',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.9rem' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.9rem' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.9rem' }}>Company</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.9rem' }}>Service Need</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.9rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.9rem' }}>Created</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: '0.9rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                      No leads found
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td style={{ padding: '1rem', color: '#fff' }}>
                        {lead.first_name} {lead.last_name}
                      </td>
                      <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                        {lead.email}
                      </td>
                      <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                        {lead.company_name || '-'}
                      </td>
                      <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                        {lead.service_need}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                          disabled={updatingStatus === lead.id}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '0.25rem',
                            border: 'none',
                            background: statusColors[lead.status],
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            opacity: updatingStatus === lead.id ? 0.6 : 1
                          }}
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                        {formatDate(lead.created_at)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '0.25rem',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'transparent',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedLead(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#080808',
              borderRadius: '1rem',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                Lead Details
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                  Name
                </label>
                <div style={{ color: '#fff', fontSize: '1.1rem' }}>
                  {selectedLead.first_name} {selectedLead.last_name}
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <div style={{ color: '#fff', fontSize: '1.1rem' }}>
                  {selectedLead.email}
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                  Phone
                </label>
                <div style={{ color: '#fff', fontSize: '1.1rem' }}>
                  {selectedLead.phone || 'Not provided'}
                </div>
              </div>

              {selectedLead.company_name && (
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                    Company
                  </label>
                  <div style={{ color: '#fff', fontSize: '1.1rem' }}>
                    {selectedLead.company_name}
                  </div>
                </div>
              )}

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                  Service Need
                </label>
                <div style={{ color: '#fff', fontSize: '1.1rem' }}>
                  {selectedLead.service_need}
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                  Status
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                  disabled={updatingStatus === selectedLead.id}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: statusColors[selectedLead.status],
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    opacity: updatingStatus === selectedLead.id ? 0.6 : 1
                  }}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                  Message
                </label>
                <div style={{ 
                  color: '#fff', 
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  padding: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.5rem',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedLead.message}
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                    Notes
                  </label>
                  <div style={{ 
                    color: '#fff', 
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '0.5rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedLead.notes}
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                    Created
                  </label>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                    {formatDate(selectedLead.created_at)}
                  </div>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                    Updated
                  </label>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                    {formatDate(selectedLead.updated_at)}
                  </div>
                </div>
              </div>

              <div>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                  Source
                </label>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  {selectedLead.source}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

