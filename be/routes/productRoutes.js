const express = require("express");
const product = require("../controllers/product");

const router = express.Router();

// COURSES

router.post("/", product.createItems);

router.put('/:id', product.updateItems);

router.get('/:id', product.readItems);

router.delete('/:id', product.deleteItems);

router.get('/', product.getItems);



module.exports = router;
