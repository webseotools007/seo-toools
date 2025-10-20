const Tool = require('../models/tool.model');
const Category = require('../models/category.model');
const axios = require('axios');
const slugify = require('slugify');

// @desc    Get all tools
// @route   GET /api/tools
// @access  Public
exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find().populate('category');
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single tool
// @route   GET /api/tools/:id
// @access  Public
exports.getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id).populate('category');
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json(tool);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a tool
// @route   POST /api/tools
// @access  Private
exports.createTool = async (req, res) => {
  const {
    name,
    description,
    githubUrl,
    officialUrl,
    category,
    topics,
  } = req.body;

  try {
    const slug = slugify(name, { lower: true });

    let categoryId;
    if (category) {
      let categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        categoryDoc = await Category.create({ name: category, slug: slugify(category, { lower: true }) });
      }
      categoryId = categoryDoc._id;
    }

    const newTool = new Tool({
      name,
      slug,
      description,
      githubUrl,
      officialUrl,
      category: categoryId,
      topics,
    });

    const savedTool = await newTool.save();
    res.status(201).json(savedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a tool
// @route   PUT /api/tools/:id
// @access  Private
exports.updateTool = async (req, res) => {
  try {
    const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a tool
// @route   DELETE /api/tools/:id
// @access  Private
exports.deleteTool = async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tool deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Fetch GitHub repo data
// @route   GET /api/fetchRepoData
// @access  Private
exports.fetchRepoData = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ message: 'GitHub repository URL is required' });
  }

  try {
    const repoPath = new URL(url).pathname;
    const apiUrl = `https://api.github.com/repos${repoPath}`;
    const response = await axios.get(apiUrl);
    const {
      name,
      description,
      stargazers_count,
      forks_count,
      language,
      license,
      owner,
      topics,
      updated_at,
    } = response.data;

    const readmeUrl = `https://api.github.com/repos${repoPath}/readme`;
    const readmeResponse = await axios.get(readmeUrl);
    const readmeContent = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8');
    const readmeSnippet = readmeContent.slice(0, 500);

    res.json({
      name,
      description,
      stars: stargazers_count,
      forks: forks_count,
      language,
      license: license ? license.name : null,
      authorName: owner.login,
      authorUrl: owner.html_url,
      topics,
      lastUpdated: updated_at,
      readmeSnippet,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch repository data' });
  }
};
