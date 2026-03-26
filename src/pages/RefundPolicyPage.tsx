import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const RefundPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SEO
        title="Refund Policy | Zendt Payments"
        description="Guidelines for handling refund requests on the Zendt cross-border payment platform."
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
            Refund Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-lg text-slate-500 leading-relaxed"
          >
            Guidelines for handling refund requests on the Zendt platform
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
            <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
            <p className="text-slate-600 leading-relaxed">
              Zendt Payments Private Limited ('Zendt') is committed to transparent and fair handling of refund requests related to its cross-border payment services. This Refund Policy outlines the conditions, process, and timelines for refunds and applies to all Users of the Platform.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              Capitalised terms used but not defined in this Policy have the meaning given in Zendt's Terms and Conditions and Privacy Policy.
            </p>
          </motion.div>

          {/* 2 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Refund:</strong> The return of funds to the original source account from which payment was made, where the transaction is subsequently found to be erroneous or is otherwise eligible for return under this Policy.</li>
              <li><strong>User / Freelancer / Beneficiary:</strong> An individual freelancer or independent contractor in India who has registered on the Zendt Platform to receive inward foreign remittances.</li>
              <li><strong>Overseas Client / Sender:</strong> An individual or entity outside India who initiates a payment to the User.</li>
              <li><strong>Transaction Fee:</strong> The fee charged by Zendt for processing a payment.</li>
            </ul>
          </motion.div>

          {/* 3 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">3. Refund Eligibility</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-800">3.1 Situations Where a Refund May Be Processed</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li><strong>Duplicate payment:</strong> The same transaction was processed twice due to a technical error on Zendt's platform</li>
              <li><strong>Erroneous payment:</strong> The funds were credited to the wrong account due to an error by Zendt or its authorised banking partner</li>
              <li><strong>Failed settlement:</strong> Funds were received by Zendt but could not be settled to the User's bank account</li>
              <li><strong>Regulatory hold reversal:</strong> A held transaction is subsequently cleared for return by the applicable regulatory authority</li>
              <li>Refund initiated by Zendt's banking or payment partner in compliance with international banking norms</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-slate-800">3.2 Situations Where a Refund Will Not Be Processed</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>The User has already received the funds in their linked Indian bank account and there is no error attributable to Zendt</li>
              <li>The refund request relates to a dispute between the User and the Overseas Client regarding the quality, delivery, or acceptance of goods or services — such disputes must be settled between the parties directly</li>
              <li>The Overseas Client falsely claims a refund for goods or services already delivered</li>
              <li>Transaction fees and service charges already earned by Zendt for completed transactions</li>
              <li>Exchange rate differences or forex losses due to market fluctuations</li>
              <li>Requests made after 90 days from the date of the original transaction</li>
            </ul>
          </motion.div>

          {/* 4 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">4. How to Request a Refund</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              To request a refund, Users must email <a href="mailto:contact@zendtpayments.com" className="text-brand-600 hover:underline">contact@zendtpayments.com</a> with the subject line 'Refund Request – [Transaction ID]' and include the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>Full name and registered email address on Zendt</li>
              <li>Transaction ID and date of transaction</li>
              <li>Amount and currency of the transaction</li>
              <li>Reason for the refund request</li>
              <li>Supporting documents (e.g., bank statement, communication with the Overseas Client, error screenshots)</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Zendt will acknowledge your request within 2 business days and may request additional documentation to facilitate compliance review.
            </p>
          </motion.div>

          {/* 5 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">5. Review and Approval Process</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              All refund requests are reviewed by Zendt's compliance team, in coordination with its banking partners where necessary. Zendt reserves the right to approve or reject a refund request based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>Compliance with applicable RBI, FEMA, and PMLA regulations</li>
              <li>Availability of sufficient documentary evidence</li>
              <li>Partner bank and correspondent bank policies</li>
              <li>Zendt's internal risk management policies</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Zendt will communicate its decision to the User within 15 business days of receiving all required documents.
            </p>
          </motion.div>

          {/* 6 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">6. Refund Processing</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 leading-relaxed">
              <li>Approved refunds will be processed to the original source account using the same payment rail as the original transaction</li>
              <li>If the original source account is unavailable, Zendt will work with the sending bank to arrange an alternative return method</li>
              <li>Zendt will keep the User informed at each step of the refund process</li>
              <li>Refund processing times depend on the sending bank and correspondent banking network and are typically between 5–15 business days after approval</li>
              <li>Transaction fees charged for the original payment may be deducted from the refund amount where the refund is not due to Zendt's error</li>
            </ul>
          </motion.div>

          {/* 7 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">7. Disputes Between Users and Overseas Clients</h2>
            <p className="text-slate-600 leading-relaxed">
              Zendt does not adjudicate commercial disputes between a User and their Overseas Client. If an Overseas Client raises a payment dispute with their bank, Zendt may be required to place a hold on the relevant funds pending resolution. Zendt will notify the User promptly in such cases and request supporting documentation.
            </p>
          </motion.div>

          {/* 8 */}
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              For refund-related queries, contact us at <a href="mailto:contact@zendtpayments.com" className="text-brand-600 hover:underline">contact@zendtpayments.com</a>. For escalations, please write to our Grievance Officer at the same address, marking the subject line 'Grievance – Refund'.
            </p>
          </motion.div>

          {/* Footer note */}
          <motion.div {...fadeUp} className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-400">
              Zendt Payments Private Limited &nbsp;|&nbsp; <a href="mailto:contact@zendtpayments.com" className="hover:underline">contact@zendtpayments.com</a> &nbsp;|&nbsp; Kerala, India
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

export default RefundPolicyPage;
