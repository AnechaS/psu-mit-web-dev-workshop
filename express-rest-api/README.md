# พัฒนา REST APIs ด้วย Framework Express

> **คำเตือน:** ถ้าหากคัดลอกโฟลเดอร์นี้ อย่าลืมติดตั้ง Libray ทั้งหมดใน package.json โดยพิมพ์คำสั่ง `npm install` ด้วยนะครับ

## Web Service คือ ?

เป็นระบบซอฟต์แวร์ที่ใช้ในการแลกเปลี่ยนข้อมูลระหว่างซอฟต์แวร์คอมพิวเตอร์ ผ่าน Potocal Http โดยใช้รูปแบบข้อมูล XML, JSON หรืออื่น ในการสื่อสารข้อมูล 

- [ข้อมูล Web Service](https://en.wikipedia.org/wiki/Web_service)

## Blog แนวทางการออกแบบ REST APIs

- [แนะนำแนวทางการออกแบบ APIs เพื่อคนในทีม](https://devahoy.com/blog/2020/02/restful-api-guideline/)
- [แนวออกแบบ RESTful API — วิธีปฏิบัติที่ดี](https://phayao.medium.com/แนวออกแบบ-restful-api-วิธีปฏิบัตที่ดี-c320d806e30b)


> **คำเตือน:** ถ้าหากคัดลอกโฟลเดอร์นี้ อย่าลืมติดตั้ง Libray ทั้งหมดใน package.json โดยพิมพ์คำสั่ง `npm install` ด้วยนะครับ

## เตรียมเครื่องมือ

### 1. MongoDB (ฐานข้อมูล) <small>>>ใช้ได้บน Cloud และ Local<<</small>

- [MongoDB Cloud](https://www.mongodb.com/cloud/atlas)
- [วิธีติดตั้ง MongoDB บน Local](https://docs.mongodb.com/manual/administration/install-community/)

### 2. MongoDB Compass
- [ดาวน์โหลดไฟล์ติดตั้ง](https://www.mongodb.com/try/download/compass)

### 3. Postman (โปรแกรมทดสอบ APIs) <small>>>ใช้ได้บน Cloud และ Local<<</small>
- [Postman](https://www.postman.com/)