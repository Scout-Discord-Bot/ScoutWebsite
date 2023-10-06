const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { botColours } = require('../../botColours.json');

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Get a random cat picture!'),
  async execute(interaction) {

    try {
      const url = await fetch("https://www.reddit.com/r/Cats/random/.json");
      const random = await url.json();

      const embed = new EmbedBuilder()
        .setTitle(`Random Cat Pic | ${random[0].data.children[0].data.title}`)
        .setImage(random[0].data.children[0].data.url)
        .setColor(botColours.primary)
        .setFooter({ text: "Cat Picture Generator" })

      interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.log(err);
    }
  },
}




