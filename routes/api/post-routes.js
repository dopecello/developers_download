const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Post, User, Vote } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "post_url", "title", "created_at"],
      order: [["created_at", "DESC"]],
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
        post_url: req.body.post_url,
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

router.put("/upvote", (req, res) => {
  Vote.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  }).then(() => {
    // then find the post we just voted on
    return Post.findOne({
      where: {
        id: req.body.post_id,
      },
      attributes: [
        "id",
        "post_url",
        "title",
        "created_at",
        // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
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
