import mongoose from 'mongoose';

const clanSchema = new mongoose.Schema({
  avatarSrc: String,
  description: String,
  name: {
    type: String,
    unique: true,
    required: true,
  },
  signatureAbilities: String,
  village: { type: mongoose.Schema.Types.ObjectId, ref: 'Village' },
});

clanSchema.statics.findByVillage = function (clan) {};

const Clan = mongoose.model('Clan', clanSchema);

export default Clan;
