"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
        
        {/* Terms Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-purple-100 dark:border-purple-900/30"
        >
          <div className="prose dark:prose-invert max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">1. Introduction</h2>
              <p>
                Welcome to Bloop! These Terms of Service ("Terms") govern your use of the Bloop application, 
                website, and services (collectively, the "Service"). By accessing or using the Service, you agree 
                to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">2. Use of the Service</h2>
              <p>
                Bloop is a party game application that allows users to create and participate in party missions. 
                You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Use the Service in any way that violates any applicable laws or regulations</li>
                <li>Impersonate or attempt to impersonate Bloop, a Bloop employee, another user, or any other person or entity</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>Use the Service to harass, abuse, or harm another person</li>
                <li>Use the Service to transmit any material that is defamatory, obscene, or otherwise objectionable</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">3. User Accounts</h2>
              <p>
                To access certain features of the Service, you may be required to register for an account. 
                You agree to provide accurate, current, and complete information during the registration process 
                and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="mt-4">
                You are responsible for safeguarding the password that you use to access the Service and for any 
                activities or actions under your password. You agree to notify Bloop immediately of any unauthorized 
                use of your account.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">4. Content and Conduct</h2>
              <p>
                You are solely responsible for all content that you post, upload, or otherwise make available through the Service. 
                You represent and warrant that you own or have the necessary rights to post such content and that such content 
                does not violate the rights of any third party.
              </p>
              <p className="mt-4">
                Bloop reserves the right to remove any content that violates these Terms or that Bloop finds objectionable 
                for any reason, without prior notice.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">5. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Bloop and are protected by 
                international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">6. Termination</h2>
              <p>
                Bloop may terminate or suspend your account and bar access to the Service immediately, without prior notice 
                or liability, under our sole discretion, for any reason whatsoever and without limitation, including but 
                not limited to a breach of the Terms.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">7. Limitation of Liability</h2>
              <p>
                In no event shall Bloop, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable 
                for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of 
                profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability 
                to access or use the Service.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">8. Changes to Terms</h2>
              <p>
                Bloop reserves the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                a material change will be determined at our sole discretion.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:videna.psalmeleazar@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline">videna.psalmeleazar@gmail.com</a>.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
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