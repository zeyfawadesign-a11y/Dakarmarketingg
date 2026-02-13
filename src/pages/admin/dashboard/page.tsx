
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../../utils/supabase';

interface Lead {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  company: string;
  service_interest: string;
  budget: string;
  timeline: string;
  sector: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
  preferred_date: string;
}

interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  company: string;
  message: string;
  status: string;
  created_at: string;
}

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  preferred_date: string;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  totalLeads: number;
  newLeads: number;
  contacts: number;
  appointments: number;
  subscribers: number;
}

type TabType = 'leads' | 'contacts' | 'appointments';
type StatusType = 'nouveau' | 'en_cours' | 'converti' | 'perdu';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, newLeads: 0, contacts: 0, appointments: 0, subscribers: 0 });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('leads');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!adminData) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      loadDashboardData();
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/admin/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      const [leadsRes, contactsRes, appointmentsRes, subscribersRes, newLeadsRes] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('appointments').select('*').order('created_at', { ascending: false }),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'nouveau'),
      ]);

      setLeads(leadsRes.data || []);
      setContacts(contactsRes.data || []);
      setAppointments(appointmentsRes.data || []);

      setStats({
        totalLeads: leadsRes.data?.length || 0,
        newLeads: newLeadsRes.count || 0,
        contacts: contactsRes.data?.length || 0,
        appointments: appointmentsRes.data?.length || 0,
        subscribers: subscribersRes.count || 0,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: StatusType) => {
    try {
      await supabase.from('leads').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', leadId);
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: string) => {
    try {
      await supabase.from('contact_messages').update({ status: newStatus }).eq('id', contactId);
      setContacts(contacts.map(c => c.id === contactId ? { ...c, status: newStatus } : c));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      await supabase.from('appointments').update({ status: newStatus }).eq('id', appointmentId);
      setAppointments(appointments.map(a => a.id === appointmentId ? { ...a, status: newStatus } : a));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => `"${(row[h] || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': case 'new': case 'pending': return 'bg-blue-100 text-blue-800';
      case 'en_cours': case 'confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'converti': case 'completed': return 'bg-green-100 text-green-800';
      case 'perdu': case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nouveau': case 'new': return 'Nouveau';
      case 'en_cours': return 'En cours';
      case 'converti': return 'Converti';
      case 'perdu': return 'Perdu';
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmé';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'contact_form': return 'Formulaire contact';
      case 'demande_devis': return 'Demande devis';
      case 'chatbot': return 'Chatbot';
      default: return source || 'Direct';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSource = filterSource === 'all' || lead.source === filterSource;
    const matchesSearch = searchQuery === '' || 
      lead.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSource && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-red-600 animate-spin"></i>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-black">Gestion des Leads</h1>
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                {stats.newLeads} nouveaux
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/admin/cms')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-file-edit-line mr-2"></i>CMS
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-logout-box-line mr-2"></i>Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-user-add-line text-red-600 text-lg"></i>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
            <p className="text-sm text-gray-500">Total leads</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-notification-badge-line text-blue-600 text-lg"></i>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.newLeads}</p>
            <p className="text-sm text-gray-500">Nouveaux</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-mail-line text-green-600 text-lg"></i>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.contacts}</p>
            <p className="text-sm text-gray-500">Messages</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-check-line text-orange-600 text-lg"></i>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.appointments}</p>
            <p className="text-sm text-gray-500">RDV</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-mail-star-line text-purple-600 text-lg"></i>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.subscribers}</p>
            <p className="text-sm text-gray-500">Abonnés</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {(['leads', 'contacts', 'appointments'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab === 'leads' && <><i className="ri-user-line mr-2"></i>Leads ({leads.length})</>}
              {tab === 'contacts' && <><i className="ri-mail-line mr-2"></i>Messages ({contacts.length})</>}
              {tab === 'appointments' && <><i className="ri-calendar-line mr-2"></i>RDV ({appointments.length})</>}
            </button>
          ))}
        </div>

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="flex gap-6">
            {/* Leads List */}
            <div className={`${selectedLead ? 'w-1/2' : 'w-full'} transition-all`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
                  <div className="relative flex-1 min-w-[200px]">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="converti">Converti</option>
                    <option value="perdu">Perdu</option>
                  </select>
                  <select
                    value={filterSource}
                    onChange={(e) => setFilterSource(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer"
                  >
                    <option value="all">Toutes les sources</option>
                    <option value="demande_devis">Demande devis</option>
                    <option value="contact_form">Formulaire contact</option>
                    <option value="chatbot">Chatbot</option>
                  </select>
                  <button
                    onClick={() => exportToCSV(filteredLeads, 'leads')}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-download-line mr-2"></i>Exporter
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Service</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Source</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedLead?.id === lead.id ? 'bg-red-50' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-600">
                                  {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{lead.full_name || '-'}</p>
                                <p className="text-xs text-gray-500">{lead.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-600 truncate max-w-[150px]">{lead.service_interest || '-'}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-xs text-gray-500">{getSourceLabel(lead.source)}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                              {getStatusLabel(lead.status)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-xs text-gray-500">{formatDate(lead.created_at)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredLeads.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <i className="ri-inbox-line text-4xl mb-2"></i>
                      <p className="text-sm">Aucun lead trouvé</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lead Detail Panel */}
            {selectedLead && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-1/2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Détails du lead</h3>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {/* Contact Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-red-600">
                          {selectedLead.full_name?.charAt(0)?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{selectedLead.full_name || 'Sans nom'}</h4>
                        <p className="text-sm text-gray-500">{selectedLead.company || 'Entreprise non renseignée'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <i className="ri-mail-line text-gray-400"></i>
                        <a href={`mailto:${selectedLead.email}`} className="text-red-600 hover:underline">{selectedLead.email}</a>
                      </div>
                      {selectedLead.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <i className="ri-phone-line text-gray-400"></i>
                          <a href={`tel:${selectedLead.phone}`} className="text-gray-700">{selectedLead.phone}</a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <div className="flex gap-2">
                      {(['nouveau', 'en_cours', 'converti', 'perdu'] as StatusType[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateLeadStatus(selectedLead.id, status)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                            selectedLead.status === status
                              ? getStatusColor(status)
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {getStatusLabel(status)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-semibold text-gray-900 border-b pb-2">Informations</h5>
                    
                    {selectedLead.service_interest && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Service demandé</p>
                        <p className="text-sm text-gray-900">{selectedLead.service_interest}</p>
                      </div>
                    )}

                    {selectedLead.budget && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Budget</p>
                        <p className="text-sm text-gray-900">{selectedLead.budget}</p>
                      </div>
                    )}

                    {selectedLead.timeline && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Délai</p>
                        <p className="text-sm text-gray-900">{selectedLead.timeline}</p>
                      </div>
                    )}

                    {selectedLead.sector && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Secteur</p>
                        <p className="text-sm text-gray-900">{selectedLead.sector}</p>
                      </div>
                    )}

                    {selectedLead.preferred_date && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date souhaitée</p>
                        <p className="text-sm text-gray-900">{formatDate(selectedLead.preferred_date)}</p>
                      </div>
                    )}

                    {selectedLead.message && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Message / Description</p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedLead.message}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <p className="text-xs text-gray-500">
                        Source: <span className="font-medium">{getSourceLabel(selectedLead.source)}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Créé le: <span className="font-medium">{formatDate(selectedLead.created_at)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all text-center whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-mail-send-line mr-2"></i>Envoyer un email
                    </a>
                    {selectedLead.phone && (
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-phone-line mr-2"></i>Appeler
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Messages de contact</h3>
              <button
                onClick={() => exportToCSV(contacts, 'contacts')}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line mr-2"></i>Exporter
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{contact.full_name}</p>
                      <p className="text-sm text-gray-500">{contact.email} {contact.company && `• ${contact.company}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-medium rounded-full cursor-pointer ${getStatusColor(contact.status)}`}
                      >
                        <option value="new">Nouveau</option>
                        <option value="en_cours">En cours</option>
                        <option value="completed">Traité</option>
                      </select>
                      <span className="text-xs text-gray-400">{formatDate(contact.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{contact.message}</p>
                </div>
              ))}
              {contacts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <i className="ri-mail-line text-4xl mb-2"></i>
                  <p className="text-sm">Aucun message</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Demandes de rendez-vous</h3>
              <button
                onClick={() => exportToCSV(appointments, 'appointments')}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line mr-2"></i>Exporter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Service</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date souhaitée</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Créé le</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">{apt.name}</p>
                        <p className="text-xs text-gray-500">{apt.email}</p>
                        {apt.phone && <p className="text-xs text-gray-500">{apt.phone}</p>}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{apt.service || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{apt.preferred_date ? formatDate(apt.preferred_date) : '-'}</td>
                      <td className="py-3 px-4">
                        <select
                          value={apt.status}
                          onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full cursor-pointer ${getStatusColor(apt.status)}`}
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmé</option>
                          <option value="completed">Terminé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-500">{formatDate(apt.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {appointments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <i className="ri-calendar-line text-4xl mb-2"></i>
                  <p className="text-sm">Aucun rendez-vous</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
