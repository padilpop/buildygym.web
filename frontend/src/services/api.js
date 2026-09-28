/**
 * BUILDY GYM — Centralized API Client Service
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('buildygym_token');

  const headers = {
    'Accept': 'application/json',
    ...(!options.isFormData && { 'Content-Type': 'application/json' }),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (options.body && !options.isFormData && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);

    // Global 401 handling
    if (response.status === 401 && !endpoint.includes('/auth/login')) {
      localStorage.removeItem('buildygym_token');
      localStorage.removeItem('buildygym_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export const authApi = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: credentials }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  me: () => apiRequest('/auth/me', { method: 'GET' }),
};

export const publicApi = {
  getLandingData: () => apiRequest('/public/landing-data'),
  getSettings: () => apiRequest('/public/settings'),
  getMemberships: () => apiRequest('/public/memberships'),
  getTrainers: () => apiRequest('/public/personal-trainers'),
  getBranches: () => apiRequest('/public/branches'),
  getFacilities: () => apiRequest('/public/facilities'),
  getTestimonials: () => apiRequest('/public/testimonials'),
  getGallery: () => apiRequest('/public/gallery'),
  getFaqs: () => apiRequest('/public/faqs'),
};

export const adminApi = {
  // Stats
  getStats: () => apiRequest('/admin/stats'),

  // Media Upload
  uploadMedia: (formData) => apiRequest('/admin/upload', {
    method: 'POST',
    body: formData,
    isFormData: true,
  }),

  // Memberships
  getMemberships: (params = '') => apiRequest(`/admin/memberships${params}`),
  createMembership: (data) => apiRequest('/admin/memberships', { method: 'POST', body: data }),
  updateMembership: (id, data) => apiRequest(`/admin/memberships/${id}`, { method: 'PUT', body: data }),
  deleteMembership: (id) => apiRequest(`/admin/memberships/${id}`, { method: 'DELETE' }),
  toggleMembershipStatus: (id) => apiRequest(`/admin/memberships/${id}/toggle-status`, { method: 'PATCH' }),

  // Trainers
  getTrainers: (params = '') => apiRequest(`/admin/personal-trainers${params}`),
  createTrainer: (data) => apiRequest('/admin/personal-trainers', { method: 'POST', body: data }),
  updateTrainer: (id, data) => apiRequest(`/admin/personal-trainers/${id}`, { method: 'PUT', body: data }),
  deleteTrainer: (id) => apiRequest(`/admin/personal-trainers/${id}`, { method: 'DELETE' }),
  toggleTrainerStatus: (id) => apiRequest(`/admin/personal-trainers/${id}/toggle-status`, { method: 'PATCH' }),

  // Branches
  getBranches: (params = '') => apiRequest(`/admin/branches${params}`),
  createBranch: (data) => apiRequest('/admin/branches', { method: 'POST', body: data }),
  updateBranch: (id, data) => apiRequest(`/admin/branches/${id}`, { method: 'PUT', body: data }),
  deleteBranch: (id) => apiRequest(`/admin/branches/${id}`, { method: 'DELETE' }),
  toggleBranchStatus: (id) => apiRequest(`/admin/branches/${id}/toggle-status`, { method: 'PATCH' }),

  // Facilities
  getFacilities: (params = '') => apiRequest(`/admin/facilities${params}`),
  createFacility: (data) => apiRequest('/admin/facilities', { method: 'POST', body: data }),
  updateFacility: (id, data) => apiRequest(`/admin/facilities/${id}`, { method: 'PUT', body: data }),
  deleteFacility: (id) => apiRequest(`/admin/facilities/${id}`, { method: 'DELETE' }),
  toggleFacilityStatus: (id) => apiRequest(`/admin/facilities/${id}/toggle-status`, { method: 'PATCH' }),

  // Testimonials
  getTestimonials: (params = '') => apiRequest(`/admin/testimonials${params}`),
  createTestimonial: (data) => apiRequest('/admin/testimonials', { method: 'POST', body: data }),
  updateTestimonial: (id, data) => apiRequest(`/admin/testimonials/${id}`, { method: 'PUT', body: data }),
  deleteTestimonial: (id) => apiRequest(`/admin/testimonials/${id}`, { method: 'DELETE' }),
  toggleTestimonialPublish: (id) => apiRequest(`/admin/testimonials/${id}/toggle-publish`, { method: 'PATCH' }),

  // Gallery
  getGallery: (params = '') => apiRequest(`/admin/gallery${params}`),
  createGallery: (data) => apiRequest('/admin/gallery', { method: 'POST', body: data }),
  updateGallery: (id, data) => apiRequest(`/admin/gallery/${id}`, { method: 'PUT', body: data }),
  deleteGallery: (id) => apiRequest(`/admin/gallery/${id}`, { method: 'DELETE' }),
  toggleGalleryStatus: (id) => apiRequest(`/admin/gallery/${id}/toggle-status`, { method: 'PATCH' }),

  // FAQs
  getFaqs: (params = '') => apiRequest(`/admin/faqs${params}`),
  createFaq: (data) => apiRequest('/admin/faqs', { method: 'POST', body: data }),
  updateFaq: (id, data) => apiRequest(`/admin/faqs/${id}`, { method: 'PUT', body: data }),
  deleteFaq: (id) => apiRequest(`/admin/faqs/${id}`, { method: 'DELETE' }),
  toggleFaqStatus: (id) => apiRequest(`/admin/faqs/${id}/toggle-status`, { method: 'PATCH' }),

  // Website Settings
  getSettings: () => apiRequest('/admin/settings'),
  updateSettings: (data) => apiRequest('/admin/settings', { method: 'PUT', body: data }),
};
