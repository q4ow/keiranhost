import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileCard } from '../components';
import { getFiles } from '../api/files';
import type { FileItem } from '../types';

export default function HomePage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await getFiles();
        setFiles(data);
      } catch (error) {
        console.error('Failed to load files:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
      >
      <h1 className="text-4xl font-bold text-white mb-4">
        KeiranHost
      </h1>
      <p className="text-xl text-slate-400">
        I just dump shit here
      </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
      {files.map((file, index) => (
        <FileCard key={file.id} file={file} index={index} />
      ))}
      </div>
    </div>
  );
}