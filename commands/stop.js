const {SlashCommandBuilder} = require('discord.js');
const {Users, Channels} = require('../utils/db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops AI Council in this channel. This removes all config!'),
    async execute(interaction) {
        let userData = await Users.getOneByDiscordId(interaction.user.id);

        const user = userData.data ? userData.data[0] : null;
        if (!user) {
            await interaction.reply('Something went wrong. Please try again.');
        } else {
            const channelData = await Channels.getOneByDiscordId(interaction.channel.id);
            if (!channelData.data?.length) {
                await interaction.reply('AI Council is not started in this channel.');
            } else {
                await Channels.delete({discord_id: interaction.channel.id, user});
                await interaction.reply('AI Council is removed from this channel.');
            }
        }
    }
}