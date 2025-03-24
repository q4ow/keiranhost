import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuFileType2, LuDownload } from 'react-icons/lu';
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
      className="w-full overflow-hidden rounded-lg bg-slate-800 shadow-lg transition-shadow hover:shadow-2xl sm:w-[320px]"
    >
      <div className="aspect-[4/3] w-full bg-slate-700">
        {file.thumbnailUrl ? (
          <img
            src={file.thumbnailUrl}
            alt={file.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <LuFileType2 className="h-12 w-12 text-slate-500" />
          </div>
        )}
      </div>
      <div className="flex h-[280px] flex-col p-6">
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-white">
          {file.title}
        </h3>
        {file.description ? (
          <p className="mb-4 line-clamp-3 flex-grow text-slate-400">
            {file.description}
          </p>
        ) : (
          <div className="mb-4 flex-grow" />
        )}
        <div className="flex items-center justify-between text-sm text-slate-400">
          {file.fileSize > 0 && (
            <div className="flex items-center space-x-2">
              <LuFileType2 className="h-4 w-4" />
              <span>{formatFileSize(file.fileSize)}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <LuDownload className="h-4 w-4" />
            <span>{file.downloads} downloads</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-500">
          Uploaded {format(new Date(file.uploadDate), 'PPP')}
        </div>
        <Link
          to={`/file/${file.id}`}
          className="mt-6 block w-full rounded bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
