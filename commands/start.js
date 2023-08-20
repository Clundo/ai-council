const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts AI Council in this channel!'),
    async execute(interaction) {
        let userData = await Users.getOneByDiscordId(interaction.user.id);
        if (!userData.data?.length) {
            userData = await Users.create({discord_id: interaction.user.id});
        }

        user = userData[0];
        if (!user) {
            await interaction.reply('Something went wrong. Please try again.');
        } else {
            const channel = await Channels.getOneByDiscordId(interaction.channel.id);
            if (!channel) {
                await Channels.create({discord_id: interaction.channel.id, user});
            }
            await interaction.reply('AI Council is started. You can now add AI personas by using the /addPersona command!');
        }
    }