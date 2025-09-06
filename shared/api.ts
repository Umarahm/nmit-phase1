/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * User types for authentication
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  created_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

/**
 * Authentication API responses
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface VerifyResponse {
  success: boolean;
  user?: User;
}

/**
 * User roles
 */
export type UserRole = 'employee' | 'project_manager';

/**
 * Project types
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  project_manager: string; // User ID
  project_manager_name?: string; // Populated field
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProjectData {
  name: string;
  description: string;
  tags: string[];
  project_manager: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  image_url?: string;
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  project?: Project;
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  projects?: Project[];
}
