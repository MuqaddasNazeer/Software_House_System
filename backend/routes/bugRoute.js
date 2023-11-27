const express = require("express");
const router = express.Router();
const bugController = require("./../controllers/bugController");

router.get('/bugs', bugController.getAllBugs)

router.post('/postBug', bugController.postBug)

router.get('/bugsDetails/:id', bugController.getDetails)

router.post('/assignBug/:bug_Id/:employee_Id', bugController.assignBug);

router.post('/resolveBug/:bug_Id', bugController.resolveBug)

module.exports = router ;