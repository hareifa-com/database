export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          استكشف اللاعبين
        </h1>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">كل المراكز</option>
              <option value="gk">حارس مرمى</option>
              <option value="df">مدافع</option>
              <option value="mf">لاعب وسط</option>
              <option value="fw">مهاجم</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">كل المحافظات</option>
              <option value="cairo">القاهرة</option>
              <option value="alex">الإسكندرية</option>
              <option value="giza">الجيزة</option>
            </select>
            
            <input
              type="text"
              placeholder="بحث باسم اللاعب..."
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold text-lg">لاعب #{i}</h3>
                  <p className="text-gray-600">مهاجم - القاهرة</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>التقييم العام</span>
                  <span>8.5/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
