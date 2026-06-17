import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { FAQ_ITEMS } from '../data/products';

const API_BASE = '/api';

/** Contact page with form, links, and FAQ accordion */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you within 1–2 business days.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="section-padding bg-hero-gradient border-b border-blush-100/60">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Get in Touch"
            subtitle="Questions about orders, custom scents, or wholesale? We'd love to hear from you."
            align="left"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div className="glass rounded-3xl p-6 sm:p-10 shadow-glass">
            <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink-700 mb-2">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-ink-700 mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink-700 mb-2">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input-field resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
              {status.message && (
                <p
                  role="alert"
                  className={`text-sm p-4 rounded-xl ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Connect with us</h2>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:hello@bobacandles.com" className="flex items-center gap-3 text-ink-700 hover:text-blush-600 transition-colors">
                    <span className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center">✉</span>
                    hello@bobacandles.com
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-700 hover:text-blush-600 transition-colors">
                    <span className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center">◎</span>
                    @bobacandles on Instagram
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-700 hover:text-blush-600 transition-colors">
                    <span className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center">♪</span>
                    Boba Wicks on TikTok
                  </a>
                </li>
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-medium text-ink-900 mb-2">Studio hours</h3>
              <p className="text-ink-600 text-sm">Mon – Fri, 9am – 5pm PST</p>
              <p className="text-ink-500 text-sm mt-2">We respond to all inquiries within 1–2 business days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white border-t border-blush-100">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Frequently Asked Questions" className="mx-auto mb-12" />
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="border border-blush-100 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-ink-900 hover:bg-blush-50/50 transition-colors"
                  aria-expanded={openFaq === index}
                >
                  {item.question}
                  <span className="text-blush-500 text-xl flex-shrink-0 ml-4">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-ink-600 text-sm leading-relaxed animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
