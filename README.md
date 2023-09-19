# 餐廳清單 

介紹屬於自己的餐廳清單，可瀏覽餐廳、查看資訊等等。

## 功能
-搜尋關鍵字
-連結餐廳地址到google地圖
-瀏覽所有餐廳
-查看餐廳詳細資訊
-新增或編輯餐廳資訊
-刪除餐廳資訊


## 安裝
1.確認有安裝node.js、npm與nodemon套件

2.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/Chris-Chou518/Restaurant_List.git
```

3.透過終端機進入資料夾

```
cd Restaurant_List_  //切至專案資料夾
```

```
npm install  //安裝套件
```

4.開啟程式後輸入:
- 執行migration生成schema
```
npx sequelize db:migrate
```
- 載入種子資料
```
npx sequelize db:seed:all  
```
- 執行程式
```
npm run dev  
```

請至[http://localhost:3000](http://localhost:3000)開始使用程式

5. 若欲暫停使用
```
ctrl+c
```
## prerequisites
- node.js: 18.17.1
- express: 4.18.2
- express-handlebars: 7.1.2
- method-override: 3.0.0
- mysql2: 3.2.0
- sequelize: 6.30.0
- sequelize-cli: 6.6.0
- Bootstrap 5.3.1


