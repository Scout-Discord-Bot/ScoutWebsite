const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { DateTime } = require('luxon');
const dbName = 'Scout';

let db;

async function connectDatabase(uri) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();
  db = client.db('Scout');
}

function getDB() {
  return db;
}

async function getUserXP(guildID, userID) {
  const guild = await client.db(dbName).collection('your-collection-name').findOne({ guildID: guildID });
  return guild?.levels[userID] || 0;
}

async function updateUserXP(guildID, userID, xpGain) {
  const guild = await client.db(dbName).collection('your-collection-name').findOne({ guildID: guildID });
  if (!guild) {
    // If guild document doesn't exist, create one with the user's XP
    await client.db(dbName).collection('your-collection-name').insertOne({ guildID: guildID, levels: { [userID]: xpGain } });
  } else {
    // Update the user's XP, or set it if the user doesn't exist in the guild document
    guild.levels[userID] = (guild.levels[userID] || 0) + xpGain;
    await client.db(dbName).collection('your-collection-name').updateOne({ guildID: guildID }, { $set: { levels: guild.levels } });
  }
}

module.exports = {
  connectDatabase,
  getDB,
  getUserXP,
  updateUserXP,
};
