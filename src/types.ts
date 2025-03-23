export interface FileItem {
  id: string;
  title: string;
  description: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: string;
  downloads: number;
  thumbnailUrl?: string;
  fileUrl: string;
}