"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you! Reach out through any of the channels below.
          </p>
        </motion.div>
        
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-900/30"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6">
              <FaEnvelope className="text-3xl text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Email</h3>
            <a 
              href="mailto:videna.psalmeleazar@gmail.com" 
              className="text-purple-600 dark:text-purple-400 hover:underline break-all text-center"
            >
              videna.psalmeleazar@gmail.com
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/30"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700/30 mb-6">
              <FaGithub className="text-3xl text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">GitHub</h3>
            <a 
              href="https://github.com/P541M" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              @P541M
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900/30"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
              <FaLinkedin className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">LinkedIn</h3>
            <a 
              href="https://www.linkedin.com/in/pevidena/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              @pevidena
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100 dark:border-sky-900/30"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30 mb-6">
              <FaTwitter className="text-3xl text-sky-500 dark:text-sky-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Twitter/X</h3>
            <a 
              href="https://x.com/psalmeleazar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky-500 dark:text-sky-400 hover:underline"
            >
              @psalmeleazar
            </a>
          </motion.div>
        </div>
        
        {/* About Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-purple-100 dark:border-purple-900/30"
        >
          <h2 className="text-2xl font-semibold mb-6 text-purple-600 dark:text-purple-400">About the Developer</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
              PV
            </div>
            <div>
              <p className="mb-4 text-lg">
                Bloop was created by <span className="font-semibold">Psalm Eleazar Videna</span>, a Software Engineering Co-op Student at the University of Guelph.
                Based in the Greater Toronto Area, Canada, Psalm enjoys managing projects from concept to deployment.
              </p>
              <p className="text-lg">
                For more information about Psalm's work and projects, visit his <a href="https://p541m.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">portfolio</a>.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link 
            href="/" 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full hover:from-purple-700 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <FaArrowLeft />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 