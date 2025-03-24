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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-white">KeiranHost</h1>
        <p className="text-xl text-slate-400">I just dump shit here</p>
      </motion.div>

      <div
        className={`grid w-full max-w-5xl gap-8 ${files.length === 1 ? 'grid-cols-1' : files.length < 3 ? 'grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
      >
        {files.map((file, index) => (
          <FileCard key={file.id} file={file} index={index} />
        ))}
      </div>
    </div>
  );
}
