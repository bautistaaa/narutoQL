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
  village: String,
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
