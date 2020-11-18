const mongoose = require("mongoose");
const Blog = require("../Database/Models/Blogs");
const User = require("../Database/Models/User");
const Helper = require("../Helpers/Helpers");

module.exports = {
  oneBlog: async (req, res) => {
    await Blog.find({ _id: req.params.id }, (err, blog) => {
      if (err) {
        Helper.setError(500, err);
      } else {
        Helper.setError(200, "Blog retrieved", blog);
      }
      return Helper.send(res);
    });
  },
  allBlogs: async (req, res) => {
    await Blog.find({}, (err, blogs) => {
      if (err) {
        Helper.setError(500, err);
      } else {
        Helper.setSuccess(200, `${blogs.length} Blogs retrieved`, blogs);
      }
      return Helper.send(res);
    });
    // .select("_id BlogAuthor Content Title FavBy Comments LikedBy createdAt updatedAt");
  },

  userBlogs: async (req, res) => {
    const { id } = req.params;
    await Blog.find({ AuthorID: id }, (err, blogs) => {
      if (err) {
        Helper.setError(500, err);
      } else {
        Helper.setSuccess(200, `${blogs.length} User Blogs retrieved`, blogs);
      }
      return Helper.send(res);
    });
    // .select("_id BlogAuthor Content Title FavBy Comments LikedBy createdAt updatedAt");
  },

  addBlog: async (req, res) => {
    // Users.find({email: res.userData.email},(err, userCreds)=>{
    //   if(err) return res.status(500).json(err.message)
    //   BlogAuthor : userCreds.FirstName + userCreds.LastName
    // })

    const { AuthorID, Content, Title } = req.body;

    try {
      await User.findOne({ _id: AuthorID }, (err, details) => {
        if (err) Helper.setError(500, err);
        else {
          newBlog = new Blog({
            _id: new mongoose.Types.ObjectId(),
            AuthorID,
            Author: `${details.FirstName} ${details.LastName}`,
            Content,
            Title,
          });
        }

        Blog.create(newBlog, (err, blog) => {
          if (err) {
            Helper.setError(500, err);
          } else {
            Helper.setSuccess(201, "Blog added", blog);
          }
          return Helper.send(res);
        });
      });
    } catch (error) {
      Helper.setError(500, err); // Handle Error
    }
  },
  updateBlog: async (req, res) => {
    await Blog.updateOne(
      // Blog.findByIdAndUpdate
      { _id: req.params.id },
      { BlogAuthor: req.body.BlogAuthor },
      (err, blog) => {
        if (err) {
          Helper.setError(500, err);
        } else {
          Helper.setSuccess(200, "Updated", blog);
        }
        return Helper.send(res);
      }
    );
  },

  addComment: async (req, res) => {
    const { UserID, ID, Comment } = req.body;
    try {
      await User.findOne({ _id: UserID }, (err, user) => {
        if (err) Helper.setError(500, err);
        else {
          const newComment = {
            Username: `${user.FirstName} ${user.LastName}`,
            Comment,
            Time: new Date(),
          };

          Blog.findByIdAndUpdate(
            { _id: ID },
            { $push: { Comments: newComment } },
            (err, blog) => {
              if (err) {
                Helper.setError(500, err);
              } else {
                Helper.setSuccess(200, "Blog commented", blog);
              }
              return Helper.send(res);
            }
          );
        }
      });
    } catch (err) {
      Helper.setError(500, err);
    }
  },

  favBlog: async (req, res) => {
    const { UserID, ID } = req.body;

    await Blog.findById({ _id: ID }, (err, blog) => {
      if (err) Helper.setError(500, err);
      else if (blog.FavBy.find((user) => user === UserID)) {
        FavList = blog.FavBy.filter((user) => {
          return user !== UserID;
        });
      } else {
        blog.FavBy.push(UserID);
        FavList = blog.FavBy;
      }
      blog.updateOne({ FavBy: FavList }, (err, result) => {
        if (err) {
          Helper.setError(500, err);
        } else {
          Helper.setSuccess(200, "Blog favored", result);
        }
        return Helper.send(res);
      });
    });
  },

  likeBlog: async (req, res) => {
    const { UserID, ID } = req.body;

    await Blog.findById({ _id: ID }, (err, blog) => {
      if (err) Helper.setError(500, err);
      else if (blog.LikedBy.find((user) => user === UserID)) {
        LikersList = blog.LikedBy.filter((user) => {
          return user !== UserID;
        });
      } else {
        blog.LikedBy.push(UserID);
        LikersList = blog.LikedBy;
      }
      blog.updateOne({ LikedBy: LikersList }, (err, result) => {
        if (err) {
          Helper.setError(500, err);
        } else {
          Helper.setSuccess(200, "Blog liked", result);
        }
        return Helper.send(res);
      });
    });
  },

  viewBlog: async (req, res) => {
    const { ID } = req.params;
    await Blog.findById({ _id: ID }, (err, blog) => {
      if (err) Helper.setError(500, err);
      blog.updateOne({ viewsCount: blog.viewsCount + 1 }, (err, result) => {
        if (err) {
          Helper.setError(500, err);
        } else {
          Helper.setSuccess(200, "Blog viewed", result);
        }
        return Helper.send(res);
      });
    });
  },

  deleteBlog: async (req, res) => {
    // await Blog.deleteMany({}, (err, data) => res.status(200).send(data));
    await await Blog.findByIdAndDelete({ _id: req.params.id }, (err, blog) => {
      if (err) {
        Helper.setError(500, err);
      } else {
        Helper.setSuccess(200, "Blog Deleted", blog);
      }
      return Helper.send(res);
    });
  },
};
