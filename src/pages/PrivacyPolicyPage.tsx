import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SEO
        title="Privacy Policy | Zendt Payments"
        description="How Zendt Payments collects, uses, and protects your personal data. Read our full privacy policy."
      />

      {/* Hero */}
      <section className="pt-40 pb-16 md:pt-52 md:pb-20 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-40 -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
        <div className="container max-w-4xl mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-brand-500 mb-4"
          >
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-lg text-slate-500 leading-relaxed"
          >
            How we collect, use, and protect your personal data
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-2 text-sm text-slate-400"
          >
            Effective Date: 25 March 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6 md:px-12 space-y-14">

          {/* 1 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Zendt Payments Private Limited ('Zendt', 'we', 'our', 'us') operates the Zendt platform, a cross-border payment solution designed exclusively for Indian freelancers and independent contractors. We are committed to protecting the privacy and personal data of our users in accordance with the Digital Personal Data Protection Act, 2023 ('DPDP Act'), the Information Technology Act, 2000, and applicable RBI guidelines.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              This Privacy Policy describes how we collect, process, store, and share your personal data when you use our website, mobile application, and associated services ('Platform'). By accessing or using the Platform, you consent to the practices described herein.
            </p>
          </motion.div>

          {/* 2 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-800">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Identity data:</strong> full name, date of birth, PAN, Aadhaar number (last 4 digits for verification), photograph</li>
              <li><strong>Contact data:</strong> email address, mobile number, postal address</li>
              <li><strong>Financial data:</strong> bank account number and IFSC code for settlement</li>
              <li><strong>Professional data:</strong> service category and purpose codes for inward remittance</li>
              <li><strong>KYC documents:</strong> government-issued ID proof, address proof, and any additional documents required under RBI/FIU-IND norms</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-800">2.2 Automatically Collected Data</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>Device and browser information, IP address, operating system</li>
              <li>Log data: pages visited, features used, timestamps, error logs</li>
              <li>Transaction metadata: amounts, currencies, counterparty details, timestamps</li>
              <li>Usage analytics to improve platform performance</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-800">2.3 Data from Third Parties</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>Identity verification data from our authorised KYC and compliance partners</li>
              <li>Payment and settlement data from our regulated banking and payment partners who hold the applicable licences to process cross-border transactions</li>
              <li>Authentication and access management data from our security service providers</li>
            </ul>
          </motion.div>

          {/* 3 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>To verify your identity and complete KYC/AML/CFT compliance obligations</li>
              <li>To process and settle inward foreign remittances to your designated Indian bank account</li>
              <li>To issue Foreign Inward Remittance Advice (FIRA) and generate compliance documentation</li>
              <li>To communicate with you about your transactions, account status, and service updates</li>
              <li>To detect and prevent fraud, money laundering, and other illegal activities</li>
              <li>To comply with obligations under the Prevention of Money Laundering Act (PMLA), FEMA, applicable RBI guidelines, and the reporting requirements of our regulated partners</li>
              <li>To improve and personalise your experience on the Platform</li>
              <li>To send you transactional notifications and, with your consent, marketing communications</li>
            </ul>
          </motion.div>

          {/* 4 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">4. Legal Basis for Processing</h2>
            <p className="text-slate-600 leading-relaxed">
              We process your personal data on the following legal bases: (a) performance of a contract — to provide the payment services you have requested; (b) legal obligation — to comply with applicable laws and regulatory requirements; (c) legitimate interests — to prevent fraud and improve our services; and (d) your consent — where explicitly obtained, such as for marketing communications.
            </p>
          </motion.div>

          {/* 5 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We do not sell your personal data. We share your data only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Service providers:</strong> Our authorised technology, payment, and compliance partners who process data on our behalf under strict data processing agreements</li>
              <li><strong>Regulatory bodies:</strong> RBI, enforcement agencies, or courts as required by law, including through our regulated partners' compliance obligations</li>
              <li><strong>Partner banks:</strong> For the purpose of processing international remittances</li>
              <li><strong>Fraud prevention:</strong> With authorised agencies to detect, prevent, or investigate fraud or other illegal activities</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, subject to appropriate confidentiality obligations</li>
            </ul>
          </motion.div>

          {/* 6 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              We retain your personal data for as long as necessary to fulfil the purposes described in this Policy and to comply with our legal obligations. Under PMLA and FEMA, KYC records and transaction records must be retained for a minimum of five (5) years from the date of account closure or the last transaction, whichever is later.
            </p>
          </motion.div>

          {/* 7 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">7. Your Rights Under the DPDP Act</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              As a Data Principal under the Digital Personal Data Protection Act, 2023, you have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Right to access:</strong> Request a summary of the personal data we hold about you</li>
              <li><strong>Right to correction:</strong> Request correction of inaccurate or incomplete personal data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data, subject to legal retention obligations</li>
              <li><strong>Right to grievance redressal:</strong> Raise concerns with our Grievance Officer</li>
              <li><strong>Right to nominate:</strong> Nominate an individual to exercise your rights in the event of your death or incapacity</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              To exercise any of these rights, please write to us at <a href="mailto:legal@zendtpayments.com" className="text-brand-600 hover:underline">legal@zendtpayments.com</a>. We will respond within 30 days of receiving your request.
            </p>
          </motion.div>

          {/* 8 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">8. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include end-to-end encryption for data in transit (TLS 1.2+), encryption at rest, role-based access controls, regular security audits, and secure cloud infrastructure hosted with industry-standard providers.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              However, no method of transmission over the internet is completely secure. In the event of a data breach that is likely to result in high risk to your rights, we will notify you and the relevant authorities in accordance with applicable law.
            </p>
          </motion.div>

          {/* 9 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">9. Cookies and Tracking Technologies</h2>
            <p className="text-slate-600 leading-relaxed">
              We use cookies and similar tracking technologies to operate the Platform, remember your preferences, and analyse usage. You can control cookie settings through your browser. Disabling certain cookies may affect the functionality of the Platform.
            </p>
          </motion.div>

          {/* 10 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
            <p className="text-slate-600 leading-relaxed">
              The Platform is not directed at individuals under 18 years of age. We do not knowingly collect personal data from minors. If we discover that we have inadvertently collected data from a minor, we will promptly delete it.
            </p>
          </motion.div>

          {/* 11 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting a notice on the Platform and, where required by law, by seeking your fresh consent. The 'Effective Date' at the top of this document indicates when the current version was last revised.
            </p>
          </motion.div>

          {/* 12 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">12. Grievance Officer</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any concerns or complaints regarding your personal data, please contact our Grievance Officer at <a href="mailto:legal@zendtpayments.com" className="text-brand-600 hover:underline">legal@zendtpayments.com</a>. We will acknowledge your complaint within 48 hours and resolve it within 30 days.
            </p>
          </motion.div>

          {/* Footer note */}
          <motion.div {...fadeUp} className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-400">
              Zendt Payments Private Limited &nbsp;|&nbsp; <a href="mailto:legal@zendtpayments.com" className="hover:underline">legal@zendtpayments.com</a> &nbsp;|&nbsp; Kerala, India
            </p>
            <p className="text-sm text-slate-400 mt-1">
              This document was last updated on 25 March 2026.
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
