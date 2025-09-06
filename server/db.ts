import { neon } from '@neondatabase/serverless';
import { User, CreateUserData, Project, CreateProjectData } from '@shared/api';

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

// Database initialization
export async function initializeDatabase() {
    try {
        // Create users table if it doesn't exist
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(100) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

        // Create projects table if it doesn't exist
        await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        tags TEXT, -- JSON array stored as text
        project_manager UUID NOT NULL,
        deadline TIMESTAMP NOT NULL,
        priority VARCHAR(50) NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (project_manager) REFERENCES users(id)
      )
    `;

        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}

// User database operations
export async function createUser(userData: CreateUserData & { password_hash: string }): Promise<User> {
    const result = await sql`
    INSERT INTO users (email, password_hash, name, role)
    VALUES (${userData.email}, ${userData.password_hash}, ${userData.name}, ${userData.role || 'user'})
    RETURNING id, email, name, role, created_at
  `;

    return result[0] as User;
}

export async function getUserByEmail(email: string): Promise<(User & { password_hash: string }) | null> {
    const result = await sql`
    SELECT id, email, password_hash, name, role, created_at
    FROM users
    WHERE email = ${email}
  `;

    return result[0] as (User & { password_hash: string }) || null;
}

export async function getUserById(id: string): Promise<User | null> {
    const result = await sql`
    SELECT id, email, name, role, created_at
    FROM users
    WHERE id = ${id}
  `;

    return result[0] as User || null;
}

export async function emailExists(email: string): Promise<boolean> {
    const result = await sql`
    SELECT 1 FROM users WHERE email = ${email} LIMIT 1
  `;

    return result.length > 0;
}

export async function getUsersByRole(role: string): Promise<User[]> {
    const result = await sql`
    SELECT id, email, name, role, created_at
    FROM users
    WHERE role = ${role}
    ORDER BY name
  `;

    return result as User[];
}

// Project database operations
export async function createProject(projectData: CreateProjectData & { id: string }): Promise<Project> {
    const result = await sql`
    INSERT INTO projects (id, name, description, tags, project_manager, deadline, priority, image_url)
    VALUES (
      ${projectData.id},
      ${projectData.name},
      ${projectData.description},
      ${JSON.stringify(projectData.tags || [])},
      ${projectData.project_manager},
      ${projectData.deadline.toISOString()},
      ${projectData.priority},
      ${projectData.image_url || null}
    )
    RETURNING *
  `;

    const project = result[0] as any;
    if (project.tags) {
        project.tags = JSON.parse(project.tags);
    }
    return project as Project;
}

export async function getProjectById(id: string): Promise<Project | null> {
    const result = await sql`
    SELECT 
      p.*,
      u.name as project_manager_name
    FROM projects p
    LEFT JOIN users u ON p.project_manager = u.id
    WHERE p.id = ${id}
  `;

    if (result.length === 0) return null;

    const project = result[0] as any;
    if (project.tags) {
        project.tags = JSON.parse(project.tags);
    }
    return project as Project;
}

export async function getAllProjects(): Promise<Project[]> {
    const result = await sql`
    SELECT 
      p.*,
      u.name as project_manager_name
    FROM projects p
    LEFT JOIN users u ON p.project_manager = u.id
    ORDER BY p.created_at DESC
  `;

    return result.map((project: any) => {
        if (project.tags) {
            project.tags = JSON.parse(project.tags);
        }
        return project as Project;
    });
}

export async function getProjectsByManager(managerId: string): Promise<Project[]> {
    const result = await sql`
    SELECT 
      p.*,
      u.name as project_manager_name
    FROM projects p
    LEFT JOIN users u ON p.project_manager = u.id
    WHERE p.project_manager = ${managerId}
    ORDER BY p.created_at DESC
  `;

    return result.map((project: any) => {
        if (project.tags) {
            project.tags = JSON.parse(project.tags);
        }
        return project as Project;
    });
}