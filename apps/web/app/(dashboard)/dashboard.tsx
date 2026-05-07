export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">نظرة عامة</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">إجمالي اللاعبين</h3>
          <p className="text-3xl font-bold text-blue-600">156</p>
          <p className="text-sm text-gray-500 mt-2">+12 هذا الشهر</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">التقييمات</h3>
          <p className="text-3xl font-bold text-green-600">89</p>
          <p className="text-sm text-gray-500 mt-2">+8 هذا الأسبوع</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">الأكاديميات</h3>
          <p className="text-3xl font-bold text-purple-600">12</p>
          <p className="text-sm text-gray-500 mt-2">3 محافظات</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">المواهب المميزة</h3>
          <p className="text-3xl font-bold text-orange-600">23</p>
          <p className="text-sm text-gray-500 mt-2">تقييم 8+</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">آخر التقييمات</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">لاعب #{i}</p>
                  <p className="text-sm text-gray-500">مهاجم</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-green-600">8.{i}</p>
                  <p className="text-xs text-gray-500">منذ يومين</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">النشاط الحديث</h3>
          <div className="space-y-3">
            <div className="py-2 border-b">
              <p className="text-sm"><span className="font-medium">أحمد محمد</span> انضم كلاعب جديد</p>
              <p className="text-xs text-gray-500">منذ ساعة</p>
            </div>
            <div className="py-2 border-b">
              <p className="text-sm"><span className="font-medium">تقييم جديد</span> للاعب في القاهرة</p>
              <p className="text-xs text-gray-500">منذ 3 ساعات</p>
            </div>
            <div className="py-2">
              <p className="text-sm"><span className="font-medium">أكاديمية النصر</span> سجلت 3 لاعبين</p>
              <p className="text-xs text-gray-500">منذ يوم</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
