const express = require("express");
const {createAttrition} = require("../Controllers/attritionController")
const router = express.Router();

router.post("/createAttrition", createAttrition);

module.exports = router;
