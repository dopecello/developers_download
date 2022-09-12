const router = require("express").Router();
const { Post, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "post_url", "title", "created_at"],
      order: [['created_at', 'DESC']], 
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_url", "title", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const dbPostData = Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id,
    });
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dbPostData = Post.update(
      {
        title: req.body.title,
        post_url: req.body.post_url
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dbPostData = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
