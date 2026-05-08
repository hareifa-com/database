# منصة اللاعبين الشباب

منصة متكاملة مصممة لاكتشاف وتقييم وتطوير المواهب الكروية الشابة في مصر. توفر المنصة أدوات متقدمة للمدربين والكشافات والأكاديميات لتتبع وتطوير اللاعبين الشباب بناءً على معيار تقييم موحد.

## 🏗️ بنية المشروع

```
platform/
├── apps/
│   ├── web/                          # Next.js - المنصة + صفحة الهبوط
│   │   ├── app/
│   │   │   ├── (landing)/            # صفحة الهبوط
│   │   │   │   ├── page.tsx
│   │   │   │   ├── standard/page.tsx
│   │   │   │   ├── join/page.tsx
│   │   │   │   └── explore/page.tsx
│   │   │   │
│   │   │   ├── (dashboard)/          # لوحة التحكم
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── players/
│   │   │   │   ├── evaluations/
│   │   │   │   ├── academy/
│   │   │   │   └── scout/
│   │   │   │
│   │   │   ├── (public)/             # صفحات عامة
│   │   │   │   ├── players/[id]/page.tsx
│   │   │   │   └── academies/[id]/page.tsx
│   │   │   │
│   │   │   └── api/v1/               # الـ API كامل
│   │   │       ├── players/
│   │   │       ├── evaluations/
│   │   │       ├── academies/
│   │   │       ├── analytics/
│   │   │       └── auth/
│   │   │
│   │   ├── components/
│   │   │   ├── landing/
│   │   │   ├── dashboard/
│   │   │   ├── public/
│   │   │   ├── shared/
│   │   │   └── ui/                   # shadcn/ui
│   │   │
│   │   ├── lib/
│   │   │   ├── db.ts                 # اتصال قاعدة البيانات
│   │   │   ├── auth.ts
│   │   │   ├── validations.ts
│   │   │   ├── scoring.ts
│   │   │   ├── geo.ts
│   │   │   └── utils.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── use-auth.ts
│   │   │   └── use-players.ts
│   │   │
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── docs/                         # Nextra - توثيق المعيار + API
│       ├── pages/
│       │   ├── index.mdx
│       │   ├── standard/
│       │   ├── api/
│       │   └── guides/
│       ├── theme.config.jsx
│       └── package.json
│
├── packages/
│   ├── database/                     # Drizzle ORM - مخطط قاعدة البيانات
│   │   ├── schema/
│   │   │   ├── players.ts
│   │   │   ├── evaluations.ts
│   │   │   ├── academies.ts
│   │   │   ├── users.ts
│   │   │   └── index.ts
│   │   ├── migrations/
│   │   ├── seeds/
│   │   │   └── governorates.ts
│   │   └── package.json
│   │
│   ├── config/                       # الثوابت المشتركة
│   │   ├── src/
│   │   │   ├── positions.ts
│   │   │   ├── governorates.ts
│   │   │   ├── score-scale.ts
│   │   │   ├── roles.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── api-client/                   # TypeScript client للـ API
│   │   ├── src/
│   │   │   ├── players.ts
│   │   │   ├── evaluations.ts
│   │   │   ├── academies.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── ui/                           # مكتبة المكونات المشتركة
│       ├── src/
│       │   ├── PlayerCard.tsx
│       │   ├── EvaluationBadge.tsx
│       │   ├── EvaluationRadar.tsx
│       │   ├── MapView.tsx
│       │   └── index.ts
│       └── package.json
│
├── tooling/
│   ├── eslint-config/
│   ├── prettier-config/
│   └── tsconfig/
│
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── README.md
```

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### التثبيت والتشغيل

```bash
# استنساخ المشروع
git clone https://github.com/your-org/football-platform.git
cd football-platform

# تثبيت الاعتماديات
pnpm install

# إعداد قاعدة البيانات
cp packages/database/.env.example packages/database/.env
# قم بتعديل متغيرات البيئة في packages/database/.env

# تشغيل الترحيلات
pnpm db:migrate

# تشغيل بيئة التطوير
pnpm dev
```

