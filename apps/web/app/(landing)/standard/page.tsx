export default function StandardPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          معيار التقييم الموحد
        </h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            معيار متكامل لتقييم اللاعبين الشباب يعتمد على أفضل الممارسات العالمية
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">محاور التقييم</h2>
          <ul className="space-y-2">
            <li>• المهارات الفنية (التحكم، التمرير، التصويب)</li>
            <li>• الجانب البدني (السرعة، القوة، التحمل)</li>
            <li>• الجانب الذهني (التركيز، اتخاذ القرار)</li>
            <li>• الجانب التكتيكي (فهم اللعب، الم positioning)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
