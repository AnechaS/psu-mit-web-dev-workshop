# สร้าง Web Service โดยใช้ Parse Server

> **คำเตือน:** ถ้าหากคัดลอกโฟรเดอร์นี้ อย่าลืมติดตั้ง Libray ทั้งหมดใน package.json โดยพิมพ์คำสั่ง `npm install` ด้วยนะครับ

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

### 2. ติดตั้ง Libraries
```bash
npm i --save express parse parse-server
```

### 3. Setup express และ parse-server โดยดูตัวอย่างโค้ด [`./index.js`](index.js)

3.1 ในตัวอย่างโค้ดดังกล่าวจะเห็นว่าบันทัดที่ [[5]](https://github.com/AnechaS/mit-web-dev/blob/master/express-parse-server/index.js#L5) ผมได้สร้างไฟล์ config แยก เพราะไม่อยากให้รหัสลับโดนเปิดเผย ดังนั้นจะต้องสร้างไฟล์ `config.js` และใส่ข้อมูลตามนี้

```javascript
module.exports = {
    appId: 'YOU APP ID',
    databaseURI: 'YOU DATABASE URI',
    masterKey: 'YOU MASTER KEY',
    restAPIKey: 'YOU REST API KEY',
    serverURL: 'http://localhost:1337/parse',
    port: 1337
};
```

3.2 สร้างโฟรเดอร์ cloud ตาม config ของ parse server ในบันทัดที่ [[21]](https://github.com/AnechaS/mit-web-dev/blob/master/express-parse-server/index.js#L21) ดูตัวอย่าง `[./cloud](https://github.com/AnechaS/mit-web-dev/tree/master/express-parse-server/cloud)`

3.3 ทดลอง Run Server

```bash
$ node ./index.js
```

### 4. Setup Parse Dashboard

> **คำแนะนำ:** ไม่ควรเปิด Parse Dashboard เป็น Public (เปิดให้คนอื่นสามารถเข้ามาได้เหมือนเว็ปไซต์) เพราะอาจทำให้คนอื่นรู้รหัสรับของเรา

4.1 ติดตั้ง Library

```bash
npm i --save-dev parse-dashboard
```

4.2 กำหนดค่า config ในไฟล์ ดูตัวอย่าง [`parse-dashboard-config.json`](parse-dashboard-config.json)

4.3 ทดลอง Run Parse Dashboard

```bash
$ npx parse-dashboard --config ./parse-dashboard-config.json
```

### 5. Setup scriptsใน package.json [ดูตัวอย่าง](https://github.com/AnechaS/mit-web-dev/blob/master/express-parse-server/package.json#L6-L9)
