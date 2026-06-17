import { useState, useMemo } from 'react';
import {
  BASE_SCENTS,
  TOP_NOTES,
  SIZE_OPTIONS,
  JAR_STYLES,
  calculateCustomPrice,
} from '../data/products';
import { apiUrl } from '../lib/apiBase';

const API_BASE = apiUrl('/api');

/**
 * Custom candle order form with dynamic pricing and API submission.
 */
export default function CustomScentForm() {
  const [form, setForm] = useState({
    baseScentId: BASE_SCENTS[0].id,
    topNoteIds: [],
    sizeId: 'classic',
    jarStyleId: 'frosted',
    labelName: '',
    giftMessage: '',
    email: '',
    name: '',
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const estimatedPrice = useMemo(
    () =>
      calculateCustomPrice({
        baseScentId: form.baseScentId,
        topNoteIds: form.topNoteIds,
        sizeId: form.sizeId,
        jarStyleId: form.jarStyleId,
      }),
    [form.baseScentId, form.topNoteIds, form.sizeId, form.jarStyleId]
  );

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleTopNote = (id) => {
    setForm((prev) => {
      const ids = prev.topNoteIds.includes(id)
        ? prev.topNoteIds.filter((n) => n !== id)
        : prev.topNoteIds.length < 3
          ? [...prev.topNoteIds, id]
          : prev.topNoteIds;
      return { ...prev, topNoteIds: ids };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch(`${API_BASE}/custom-scent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, estimatedPrice }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setStatus({
        type: 'success',
        message: 'Your custom scent request has been received! We\'ll email you within 48 hours.',
      });
      setForm((prev) => ({
        ...prev,
        labelName: '',
        giftMessage: '',
        topNoteIds: [],
      }));
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Base scent */}
      <fieldset>
        <legend className="font-display text-xl font-semibold text-ink-900 mb-4">
          Choose your base scent
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {BASE_SCENTS.map((scent) => (
            <label
              key={scent.id}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                form.baseScentId === scent.id
                  ? 'border-blush-500 bg-blush-50 shadow-soft'
                  : 'border-blush-200 bg-white/80 hover:border-blush-300'
              }`}
            >
              <input
                type="radio"
                name="baseScent"
                value={scent.id}
                checked={form.baseScentId === scent.id}
                onChange={() => update('baseScentId', scent.id)}
                className="accent-blush-500"
              />
              <span className="font-medium text-ink-800">{scent.label}</span>
              <span className="ml-auto text-sm text-ink-500">+${scent.price}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Top notes — up to 3 */}
      <fieldset>
        <legend className="font-display text-xl font-semibold text-ink-900 mb-2">
          Top notes
        </legend>
        <p className="text-sm text-ink-500 mb-4">Select up to 3 accent notes</p>
        <div className="flex flex-wrap gap-2">
          {TOP_NOTES.map((note) => {
            const selected = form.topNoteIds.includes(note.id);
            const disabled = !selected && form.topNoteIds.length >= 3;
            return (
              <button
                key={note.id}
                type="button"
                disabled={disabled}
                onClick={() => toggleTopNote(note.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selected
                    ? 'bg-blush-500 text-white border-blush-500'
                    : disabled
                      ? 'opacity-40 cursor-not-allowed border-blush-100'
                      : 'bg-white border-blush-200 hover:border-blush-400 text-ink-700'
                }`}
              >
                {note.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Size */}
      <fieldset>
        <legend className="font-display text-xl font-semibold text-ink-900 mb-4">
          Candle size
        </legend>
        <div className="grid sm:grid-cols-3 gap-3">
          {SIZE_OPTIONS.map((size) => (
            <label
              key={size.id}
              className={`flex flex-col p-4 rounded-xl border cursor-pointer text-center transition-all ${
                form.sizeId === size.id
                  ? 'border-blush-500 bg-blush-50'
                  : 'border-blush-200 bg-white/80 hover:border-blush-300'
              }`}
            >
              <input
                type="radio"
                name="size"
                value={size.id}
                checked={form.sizeId === size.id}
                onChange={() => update('sizeId', size.id)}
                className="sr-only"
              />
              <span className="font-medium text-ink-800">{size.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Jar style */}
      <fieldset>
        <legend className="font-display text-xl font-semibold text-ink-900 mb-4">
          Jar style
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {JAR_STYLES.map((jar) => (
            <label
              key={jar.id}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                form.jarStyleId === jar.id
                  ? 'border-blush-500 bg-blush-50'
                  : 'border-blush-200 bg-white/80 hover:border-blush-300'
              }`}
            >
              <input
                type="radio"
                name="jarStyle"
                value={jar.id}
                checked={form.jarStyleId === jar.id}
                onChange={() => update('jarStyleId', jar.id)}
                className="accent-blush-500 mr-3"
              />
              <span className="font-medium text-ink-800 flex-1">{jar.label}</span>
              {jar.price > 0 && (
                <span className="text-sm text-ink-500">+${jar.price}</span>
              )}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Personalisation */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="labelName" className="block text-sm font-medium text-ink-700 mb-2">
            Label name
          </label>
          <input
            id="labelName"
            type="text"
            value={form.labelName}
            onChange={(e) => update('labelName', e.target.value)}
            placeholder="e.g. Sarah's Taro Dream"
            className="input-field"
            maxLength={40}
          />
        </div>
        <div>
          <label htmlFor="giftMessage" className="block text-sm font-medium text-ink-700 mb-2">
            Gift message (optional)
          </label>
          <input
            id="giftMessage"
            type="text"
            value={form.giftMessage}
            onChange={(e) => update('giftMessage', e.target.value)}
            placeholder="A note for the recipient"
            className="input-field"
            maxLength={120}
          />
        </div>
      </div>

      {/* Contact */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="customName" className="block text-sm font-medium text-ink-700 mb-2">
            Your name *
          </label>
          <input
            id="customName"
            type="text"
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="customEmail" className="block text-sm font-medium text-ink-700 mb-2">
            Email *
          </label>
          <input
            id="customEmail"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {/* Price summary */}
      <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-ink-500">Estimated total</p>
          <p className="font-display text-4xl font-semibold text-ink-900">
            ${estimatedPrice}
          </p>
          <p className="text-xs text-ink-500 mt-1">Final price confirmed after scent review</p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary sm:min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting…' : 'Request Custom Candle'}
        </button>
      </div>

      {status.message && (
        <p
          role="alert"
          className={`text-sm p-4 rounded-xl ${
            status.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
