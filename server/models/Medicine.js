const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Medicine', medicineSchema)