export default function AcademyPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">أكاديمية #{params.id}</h1>
              <p className="text-xl mb-1">أكاديمية كرة قدم متخصصة</p>
              <p className="text-lg opacity-90">القاهرة، مصر</p>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">عن الأكاديمية</h2>
                
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 mb-4">
                    أكاديمية متخصصة في تدريب وتطوير المواهب الشابة في كرة القدم، نهدف إلى إعداد جيل من اللاعبين المحترفين القادرين على المنافسة على المستوى الوطني والدولي.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">الرؤية</h3>
                  <p className="text-gray-700 mb-6">
                    أن نكون الأكاديمية الرائدة في منطقة الشرق الأوسط في اكتشاف وتطوير المواهب الكروية الشابة.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">الرسالة</h3>
                  <p className="text-gray-700 mb-6">
                    توفير بيئة تدريبية احترافية متكاملة تساعد اللاعبين على تطوير مهاراتهم وتحقيق أقصى إمكانياتهم.
                  </p>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">البرامج التدريبية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">برنامج الناشئين</h4>
                    <p className="text-gray-600 mb-4">للاعبين من 6-12 سنة</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• تطوير المهارات الأساسية</li>
                      <li>• التدريب على التنسيق الحركي</li>
                      <li>• تعزيز حب اللعبة</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">برنامج المتقدمين</h4>
                    <p className="text-gray-600 mb-4">للاعبين من 13-18 سنة</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• التطوير التكتيكي</li>
                      <li>• التدريب البدني المتقدم</li>
                      <li>• التحضير للمسابقات</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">الجهاز الفني</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <h4 className="font-semibold text-gray-900">مدرب #{i}</h4>
                      <p className="text-gray-600 text-sm">مدرب رئيسي</p>
                      <p className="text-gray-500 text-xs">خبرة 10+ سنوات</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات الأكاديمية</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">تأسست</p>
                    <p className="font-semibold">2020</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">عدد اللاعبين</p>
                    <p className="font-semibold">45 لاعب</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">عدد المدربين</p>
                    <p className="font-semibold">8 مدرب</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">الملاعب</p>
                    <p className="font-semibold">3 ملاعب</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">ساعات التدريب</p>
                    <p className="font-semibold">20 ساعة/أسبوع</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">التقييم العام</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-600 ml-2">9.2</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">وسائل التواصل</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">📞 +20 123 456 7890</p>
                    <p className="text-sm text-gray-600">📧 academy@example.com</p>
                    <p className="text-sm text-gray-600">📍 القاهرة، مصر</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                    طلب انضمام
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">اللاعبون الحاليون</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white border rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                    <h4 className="font-semibold text-gray-900">لاعب #{i}</h4>
                    <p className="text-gray-600 text-sm">مهاجم</p>
                    <p className="text-green-600 font-semibold">8.{i}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
