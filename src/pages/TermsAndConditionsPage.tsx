import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SEO
        title="Terms and Conditions | Zendt Payments"
        description="Platform usage terms for Zendt cross-border payment services. Read our full terms and conditions."
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
            Terms and Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-lg text-slate-500 leading-relaxed"
          >
            Platform usage terms for Zendt cross-border payment services
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
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms and Conditions ('Terms') constitute a legally binding agreement between you ('User') and Zendt Payments Private Limited ('Zendt') governing your access to and use of the Zendt platform, including its website, mobile application, and all associated services ('Platform'). By registering on, accessing, or using the Platform, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              If you do not agree to these Terms, you must not use the Platform. These Terms supersede all prior agreements and understandings between you and Zendt relating to the Platform.
            </p>
          </motion.div>

          {/* 2 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">2. Eligibility</h2>
            <p className="text-slate-600 leading-relaxed mb-4">To use the Platform, you must:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>Be at least 18 years of age</li>
              <li>Be a resident of India with a valid Indian bank account</li>
              <li>Be an individual freelancer or independent contractor receiving payment from overseas clients for services rendered</li>
              <li>Complete Zendt's KYC verification process to Zendt's and its partner banks' satisfaction</li>
              <li>Not be prohibited from using the Platform under any applicable law</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Zendt's Platform is designed exclusively for individual freelancers and independent contractors. Registered companies, LLPs, partnerships, and other business entities are not eligible to use the Platform at this time.
            </p>
          </motion.div>

          {/* 3 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">3. Account Registration and KYC</h2>
            <p className="text-slate-600 leading-relaxed">
              You must provide accurate, complete, and up-to-date information during registration. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You must promptly notify Zendt of any unauthorised access or security breach.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Zendt is required under RBI regulations and PMLA to conduct Know Your Customer (KYC) and Anti-Money Laundering (AML) checks. You agree to submit all requested documentation and to co-operate with Zendt's compliance requirements. Failure to complete KYC may result in restrictions or suspension of your account.
            </p>
          </motion.div>

          {/* 4 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">4. Services</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Zendt provides the following services ('Services') to eligible Users:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Receive:</strong> Inward foreign remittance collection through payment links supporting multiple currencies including USD, GBP, EUR, AED, AUD, CAD, and others as made available</li>
              <li><strong>Manage:</strong> Dashboard to track payments, download FIRA/FIRC documents, and generate invoices</li>
              <li><strong>Spend:</strong> (Upcoming) Tools to manage and utilise your earnings within the platform</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Zendt operates as a technology platform that facilitates cross-border payment collection for Indian freelancers. Payment processing, foreign exchange conversion, and settlement services are provided through our regulated banking and payment partners who hold the applicable licences under RBI guidelines. Zendt does not provide banking services or investment products. Settlement of funds is made to your registered Indian bank account.
            </p>
          </motion.div>

          {/* 5 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">5. Permitted Use</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You may only use the Platform for lawful purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>Use the Platform to receive payment for goods or services that are illegal under Indian law or the law of the country of the sender</li>
              <li>Use the Platform for transactions that violate FEMA, PMLA, or any other applicable law</li>
              <li>Provide false, misleading, or fraudulent information</li>
              <li>Use the Platform in a manner that could damage, disable, or impair its functionality</li>
              <li>Attempt to gain unauthorised access to any part of the Platform or its related systems</li>
              <li>Use automated means to access or extract data from the Platform without written consent</li>
            </ul>
          </motion.div>

          {/* 6 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">6. Fees and Settlement</h2>
            <p className="text-slate-600 leading-relaxed">
              Zendt charges fees for its Services as detailed in the Pricing document available on the Platform. Fees are deducted at the time of settlement. Zendt reserves the right to revise its fee structure with 30 days' prior notice to Users.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Settlement of funds is typically made within 24–72 hours of receipt into Zendt's partner bank account, subject to compliance checks and banking business hours. Zendt does not guarantee specific settlement timelines as these depend on partner banks and correspondent banking networks.
            </p>
          </motion.div>

          {/* 7 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">7. Compliance and Regulatory Obligations</h2>
            <p className="text-slate-600 leading-relaxed">
              Zendt works with regulated partners who are registered with and report to the Financial Intelligence Unit – India (FIU-IND) and other applicable regulatory authorities. Certain transactions may be reported to regulatory authorities under the PMLA and applicable RBI guidelines through our regulated partners. You agree that Zendt and its partners may share your information with regulatory and law enforcement authorities as required.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              You are solely responsible for ensuring that your use of the Platform complies with all applicable laws, including your personal income tax obligations and FEMA requirements.
            </p>
          </motion.div>

          {/* 8 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">8. Suspension and Termination</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Zendt reserves the right to suspend or terminate your account, with or without notice, if:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>You breach any provision of these Terms</li>
              <li>Zendt suspects fraudulent, illegal, or suspicious activity on your account</li>
              <li>Required to do so by a regulatory or government body</li>
              <li>Your KYC documents are found to be fraudulent or expired</li>
              <li>You have outstanding dues to Zendt</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Upon termination, Zendt will settle any legitimately held funds in your account after deducting applicable fees and subject to regulatory hold periods. Zendt shall not be liable for any loss arising from account suspension or termination.
            </p>
          </motion.div>

          {/* 9 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              All content, trademarks, software, and other intellectual property on the Platform are owned by or licensed to Zendt. You are granted a limited, non-exclusive, non-transferable licence to use the Platform for the purposes described in these Terms. You must not copy, distribute, modify, or create derivative works from any Platform content without written permission.
            </p>
          </motion.div>

          {/* 10 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              To the fullest extent permitted by law, Zendt, its officers, directors, employees, and partners shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of the Platform. Zendt's aggregate liability for any claim arising out of these Terms shall not exceed the fees paid by you to Zendt in the three months preceding the claim.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Zendt is not responsible for delays or failures caused by partner banks, correspondent banks, third-party payment networks, or circumstances beyond its reasonable control.
            </p>
          </motion.div>

          {/* 11 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">11. Disclaimers</h2>
            <p className="text-slate-600 leading-relaxed">
              The Platform is provided 'as is' and 'as available' without warranties of any kind, express or implied. Zendt does not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components. Currency exchange rates displayed are indicative and subject to change.
            </p>
          </motion.div>

          {/* 12 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">12. Dispute Resolution</h2>
            <p className="text-slate-600 leading-relaxed">
              Any dispute arising from these Terms or your use of the Platform shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be referred to binding arbitration under the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in English and seated in Kerala, India.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              These Terms are governed by the laws of India. You consent to the exclusive jurisdiction of courts in Kerala for any matter not subject to arbitration.
            </p>
          </motion.div>

          {/* 13 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">13. Amendments</h2>
            <p className="text-slate-600 leading-relaxed">
              Zendt may update these Terms from time to time. Continued use of the Platform after any change constitutes acceptance of the updated Terms. We will notify you of material changes via email or in-app notification.
            </p>
          </motion.div>

          {/* 14 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">14. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              For any questions about these Terms, please contact us at <a href="mailto:legal@zendtpayments.com" className="text-brand-600 hover:underline">legal@zendtpayments.com</a>.
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

export default TermsAndConditionsPage;
