function StatsSection({ stats, counterRefs }) {
  return (
    <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div
              key={item.value}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div
                ref={(el) => {
                  counterRefs.current[index] = el
                }}
                className={`text-4xl md:text-5xl font-display font-bold mb-2 counter ${item.color}`}
              >
                0
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
