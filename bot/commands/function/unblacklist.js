const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unblacklist')
    .setDescription("Deactivates a user's blacklist status. [DEV ONLY]")
    .addUserOption(option => option.setName('user').setDescription('The user you want to deactivate blacklist status for').setRequired(true)),
  async execute(interaction) {
    if (interaction.user.id === '574783977223749632') {
      const user = interaction.options.getUser('user');
      const userId = user.id;

      // Load the existing blacklist data from the JSON file
      const blacklistFile = path.join('blacklists.json');
      let blacklistData = [];

      try {
        blacklistData = JSON.parse(fs.readFileSync(blacklistFile));
      } catch (error) {
        console.error('Error loading blacklist data:', error);
      }

      const entryIndex = blacklistData.findIndex(entry => entry.UserId === userId && entry.Active === true);

      if (entryIndex !== -1) {
        // Deactivate the blacklist status
        blacklistData[entryIndex].Active = false;

        // Save the updated blacklist data to the JSON file
        fs.writeFileSync(blacklistFile, JSON.stringify(blacklistData, null, 2), 'utf8');

        interaction.reply(`${user.tag} has been removed from the blacklist.`);
      } else {
        interaction.reply(`${user.tag} is not in the active blacklist.`);
      }
    } else {
      interaction.reply('You are not authorized to run this command.')
    }
  },
};
