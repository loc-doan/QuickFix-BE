const User = require("../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await geneToken(email, password);
    if (!result) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const { user, accessToken } = result;
    if (user.status === "inactive" || user.status === "banned"){
      return res.status(400).json({ message: "This account have been banned or inactive" });
    };
    return res.status(200).json({ 
      message: "Login successful",
      data: { user, accessToken },
   });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function geneToken(email, password) {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  const accessToken = jwt.sign(
    { id: user._id, role: user.role},   // { id: user._id, role: user.role ,position: user.position},
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
  return { user, accessToken };
}
// async function register(data) {
//   const hashedPassword = await bcrypt.hash(data.password, 10);
//   const user = await User.create({ ...data, password: hashedPassword });
//   return user;
// }
module.exports = {
  login
};
