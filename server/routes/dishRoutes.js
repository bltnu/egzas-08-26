const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const userController = require("../controllers/userController");
const likeController = require("../controllers/likeController");
const orderController = require("../controllers/orderController");
const searchController = require("../controllers/searchController");

router.use(userController.protect);

router
  .route("/")
  .post(userController.restrict("admin"), dishController.createDish)
  .get(dishController.getAllDishes);

router.route("/today").get(dishController.getTodaysDishes);
router.route("/search").get(searchController.searchDishes);

router
  .route("/:dishId")
  .post(likeController.createLike)
  .delete(userController.restrict("admin"), dishController.deleteDish)
  .patch(userController.restrict("admin"), dishController.editDish);

router.route("/:dishId/likes/:userId").post(likeController.createLike);

router.post("/:userId/orders/:dishId", orderController.createOrder);
router.get("/:userId/orders", orderController.getUserOrders);

module.exports = router;
