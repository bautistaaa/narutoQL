import mongoose from 'mongoose';

const villageSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Village = mongoose.model('Village', villageSchema);

export default Village;
