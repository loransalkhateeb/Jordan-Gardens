const Blog = require("../Models/blogs");

exports.createBlog = async (req, res) => {
  try {
    const { title, description, lang } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!title || !description || !image) {
      return res
        .status(400)
        .json({ error: "Title, description, and image are required" });
    }

    if (!["ar", "en"].includes(lang)) {
      return res
        .status(400)
        .json({ error: 'Language must be either "ar" or "en"' });
    }

    const newBlog = await Blog.create({
      title,
      description,
      lang,
      image,
    });

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const { lang } = req.params;

    const blogs = await Blog.findAll({ where: { lang } });

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id, lang } = req.params;

    const blog = await Blog.findOne({
      where: {
        id,
        lang,
      },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, lang } = req.body;

  try {
    // Find the blog by ID
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const imageUrl = req.file ? `${req.file.filename}` : blog.image;
    // Update blog fields
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.lang = lang || blog.lang;
    blog.image = imageUrl; 

    await blog.save();

    // Return the updated blog object
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating blog", error });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const blog = await Blog.findOne({
      where: {
        id,
        lang,
      },
    });
    if (!blog) {
      return res
        .status(404)
        .json({ error: "Blog not found for the specified language" });
    }
    await blog.destroy();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
