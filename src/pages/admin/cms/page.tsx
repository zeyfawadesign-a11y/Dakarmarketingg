import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';
import { useNavigate } from 'react-router-dom';

type ContentSection = {
  id: string;
  section_key: string;
  section_name: string;
  content_type: string;
  content_data: any;
  updated_at: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image_url: string;
  linkedin_url: string;
  display_order: number;
  is_active: boolean;
};

type Testimonial = {
  id: string;
  client_name: string;
  client_position: string;
  client_company: string;
  testimonial_text: string;
  client_image_url: string;
  rating: number;
  display_order: number;
  is_active: boolean;
};

export default function CMSPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'team' | 'testimonials'>('content');
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [contentRes, teamRes, testimonialsRes] = await Promise.all([
        supabase.from('cms_content').select('*').order('section_name'),
        supabase.from('cms_team_members').select('*').order('display_order'),
        supabase.from('cms_testimonials').select('*').order('display_order')
      ]);

      if (contentRes.data) setContentSections(contentRes.data);
      if (teamRes.data) setTeamMembers(teamRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      showMessage('error', 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSaveContent = async (section: ContentSection) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('cms_content')
        .update({ 
          content_data: section.content_data,
          updated_at: new Date().toISOString()
        })
        .eq('id', section.id);

      if (error) throw error;
      
      showMessage('success', 'Contenu mis à jour avec succès');
      setEditingSection(null);
      loadData();
    } catch (error) {
      console.error('Error saving content:', error);
      showMessage('error', 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTeamMember = async (member: TeamMember) => {
    setSaving(true);
    try {
      const { error } = member.id 
        ? await supabase.from('cms_team_members').update(member).eq('id', member.id)
        : await supabase.from('cms_team_members').insert([member]);

      if (error) throw error;
      
      showMessage('success', 'Membre de l\'équipe sauvegardé avec succès');
      setEditingMember(null);
      loadData();
    } catch (error) {
      console.error('Error saving team member:', error);
      showMessage('error', 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;
    
    try {
      const { error } = await supabase.from('cms_team_members').delete().eq('id', id);
      if (error) throw error;
      
      showMessage('success', 'Membre supprimé avec succès');
      loadData();
    } catch (error) {
      console.error('Error deleting team member:', error);
      showMessage('error', 'Erreur lors de la suppression');
    }
  };

  const handleSaveTestimonial = async (testimonial: Testimonial) => {
    setSaving(true);
    try {
      const { error } = testimonial.id 
        ? await supabase.from('cms_testimonials').update(testimonial).eq('id', testimonial.id)
        : await supabase.from('cms_testimonials').insert([testimonial]);

      if (error) throw error;
      
      showMessage('success', 'Témoignage sauvegardé avec succès');
      setEditingTestimonial(null);
      loadData();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      showMessage('error', 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;
    
    try {
      const { error } = await supabase.from('cms_testimonials').delete().eq('id', id);
      if (error) throw error;
      
      showMessage('success', 'Témoignage supprimé avec succès');
      loadData();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      showMessage('error', 'Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </button>
              <h1 className="text-2xl font-bold text-black">Gestion du Contenu</h1>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Retour au Dashboard
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message.text}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'content' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            >
              <i className="ri-file-text-line mr-2"></i>
              Sections de Contenu
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'team' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            >
              <i className="ri-team-line mr-2"></i>
              Équipe
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap cursor-pointer ${activeTab === 'testimonials' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600 hover:text-red-600'}`}
            >
              <i className="ri-chat-quote-line mr-2"></i>
              Témoignages
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'content' && (
              <div className="space-y-4">
                {contentSections.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-black">{section.section_name}</h3>
                      <button
                        onClick={() => setEditingSection(section)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-edit-line mr-2"></i>
                        Modifier
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Type:</strong> {section.content_type}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Dernière modification:</strong> {new Date(section.updated_at).toLocaleString('fr-FR')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'team' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-black">Membres de l'Équipe</h3>
                  <button
                    onClick={() => setEditingMember({
                      id: '',
                      name: '',
                      role: '',
                      image_url: '',
                      linkedin_url: '',
                      display_order: teamMembers.length + 1,
                      is_active: true
                    })}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Ajouter un Membre
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <h4 className="font-bold text-black mb-1">{member.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer text-sm"
                        >
                          <i className="ri-edit-line mr-1"></i>
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteTeamMember(member.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors whitespace-nowrap cursor-pointer text-sm"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-black">Témoignages Clients</h3>
                  <button
                    onClick={() => setEditingTestimonial({
                      id: '',
                      client_name: '',
                      client_position: '',
                      client_company: '',
                      testimonial_text: '',
                      client_image_url: '',
                      rating: 5,
                      display_order: testimonials.length + 1,
                      is_active: true
                    })}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Ajouter un Témoignage
                  </button>
                </div>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-black">{testimonial.client_name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.client_position} - {testimonial.client_company}</p>
                          <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`ri-star-${i < testimonial.rating ? 'fill' : 'line'} text-yellow-500`}></i>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTestimonial(testimonial)}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer text-sm"
                          >
                            <i className="ri-edit-line mr-1"></i>
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors whitespace-nowrap cursor-pointer text-sm"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700">{testimonial.testimonial_text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingSection && (
        <ContentEditModal
          section={editingSection}
          onSave={handleSaveContent}
          onClose={() => setEditingSection(null)}
          saving={saving}
        />
      )}

      {editingMember && (
        <TeamMemberEditModal
          member={editingMember}
          onSave={handleSaveTeamMember}
          onClose={() => setEditingMember(null)}
          saving={saving}
        />
      )}

      {editingTestimonial && (
        <TestimonialEditModal
          testimonial={editingTestimonial}
          onSave={handleSaveTestimonial}
          onClose={() => setEditingTestimonial(null)}
          saving={saving}
        />
      )}
    </div>
  );
}

function ContentEditModal({ section, onSave, onClose, saving }: { section: ContentSection; onSave: (section: ContentSection) => void; onClose: () => void; saving: boolean }) {
  const [editedData, setEditedData] = useState(section.content_data);

  const handleChange = (key: string, value: string) => {
    setEditedData({ ...editedData, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black">{section.section_name}</h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Object.keys(editedData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              {key.includes('description') || key.includes('content') ? (
                <textarea
                  value={editedData[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={editedData[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                />
              )}
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={() => onSave({ ...section, content_data: editedData })}
            disabled={saving}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamMemberEditModal({ member, onSave, onClose, saving }: { member: TeamMember; onSave: (member: TeamMember) => void; onClose: () => void; saving: boolean }) {
  const [editedMember, setEditedMember] = useState(member);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black">{member.id ? 'Modifier' : 'Ajouter'} un Membre</h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
            <input
              type="text"
              value={editedMember.name}
              onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
            <input
              type="text"
              value={editedMember.role}
              onChange={(e) => setEditedMember({ ...editedMember, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL de l'image</label>
            <input
              type="text"
              value={editedMember.image_url}
              onChange={(e) => setEditedMember({ ...editedMember, image_url: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
            <input
              type="text"
              value={editedMember.linkedin_url}
              onChange={(e) => setEditedMember({ ...editedMember, linkedin_url: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ordre d'affichage</label>
            <input
              type="number"
              value={editedMember.display_order}
              onChange={(e) => setEditedMember({ ...editedMember, display_order: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={editedMember.is_active}
              onChange={(e) => setEditedMember({ ...editedMember, is_active: e.target.checked })}
              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-600 cursor-pointer"
            />
            <label className="ml-2 text-sm text-gray-700">Actif</label>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={() => onSave(editedMember)}
            disabled={saving}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TestimonialEditModal({ testimonial, onSave, onClose, saving }: { testimonial: Testimonial; onSave: (testimonial: Testimonial) => void; onClose: () => void; saving: boolean }) {
  const [editedTestimonial, setEditedTestimonial] = useState(testimonial);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black">{testimonial.id ? 'Modifier' : 'Ajouter'} un Témoignage</h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom du Client</label>
            <input
              type="text"
              value={editedTestimonial.client_name}
              onChange={(e) => setEditedTestimonial({ ...editedTestimonial, client_name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Poste</label>
            <input
              type="text"
              value={editedTestimonial.client_position}
              onChange={(e) => setEditedTestimonial({ ...editedTestimonial, client_position: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Entreprise</label>
            <input
              type="text"
              value={editedTestimonial.client_company}
              onChange={(e) => setEditedTestimonial({ ...editedTestimonial, client_company: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Témoignage</label>
            <textarea
              value={editedTestimonial.testimonial_text}
              onChange={(e) => setEditedTestimonial({ ...editedTestimonial, testimonial_text: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Note (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editedTestimonial.rating}
              onChange={(e) => setEditedTestimonial({ ...editedTestimonial, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ordre d'affichage</label>
            <input
              type="number"
              value={editedTestimonial.display_order}
              onChange={(e) => setEditedTestimonial({ ...editedTestimonial, display_order: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={editedTestimonial.is_active}
              onChange={(e) => setEditedTestimonial({ ...editedTestimonial, is_active: e.target.checked })}
              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-600 cursor-pointer"
            />
            <label className="ml-2 text-sm text-gray-700">Actif</label>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={() => onSave(editedTestimonial)}
            disabled={saving}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>
    </div>
  );
}
