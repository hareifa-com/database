export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">لوحة التحكم</h2>
          </div>
          <nav className="px-4">
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/dashboard/players" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  اللاعبون
                </a>
              </li>
              <li>
                <a href="/dashboard/evaluations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  التقييمات
                </a>
              </li>
              <li>
                <a href="/dashboard/academy" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  الأكاديمية
                </a>
              </li>
              <li>
                <a href="/dashboard/scout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                  الكشافة
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="flex-1">
          <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-900">لوحة التحكم</h1>
            </div>
          </header>
          
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
