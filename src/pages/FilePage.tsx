import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Calendar, FileType2 } from 'lucide-react';
import { format } from 'date-fns';
import { getFileById } from '../api/files';
import type { FileItem } from '../types';

export default function FilePage() {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<FileItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFile = async () => {
      if (!id) return;
      try {
        const data = await getFileById(id);
        setFile(data || null);
      } catch (error) {
        console.error('Failed to load file:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">File not found</h2>
        <p className="text-slate-400 mt-2">The requested file does not exist.</p>
      </div>
    );
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    let size = bytes;
    while (size >= 1024 && i < sizes.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(1)} ${sizes[i]}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto my-24"
    >
      {file.thumbnailUrl && (
        <img
          src={file.thumbnailUrl}
          alt={file.title}
          className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
        />
      )}

      <div className="bg-slate-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{file.title}</h1>
        
        {file.description && (
          <p className="text-slate-400 mb-6">{file.description}</p>
        )}

        { file.fileSize > 0 && (
          <div className="flex items-center space-x-3 text-slate-300">
            <FileType2 className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Size</p>
              <p>{formatFileSize(file.fileSize)}</p>
            </div>
          </div>
        )}

          <div className="flex items-center space-x-3 text-slate-300">
            <Download className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Downloads</p>
              <p>{file.downloads}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <Calendar className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Uploaded</p>
              <p>{format(new Date(file.uploadDate), 'PPP')}</p>
            </div>
          </div>
        </div>

        <a
          href={file.fileUrl}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
          download
        >
          Download File
        </a>
    </motion.div>
  );
}