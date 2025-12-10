export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectNeed: string;
  budget?: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  created_at: string;
}

