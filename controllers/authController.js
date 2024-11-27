const orderJson = require("../orders.json");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    console.log("çalıştı");
    if (req.body.name == "Muaz" && req.body.password == "Asilkan") {
      const jwtInfo = {
        name: req.body.name,
        password: req.body.password,
        auth: true,
      };
      const jwtToken = jwt.sign(jwtInfo, process.env.JWT_SECRET_KEY, {
        expiresIn: "365d",
      });
      response = {
        userName: req.body.name,
        accesToken: jwtToken,
      };
      console.log(response);

      res.status(200).json(response);
    }else{
        res.status(400).json({msg:'Hatalı Giriş'});
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
};
