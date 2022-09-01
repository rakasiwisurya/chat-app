const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.status(400).send({
        status: false,
        message: "Username already used",
      });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.status(400).send({
        status: false,
        message: "Email already used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user._doc.password;

    res.send({
      status: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Incorrect username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user._doc.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        status: false,
        message: "Incorrect username or password",
      });
    }

    delete user._doc.password;

    res.send({
      status: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.avatar = async (req, res) => {
  const { image } = req.body;
  const { id } = req.params;

  try {
    const data = await User.findByIdAndUpdate(id, {
      isAvatarImageSet: true,
      avatarImage: image,
    });

    res.send({
      status: true,
      message: "Success set avatar",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};
