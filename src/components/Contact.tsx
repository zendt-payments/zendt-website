import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Users } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    try {
      await fetch('https://formsubmit.co/ajax/contact@zendtpayments.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New Contact Form Submission from ${form.name}`,
        })
      });
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-brand-100/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-indigo-100/30 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-sm"
          >
            <Mail size={12} className="text-brand-500" /> Contact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4 sm:mb-6"
          >
            Get in touch <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">with Zendt.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed"
          >
            Have questions about global payments or early access? Our team is here to help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                required
                rows={5}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-medium resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 hover:shadow-brand-600/40 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
            >
              {sent ? 'Message sent! 🎉' : <><span>Send Message</span><Send size={18} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </motion.form>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: <Mail size={20} />,
                label: 'Email',
                value: 'contact@zendtpayments.com',
                href: 'mailto:contact@zendtpayments.com',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: <Users size={20} />,
                label: 'Partnerships',
                value: 'partners@zendtpayments.com',
                href: 'mailto:partners@zendtpayments.com',
                color: 'bg-purple-50 text-purple-600',
              },
              {
                icon: <MapPin size={20} />,
                label: 'Address',
                value: 'Zendt Payments Pvt Ltd, Rajagiri Orbiit, Rajagiri Valley, Infopark Phase 1, Kakkanad, Kerala, India',
                href: undefined,
                color: 'bg-orange-50 text-orange-600',
              },
              {
                icon: <Phone size={20} />,
                label: 'Phone',
                value: '+91 7356004147',
                href: 'tel:+917356004147',
                color: 'bg-green-50 text-green-600',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 p-6 rounded-2xl liquid-glass border border-white/40 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-slate-900 font-semibold hover:text-brand-600 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-slate-900 font-semibold">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
