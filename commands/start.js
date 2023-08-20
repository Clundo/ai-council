const { SlashCommandBuilder } = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts AI Council in this channel!'),
    async execute(interaction) {
        
        await interaction.reply('AI Council is started. You can now add AI personas by using the /addPersona command!');
    }
}