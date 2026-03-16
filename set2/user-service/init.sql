-- 1. สร้างตาราง users (สำหรับตัว Service หลัก)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) DEFAULT 'nopassword',
    role VARCHAR(20) DEFAULT 'member',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. สร้างตาราง user_profiles (สำหรับเก็บชื่อแสดงผลและ Bio)
CREATE TABLE IF NOT EXISTS user_profiles (
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER UNIQUE NOT NULL,
    username     VARCHAR(50),
    email        VARCHAR(100),
    role         VARCHAR(20) DEFAULT 'member',
    display_name VARCHAR(100),
    bio          TEXT,
    updated_at   TIMESTAMP DEFAULT NOW()
);

-- 3. เพิ่มข้อมูล (Seed Data) ชุดใหม่ที่คุณต้องการ
-- เพิ่มลงตาราง users ก่อนเพื่อให้ id ตรงกัน
INSERT INTO users (id, username, email, role) VALUES
(1, 'alice', 'alice@lab.local', 'member'),
(2, 'bob', 'bob@lab.local', 'member'),
(3, 'admin', 'admin@lab.local', 'admin')
ON CONFLICT (username) DO NOTHING;

-- เพิ่มลงตาราง user_profiles (ข้อมูลที่คุณระบุมา)
INSERT INTO user_profiles (user_id, username, email, display_name, role) VALUES
(1, 'alice', 'alice@lab.local', 'Alice Wonderland', 'member'),
(2, 'bob', 'bob@lab.local', 'Bob Builder', 'member'),
(3, 'admin', 'admin@lab.local', 'System Admin', 'admin')
ON CONFLICT (user_id) DO NOTHING;

-- อัปเดตตัวนับ id ของตารางให้ถูกต้อง
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));