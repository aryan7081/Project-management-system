const express = require('express');
const { createProject } = require('../controllers/projectController');
const { updateproject } = require('../controllers/projectController');
const { deleteProject } = require('../controllers/projectController');
const { getproject } = require('../controllers/projectController');
const { getAllprojects } = require('../controllers/projectController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createProject);
router.post('/update/:id', authMiddleware, updateproject);
router.post('/delete/:id', authMiddleware, deleteProject);
router.post('/:id', authMiddleware, getproject);
router.post('/', authMiddleware, getAllprojects);

module.exports = router;
