import { z } from 'zod';
/**
 * Zod validation schemas for El-Harifa database operations
 * Provides runtime validation for API inputs and database operations
 */
export declare const scoreSchema: z.ZodNumber;
export declare const ratingSchema: z.ZodNumber;
export declare const positionSchema: z.ZodEnum<["GK", "CB", "LB", "RB", "CM", "AM", "LW", "RW", "ST"]>;
export declare const governorateSchema: z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>;
export declare const userRoleSchema: z.ZodEnum<["admin", "regional_admin", "academy_manager", "coach", "verified_scout", "volunteer"]>;
export declare const academyTypeSchema: z.ZodEnum<["مركز_شباب", "اكاديمية", "نادي", "مدرسة"]>;
export declare const academyStatusSchema: z.ZodEnum<["قيد_المراجعة", "نشط", "موقوف", "مرفوض"]>;
export declare const playerStatusSchema: z.ZodEnum<["active", "incomplete", "archived"]>;
export declare const dominantFootSchema: z.ZodEnum<["right", "left", "both"]>;
export declare const evaluationStatusSchema: z.ZodEnum<["معتمد", "قيد_المراجعة", "مرفوض"]>;
export declare const evaluationTypeSchema: z.ZodEnum<["مدرب", "كشاف", "متطوع"]>;
export declare const overallPotentialSchema: z.ZodEnum<["A", "B", "C", "D"]>;
export declare const attendanceStatusSchema: z.ZodEnum<["حضر", "غائب", "متأخر", "مصاب"]>;
export declare const insertUserSchema: z.ZodObject<{
    full_name: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    password_hash: z.ZodString;
    role: z.ZodEnum<["admin", "regional_admin", "academy_manager", "coach", "verified_scout", "volunteer"]>;
    governorate: z.ZodOptional<z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>>;
    academy_id: z.ZodOptional<z.ZodString>;
    avatar_url: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    verified: z.ZodDefault<z.ZodBoolean>;
    is_active: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    full_name: string;
    password_hash: string;
    role: "admin" | "regional_admin" | "academy_manager" | "coach" | "verified_scout" | "volunteer";
    verified: boolean;
    is_active: boolean;
    email?: string | undefined;
    phone?: string | undefined;
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    avatar_url?: string | undefined;
    bio?: string | undefined;
}, {
    full_name: string;
    password_hash: string;
    role: "admin" | "regional_admin" | "academy_manager" | "coach" | "verified_scout" | "volunteer";
    email?: string | undefined;
    phone?: string | undefined;
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    avatar_url?: string | undefined;
    bio?: string | undefined;
    verified?: boolean | undefined;
    is_active?: boolean | undefined;
}>;
export declare const updateUserSchema: z.ZodObject<{
    full_name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    password_hash: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["admin", "regional_admin", "academy_manager", "coach", "verified_scout", "volunteer"]>>;
    governorate: z.ZodOptional<z.ZodOptional<z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>>>;
    academy_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    avatar_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    verified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    full_name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    password_hash?: string | undefined;
    role?: "admin" | "regional_admin" | "academy_manager" | "coach" | "verified_scout" | "volunteer" | undefined;
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    avatar_url?: string | undefined;
    bio?: string | undefined;
    verified?: boolean | undefined;
    is_active?: boolean | undefined;
}, {
    full_name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    password_hash?: string | undefined;
    role?: "admin" | "regional_admin" | "academy_manager" | "coach" | "verified_scout" | "volunteer" | undefined;
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    avatar_url?: string | undefined;
    bio?: string | undefined;
    verified?: boolean | undefined;
    is_active?: boolean | undefined;
}>;
export declare const insertAcademySchema: z.ZodObject<{
    name_ar: z.ZodString;
    governorate: z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>;
    type: z.ZodEnum<["مركز_شباب", "اكاديمية", "نادي", "مدرسة"]>;
    address: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    coach_name: z.ZodOptional<z.ZodString>;
    coach_phone: z.ZodOptional<z.ZodString>;
    manager_id: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["قيد_المراجعة", "نشط", "موقوف", "مرفوض"]>>;
    verified: z.ZodDefault<z.ZodBoolean>;
    reviewer_id: z.ZodOptional<z.ZodString>;
    review_notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    governorate: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد";
    verified: boolean;
    name_ar: string;
    type: "مركز_شباب" | "اكاديمية" | "نادي" | "مدرسة";
    manager_id: string;
    status: "قيد_المراجعة" | "نشط" | "موقوف" | "مرفوض";
    address?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    coach_name?: string | undefined;
    coach_phone?: string | undefined;
    reviewer_id?: string | undefined;
    review_notes?: string | undefined;
}, {
    governorate: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد";
    name_ar: string;
    type: "مركز_شباب" | "اكاديمية" | "نادي" | "مدرسة";
    manager_id: string;
    verified?: boolean | undefined;
    address?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    coach_name?: string | undefined;
    coach_phone?: string | undefined;
    status?: "قيد_المراجعة" | "نشط" | "موقوف" | "مرفوض" | undefined;
    reviewer_id?: string | undefined;
    review_notes?: string | undefined;
}>;
export declare const updateAcademySchema: z.ZodObject<{
    name_ar: z.ZodOptional<z.ZodString>;
    governorate: z.ZodOptional<z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>>;
    type: z.ZodOptional<z.ZodEnum<["مركز_شباب", "اكاديمية", "نادي", "مدرسة"]>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    latitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    coach_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    coach_phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    manager_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["قيد_المراجعة", "نشط", "موقوف", "مرفوض"]>>>;
    verified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    reviewer_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    review_notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    verified?: boolean | undefined;
    name_ar?: string | undefined;
    type?: "مركز_شباب" | "اكاديمية" | "نادي" | "مدرسة" | undefined;
    address?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    coach_name?: string | undefined;
    coach_phone?: string | undefined;
    manager_id?: string | undefined;
    status?: "قيد_المراجعة" | "نشط" | "موقوف" | "مرفوض" | undefined;
    reviewer_id?: string | undefined;
    review_notes?: string | undefined;
}, {
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    verified?: boolean | undefined;
    name_ar?: string | undefined;
    type?: "مركز_شباب" | "اكاديمية" | "نادي" | "مدرسة" | undefined;
    address?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    coach_name?: string | undefined;
    coach_phone?: string | undefined;
    manager_id?: string | undefined;
    status?: "قيد_المراجعة" | "نشط" | "موقوف" | "مرفوض" | undefined;
    reviewer_id?: string | undefined;
    review_notes?: string | undefined;
}>;
export declare const insertPlayerSchema: z.ZodObject<{
    full_name_ar: z.ZodString;
    birth_date: z.ZodDate;
    birth_place: z.ZodOptional<z.ZodString>;
    governorate: z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>;
    academy_id: z.ZodOptional<z.ZodString>;
    height_cm: z.ZodOptional<z.ZodNumber>;
    weight_kg: z.ZodOptional<z.ZodNumber>;
    dominant_foot: z.ZodEnum<["right", "left", "both"]>;
    primary_position: z.ZodEnum<["GK", "CB", "LB", "RB", "CM", "AM", "LW", "RW", "ST"]>;
    secondary_position: z.ZodOptional<z.ZodEnum<["GK", "CB", "LB", "RB", "CM", "AM", "LW", "RW", "ST"]>>;
    bio: z.ZodOptional<z.ZodString>;
    family_status: z.ZodOptional<z.ZodString>;
    daily_travel_to_training: z.ZodOptional<z.ZodString>;
    school_performance: z.ZodOptional<z.ZodString>;
    scout_story: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<["active", "incomplete", "archived"]>>;
    created_by: z.ZodString;
}, "strip", z.ZodTypeAny, {
    governorate: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد";
    created_by: string;
    status: "incomplete" | "active" | "archived";
    full_name_ar: string;
    birth_date: Date;
    dominant_foot: "right" | "left" | "both";
    primary_position: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST";
    academy_id?: string | undefined;
    bio?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    birth_place?: string | undefined;
    height_cm?: number | undefined;
    weight_kg?: number | undefined;
    secondary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    family_status?: string | undefined;
    daily_travel_to_training?: string | undefined;
    school_performance?: string | undefined;
    scout_story?: string | undefined;
}, {
    governorate: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد";
    created_by: string;
    full_name_ar: string;
    birth_date: Date;
    dominant_foot: "right" | "left" | "both";
    primary_position: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST";
    academy_id?: string | undefined;
    bio?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    status?: "incomplete" | "active" | "archived" | undefined;
    birth_place?: string | undefined;
    height_cm?: number | undefined;
    weight_kg?: number | undefined;
    secondary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    family_status?: string | undefined;
    daily_travel_to_training?: string | undefined;
    school_performance?: string | undefined;
    scout_story?: string | undefined;
}>;
export declare const updatePlayerSchema: z.ZodObject<{
    full_name_ar: z.ZodOptional<z.ZodString>;
    birth_date: z.ZodOptional<z.ZodDate>;
    birth_place: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    governorate: z.ZodOptional<z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>>;
    academy_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    height_cm: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    weight_kg: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    dominant_foot: z.ZodOptional<z.ZodEnum<["right", "left", "both"]>>;
    primary_position: z.ZodOptional<z.ZodEnum<["GK", "CB", "LB", "RB", "CM", "AM", "LW", "RW", "ST"]>>;
    secondary_position: z.ZodOptional<z.ZodOptional<z.ZodEnum<["GK", "CB", "LB", "RB", "CM", "AM", "LW", "RW", "ST"]>>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    family_status: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    daily_travel_to_training: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    school_performance: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scout_story: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    latitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "incomplete", "archived"]>>>;
    created_by: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    bio?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    created_by?: string | undefined;
    status?: "incomplete" | "active" | "archived" | undefined;
    full_name_ar?: string | undefined;
    birth_date?: Date | undefined;
    birth_place?: string | undefined;
    height_cm?: number | undefined;
    weight_kg?: number | undefined;
    dominant_foot?: "right" | "left" | "both" | undefined;
    primary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    secondary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    family_status?: string | undefined;
    daily_travel_to_training?: string | undefined;
    school_performance?: string | undefined;
    scout_story?: string | undefined;
}, {
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    bio?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    created_by?: string | undefined;
    status?: "incomplete" | "active" | "archived" | undefined;
    full_name_ar?: string | undefined;
    birth_date?: Date | undefined;
    birth_place?: string | undefined;
    height_cm?: number | undefined;
    weight_kg?: number | undefined;
    dominant_foot?: "right" | "left" | "both" | undefined;
    primary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    secondary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    family_status?: string | undefined;
    daily_travel_to_training?: string | undefined;
    school_performance?: string | undefined;
    scout_story?: string | undefined;
}>;
export declare const technicalSkillsSchema: z.ZodObject<{
    dribbling: z.ZodNumber;
    first_touch: z.ZodNumber;
    passing_short: z.ZodNumber;
    passing_long: z.ZodNumber;
    shooting: z.ZodNumber;
    tackling: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    dribbling: number;
    first_touch: number;
    passing_short: number;
    passing_long: number;
    shooting: number;
    tackling: number;
}, {
    dribbling: number;
    first_touch: number;
    passing_short: number;
    passing_long: number;
    shooting: number;
    tackling: number;
}>;
export declare const physicalAttributesSchema: z.ZodObject<{
    pace: z.ZodNumber;
    stamina: z.ZodNumber;
    strength: z.ZodNumber;
    agility: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    pace: number;
    stamina: number;
    strength: number;
    agility: number;
}, {
    pace: number;
    stamina: number;
    strength: number;
    agility: number;
}>;
export declare const mentalAttributesSchema: z.ZodObject<{
    decision_making: z.ZodNumber;
    vision: z.ZodNumber;
    composure: z.ZodNumber;
    leadership: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    decision_making: number;
    vision: number;
    composure: number;
    leadership: number;
}, {
    decision_making: number;
    vision: number;
    composure: number;
    leadership: number;
}>;
export declare const commitmentSchema: z.ZodObject<{
    training_attendance: z.ZodNumber;
    academic_discipline: z.ZodNumber;
    coachability: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    training_attendance: number;
    academic_discipline: number;
    coachability: number;
}, {
    training_attendance: number;
    academic_discipline: number;
    coachability: number;
}>;
export declare const insertEvaluationSchema: z.ZodObject<{
    player_id: z.ZodString;
    evaluator_id: z.ZodString;
    evaluator_role: z.ZodEnum<["مدرب", "كشاف", "متطوع"]>;
    evaluation_type: z.ZodEnum<["مدرب", "كشاف", "متطوع"]>;
    event_name: z.ZodOptional<z.ZodString>;
    event_date: z.ZodOptional<z.ZodDate>;
    minutes_watched: z.ZodOptional<z.ZodNumber>;
    technical_skills: z.ZodObject<{
        dribbling: z.ZodNumber;
        first_touch: z.ZodNumber;
        passing_short: z.ZodNumber;
        passing_long: z.ZodNumber;
        shooting: z.ZodNumber;
        tackling: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    }, {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    }>;
    physical_attributes: z.ZodObject<{
        pace: z.ZodNumber;
        stamina: z.ZodNumber;
        strength: z.ZodNumber;
        agility: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    }, {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    }>;
    mental_attributes: z.ZodObject<{
        decision_making: z.ZodNumber;
        vision: z.ZodNumber;
        composure: z.ZodNumber;
        leadership: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    }, {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    }>;
    commitment: z.ZodObject<{
        training_attendance: z.ZodNumber;
        academic_discipline: z.ZodNumber;
        coachability: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    }, {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    }>;
    overall_potential: z.ZodEnum<["A", "B", "C", "D"]>;
    strengths: z.ZodOptional<z.ZodString>;
    weaknesses: z.ZodOptional<z.ZodString>;
    scout_notes: z.ZodOptional<z.ZodString>;
    video_url: z.ZodOptional<z.ZodString>;
    weight: z.ZodDefault<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<["معتمد", "قيد_المراجعة", "مرفوض"]>>;
    reviewed_by: z.ZodOptional<z.ZodString>;
    review_notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "قيد_المراجعة" | "مرفوض" | "معتمد";
    player_id: string;
    evaluator_id: string;
    evaluator_role: "مدرب" | "كشاف" | "متطوع";
    evaluation_type: "مدرب" | "كشاف" | "متطوع";
    technical_skills: {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    };
    physical_attributes: {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    };
    mental_attributes: {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    };
    commitment: {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    };
    overall_potential: "A" | "B" | "C" | "D";
    weight: number;
    review_notes?: string | undefined;
    event_name?: string | undefined;
    event_date?: Date | undefined;
    minutes_watched?: number | undefined;
    strengths?: string | undefined;
    weaknesses?: string | undefined;
    scout_notes?: string | undefined;
    video_url?: string | undefined;
    reviewed_by?: string | undefined;
}, {
    player_id: string;
    evaluator_id: string;
    evaluator_role: "مدرب" | "كشاف" | "متطوع";
    evaluation_type: "مدرب" | "كشاف" | "متطوع";
    technical_skills: {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    };
    physical_attributes: {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    };
    mental_attributes: {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    };
    commitment: {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    };
    overall_potential: "A" | "B" | "C" | "D";
    status?: "قيد_المراجعة" | "مرفوض" | "معتمد" | undefined;
    review_notes?: string | undefined;
    event_name?: string | undefined;
    event_date?: Date | undefined;
    minutes_watched?: number | undefined;
    strengths?: string | undefined;
    weaknesses?: string | undefined;
    scout_notes?: string | undefined;
    video_url?: string | undefined;
    weight?: number | undefined;
    reviewed_by?: string | undefined;
}>;
export declare const updateEvaluationSchema: z.ZodObject<{
    player_id: z.ZodOptional<z.ZodString>;
    evaluator_id: z.ZodOptional<z.ZodString>;
    evaluator_role: z.ZodOptional<z.ZodEnum<["مدرب", "كشاف", "متطوع"]>>;
    evaluation_type: z.ZodOptional<z.ZodEnum<["مدرب", "كشاف", "متطوع"]>>;
    event_name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    event_date: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    minutes_watched: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    technical_skills: z.ZodOptional<z.ZodObject<{
        dribbling: z.ZodNumber;
        first_touch: z.ZodNumber;
        passing_short: z.ZodNumber;
        passing_long: z.ZodNumber;
        shooting: z.ZodNumber;
        tackling: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    }, {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    }>>;
    physical_attributes: z.ZodOptional<z.ZodObject<{
        pace: z.ZodNumber;
        stamina: z.ZodNumber;
        strength: z.ZodNumber;
        agility: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    }, {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    }>>;
    mental_attributes: z.ZodOptional<z.ZodObject<{
        decision_making: z.ZodNumber;
        vision: z.ZodNumber;
        composure: z.ZodNumber;
        leadership: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    }, {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    }>>;
    commitment: z.ZodOptional<z.ZodObject<{
        training_attendance: z.ZodNumber;
        academic_discipline: z.ZodNumber;
        coachability: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    }, {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    }>>;
    overall_potential: z.ZodOptional<z.ZodEnum<["A", "B", "C", "D"]>>;
    strengths: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    weaknesses: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scout_notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    video_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["معتمد", "قيد_المراجعة", "مرفوض"]>>>;
    reviewed_by: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    review_notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status?: "قيد_المراجعة" | "مرفوض" | "معتمد" | undefined;
    review_notes?: string | undefined;
    player_id?: string | undefined;
    evaluator_id?: string | undefined;
    evaluator_role?: "مدرب" | "كشاف" | "متطوع" | undefined;
    evaluation_type?: "مدرب" | "كشاف" | "متطوع" | undefined;
    event_name?: string | undefined;
    event_date?: Date | undefined;
    minutes_watched?: number | undefined;
    technical_skills?: {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    } | undefined;
    physical_attributes?: {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    } | undefined;
    mental_attributes?: {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    } | undefined;
    commitment?: {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    } | undefined;
    overall_potential?: "A" | "B" | "C" | "D" | undefined;
    strengths?: string | undefined;
    weaknesses?: string | undefined;
    scout_notes?: string | undefined;
    video_url?: string | undefined;
    weight?: number | undefined;
    reviewed_by?: string | undefined;
}, {
    status?: "قيد_المراجعة" | "مرفوض" | "معتمد" | undefined;
    review_notes?: string | undefined;
    player_id?: string | undefined;
    evaluator_id?: string | undefined;
    evaluator_role?: "مدرب" | "كشاف" | "متطوع" | undefined;
    evaluation_type?: "مدرب" | "كشاف" | "متطوع" | undefined;
    event_name?: string | undefined;
    event_date?: Date | undefined;
    minutes_watched?: number | undefined;
    technical_skills?: {
        dribbling: number;
        first_touch: number;
        passing_short: number;
        passing_long: number;
        shooting: number;
        tackling: number;
    } | undefined;
    physical_attributes?: {
        pace: number;
        stamina: number;
        strength: number;
        agility: number;
    } | undefined;
    mental_attributes?: {
        decision_making: number;
        vision: number;
        composure: number;
        leadership: number;
    } | undefined;
    commitment?: {
        training_attendance: number;
        academic_discipline: number;
        coachability: number;
    } | undefined;
    overall_potential?: "A" | "B" | "C" | "D" | undefined;
    strengths?: string | undefined;
    weaknesses?: string | undefined;
    scout_notes?: string | undefined;
    video_url?: string | undefined;
    weight?: number | undefined;
    reviewed_by?: string | undefined;
}>;
export declare const insertCoachNoteSchema: z.ZodObject<{
    player_id: z.ZodString;
    coach_id: z.ZodString;
    note_date: z.ZodDefault<z.ZodDate>;
    attendance: z.ZodOptional<z.ZodEnum<["حضر", "غائب", "متأخر", "مصاب"]>>;
    performance_rating: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    player_id: string;
    coach_id: string;
    note_date: Date;
    attendance?: "حضر" | "غائب" | "متأخر" | "مصاب" | undefined;
    performance_rating?: number | undefined;
    note?: string | undefined;
}, {
    player_id: string;
    coach_id: string;
    note_date?: Date | undefined;
    attendance?: "حضر" | "غائب" | "متأخر" | "مصاب" | undefined;
    performance_rating?: number | undefined;
    note?: string | undefined;
}>;
export declare const updateCoachNoteSchema: z.ZodObject<{
    player_id: z.ZodOptional<z.ZodString>;
    coach_id: z.ZodOptional<z.ZodString>;
    note_date: z.ZodOptional<z.ZodDefault<z.ZodDate>>;
    attendance: z.ZodOptional<z.ZodOptional<z.ZodEnum<["حضر", "غائب", "متأخر", "مصاب"]>>>;
    performance_rating: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    note: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    player_id?: string | undefined;
    coach_id?: string | undefined;
    note_date?: Date | undefined;
    attendance?: "حضر" | "غائب" | "متأخر" | "مصاب" | undefined;
    performance_rating?: number | undefined;
    note?: string | undefined;
}, {
    player_id?: string | undefined;
    coach_id?: string | undefined;
    note_date?: Date | undefined;
    attendance?: "حضر" | "غائب" | "متأخر" | "مصاب" | undefined;
    performance_rating?: number | undefined;
    note?: string | undefined;
}>;
export declare const insertPlayerVideoSchema: z.ZodObject<{
    player_id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    youtube_url: z.ZodString;
    youtube_id: z.ZodOptional<z.ZodString>;
    thumbnail_url: z.ZodOptional<z.ZodString>;
    duration_seconds: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    uploaded_by: z.ZodString;
}, "strip", z.ZodTypeAny, {
    player_id: string;
    youtube_url: string;
    uploaded_by: string;
    title?: string | undefined;
    youtube_id?: string | undefined;
    thumbnail_url?: string | undefined;
    duration_seconds?: number | undefined;
    tags?: string[] | undefined;
}, {
    player_id: string;
    youtube_url: string;
    uploaded_by: string;
    title?: string | undefined;
    youtube_id?: string | undefined;
    thumbnail_url?: string | undefined;
    duration_seconds?: number | undefined;
    tags?: string[] | undefined;
}>;
export declare const updatePlayerVideoSchema: z.ZodObject<{
    player_id: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    youtube_url: z.ZodOptional<z.ZodString>;
    youtube_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    thumbnail_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    duration_seconds: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    uploaded_by: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    player_id?: string | undefined;
    title?: string | undefined;
    youtube_url?: string | undefined;
    youtube_id?: string | undefined;
    thumbnail_url?: string | undefined;
    duration_seconds?: number | undefined;
    tags?: string[] | undefined;
    uploaded_by?: string | undefined;
}, {
    player_id?: string | undefined;
    title?: string | undefined;
    youtube_url?: string | undefined;
    youtube_id?: string | undefined;
    thumbnail_url?: string | undefined;
    duration_seconds?: number | undefined;
    tags?: string[] | undefined;
    uploaded_by?: string | undefined;
}>;
export declare const insertPlayerStatsSchema: z.ZodObject<{
    player_id: z.ZodString;
    total_evaluations: z.ZodDefault<z.ZodNumber>;
    avg_technical: z.ZodOptional<z.ZodNumber>;
    avg_physical: z.ZodOptional<z.ZodNumber>;
    avg_mental: z.ZodOptional<z.ZodNumber>;
    avg_commitment: z.ZodOptional<z.ZodNumber>;
    avg_overall: z.ZodOptional<z.ZodNumber>;
    last_evaluation_date: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    player_id: string;
    total_evaluations: number;
    avg_technical?: number | undefined;
    avg_physical?: number | undefined;
    avg_mental?: number | undefined;
    avg_commitment?: number | undefined;
    avg_overall?: number | undefined;
    last_evaluation_date?: Date | undefined;
}, {
    player_id: string;
    total_evaluations?: number | undefined;
    avg_technical?: number | undefined;
    avg_physical?: number | undefined;
    avg_mental?: number | undefined;
    avg_commitment?: number | undefined;
    avg_overall?: number | undefined;
    last_evaluation_date?: Date | undefined;
}>;
export declare const updatePlayerStatsSchema: z.ZodObject<{
    player_id: z.ZodOptional<z.ZodString>;
    total_evaluations: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    avg_technical: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    avg_physical: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    avg_mental: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    avg_commitment: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    avg_overall: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    last_evaluation_date: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
}, "strip", z.ZodTypeAny, {
    player_id?: string | undefined;
    total_evaluations?: number | undefined;
    avg_technical?: number | undefined;
    avg_physical?: number | undefined;
    avg_mental?: number | undefined;
    avg_commitment?: number | undefined;
    avg_overall?: number | undefined;
    last_evaluation_date?: Date | undefined;
}, {
    player_id?: string | undefined;
    total_evaluations?: number | undefined;
    avg_technical?: number | undefined;
    avg_physical?: number | undefined;
    avg_mental?: number | undefined;
    avg_commitment?: number | undefined;
    avg_overall?: number | undefined;
    last_evaluation_date?: Date | undefined;
}>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export declare const playerFilterSchema: z.ZodObject<{
    governorate: z.ZodOptional<z.ZodEnum<["القاهرة", "الإسكندرية", "الجيزة", "الشرقية", "الدقهلية", "البحيرة", "المنوفية", "الغربية", "كفر الشيخ", "الأقصر", "أسوان", "قنا", "سوهاج", "أسيوط", "المنيا", "الفيوم", "بني سويف", "القليوبية", "الإسماعيلية", "السويس", "بورسعيد", "دمياط", "شمال سيناء", "جنوب سيناء", "مطروح", "البحر الأحمر", "الوادي الجديد"]>>;
    primary_position: z.ZodOptional<z.ZodEnum<["GK", "CB", "LB", "RB", "CM", "AM", "LW", "RW", "ST"]>>;
    age_min: z.ZodOptional<z.ZodNumber>;
    age_max: z.ZodOptional<z.ZodNumber>;
    academy_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["active", "incomplete", "archived"]>>;
    dominant_foot: z.ZodOptional<z.ZodEnum<["right", "left", "both"]>>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    status?: "incomplete" | "active" | "archived" | undefined;
    dominant_foot?: "right" | "left" | "both" | undefined;
    primary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    age_min?: number | undefined;
    age_max?: number | undefined;
}, {
    governorate?: "القاهرة" | "الإسكندرية" | "الجيزة" | "الشرقية" | "الدقهلية" | "البحيرة" | "المنوفية" | "الغربية" | "كفر الشيخ" | "الأقصر" | "أسوان" | "قنا" | "سوهاج" | "أسيوط" | "المنيا" | "الفيوم" | "بني سويف" | "القليوبية" | "الإسماعيلية" | "السويس" | "بورسعيد" | "دمياط" | "شمال سيناء" | "جنوب سيناء" | "مطروح" | "البحر الأحمر" | "الوادي الجديد" | undefined;
    academy_id?: string | undefined;
    status?: "incomplete" | "active" | "archived" | undefined;
    dominant_foot?: "right" | "left" | "both" | undefined;
    primary_position?: "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    age_min?: number | undefined;
    age_max?: number | undefined;
}>;
export declare const evaluationFilterSchema: z.ZodObject<{
    player_id: z.ZodOptional<z.ZodString>;
    evaluator_id: z.ZodOptional<z.ZodString>;
    evaluation_type: z.ZodOptional<z.ZodEnum<["مدرب", "كشاف", "متطوع"]>>;
    overall_potential: z.ZodOptional<z.ZodEnum<["A", "B", "C", "D"]>>;
    status: z.ZodOptional<z.ZodEnum<["معتمد", "قيد_المراجعة", "مرفوض"]>>;
    date_from: z.ZodOptional<z.ZodDate>;
    date_to: z.ZodOptional<z.ZodDate>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    status?: "قيد_المراجعة" | "مرفوض" | "معتمد" | undefined;
    player_id?: string | undefined;
    evaluator_id?: string | undefined;
    evaluation_type?: "مدرب" | "كشاف" | "متطوع" | undefined;
    overall_potential?: "A" | "B" | "C" | "D" | undefined;
    date_from?: Date | undefined;
    date_to?: Date | undefined;
}, {
    status?: "قيد_المراجعة" | "مرفوض" | "معتمد" | undefined;
    player_id?: string | undefined;
    evaluator_id?: string | undefined;
    evaluation_type?: "مدرب" | "كشاف" | "متطوع" | undefined;
    overall_potential?: "A" | "B" | "C" | "D" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    date_from?: Date | undefined;
    date_to?: Date | undefined;
}>;
export type InsertUserInput = z.infer<typeof insertUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type InsertAcademyInput = z.infer<typeof insertAcademySchema>;
export type UpdateAcademyInput = z.infer<typeof updateAcademySchema>;
export type InsertPlayerInput = z.infer<typeof insertPlayerSchema>;
export type UpdatePlayerInput = z.infer<typeof updatePlayerSchema>;
export type InsertEvaluationInput = z.infer<typeof insertEvaluationSchema>;
export type UpdateEvaluationInput = z.infer<typeof updateEvaluationSchema>;
export type InsertCoachNoteInput = z.infer<typeof insertCoachNoteSchema>;
export type UpdateCoachNoteInput = z.infer<typeof updateCoachNoteSchema>;
export type InsertPlayerVideoInput = z.infer<typeof insertPlayerVideoSchema>;
export type UpdatePlayerVideoInput = z.infer<typeof updatePlayerVideoSchema>;
export type InsertPlayerStatsInput = z.infer<typeof insertPlayerStatsSchema>;
export type UpdatePlayerStatsInput = z.infer<typeof updatePlayerStatsSchema>;
export type PlayerFilterInput = z.infer<typeof playerFilterSchema>;
export type EvaluationFilterInput = z.infer<typeof evaluationFilterSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
//# sourceMappingURL=validators.d.ts.map