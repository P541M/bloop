"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>
        
        {/* Privacy Content */}
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
                At Bloop, we respect your privacy and are committed to protecting your personal data. This Privacy Policy 
                will inform you about how we look after your personal data when you visit our website and tell you about 
                your privacy rights and how the law protects you.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">2. Information We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier</li>
                <li><strong>Contact Data:</strong> includes email address</li>
                <li><strong>Profile Data:</strong> includes your username and password, your interests, preferences, and feedback</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website and services</li>
                <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">3. How We Use Your Information</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
                used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal 
                data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">5. Data Retention</h2>
              <p>
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected 
                it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">6. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">7. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do 
                not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">8. Children's Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable 
                information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child 
                has provided us with personal data, please contact us.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
                Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-purple-600 dark:text-purple-400">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:videna.psalmeleazar@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline">videna.psalmeleazar@gmail.com</a>.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
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