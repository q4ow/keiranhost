import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuDownload, LuCalendar, LuFileType2 } from 'react-icons/lu';
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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">File not found</h2>
        <p className="mt-2 text-slate-400">
          The requested file does not exist.
        </p>
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
      className="mx-auto my-24 max-w-4xl"
    >
      {file.thumbnailUrl && (
        <img
          src={file.thumbnailUrl}
          alt={file.title}
          className="mb-8 h-64 w-full rounded-lg object-cover shadow-lg"
        />
      )}

      <div className="rounded-lg bg-slate-800 p-8">
        <h1 className="mb-4 text-3xl font-bold text-white">{file.title}</h1>

        {file.description && (
          <p className="mb-6 text-slate-400">{file.description}</p>
        )}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {file.fileSize > 0 && (
            <div className="flex items-center space-x-3 text-slate-300">
              <LuFileType2 className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Size</p>
                <p>{formatFileSize(file.fileSize)}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3 text-slate-300">
            <LuDownload className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Downloads</p>
              <p>{file.downloads}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <LuCalendar className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Uploaded</p>
              <p>{format(new Date(file.uploadDate), 'PPP')}</p>
            </div>
          </div>
        </div>

        <a
          href={file.fileUrl}
          className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
          download
        >
          Download File
        </a>
      </div>
    </motion.div>
  );
}
