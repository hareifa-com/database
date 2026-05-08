export default function AcademyPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الأكاديمية</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          إضافة أكاديمية
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">الأكاديميات المسجلة</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">أكاديمية #{i}</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    نشطة
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">القاهرة - مصر</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15 لاعب</span>
                  <span>3 مدرب</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">التدريبات القادمة</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">تدريب المهارات الفنية</p>
              <p className="text-sm text-gray-600">الأحد 2:00 م</p>
              <p className="text-sm text-gray-500">12 لاعب مسجل</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium">تدريب اللياقة البدنية</p>
              <p className="text-sm text-gray-600">الثلاثاء 4:00 م</p>
              <p className="text-sm text-gray-500">8 لاعب مسجل</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-medium">مباراة تدريبية</p>
              <p className="text-sm text-gray-600">الخميس 6:00 م</p>
              <p className="text-sm text-gray-500">16 لاعب مسجل</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">إحصائيات الأكاديمية</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-600">أكاديميات</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">45</p>
            <p className="text-sm text-gray-600">لاعب إجمالي</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">مدرب</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">12</p>
            <p className="text-sm text-gray-600">تدريب هذا الشهر</p>
          </div>
        </div>
      </div>
    </div>
  )
}
