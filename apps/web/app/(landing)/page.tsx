export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            منصة اللاعبين الشباب
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            منصة متكاملة لاكتشاف وتقييم وتطوير المواهب الكروية في مصر
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/join"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              انضم كلاعب
            </a>
            <a
              href="/explore"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              استكشف اللاعبين
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
