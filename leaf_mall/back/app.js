const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = require("./models");
const { default: ProductType } = require("../front/pages/admin/productType");

const ProductTypeRouter = require("./routers/productTypeRouter");

db.sequelize
  .sync()
  .then(() => {
    console.log(`๐ Mysql DB Connection`);
  })
  .catch(console.error());

const PORT = process.env.PORT;
const app = express();

// Server Side Setting

app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

// Compare Dev - Prod

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
}

// Standard Server Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // dotenv์ COOKIE_SECRET์ ํตํด ์ฟ ํค ์ํธํ

app.use(
  session({
    saveUninitialized: false, // ex) ์ด๋ค ๊ณ์ ์ ๋ก๊ทธ์ธ ํ๋ค๊ฐ ๋ค๋ฅธ ๊ณ์ ์ ๋ก๊ทธ์ธ ํ  ์ ์ด๊ธฐํํ์ง ์์ ๊ฒ์ธ๊ฐ
    resave: false, // ๋ก๊ทธ์ธํ ๋ชจ๋  ๊ณ์ ์ ์ ์ฅํด๋ ๊ฒ์ธ๊ฐ
    secret: process.env.COOKIE_SECRET,
    proxy: true, // ์๋ก ๋ค๋ฅธ pc ์๋ฒ์ผ๋ ์ฐ๊ฒฐํด์ฃผ๊ธฐ ์ํด
    cookie: {
      httpOnly: true, // ์คํฌ๋ฆฝํธ ๊ณต๊ฒฉ ๋ฐฉ์ง์ฉ
      secure: true,
      //   domain: "", // ํ๋ก ํธ ์ปดํจํฐ์ Ip ์ฃผ์๋ฅผ ๋ฃ์ด์ผ ํจ
    },
  })
);

app.get("/", (req, res, next) => {
  return res.status(200).send("๐ Express REST FULL API Server Called!");
});

app.use("/api/productType", ProductTypeRouter);

app.listen(PORT, () => {
  console.log(`๐ http://localhost:${PORT} Web Express Server Start`);
});