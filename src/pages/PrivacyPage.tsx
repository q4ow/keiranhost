import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose prose-invert mx-auto max-w-3xl"
    >
      <h1 className="mb-8 text-3xl font-bold text-white">Privacy Policy</h1>

      <div className="space-y-6 text-slate-300">
        <section>
          <p>We store nothing you schizophrenic freaks</p>
        </section>
      </div>
    </motion.div>
  );
}
