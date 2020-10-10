import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  age: Number,
  avatarSrc: String,
  description: String,
  firstAnimeAppearance: String,
  firstMangaAppearance: String,
  name: {
    type: String,
    unique: true,
    required: true,
  },
  nameMeaning: String,
  notableFeatures: String,
  notableQuotes: String,
  rank: String,
  village: { type: mongoose.Schema.Types.ObjectId, ref: 'Village' },
});

characterSchema.statics.findByName = function (character) {};
characterSchema.statics.findById = function (character) {};
characterSchema.statics.findByVillage = function (character) {};
characterSchema.statics.findByClan = function (character) {};

const Character = mongoose.model('Character', characterSchema);

export default Character;
