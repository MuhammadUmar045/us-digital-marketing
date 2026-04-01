import { FaFlag, FaGlobe, FaRegCopy } from 'react-icons/fa'

function PaymentSection({ onCopyToClipboard }) {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-bold mb-8 text-center">Payment Details</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaFlag className="text-brand-orange" /> Indian Payments
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Account Name</span> <span className="font-semibold">Utkarsh Singh</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Bank</span> <span className="font-semibold">Kotak Mahindra</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">A/C No</span> <span className="font-semibold select-all">6049669529</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">IFSC</span> <span className="font-semibold select-all">KKBK0005336</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">UPI ID</span>
                <button
                  onClick={() => onCopyToClipboard('utkarshsinghhh340@oksbi')}
                  className="text-brand-blue font-semibold hover:underline flex items-center gap-1"
                >
                  Copy UPI <FaRegCopy />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaGlobe className="text-brand-blue" /> International
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center gap-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold">Payoneer</div>
                  <div className="font-semibold text-sm break-all">utkarshsinghhh340@gmail.com</div>
                </div>
                <button onClick={() => onCopyToClipboard('utkarshsinghhh340@gmail.com')} className="text-brand-blue">
                  <FaRegCopy />
                </button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg flex justify-between items-center gap-3">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold">PayPal</div>
                  <div className="font-semibold text-sm">@UtkarshSingh521</div>
                </div>
                <button onClick={() => onCopyToClipboard('@UtkarshSingh521')} className="text-brand-blue">
                  <FaRegCopy />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentSection
