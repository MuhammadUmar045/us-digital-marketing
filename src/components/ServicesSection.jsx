function ServicesSection({ categories, iconMap, fallbackIcon, onSelectCategory }) {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Industries We <span className="text-brand-blue">Serve</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Specialized marketing strategies for 50+ business categories.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || fallbackIcon
            return (
              <button
                key={category.name}
                onClick={() => onSelectCategory(category)}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-100 group text-center"
              >
                <div className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-brand-blue mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <IconComponent className="text-xl" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{category.name}</h4>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
