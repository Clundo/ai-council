const {SlashCommandBuilder} = require('discord.js');
const {Users, Channels} = require('../utils/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts AI Council in this channel!'),
    async execute(interaction) {
        let userData = await Users.getOneByDiscordId(interaction.user.id);
        if (!userData.data?.length) {
            userData = await Users.create({discord_id: interaction.user.id});
        }

        const user = userData.data ? userData.data[0] : null;
        if (!user) {
            await interaction.reply('Something went wrong. Please try again.');
        } else {
            let channelData = await Channels.getOneByDiscordId(interaction.channel.id);
            if (!channelData.data?.length) {
                channelData = await Channels.create({discord_id: interaction.channel.id, user});
            }
            const channel = channelData.data ? channelData.data[0] : null;
            if (!channel) {
                await interaction.reply('Something went wrong. Please try again.');
            } else {
                
                await interaction.reply('AI Council is started. You can now add AI personas by using the /addPersona command!');
            }
        }
    }
}