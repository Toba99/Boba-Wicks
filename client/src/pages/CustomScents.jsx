import SectionHeader from '../components/SectionHeader';
import CustomScentForm from '../components/CustomScentForm';

/** Custom scent builder page */
export default function CustomScents() {
  return (
    <div className="min-h-screen">
      <section className="section-padding bg-hero-gradient border-b border-blush-100/60">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            title="Create Your Custom Candle"
            subtitle="Design a one-of-a-kind boba-inspired scent. Choose your base, layer top notes, pick your jar, and add a personalised label."
            className="mx-auto"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-6 sm:p-10 lg:p-12 shadow-glass">
          <CustomScentForm />
        </div>
      </section>

      {/* Process steps */}
      <section className="section-padding bg-white border-t border-blush-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-center text-ink-900 mb-12">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Design', desc: 'Select your base, top notes, size, and jar style.' },
              { step: '02', title: 'Review', desc: 'Our scent artisans review your blend within 48 hours.' },
              { step: '03', title: 'Pour', desc: 'We hand-pour your candle and ship in gift-ready packaging.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <span className="font-display text-5xl text-blush-200">{step}</span>
                <h3 className="font-display text-xl font-semibold text-ink-900 mt-2">{title}</h3>
                <p className="text-ink-600 mt-2 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
