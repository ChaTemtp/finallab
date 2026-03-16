# INDIVIDUAL REPORT

## ข้อมูลผู้จัดทำ
* **ชื่อ-นามสกุล:** เขียนร
* **รหัสนักศึกษา:** ฟหกฟ
* **กลุ่ม:** หฟกฟ

---

## ขอบเขตงานที่รับผิดชอบ


---

## สิ่งที่ได้ดำเนินการด้วยตนเอง


---

## สิ่งที่ได้เรียนรู้จากงานนี้
* **Microservices Architecture:** 
---

## ปัญหาที่พบและวิธีการแก้ไข


## แนวทางการพัฒนาต่อไปใน Set 2
### **1. การขยายตัวของระบบ (Scalability)**
* เปลี่ยนจากการใช้ Database ภายใน Docker เป็น **Managed Database บน Cloud (Railway)** เพื่อรองรับการสำรองข้อมูลและความเสถียรที่สูงขึ้น
* นำเครื่องมือ **Database Migration (Prisma/Knex)** มาใช้จัดการ Schema บน Cloud

### **2. สถาปัตยกรรมบน Cloud (Cloud Infrastructure)**
* **Environment Management:** ใช้ระบบจัดการตัวแปรสภาพแวดล้อมของ Railway แทนไฟล์ .env เพื่อความปลอดภัย
* **Automatic SSL:** เปลี่ยนจากการทำ Self-signed certificate เป็นการใช้ SSL จาก Let's Encrypt ที่มาพร้อมกับระบบ Cloud
* **Private Networking:** ตั้งค่าให้แต่ละ Service สื่อสารกันผ่านเครือข่ายภายในของ Cloud เพื่อเพิ่มความปลอดภัยและประสิทธิภาพในการรับส่งข้อมูล