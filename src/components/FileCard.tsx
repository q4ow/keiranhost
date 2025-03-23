import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileType2, Download } from 'lucide-react';
import { format } from 'date-fns';
import { FileItem } from '../types';

interface FileCardProps {
  file: FileItem;
  index: number;
}

export default function FileCard({ file, index }: FileCardProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      {file.thumbnailUrl && (
        <img
          src={file.thumbnailUrl}
          alt={file.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{file.title}</h3>
        {file.description && (
          <p className="text-slate-400 mb-4">{file.description}</p>
        )}
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <FileType2 className="h-4 w-4" />
            <span>{formatFileSize(file.fileSize)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>{file.downloads} downloads</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-500">
          Uploaded {format(new Date(file.uploadDate), 'PPP')}
        </div>
        <Link
          to={`/file/${file.id}`}
          className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}