### المتغيرات البيئية

```env
# packages/database/.env
DATABASE_URL="postgresql://username:password@localhost:5432/football_platform"

# apps/web/.env.local
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

## 📊 معيار التقييم

يعتمد معيار التقييم على أربعة محاور رئيسية:

### 1. المهارات الفنية (30%)
- التحكم بالكرة
- التمرير
- التصويب
- المراوغة
- اللعب بالرأس

### 2. الصفات البدنية (25%)
- السرعة
- التحمل
- القوة
- الخفة

### 3. الجوانب الذهنية (25%)
- التركيز
- اتخاذ القرار
- الثقة بالنفس
- العمل الجماعي

### 4. الفهم التكتيكي (20%)
- التموضع
- قراءة اللعب

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 14, React 18, TypeScript
- **Database**: PostgreSQL مع Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **Documentation**: Nextra
- **Build Tool**: Turbo (Monorepo)
- **Package Manager**: pnpm

## 📦 الحزم (Packages)

### @platform/database
مخطط قاعدة البيانات مع Drizzle ORM
```bash
pnpm db:generate  # إنشاء الترحيلات
pnpm db:migrate   # تطبيق الترحيلات
pnpm db:studio    # فتح Drizzle Studio
```

### @platform/config
الثوابت والإعدادات المشتركة للمشروع

### @platform/api-client
عميل TypeScript للـ API مع أنواع محددة مسبقاً

### @platform/ui
مكونات React مشتركة قابلة لإعادة الاستخدام

## 🎯 الأوامر المتاحة

```bash
# تطوير
pnpm dev              # تشغيل جميع التطبيقات في وضع التطوير
pnpm dev:web          # تشغيل تطبيق الويب فقط
pnpm dev:docs         # تشغيل التوثيق فقط

# بناء
pnpm build            # بناء جميع التطبيقات
pnpm build:web        # بناء تطبيق الويب فقط
pnpm build:docs       # بناء التوثيق فقط

# جودة الكود
pnpm lint             # فحص الكود
pnpm type-check       # فحص الأنواع
pnpm format           # تنسيق الكود

# قاعدة البيانات
pnpm db:generate      # إنشاء ملفات الترحيل
pnpm db:migrate       # تطبيق الترحيلات
pnpm db:push          # دفع المخطط إلى قاعدة البيانات
pnpm db:studio        # فتح واجهة إدارة قاعدة البيانات
pnpm db:seed          # ملء قاعدة البيانات ببيانات تجريبية
```

## 📚 التوثيق

- **التوثيق الكامل**: [docs.football-platform.eg](https://docs.football-platform.eg)
- **API Reference**: [API Documentation](https://docs.football-platform.eg/api)
- **معيار التقييم**: [Evaluation Standard](https://docs.football-platform.eg/standard)

## 🤝 المساهمة

نرحب بالمساهمات من المجتمع! يرجى مراجعة [دليل المساهمة](docs/guides/contributing.mdx) لمعرفة كيفية المشاركة في تطوير المنصة.

### خطوات المساهمة

1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. تنفيذ التغييرات
4. تنفيذ الاختبارات (`pnpm test`)
5. إنشاء طلب سحب (Pull Request)

## 📞 التواصل والدعم

- **البريد الإلكتروني**: info@football-platform.eg
- **تويتر**: [@FootballPlatformEG](https://twitter.com/FootballPlatformEG)
- **فيسبوك**: [Football Platform](https://facebook.com/FootballPlatformEG)
- **GitHub**: [Issues](https://github.com/your-org/football-platform/issues)

## 📄 الترخيص

هذا المشروع مرخص تحت ترخيص [MIT](LICENSE).

## 🙏 الشكر والتقدير

- جميع المدربين والكشافين الذين ساهموا في تطوير المعيار
- الأكاديميات المشاركة في تجربة المنصة
- مجتمع المطورين الذين دعموا المشروع

---

**منصة اللاعبين الشباب** - استكشف، قيم، طور 🌟⚽
