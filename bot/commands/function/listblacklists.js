const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { botColours } = require('../../botColours.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listblacklists')
    .setDescription('Lists all blacklisted users. [DEV ONLY]'),
  async execute(interaction) {
    if (interaction.user.id === '574783977223749632') {
      // Load the existing blacklist data from the JSON file
      const blacklistFile = path.join('blacklists.json');
      let blacklistData = [];

      try {
        blacklistData = JSON.parse(fs.readFileSync(blacklistFile));
      } catch (error) {
        console.error('Error loading blacklist data:', error);
      }

      const noBlacklistedUsers = new EmbedBuilder()
        .setColor(botColours.primary)
        .setDescription('There are no blacklisted users.');

      const loadingEmbed = new EmbedBuilder()
        .setColor(botColours.gray)
        .setDescription('Fetching Blacklist Data...');

      if (blacklistData.length === 0) {
        interaction.reply({ embeds: [loadingEmbed] });
        setTimeout(() => {
          interaction.editReply({ embeds: [noBlacklistedUsers] });
        }, 1000);
      } else {
        const blacklistEmbed = new EmbedBuilder()
          .setColor(botColours.primary)
          .setTitle('Blacklists')
          .addFields(
            ...blacklistData.map(entry => ({
              name: `${entry.UserTag} (${entry.UserId})`,
              value: `**Reason:** ${entry.Reason}\n**Moderator:** ${entry.Moderator}\n**Date/Time:** ${entry.DateTime}\n**Active:** ${entry.Active ? 'Yes' : 'No'}`,
              inline: false
            }))
          );

        interaction.reply({ embeds: [loadingEmbed] });
        setTimeout(() => {
          interaction.editReply({ embeds: [blacklistEmbed] });
        }, 2000);
      }
    } else {
      interaction.reply('You are not authorized to run this command.');
    }
  }
};
