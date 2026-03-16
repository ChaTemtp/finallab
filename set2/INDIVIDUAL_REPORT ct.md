# INDIVIDUAL REPORT

## ข้อมูลผู้จัดทำ
* **ชื่อ-นามสกุล:** ไตรภพ ก๋องใจ
* **รหัสนักศึกษา:** 67543210017-9
* **กลุ่ม:** S1-1

---

## ขอบเขตงานที่รับผิดชอบ
รับผิดชอบการพัฒนา **Full-stack** ของระบบทั้งหมด ประกอบด้วย:
1. **Backend:** พัฒนา 3 Microservices (Auth, Task, Log) ด้วย Node.js
2. **Frontend:** พัฒนาหน้าเว็บส่วนติดต่อผู้ใช้ (User Interface)
3. **Infrastructure:** จัดการระบบ Docker Compose และการตั้งค่า Nginx API Gateway

---

## สิ่งที่ได้ดำเนินการด้วยตนเอง
* **เขียน Routes และ Middleware:** พัฒนา API สำหรับจัดการข้อมูล Task และระบบ Login ทั้งหมด
* **ระบบความปลอดภัย (RBAC):** ออกแบบระบบ Role-based Access Control โดยใช้ **JWT** เพื่อแยกสิทธิ์การใช้งานระหว่าง Admin และ Member อย่างชัดเจน
* **การตั้งค่า Reverse Proxy:** คอนฟิก **Nginx** ให้รองรับ HTTPS (SSL Termination) และจัดการระบบ **Rate Limiting** เพื่อป้องกันการยิง Request ที่ถี่เกินไป
* **Container Management:** เชื่อมต่อ Database PostgreSQL เข้ากับทุก Service และเขียนระบบ **Healthcheck** ใน Docker เพื่อควบคุมลำดับการรันของ Container
* **Frontend Integration:** พัฒนาหน้าเว็บให้เชื่อมต่อกับ API Gateway พร้อมระบบจัดเก็บและตรวจสอบ Token สำหรับคงสถานะการ Login

---

## สิ่งที่ได้เรียนรู้จากงานนี้
* **Microservices Architecture:** เรียนรู้การแยกส่วนการทำงาน (Service Separation) และข้อดี-ข้อเสียของการใช้ Shared Database ในระบบขนาดเล็ก
* **JWT Authentication Flow:** เข้าใจกระบวนการรับ-ส่ง Token ระหว่าง Service และความสำคัญของรหัสลับ (Shared Secret) ในสถาปัตยกรรมแบบไร้สถานะ (Stateless)
* **Infrastructure Security:** ได้ฝึกการตั้งค่า HTTPS และ Reverse Proxy ซึ่งเป็นด่านหน้าที่สำคัญในการรักษาความปลอดภัยของระบบ API

---

## ปัญหาที่พบและวิธีการแก้ไข
### **ปัญหาที่ 1: Service เกิดการ Restart ซ้ำ ๆ**
* **สาเหตุ:** ขาด Dependency บางตัวในไฟล์ package.json ทำให้ Container รันไม่ขึ้น
* **วิธีแก้ไข:** ติดตั้ง Library ที่จำเป็นเพิ่มเติม เช่น `dotenv` และ `morgan` จากนั้นทำการ Rebuild Container ใหม่ทั้งหมด

### **ปัญหาที่ 2: JWT Invalid Signature**
* **สาเหตุ:** ค่า `JWT_SECRET` ใน Auth Service และ Task Service ไม่ตรงกัน ทำให้ Verify Token ไม่ผ่าน
* **วิธีแก้ไข:** รวมศูนย์การจัดการความลับไว้ที่ไฟล์ `.env` หลัก และส่งค่าผ่าน Environment Variables ใน Docker Compose ให้เป็นค่าเดียวกันทุก Service

### **ปัญหาที่ 3: โครงสร้างโฟลเดอร์ใน GitHub ผิดพลาด (Submodule)**
* **สาเหตุ:** มีไฟล์ `.git` ซ้อนอยู่ในโฟลเดอร์ย่อย ทำให้ GitHub เปิดดูไฟล์ข้างในไม่ได้
* **วิธีแก้ไข:** ใช้คำสั่ง `git rm --cached` เพื่อลบ Index เดิมออก และจัดการโครงสร้างโฟลเดอร์ใหม่ให้ถูกต้องก่อนทำการ Push อีกครั้ง

---

## แนวทางการพัฒนาต่อไปใน Set 2
### **1. การขยายตัวของระบบ (Scalability)**
* เปลี่ยนจากการใช้ Database ภายใน Docker เป็น **Managed Database บน Cloud (Railway)** เพื่อรองรับการสำรองข้อมูลและความเสถียรที่สูงขึ้น
* นำเครื่องมือ **Database Migration (Prisma/Knex)** มาใช้จัดการ Schema บน Cloud

### **2. สถาปัตยกรรมบน Cloud (Cloud Infrastructure)**
* **Environment Management:** ใช้ระบบจัดการตัวแปรสภาพแวดล้อมของ Railway แทนไฟล์ .env เพื่อความปลอดภัย
* **Automatic SSL:** เปลี่ยนจากการทำ Self-signed certificate เป็นการใช้ SSL จาก Let's Encrypt ที่มาพร้อมกับระบบ Cloud
* **Private Networking:** ตั้งค่าให้แต่ละ Service สื่อสารกันผ่านเครือข่ายภายในของ Cloud เพื่อเพิ่มความปลอดภัยและประสิทธิภาพในการรับส่งข้อมูล