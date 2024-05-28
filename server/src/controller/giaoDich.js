const GoogleAccount = require("../model/googleAccount");
const User = require("../model/user");
const GiaoDich = require("../model/giaoDich"); // Đảm bảo rằng bạn đã import GiaoDich từ đúng đường dẫn

exports.getGiaoDichByUser = async (req, res) => {
  try {
    let query = {};
    if (req.params.userId) {
      query = {
        user: { $eq: req.params.userId },
      };
    }
    const giaoDichs = await GiaoDich.find(query)
      .populate("googleAccount")
      .populate("user")
      .sort({ ngayGiaoDich: -1 });
    res.send(giaoDichs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Lấy tất cả GiaoDichs
exports.getAllGiaoDich = async (req, res) => {
  try {
    let query = {};

    if (req.query.startDate && req.query.endDate) {
      const startDate = new Date(req.query.startDate).setHours(0, 0, 0, 0);
      const endDate = new Date(req.query.endDate).setHours(23, 59, 59, 999);
      query = {
        ngayGiaoDich: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    } else {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      query = {
        ngayGiaoDich: {
          $gte: currentDate,
          $lte: currentDate,
        },
      };
    }

    const sortField = req.query.sortField || 'ngayGiaoDich';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sortQuery = {};
    sortQuery[sortField] = sortOrder;

    const giaoDichs = await GiaoDich.find(query)
      .populate("user")
      .populate("googleAccount")
      .sort(sortQuery);
    res.send(giaoDichs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Thêm một GiaoDich
exports.addGiaoDich = async (req, res) => {
  try {
    const giaoDich = new GiaoDich(req.body);
    await giaoDich.save();
    res.status(201).send(giaoDich);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Cập nhật một GiaoDich
exports.edit = async (req, res) => {
  try {
    const giaoDich = await GiaoDich.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!giaoDich) {
      return res.status(404).send();
    }
    res.send(giaoDich);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Xóa một GiaoDich
exports.delete = async (req, res) => {
  try {
    const giaoDich = await GiaoDich.findByIdAndDelete(req.params.id);
    if (!giaoDich) {
      return res.status(404).send();
    }
    res.send(giaoDich);
  } catch (error) {
    res.status(500).send(error);
  }
};
