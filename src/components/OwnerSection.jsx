function OwnerSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto bg-slate-50 rounded-3xl p-10 border border-slate-100 relative">
          <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
            <img
              src="https://ui-avatars.com/api/?name=Utkarsh+Singh&background=2563EB&color=fff&size=128"
              alt="Utkarsh Singh"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">Utkarsh Singh</h3>
          <p className="text-brand-blue font-semibold mb-4">Founder & CEO</p>
          <p className="text-slate-600 italic">
            "With over 4 years of dedicated experience in digital marketing, my mission is to bridge the gap between local
            businesses and the digital world. We don't just run ads; we build growth engines."
          </p>
        </div>
      </div>
    </section>
  )
}

export default OwnerSection
