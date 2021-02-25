# พื้นฐาน React

> **คำเตือน:** ถ้าหากคัดลอกโฟลเดอร์นี้ อย่าลืมติดตั้ง Libray ทั้งหมดใน package.json โดยพิมพ์คำสั่ง `npm install` ด้วยนะครับ

## สร้างโปรเจค

```bash
npx create-react-app react-basic
cd react-basic
```

### คำสั่ง Run App

```bash
npm start
```
หลังจาก run app ให้เปิด Browser แล้วใส่ URL: [`http://localhost:3000`](http://localhost:3000)

## เนื้อหา React

### 1. Component

#### Code: 
- [`src/c1-component/App.js`](./src/c1-component/App.js)

#### Docs:
- [Components and Props](https://reactjs.org/docs/components-and-props.html)
- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Handling Events](https://reactjs.org/docs/handling-events.html)
- [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)

### 2. ใช้งาน Bootstrap ใน React

#### Install [bootstrap](https://www.npmjs.com/package/bootstrap):

```bash
$ npm i --save bootstrap
```

เมื่อติดตั้งสำเร็จ ให้เปิดไฟล์ `./src/index.js` แล้ว Import Boostrap css

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

#### Code:
- [`src/c2-bootstrap/App.js`](./src/c2-bootstrap/App.js)

#### Docs:
- [bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/)

### 3. Route

#### Install [react-router-dom](https://www.npmjs.com/package/react-router-dom):

```bash
$ npm i react-router-dom
```

#### Docs
- [react-router-dom](https://reactrouter.com/web/example/basic)

#### Code
- [`src/c3-route/App.js`](./src/c3-route/App.js)

### 4. Route Auth

#### Code
- [`src/c4-route-auth/App.js`](./src/c4-route-auth/App.js)

## เรียนรู้เพิ่มเติม

- [React documentation](https://reactjs.org/)