import { useMemo } from 'react'
import { FaTimes } from 'react-icons/fa'

function CategoryModal({ selectedCategory, onClose }) {
  const modalImage = useMemo(() => {
    if (!selectedCategory) return ''
    return `https://source.unsplash.com/800x400/?${selectedCategory.name},business`
  }, [selectedCategory])

  if (!selectedCategory) return null

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-48 bg-brand-blue">
          <img src={modalImage} alt={selectedCategory.name} className="w-full h-full object-cover opacity-50" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <FaTimes />
          </button>
          <h3 className="absolute bottom-4 left-6 text-3xl font-display font-bold text-white">{selectedCategory.name}</h3>
        </div>
        <div className="p-8">
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            {selectedCategory.desc} We create tailored ad campaigns specifically for {selectedCategory.name} businesses to
            ensure maximum ROI and customer acquisition.
          </p>
          <a
            href="https://form.svhrt.com/698ace75247da1e2ca3c9de9"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 bg-brand-dark text-white rounded-lg font-semibold hover:bg-brand-blue transition-colors"
          >
            Get Quote for This Category
          </a>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal
