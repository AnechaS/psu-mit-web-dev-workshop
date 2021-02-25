# สร้าง Web Service โดยใช้ Parse Server

**<span style="color:orange">คำแนะนำ:</span>** ถ้าหากคัดลอกโฟรเดอร์นี้ อย่าลืมติดตั้ง libray ทั้งหมดใน package.json โดยพิมพ์คำสั่งด้านล่างนี้ด้วยนะครับ

```bash
$ npm install
```

## Web Service คือ ?

เป็นระบบซอฟต์แวร์ที่ใช้ในการแลกเปลี่ยนข้อมูลระหว่างซอฟแวร์คอมพิวเตอร์ ผ่าน Potocal Http โดยใช้รูปแบบข้อมูล XML, JSON หรืออื่น ในการสื่อสารข้อมูล 

- [ข้อมูล Web Service](https://en.wikipedia.org/wiki/Web_service)

## Parse คือ ?

เป็น Open source Backend ซึ่งช่วยให้เราไม่ต้อง Coding ในส่วนของ Database ให้ยุ่งยาก 

- [ประวัติของ Parse](https://en.wikipedia.org/wiki/Parse_(platform))
- [Tutorial](https://parseplatform.org/)
- [Back4App (Parse Cloud)](https://www.back4app.com/)

## เตรียมเครื่องมือ

### 1. MongoDB (ฐานข้อมูล) <small>>>ใช้ได้บน Cloud และ Local<<</small>

- [MongoDB Cloud](https://www.mongodb.com/cloud/atlas)
- [วิธีติดตั้ง MongoDB บน Local](https://docs.mongodb.com/manual/administration/install-community/)

### 2. MongoDB Compass
- [ดาวห์โหลดไฟล์ติดตั้ง](https://www.mongodb.com/try/download/compass)

### 3. Postman (โปรแกรมทดสอบ APIs) <small>>>ใช้ได้บน Cloud และ Local<<</small>
- [Postman](https://www.postman.com/)

## วิธีสร้างโปรเจ็ค

### 1. สร้างโฟรเดอร์ และตั้งค่า `package.json`

```bash
mkdir express-parse-server
cd express-parse-server
npm init -y
```

### 2. Install package
```bash
npm i --save express parse parse-server
```

### 3. Setup express และ parse-server โดยดูตัวอย่างโค้ด [`./index.js`](index.js)

ในโค้ดตัวอย่าง