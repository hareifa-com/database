import { db } from './db';
import { users, academies, players, evaluations, coachNotes, playerVideos, playerStats } from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
/**
 * Seed data for El-Harifa database
 * Populates the database with Egyptian governorates, default admin user, sample academy, players, and evaluations
 */
// All 27 Egyptian governorates
const EGYPTIAN_GOVERNORATES = [
    'القاهرة', 'الإسكندرية', 'الجيزة', 'الشرقية', 'الدقهلية',
    'البحيرة', 'المنوفية', 'الغربية', 'كفر الشيخ', 'الأقصر',
    'أسوان', 'قنا', 'سوهاج', 'أسيوط', 'المنيا', 'الفيوم',
    'بني سويف', 'القليوبية', 'الإسماعيلية', 'السويس', 'بورسعيد',
    'دمياط', 'شمال سيناء', 'جنوب سيناء', 'مطروح', 'البحر الأحمر',
    'الوادي الجديد'
];
// Sample Arabic names
const ARABIC_NAMES = {
    firstNames: ['أحمد', 'محمد', 'عبدالله', 'عمر', 'علي', 'حسن', 'يوسف', 'عبدالرحمن', 'كريم', 'مصطفى'],
    lastNames: ['محمد', 'أحمد', 'علي', 'حسن', 'عبدالله', 'يوسف', 'إبراهيم', 'عمر', 'خالد', 'محمود']
};
// Sample academy names
const ACADEMY_NAMES = [
    'أكاديمية النجوم الرياضية',
    'مركز الشباب الأهلي',
    'نادي الزمالك للناشئين',
    'أكاديمية بيراميدز',
    'مركز التدريب الأولمبي'
];
// Generate random Arabic name
function generateArabicName() {
    const firstName = ARABIC_NAMES.firstNames[Math.floor(Math.random() * ARABIC_NAMES.firstNames.length)];
    const lastName = ARABIC_NAMES.lastNames[Math.floor(Math.random() * ARABIC_NAMES.lastNames.length)];
    return `${firstName} ${lastName}`;
}
// Generate random date between 2008 and 2016 (for youth players)
function generateRandomBirthDate() {
    const start = new Date(2008, 0, 1);
    const end = new Date(2016, 11, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// Generate random coordinates within Egypt bounds
function generateRandomCoordinates() {
    // Egypt approximate bounds
    const latitude = 22 + Math.random() * 10; // 22°N to 32°N
    const longitude = 25 + Math.random() * 10; // 25°E to 35°E
    return { latitude, longitude };
}
export async function seed() {
    console.log('🌱 Starting El-Harifa database seeding...');
    try {
        // 1. Create default admin user
        console.log('👤 Creating default admin user...');
        const hashedPassword = await bcrypt.hash('admin123456', 10);
        const [existingAdmin] = await db.select().from(users).where(eq(users.email, 'admin@hareifa.com'));
        if (!existingAdmin) {
            const [adminUser] = await db.insert(users).values({
                full_name: 'مدير النظام',
                email: 'admin@hareifa.com',
                phone: '+201000000000',
                password_hash: hashedPassword,
                role: 'admin',
                governorate: 'القاهرة',
                verified: true,
                is_active: true,
            }).returning();
            console.log(`✅ Admin user created: ${adminUser?.full_name}`);
        }
        else {
            console.log('ℹ️ Admin user already exists, skipping...');
        }
        // 2. Create sample academy
        console.log('🏫 Creating sample academy...');
        const [admin] = await db.select().from(users).where(eq(users.email, 'admin@hareifa.com'));
        const academyName = ACADEMY_NAMES[0];
        if (!academyName) {
            throw new Error('Academy names array is empty');
        }
        const [existingAcademy] = await db.select().from(academies).where(eq(academies.name_ar, academyName));
        if (!existingAcademy && admin) {
            const coords = generateRandomCoordinates();
            const [sampleAcademy] = await db.insert(academies).values({
                name_ar: academyName,
                governorate: 'القاهرة',
                type: 'اكاديمية',
                address: 'شارع الجيش، القاهرة',
                latitude: coords.latitude.toString(),
                longitude: coords.longitude.toString(),
                coach_name: 'مدرب أحمد محمد',
                coach_phone: '+201234567890',
                manager_id: admin.id,
                status: 'نشط',
                verified: true,
                reviewer_id: admin.id,
                review_notes: 'تم التحقق من الأكاديمية بنجاح',
                reviewed_at: new Date(),
            }).returning();
            console.log(`✅ Sample academy created: ${sampleAcademy?.name_ar}`);
        }
        else {
            console.log('ℹ️ Sample academy already exists, skipping...');
        }
        // 3. Create sample players
        console.log('⚽ Creating sample players...');
        const [academy] = await db.select().from(academies).where(eq(academies.name_ar, academyName));
        for (let i = 0; i < 5; i++) {
            const playerName = generateArabicName();
            const coords = generateRandomCoordinates();
            const birthDate = generateRandomBirthDate();
            const [newPlayer] = await db.insert(players).values({
                full_name_ar: playerName,
                birth_date: birthDate.toISOString().split('T')[0] || '',
                birth_place: 'القاهرة',
                governorate: 'القاهرة',
                academy_id: academy?.id || null,
                height_cm: (150 + Math.random() * 30).toString(), // 150-180 cm
                weight_kg: (40 + Math.random() * 30).toString(), // 40-70 kg
                dominant_foot: ['right', 'left', 'both'][Math.floor(Math.random() * 3)],
                primary_position: ['GK', 'CB', 'LB', 'RB', 'CM', 'AM', 'LW', 'RW', 'ST'][Math.floor(Math.random() * 9)],
                secondary_position: Math.random() > 0.5 ? ['GK', 'CB', 'LB', 'RB', 'CM', 'AM', 'LW', 'RW', 'ST'][Math.floor(Math.random() * 9)] : null,
                bio: `لاعب شاب وموهوب يظهر إمكانيات كبيرة في كرة القدم`,
                family_status: 'أسرة طبيعية تدعم اللاعب',
                daily_travel_to_training: 'مواصلات خاصة',
                school_performance: 'ممتاز',
                scout_story: 'تم اكتشاف اللاعب خلال مباراة ودية في المدرسة',
                latitude: coords.latitude.toString(),
                longitude: coords.longitude.toString(),
                status: 'active',
                created_by: admin?.id || '',
            }).returning();
            // Create player stats record
            if (newPlayer) {
                await db.insert(playerStats).values({
                    player_id: newPlayer.id,
                    total_evaluations: 0,
                    avg_technical: '5.0',
                    avg_physical: '5.0',
                    avg_mental: '5.0',
                    avg_commitment: '5.0',
                    avg_overall: '5.0',
                });
            }
            console.log(`✅ Player created: ${newPlayer?.full_name_ar || 'Unknown'}`);
        }
        // 4. Create sample evaluations
        console.log('📊 Creating sample evaluations...');
        const samplePlayers = await db.select().from(players).limit(2);
        for (const player of samplePlayers) {
            const [evaluation] = await db.insert(evaluations).values({
                player_id: player.id,
                evaluator_id: admin?.id || '',
                evaluator_role: 'مدرب',
                evaluation_type: 'مدرب',
                event_name: 'تقييم نصف شهري',
                event_date: new Date().toISOString(),
                minutes_watched: 90,
                technical_skills: {
                    dribbling: 7,
                    first_touch: 8,
                    passing_short: 6,
                    passing_long: 5,
                    shooting: 7,
                    tackling: 6,
                },
                physical_attributes: {
                    pace: 8,
                    stamina: 7,
                    strength: 6,
                    agility: 7,
                },
                mental_attributes: {
                    decision_making: 6,
                    vision: 7,
                    composure: 6,
                    leadership: 5,
                },
                commitment: {
                    training_attendance: 9,
                    academic_discipline: 8,
                    coachability: 8,
                },
                overall_potential: 'B',
                strengths: 'سرعة في الاستيعاب، جسد قوي، رغبة في التعلم',
                weaknesses: 'يحتاج تحسين في التمريرات الطويلة، اتخاذ القرار تحت الضغط',
                scout_notes: 'لاعب واعد مع إمكانيات تطوير كبيرة مع التدريب المناسب',
                weight: 1,
                status: 'معتمد',
                reviewed_by: admin?.id || '',
                review_notes: 'تم اعتماد التقييم بناءً على الملاحظات الدقيقة',
            }).returning();
            console.log(`✅ Evaluation created for player: ${player.full_name_ar}`);
        }
        // 5. Create sample coach notes
        console.log('📝 Creating sample coach notes...');
        const playersForNotes = await db.select().from(players).limit(3);
        for (const player of playersForNotes) {
            await db.insert(coachNotes).values({
                player_id: player.id,
                coach_id: admin?.id || '',
                note_date: new Date().toISOString(),
                attendance: ['حضر', 'غائب', 'متأخر', 'مصاب'][Math.floor(Math.random() * 4)],
                performance_rating: Math.floor(Math.random() * 10) + 1,
                note: 'أداء جيد في التدريب اليوم، يحتاج التركيز على المهارات الفردية',
            });
            console.log(`✅ Coach note created for player: ${player.full_name_ar}`);
        }
        console.log('🎉 Database seeding completed successfully!');
        console.log('📊 Summary:');
        console.log('   - Default admin user: admin@hareifa.com');
        console.log('   - Sample academy: 1');
        console.log('   - Sample players: 5');
        console.log('   - Sample evaluations: 2');
        console.log('   - Sample coach notes: 3');
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
if (process.argv[1] === __filename) {
    seed()
        .then(() => process.exit(0))
        .catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
//# sourceMappingURL=seed.js.map