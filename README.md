# @hareifa/database

حزمة قاعدة البيانات لمشروع الحريفة - أول معيار وطني مفتوح المصدر لاكتشاف وتقييم لاعبي كرة القدم الناشئين في مصر.

## نظرة عامة

هذه الحزمة تحتوي على:
- مخطط قاعدة البيانات الكامل باستخدام Drizzle ORM
- أنواع TypeScript صارمة
- مدخلات Zod للتحقق من البيانات
- بيانات أولية للمحافظات المصرية
- علاقات بين الجداول
- أدوات للبذور والتهيئة

## التقنيات المستخدمة

- **ORM**: Drizzle ORM (latest version)
- **قاعدة البيانات**: PostgreSQL
- **اللغة**: TypeScript (strict mode)
- **التحقق**: Zod
- **مدير الحزم**: pnpm

## هيكل المشروع

```
packages/database/
├── src/
│ ├── schema/           # تعريفات الجداول
│ │ ├── users.ts
│ │ ├── academies.ts
│ │ ├── players.ts
│ │ ├── evaluations.ts
│ │ ├── coach-notes.ts
│ │ ├── player-videos.ts
│ │ ├── player-stats.ts
│ │ └── index.ts
│ ├── relations.ts      # العلاقات بين الجداول
│ ├── types.ts         # أنواع TypeScript
│ ├── validators.ts     # مدخلات Zod
│ ├── seed.ts          # بيانات أولية
│ ├── db.ts            # اتصال قاعدة البيانات
│ └── index.ts         # تصدير كل شيء
├── drizzle.config.ts   # إعدادات Drizzle
├── package.json
├── tsconfig.json
└── README.md
```

## التثبيت

```bash
# تثبيت الاعتماديات
pnpm install

# بناء المشروع
pnpm build
```

## إعداد قاعدة البيانات

1. **إعداد متغيرات البيئة**

```bash
# ملف .env
DATABASE_URL=postgresql://username:password@localhost:5432/hareifa_db
NODE_ENV=development
```

2. **إنشاء جداول قاعدة البيانات**

```bash
# توليد ملفات الترحيل
pnpm run generate

# تطبيق المخطط على قاعدة البيانات
pnpm run push
```

3. **إضافة البيانات الأولية**

```bash
# إضافة البيانات الأولية (محافظات مصر، مستخدم افتراضي، أكاديمية، لاعبين)
pnpm run seed
```

## الأوامر المتاحة

```bash
# أوامر التطوير
pnpm dev          # بناء مع مراقبة التغييرات
pnpm build        # بناء للإنتاج
pnpm typecheck    # فحص أنواع TypeScript

# أوامر Drizzle
pnpm run generate  # توليد ملفات الترحيل
pnpm run push      # تطبيق التغييرات على قاعدة البيانات
pnpm run studio    # فتح Drizzle Studio

# أوامر البيانات
pnpm run seed      # إضافة البيانات الأولية
```

## الجداول الرئيسية

### users
- معلومات المستخدمين (مدير، مديري الأكاديميات، مدربين، كشافين، متطوعين)
- أدوار: admin, regional_admin, academy_manager, coach, verified_scout, volunteer

### academies
- معلومات الأكاديميات والمراكز والنوادي
- أنواع: مركز_شباب، اكاديمية، نادي، مدرسة
- 27 محافظة مصرية

### players
- قلب المشروع - معلومات اللاعبين
- معلومات شخصية، فنية، جسدية، أكاديمية
- إمكانية اللاعبين من الشوارع (بدون أكاديمية)

### evaluations
- تقييمات مفصلة للاعبين
- تقييمات فنية، جسدية، عقلية، والالتزام
- تقييمات من مدربين، كشافين، متطوعين

### coach_notes
- ملاحظات دورية من المدربين
- الحضور، الأداء، ملاحظات

### player_videos
- فيديوهات اللاعبين (YouTube)
- معلومات الفيديو، الصور المصغرة، الوسوم

### player_stats
- إحصائيات مجمعة للاعب
- متوسطات التقييمات، آخر تقييم

## استخدام الحزمة

```typescript
import { db, users, players, evaluations } from '@hareifa/database';

// استعلام عن اللاعبين
const allPlayers = await db.select().from(players);

// إضافة لاعب جديد
const newPlayer = await db.insert(players).values({
  full_name_ar: 'أحمد محمد',
  birth_date: new Date('2010-01-01'),
  governorate: 'القاهرة',
  primary_position: 'ST',
  dominant_foot: 'right',
  created_by: userId,
});

// استعلام مع علاقات
const playerWithEvaluations = await db.query.players.findMany({
  with: {
    academy: true,
    evaluations: true,
    stats: true,
  },
});
```

## التحقق من البيانات

```typescript
import { insertPlayerSchema, insertEvaluationSchema } from '@hareifa/database';

// التحقق من بيانات لاعب جديد
const playerData = {
  full_name_ar: 'أحمد محمد',
  birth_date: new Date('2010-01-01'),
  // ... باقي البيانات
};

const validatedPlayer = insertPlayerSchema.parse(playerData);
```

## البيانات الأولية

الدالة `seed` تقوم بـ:
- إضافة 27 محافظة مصرية
- إنشاء مستخدم admin افتراضي (admin@hareifa.com / admin123456)
- إنشاء أكاديمية نموذجية
- إضافة 5 لاعبين تجريبيين
- إضافة تقييمين تجريبيين
- إضافة ملاحظات مدرب

## المساهمة

1. انسخ المشروع
2. أنشئ فرعًا جديدًا (`git checkout -b feature/amazing-feature`)
3. قم بالتغييرات
4. أرسل التغييرات (`git commit -m 'Add amazing feature'`)
5. ادفع الفرع (`git push origin feature/amazing-feature`)
6. افتح Pull Request

## الرخصة

MIT License - انظر ملف LICENSE للتفاصيل.

## الدعم

لأي استفسارات أو مشاكل، يرجى التواصل مع فريق الحريفة.
