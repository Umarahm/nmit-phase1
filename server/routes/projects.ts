import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAllProjects, createProject, getProjectById, getUsersByRole } from '../db';
import { CreateProjectData, ProjectResponse, ProjectsResponse, User } from '@shared/api';

const router = Router();

// GET /projects - Get all projects for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const projects = await getAllProjects();
    
    res.json({
      success: true,
      message: 'Projects retrieved successfully',
      projects: projects
    } as ProjectsResponse);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ProjectsResponse);
  }
});

// POST /projects - Create a new project (project managers only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const user = req.user as User;
    
    // Check if user is a project manager
    if (user.role !== 'project_manager') {
      return res.status(403).json({
        success: false,
        message: 'Only project managers can create projects'
      } as ProjectResponse);
    }
    
    const projectData: CreateProjectData = req.body;
    
    // Validate required fields
    if (!projectData.name || !projectData.description || !projectData.project_manager || !projectData.deadline) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, description, project_manager, deadline'
      } as ProjectResponse);
    }
    
    // Validate deadline is in the future
    const deadline = new Date(projectData.deadline);
    if (deadline <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Deadline must be in the future'
      } as ProjectResponse);
    }
    
    // Validate priority
    if (!['low', 'medium', 'high'].includes(projectData.priority)) {
      return res.status(400).json({
        success: false,
        message: 'Priority must be low, medium, or high'
      } as ProjectResponse);
    }
    
    // Verify project manager exists
    const projectManagers = await getUsersByRole('project_manager');
    const projectManagerExists = projectManagers.find(pm => pm.id === projectData.project_manager);
    
    if (!projectManagerExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project manager'
      } as ProjectResponse);
    }
    
    // Generate project ID
    const projectId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Create project
    const project = await createProject({
      ...projectData,
      id: projectId,
      deadline: deadline
    });
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: project
    } as ProjectResponse);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ProjectResponse);
  }
});

// GET /projects/:id - Get a specific project
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await getProjectById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      } as ProjectResponse);
    }
    
    res.json({
      success: true,
      message: 'Project retrieved successfully',
      project: project
    } as ProjectResponse);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ProjectResponse);
  }
});

export default router;