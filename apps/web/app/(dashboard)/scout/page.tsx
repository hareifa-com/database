export default function ScoutPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">الكشافة والمواهب</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          إضافة تقرير كشافة
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">المواهب المكتشفة</h3>
          <p className="text-3xl font-bold text-blue-600">18</p>
          <p className="text-sm text-gray-500">هذا الشهر</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">تقارير الكشافة</h3>
          <p className="text-3xl font-bold text-green-600">34</p>
          <p className="text-sm text-gray-500">قيد المراجعة</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">المواهب الموصى بها</h3>
          <p className="text-3xl font-bold text-orange-600">7</p>
          <p className="text-sm text-gray-500">للأكاديميات</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">المواهب الواعدة</h3>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-200 rounded-full ml-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">موهبة #{i}</h4>
                    <p className="text-gray-600">مهاجم - 16 سنة</p>
                    <p className="text-sm text-gray-500">مدرسة الإعدادية - القاهرة</p>
                  </div>
                </div>
                <div className="text-left">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                    موصى به
                  </span>
                  <p className="text-sm text-gray-500 mt-1">تقييم: 9.{i}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>ملاحظات الكشافة:</strong> لاعب سريع ومهاري، يمتلك قدرة عالية على التسديد ودقة في التمريرات الطويلة.
                </p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>• سرعة ممتازة</span>
                  <span>• مهارات فردية قوية</span>
                  <span>• ذكاء تكتيكي</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
                  عرض الملف الكامل
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition">
                  جدولة اختبار
                </button>
                <button className="text-gray-600 hover:text-gray-900 text-sm">
                  تحرير التقرير
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">خريطة المواهب</h3>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500">خريطة تفاعلية للمواهب حسب المحافظات</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">أحدث تقارير الكشافة</h3>
          <div className="space-y-3">
            <div className="border-r-4 border-blue-500 pr-4">
              <p className="font-medium text-sm">تقرير عن لاعب من الإسكندرية</p>
              <p className="text-xs text-gray-500">كشافة: أحمد علي - منذ 3 ساعات</p>
            </div>
            <div className="border-r-4 border-green-500 pr-4">
              <p className="font-medium text-sm">اكتشاف موهبة في الجيزة</p>
              <p className="text-xs text-gray-500">كشافة: محمد سالم - منذ يوم</p>
            </div>
            <div className="border-r-4 border-purple-500 pr-4">
              <p className="font-medium text-sm">متابعة لاعب واعد</p>
              <p className="text-xs text-gray-500">كشافة: خالد محمود - منذ يومين</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
