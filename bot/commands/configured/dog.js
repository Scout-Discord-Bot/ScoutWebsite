const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { botColours } = require('../../botColours.json');

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Get a random dog picture!'),
  async execute(interaction) {

    try {
      const url = await fetch("https://www.reddit.com/r/Cutedogsreddit/random/.json");
      const random = await url.json();

      const embed = new EmbedBuilder()
        .setTitle(`Random Meme | ${random[0].data.children[0].data.title}`)
        .setImage(random[0].data.children[0].data.url)
        .setColor(botColours.primary)
        .setFooter({ text: "Dog Picture  Generator" })

      interaction.reply({ embeds: [embed] });

    } catch (err) {
      console.log(err);
    }
  },
}




