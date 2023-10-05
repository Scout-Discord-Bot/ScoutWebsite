const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { botColours } = require('../../botColours.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eraseblacklist')
    .setDescription("Deletes a user's blacklist record. [DEV ONLY]")
    .addUserOption(option => option.setName('user').setDescription('The user you want to delete the blacklist record for').setRequired(true)),
    
  async execute(interaction) {
    if (interaction.user.id === '574783977223749632') {

      const loadingEmbed = new EmbedBuilder()
        .setColor(botColours.gray)
        .setDescription('Erasing Blacklist...')
      
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

      const entryIndex = blacklistData.findIndex(entry => entry.UserId === userId);

      if (entryIndex !== -1) {

        
        
        // Remove the entry from the blacklist data
        blacklistData.splice(entryIndex, 1);

        // Save the updated blacklist data to the JSON file
        fs.writeFileSync(blacklistFile, JSON.stringify(blacklistData, null, 2), 'utf8');

        const erasedEmbed = new EmbedBuilder()
        .setColor(botColours.green)
        .setTitle('Blacklist Erased')
        .setDescription(`Blacklist record for \`${user.tag}\` has been erased.`)
        
        
        interaction.reply({ embeds: [loadingEmbed] });
        setTimeout(() => {
          interaction.editReply({ embeds: [erasedEmbed] });
        }, 1000);
        
        
      } else {

        const notFoundEmbed = new EmbedBuilder()
        .setColor(botColours.red)
        .setTitle('Error')
        .setDescription(`No blacklist record found for \`${user.tag}\`.`)
        
        interaction.reply({ embeds: [loadingEmbed] });
        setTimeout(() => {
          interaction.editReply({ embeds: [notFoundEmbed] });
        }, 1000);
        
      }
    } else {
      interaction.reply('You are not authorized to run this command.')
    }
  },
};
