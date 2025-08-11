export interface User {
    id: string;
    email: string;
    role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  }
  