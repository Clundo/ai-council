const fs = require('node:fs');
const path = require('node:path');
const {Client, GatewayIntentBits, Events, Collection} = require('discord.js');
const env = require('dotenv').config().parsed
const OpenAI = require('openai')
const {Users, Channels} = require('./utils/db')

const BOT_TOKEN = env.BOT_TOKEN

const openai = new OpenAI({
    apiKey: env.AI_KEY
})


const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.MessageContent,

    ]
})

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`The command at ${filePath} does not have the required data and execute properties.`)
    }
}

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    let {data: user} = await Users.getOneByDiscordId(interaction.user.id)
    if (!user.length) {
        const userData = await Users.create({discord_id: interaction.user.id})
        user = userData.data
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
});


let memory = ''

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return

    const channel = await client.channels.fetch(message.channelId)

    const webhooks = await channel.fetchWebhooks()

    webhooks.forEach(async webhook => {
        if (webhook.name === message.author.username) return
        const prompt = `
        In this conversation you should act as ${webhook.name}. 
        This is a natural conversation, so please reply as briefly and concisely as possible. 
        Respond in the following format: "{output: yourResponse as a string, memory: a summary of the existing memory combined with my input and your output in a string format}"
        Please respond to the following: {input: ${message.content}, memory: ${memory}}`

        const response = await openai.chat.completions.create({
            messages: [{role: 'user', content: prompt}], model: 'gpt-3.5-turbo'
        })

        const reply = response.choices[0].message.content

        const parsed = JSON.parse(reply)
        memory = parsed.memory
        console.log(parsed)

        webhook.send(parsed.output)
    })
})

client.login(BOT_TOKEN).then(() => {
    console.log('Logged in!')
})
