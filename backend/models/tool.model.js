const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  language: { type: String },
  license: { type: String },
  authorName: { type: String },
  authorUrl: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  topics: [{ type: String }],
  readmeSnippet: { type: String },
  githubUrl: { type: String, required: true },
  officialUrl: { type: String },
  lastUpdated: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
