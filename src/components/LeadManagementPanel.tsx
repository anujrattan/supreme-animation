'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Mail,
  Building2,
  Phone,
  Calendar,
  ChevronRight,
  X,
  Copy,
  ExternalLink,
  RefreshCw,
  Filter,
} from 'lucide-react';

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

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  New: { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.15)', label: 'New' },
  Contacted: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', label: 'Contacted' },
  Qualified: { color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', label: 'Qualified' },
  Converted: { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.15)', label: 'Converted' },
  Lost: { color: '#f87171', bg: 'rgba(248, 113, 113, 0.15)', label: 'Lost' },
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
    hasMore: false,
  });
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [totalAll, setTotalAll] = useState<number | null>(null);

  const fetchLeads = async (status?: string, offset = 0) => {
    try {
      setLoading(true);
      setError(null);

      const leadsEndpoint =
        process.env.NEXT_PUBLIC_GET_LEADS_ENDPOINT ||
        'http://localhost:54321/functions/v1/get-leads';

      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Missing auth token. Please log in again.');
      }

      const limit = 50;
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy: 'created_at',
        sortOrder: 'desc',
      });

      if (status && status !== 'all') {
        params.append('status', status);
      }

      const response = await fetch(`${leadsEndpoint}?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data: LeadsResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch leads');
      }

      setLeads(data.data);
      setPagination(data.pagination);
      if (!status || status === 'all') {
        setTotalAll(data.pagination.total);
      }
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
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('Missing auth token. Please log in again.');
      }

      const updateEndpoint =
        process.env.NEXT_PUBLIC_UPDATE_LEAD_STATUS_ENDPOINT ||
        'http://localhost:54321/functions/v1/update-lead-status';

      const response = await fetch(updateEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || (data && data.success === false)) {
        throw new Error((data && data.error) || 'Failed to update status');
      }

      setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)));

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
      minute: '2-digit',
    });
  };

  const getStatusCounts = () => {
    const counts: Record<string, number> = {
      all: selectedStatus === 'all' ? pagination.total : totalAll ?? pagination.total,
    };
    statusOptions.forEach((status) => {
      counts[status] = leads.filter((lead) => lead.status === status).length;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="manage-dashboard">
      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="manage-stats-row"
      >
        <div className="manage-stat-card manage-stat-primary">
          <div className="manage-stat-icon">
            <Users size={24} />
          </div>
          <div>
            <span className="manage-stat-value">{pagination.total}</span>
            <span className="manage-stat-label">Total Leads</span>
          </div>
        </div>
        <div className="manage-stat-card">
          <div className="manage-stat-icon" style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa' }}>
            <Mail size={20} />
          </div>
          <div>
            <span className="manage-stat-value">{statusCounts.New ?? 0}</span>
            <span className="manage-stat-label">New</span>
          </div>
        </div>
        <div className="manage-stat-card">
          <div className="manage-stat-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>
            <ChevronRight size={20} />
          </div>
          <div>
            <span className="manage-stat-value">{statusCounts.Qualified ?? 0}</span>
            <span className="manage-stat-label">Qualified</span>
          </div>
        </div>
        <div className="manage-stat-card">
          <div className="manage-stat-icon" style={{ background: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa' }}>
            <Users size={20} />
          </div>
          <div>
            <span className="manage-stat-value">{statusCounts.Converted ?? 0}</span>
            <span className="manage-stat-label">Converted</span>
          </div>
        </div>
      </motion.div>

      {/* Header + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="manage-section-header"
      >
        <div>
          <h1 className="manage-title">Lead Management</h1>
          <p className="manage-subtitle">Track and manage all leads from your contact form</p>
        </div>
        <button
          onClick={() => fetchLeads(selectedStatus === 'all' ? undefined : selectedStatus)}
          disabled={loading}
          className="manage-refresh-btn"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="manage-filter-row"
      >
        <Filter size={18} color="rgba(0,0,0,0.5)" />
        {(['all', ...statusOptions] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`manage-filter-pill ${selectedStatus === status ? 'manage-filter-pill-active' : ''}`}
            style={
              selectedStatus === status && status !== 'all'
                ? { borderColor: statusConfig[status]?.color, background: statusConfig[status]?.bg }
                : undefined
            }
          >
            {status === 'all' ? 'All' : status} ({statusCounts[status] ?? 0})
          </button>
        ))}
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="manage-error-banner"
        >
          {error}
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="manage-loading-state"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="manage-spinner"
          />
          <p>Loading leads...</p>
        </motion.div>
      )}

      {/* Leads Table / Cards */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="manage-leads-container"
        >
          {leads.length === 0 ? (
            <div className="manage-empty-state">
              <Users size={48} color="rgba(0,0,0,0.2)" />
              <h3>No leads yet</h3>
              <p>Leads from your contact form will appear here</p>
            </div>
          ) : (
            <div className="manage-leads-table-wrap">
              <table className="manage-leads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Service Need</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {leads.map((lead, i) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.02 }}
                        onClick={() => setSelectedLead(lead)}
                        className="manage-lead-row"
                      >
                        <td>
                          <span className="manage-lead-name">
                            {lead.first_name} {lead.last_name}
                          </span>
                        </td>
                        <td>
                          <span className="manage-lead-email">{lead.email}</span>
                        </td>
                        <td>
                          <span className="manage-lead-muted">{lead.company_name || '—'}</span>
                        </td>
                        <td>
                          <span className="manage-lead-service">{lead.service_need}</span>
                        </td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as Lead['status'])
                            }
                            disabled={updatingStatus === lead.id}
                            onClick={(e) => e.stopPropagation()}
                            className="manage-status-select"
                            style={{
                              color: statusConfig[lead.status]?.color,
                              background: statusConfig[lead.status]?.bg,
                              borderColor: statusConfig[lead.status]?.color,
                            }}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <span className="manage-lead-date">{formatDate(lead.created_at)}</span>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="manage-view-btn"
                          >
                            View
                            <ChevronRight size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLead(null)}
            className="manage-modal-backdrop"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="manage-modal"
            >
              <div className="manage-modal-header">
                <div>
                  <h2 className="manage-modal-title">
                    {selectedLead.first_name} {selectedLead.last_name}
                  </h2>
                  <p className="manage-modal-subtitle">{selectedLead.service_need}</p>
                </div>
                <button onClick={() => setSelectedLead(null)} className="manage-modal-close">
                  <X size={24} />
                </button>
              </div>

              <div className="manage-modal-body">
                <div className="manage-modal-grid">
                  <div className="manage-modal-field">
                    <label>
                      <Mail size={16} />
                      Email
                    </label>
                    <div className="manage-modal-value-row">
                      <span>{selectedLead.email}</span>
                      <button
                        onClick={() => copyToClipboard(selectedLead.email, 'Email')}
                        className="manage-copy-btn"
                        title="Copy email"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="manage-modal-field">
                    <label>
                      <Phone size={16} />
                      Phone
                    </label>
                    <div className="manage-modal-value-row">
                      <span>{selectedLead.phone || 'Not provided'}</span>
                      {selectedLead.phone && (
                        <a
                          href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="manage-copy-btn"
                          title="Open WhatsApp"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {selectedLead.company_name && (
                    <div className="manage-modal-field">
                      <label>
                        <Building2 size={16} />
                        Company
                      </label>
                      <span>{selectedLead.company_name}</span>
                    </div>
                  )}

                  <div className="manage-modal-field">
                    <label>
                      <Calendar size={16} />
                      Status
                    </label>
                    <select
                      value={selectedLead.status}
                      onChange={(e) =>
                        handleStatusChange(selectedLead.id, e.target.value as Lead['status'])
                      }
                      disabled={updatingStatus === selectedLead.id}
                      className="manage-status-select manage-status-select-modal"
                      style={{
                        color: statusConfig[selectedLead.status]?.color,
                        background: statusConfig[selectedLead.status]?.bg,
                        borderColor: statusConfig[selectedLead.status]?.color,
                      }}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="manage-modal-field manage-modal-field-full">
                  <label>Message</label>
                  <div className="manage-modal-message">{selectedLead.message}</div>
                </div>

                {selectedLead.notes && (
                  <div className="manage-modal-field manage-modal-field-full">
                    <label>Notes</label>
                    <div className="manage-modal-message">{selectedLead.notes}</div>
                  </div>
                )}

                <div className="manage-modal-meta">
                  <span>Created {formatDate(selectedLead.created_at)}</span>
                  <span>Source: {selectedLead.source}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
