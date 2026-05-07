export default function EvaluationsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة التقييمات</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          تقييم جديد
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">التقييمات هذا الشهر</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">متوسط التقييم</h3>
          <p className="text-3xl font-bold text-green-600">7.8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">المواهب المكتشفة</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="بحث باسم اللاعب..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="">كل التقييمات</option>
              <option value="high">مرتفع (8+)</option>
              <option value="medium">متوسط (6-8)</option>
              <option value="low">منخفض (أقل من 6)</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">تقييم لاعب #{i}</h4>
                  <p className="text-gray-600">مهاجم - 17 سنة - القاهرة</p>
                </div>
                <div className="text-left">
                  <span className="text-2xl font-bold text-green-600">8.{i}</span>
                  <p className="text-sm text-gray-500">منذ {i} أيام</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">المهارات الفنية</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${80 + i * 5}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{8}.{i}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الجانب البدني</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: `${75 + i * 5}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{7}.{i + 5}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الجانب الذهني</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: `${85 + i * 3}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{8}.{i + 5}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">الجانب التكتيكي</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: `${70 + i * 5}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{7}.{i}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">عرض التفاصيل</button>
                <button className="text-green-600 hover:text-green-900 text-sm">تحرير</button>
                <button className="text-red-600 hover:text-red-900 text-sm">حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
