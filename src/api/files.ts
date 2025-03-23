import { FileItem } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export const getFiles = async (): Promise<FileItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/files`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const files = data.files || [];
    
    return files.sort((a: FileItem, b: FileItem) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  } catch (error) {
    console.error('Failed to fetch files:', error);
    throw error;
  }
};

export const getFileById = async (id: string): Promise<FileItem | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${id}`);
    
    if (response.status === 404) {
      return undefined;
    }
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch file with ID ${id}:`, error);
    throw error;
  }
};

export const uploadFile = async (
  file: File, 
  title: string, 
  description: string
): Promise<FileItem> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    
    const response = await fetch(`${API_BASE_URL}/files`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getDownloadUrl = (id: string): string => {
  return `${API_BASE_URL}/files/${id}/download`;
};

export const hasViewableThumbnail = (mimeType: string): boolean => {
  return mimeType.startsWith('image/');
};
