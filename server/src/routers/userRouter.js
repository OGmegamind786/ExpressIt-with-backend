const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Expresso = require("../models/Expresso");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "../../images/" });

router.use("/images", express.static("../../images"));

// =========================================User Authentication Routes=======================================

router.post("/users/register", async (req, res) => {
  // Create a new user

  try {
    const isUserEmail = await User.findOne({
      email: req.body.email,
    });
    if (isUserEmail) {
      throw new Error({ error: " Email already registered" });
    } else {
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Email present" + error);
    // alert(error);
  }
});

router.post("/users/login", async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
    console.log(res.data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me/profile", auth, async (req, res) => {
  // View logged in user profile
  const u = await User.findOne({
    tokens: {
      $elemMatch: {
        token: req.token,
      },
    },
  }).populate("userExpressos.expresso");
  res.send(u);
});

router.post("/users/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// ============================================User create and Update Profile route=======================================================

router.post(
  "/users/me/createProfile",
  auth,
  upload.single("image"),
  async (req, res) => {
    //create User Profile

    try {
      const user = await User.findOne({
        tokens: {
          $elemMatch: {
            token: req.token,
          },
        },
      });

      await user.updateOne({
        ...req.body,
        image: req.file.path,
      });
      const u = await User.findOne({
        tokens: {
          $elemMatch: {
            token: req.token,
          },
        },
      });

      res.status(201).send(u);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// ===========================================User Feed routes==================================================

router.get("/users/me/feed", auth, async (req, res) => {
  try {
    const userFeed = await Expresso.find();
    res.status(201).send(userFeed);
  } catch (error) {
    res.send(400).send(error);
  }
});

router.get("/users/me/feed/search/", auth, async (req, res) => {
  try {
    let regex = new RegExp(req.query.category, "i");
    const searchedExpresso = await Expresso.find({ category: regex });
    res.status(201).send(searchedExpresso);
  } catch (error) {
    res.send(400).send(error);
  }
});

//

//----------------------------------------------------User Create Expresso routes---------------------------------

router.post(
  "/users/me/createExpresso",
  auth,
  upload.single("image"),
  async (req, res) => {
    //create Expresso

    try {
      const user = req.user;
      console.log(req.body, req.file);
      const expresso = new Expresso({
        ...req.body,
        image: req.file.path,
        image_mime_type: req.file.mimetype,
      });
      await expresso.save();
      await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $push: {
            userExpressos: {
              expresso: expresso._id,
            },
          },
        }
      );
      const u = await User.findOne({
        tokens: {
          $elemMatch: {
            token: req.token,
          },
        },
      }).populate("userExpressos.expresso");
      res.status(201).send({ u });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post("/users/me/deleteExpresso", auth, async (req, res) => {
  try {
    const user = req.user;
    const expressoId = req.body.expresso_id;
    await Expresso.findOneAndDelete({ _id: expressoId });
    await User.updateMany(
      {
        userBookmarkedExpressos: { $exists: true },
      },
      {
        $pull: {
          userBookmarkedExpressos: {
            expresso: expressoId,
          },
        },
      }
    );

    const u = await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $pull: {
          userExpressos: {
            expresso: expressoId,
          },
        },
      }
    );
    res.status(201).send({ u });
  } catch (error) {
    res.status(500).send(error);
  }
});

// =====================================================Book-Mark Expresso==================================================

router.post("/users/me/addToFavorite", auth, async (req, res) => {
  try {
    const user = req.user;
    const expressoId = req.body.expresso_id;
    console.log(expressoId);

    const isExpressoFavorite = await User.findOne({
      userBookmarkedExpressos: {
        expresso: expressoId,
      },
    });
    if (isExpressoFavorite) {
      throw new Error({ error: "Expresso already Favorited" });
    } else {
      await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $push: {
            userBookmarkedExpressos: {
              expresso: expressoId,
            },
          },
        }
      );
    }
    const u = await User.findOne({
      tokens: {
        $elemMatch: {
          token: req.token,
        },
      },
    }).populate("userBookmarkedExpressos.expresso");
    res.status(201).send({ u });
  } catch (error) {
    res.status(400).send("Expresso present" + error);

    alert(error);
  }
});

router.get("/users/me/favoriteExpresso", auth, async (req, res) => {
  try {
    const u = await User.findOne({
      tokens: {
        $elemMatch: {
          token: req.token,
        },
      },
    }).populate("userBookmarkedExpressos.expresso");
    res.send(u);
  } catch (error) {}
});

module.exports = router;
