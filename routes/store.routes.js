const express = require("express");
const storeController = require("../controllers/store.controller");

const router = express.Router();

router.post("/", storeController.createStore);

router.get("/", storeController.getStores);

router.get("/:id", storeController.getStoreById);

router.put("/:id", storeController.updateStore);

router.delete("/:id", storeController.deleteStore);

module.exports = router;