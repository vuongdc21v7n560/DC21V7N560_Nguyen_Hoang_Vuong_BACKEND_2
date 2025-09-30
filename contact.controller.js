// Tạo mới contact
exports.create = (req, res) => {
  res.send({ message: "create handler" });
};

// Lấy tất cả contact
exports.findAll = (req, res) => {
  res.send({ message: "findAll handler" });
};

// Lấy 1 contact theo id
exports.findOne = (req, res) => {
  res.send({ message: "findOne handler" });
};

// Cập nhật contact theo id
exports.update = (req, res) => {
  res.send({ message: "update handler" });
};

// Xoá contact theo id
exports.delete = (req, res) => {
  res.send({ message: "delete handler" });
};

// Xoá tất cả contact
exports.deleteAll = (req, res) => {
  res.send({ message: "deleteAll handler" });
};

// Lấy tất cả contact được đánh dấu là favorite
exports.findAllFavorite = (req, res) => {
  res.send({ message: "findAllFavorite handler" });
};
