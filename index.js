import { createUser, profileCurrentUser, currentUser, loginUserAndPassword } from "./firebase.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3002;
let clientIP = "";

app.use(cors());
app.use(bodyParser.json());

app.post('/fire/createUser', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let displayName = req.body.displayName ? req.body.displayName : "";
  let photoURL = req.body.photoURL ? req.body.photoURL : "";
  clientIP = req.ip || req.socket.remoteAddress;

  console.log("------------------------------------");
  console.log({
    email: email,
    password: password,
    displayName: displayName,
    photoURL: photoURL,
    metadata: {
      endpoint: "/fire/createUser",
      timestamp: new Date(),
      clientIP: clientIP,
    },
  });

  const userData = {
    email: email,
    password: password,
    displayName: displayName,
    photoURL: photoURL,
  };
  await createUser(userData).then(responseData => {
    console.log(responseData);
    console.log("------------------------------------");
    
    res.json(responseData);
  });
});

app.post('/fire/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  clientIP = req.ip || req.socket.remoteAddress;
  console.log("------------------------------------");
  console.log({
    email: email,
    password: password,
    metadata: {
      endpoint: "/fire/login",
      timestamp: new Date(),
      clientIP: clientIP,
    },
  });

  const userData = {
    email: email,
    password: password
  }

  await loginUserAndPassword(email, password).then(responseData => {
    console.log(responseData);
    console.log("------------------------------------");
    
    res.json(responseData);
  })

})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
