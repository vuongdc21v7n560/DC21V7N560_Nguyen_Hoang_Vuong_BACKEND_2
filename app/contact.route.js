const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

// Route gốc /api/contacts
router.route("/")
  .get(contacts.findAll)      // Lấy tất cả contacts
  .post(contacts.create)      // Tạo contact mới
  .delete(contacts.deleteAll) // Xóa tất cả contacts

// Route /api/contacts/favorite
router.route("/favorite")
  .get(contacts.findAllFavorite); // Lấy danh sách contact yêu thích

// Route /api/contacts/:id
router.route("/:id")
  .get(contacts.findOne)     // Lấy contact theo id
  .put(contacts.update)      // Cập nhật contact theo id
  .delete(contacts.delete);  // Xóa contact theo id

module.exports = router;

const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/", contactController.create);

module.exports = router;
