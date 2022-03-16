

const express = require("express");
const { redirect } = require("express/lib/response");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

app.use(cookieParser("secret"));
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

function newChar(change, oldNumber) {
  const A_CHAR_CODE = 97;
  const Z_CHAR_CODE = 122;

  let newNumber = change + oldNumber;
  let difference;
  while (!(A_CHAR_CODE <= newNumber && newNumber <= Z_CHAR_CODE)) {
    if (A_CHAR_CODE > newNumber) {
      difference = A_CHAR_CODE - newNumber;
      newNumber = Z_CHAR_CODE - difference;
    } else if (newNumber > Z_CHAR_CODE) {
      difference = Z_CHAR_CODE - newNumber;
      newNumber = A_CHAR_CODE + difference;
    }
  }
  return newNumber;
}

function generateToken(tokenArr) {
  for (let i = 0; i < 7; i++) {
    if (i % 2 === 0) {
      tokenArr.push(newChar((i + 1) * 7, tokenArr[i]));
    } else {
      tokenArr.push(newChar((i + 1) * -4, tokenArr[i]));
    }
  }
  tokenArr = tokenArr.map((ele) => String.fromCharCode(ele));

  return tokenArr.join("");
}

let unclaimedTokens = [];

function checkToken(token) {
  const index = unclaimedTokens.indexOf(token);
  if (index >= 0) {
    unclaimedTokens.splice(index, 1);
  }
  return index >= 0;
}

app.use(express.static(__dirname + "/public"));

let errorArray = [];
app.get("/generateAccessToken", (req, res) => {
  res.render("tokenGeneration.ejs", { errors: errorArray });
});

//takes an email and sends an email out, 
//This is just an email I used to test it out it needs to be changed later
app.post("/generateAccessToken", async (req, res) => {
  errorArray = [];

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  if (
    req.body.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    const start = Math.floor(Math.random() * 26) + 97;
    let charTokenArr = [start];
    const token = generateToken(charTokenArr);
    unclaimedTokens.push(token);

    const mailData = {
      from: "BGZCES2022@gmail.com", // sender address
      to: req.body.email, // list of receivers
      subject: "Heres your link",
      text: "https://www.bgzces2022.com/verify/" + token,
    };

    transporter.sendMail(mailData, function (err) {
      if (err) {
        return err;
      }
    });
  } else {
    errorArray.push("Invalid email, please try again.");
  }
  //return res.json({success: true, msg: 'Success'})
  res.redirect("/generateAccessToken");
});

//makes a cookie if the token is legit 
app.get("/verify/:token", (req, res) => {
  if (checkToken(req.params.token)) {
    res.cookie("verification", "abcde");
  }
  res.redirect("/");
});
//checks if cookie exists if so generates the correct file, if not error message is shown
//normally this would verify the cookie exists before routing but for live demo purposes this has been disabled
app.get("/", (req, res) => {
  res.header("Set-Cookie", "HttpOnly;Secure;SameSite=None");
  // eslint-disable-next-line no-constant-condition
  if (true || req.cookies.verification) {
    res.sendFile("/public/HTML/index.html", { root: __dirname });
  } else {
    res.send("not verified please contact admin for a new token");
  }
});

app.listen(port, "0.0.0.0", () => {});
