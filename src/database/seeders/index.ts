require('dotenv').config();
import { connectDb } from '../model';
import seedVillage from './village';
import seedClan from './clan';
import seedCharacter from './character';

async function seedDatabase() {
  const mongoose = await connectDb();

  console.log(`Connected to database: ${mongoose.connection.name}...`);
  await seedVillage();
  await seedClan();
  await seedCharacter();

  console.log('Finished seeding all collections!');
  process.exit(0);
}

seedDatabase();
