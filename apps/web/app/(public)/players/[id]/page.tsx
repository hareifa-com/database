export default function PlayerPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-white rounded-full mr-6"></div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">لاعب #{params.id}</h1>
                <p className="text-xl mb-1">مهاجم - 17 سنة</p>
                <p className="text-lg opacity-90">القاهرة، مصر</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات اللاعب</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">البيانات الشخصية</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">الاسم الكامل:</dt>
                        <dd className="font-medium">لاعب #{params.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">تاريخ الميلاد:</dt>
                        <dd className="font-medium">15/5/2007</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">المحافظة:</dt>
                        <dd className="font-medium">القاهرة</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">الطول:</dt>
                        <dd className="font-medium">175 سم</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">الوزن:</dt>
                        <dd className="font-medium">68 كجم</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">المعلومات الكروية</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">المركز:</dt>
                        <dd className="font-medium">مهاجم</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">القدم المفضلة:</dt>
                        <dd className="font-medium">اليسرى</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">الرقم:</dt>
                        <dd className="font-medium">#{params.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">الفريق الحالي:</dt>
                        <dd className="font-medium">مدرسة الإعدادية</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">المدرب:</dt>
                        <dd className="font-medium">أحمد محمد</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">التقييمات</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">التقييم #{i}</h4>
                          <p className="text-sm text-gray-600">من قبل: مدرب الأكاديمية</p>
                        </div>
                        <div className="text-left">
                          <span className="text-2xl font-bold text-green-600">8.{i}</span>
                          <p className="text-sm text-gray-500">منذ {i} أسابيع</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">المهارات الفنية</p>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-1">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${85 + i}%`}}></div>
                            </div>
                            <span className="text-xs font-medium">{8}.{i + 5}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">الجانب البدني</p>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-1">
                              <div className="bg-green-600 h-1.5 rounded-full" style={{width: `${80 + i}%`}}></div>
                            </div>
                            <span className="text-xs font-medium">{8}.{i}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">الجانب الذهني</p>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-1">
                              <div className="bg-purple-600 h-1.5 rounded-full" style={{width: `${90 + i}%`}}></div>
                            </div>
                            <span className="text-xs font-medium">{9}.{i}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">الجانب التكتيكي</p>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mr-1">
                              <div className="bg-orange-600 h-1.5 rounded-full" style={{width: `${75 + i}%`}}></div>
                            </div>h
                            <span className="text-xs font-medium">{7}.{i + 5}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">إحصائيات الأداء</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">8.7</p>
                      <p className="text-gray-600">التقييم العام</p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-2">المباريات</p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold">24</p>
                          <p className="text-xs text-gray-500">مباراة</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold">18</p>
                          <p className="text-xs text-gray-500">هدف</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-2">أبرز المهارات</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">سرعة</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">تصويب</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">مراوغة</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">تمرير</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
