const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category: { type: String, required: true },
  imageUrl: { type: String },
  videoUrl: { type: String },
  voiceMessageUrl: { type: String },
  status: {
    type: String,
    enum: ['submitted', 'in_progress', 'resolved'],
    default: 'submitted'
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' }
}, {
  timestamps: true,
});

reportSchema.index({ location: '2dsphere' });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;