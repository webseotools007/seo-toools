const express = require('express');
const router = express.Router();
const {
  getTools,
  getToolById,
  createTool,
  updateTool,
  deleteTool,
  fetchRepoData,
} = require('../controllers/tool.controller');

router.route('/').get(getTools).post(createTool);
router.route('/fetchRepoData').get(fetchRepoData);
router.route('/:id').get(getToolById).put(updateTool).delete(deleteTool);

module.exports = router;
