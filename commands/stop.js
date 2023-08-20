const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops AI Council in this channel. This removes all config!'),
    async execute(interaction) {
        let userData = await Users.getOneByDiscordId(interaction.user.id);

        user = userData.data ? userData.data[0] : null;
        if (!user) {
            await interaction.reply('Something went wrong. Please try again.');
        } else {
            const channel = await Channels.getOneByDiscordId(interaction.channel.id);
            if (!channel) {
                await Channels.delete({discord_id: interaction.channel.id, user});
            }
            await interaction.reply('AI Council is started. You can now add AI personas by using the /addPersona command!');
        }
    }
}