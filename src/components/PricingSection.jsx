import { FaCheck } from 'react-icons/fa'

function PricingSection({ pricingRef, pricingPlans, onOpenPayment }) {
  return (
    <section id="pricing" ref={pricingRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Investment <span className="text-brand-red">Plans</span>
          </h2>
          <p className="text-slate-600">Transparent pricing for maximum growth.</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.featured
                  ? 'bg-brand-dark text-white rounded-2xl p-6 shadow-2xl transform md:-translate-y-4 relative overflow-hidden'
                  : 'bg-white border border-slate-200 rounded-2xl p-6 hover:border-brand-blue hover:shadow-xl transition-all duration-300 group'
              }
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-brand-red text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-display font-bold text-brand-blue mb-4">{plan.price}</div>
              <ul className={`space-y-3 text-sm ${plan.featured ? 'text-gray-300' : 'text-slate-600'} mb-6`}>
                {plan.lines.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <FaCheck className={plan.featured ? 'text-brand-blue' : 'text-green-500'} /> {line}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onOpenPayment(plan.selected)}
                className={
                  plan.featured
                    ? 'w-full py-2 bg-brand-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors'
                    : 'w-full py-2 border border-brand-blue text-brand-blue rounded-lg font-semibold group-hover:bg-brand-blue group-hover:text-white transition-colors'
                }
              >
                Choose
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
