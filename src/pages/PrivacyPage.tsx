import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto prose prose-invert"
    >
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-slate-300">
        <section>
          <p>
            We store nothing you schizophrenic freaks
          </p>
        </section>
      </div>
    </motion.div>
  );
}