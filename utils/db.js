const {createClient} = require('@supabase/supabase-js')

const supabaseUrl = process.env.DB_URI
const supabaseKey = process.env.DB_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const Users = {
    getOneById: async (id) => {
        return await supabase.from('users').select('*').eq('id', id)
    },
    getOneByDiscordId: async (discord_id) => {
        return await supabase.from('users').select('*').eq('discord_id', discord_id)
    },
    getAll: async () => {
        return await supabase.from('users').select('*')
    },
    create: async (user) => {
        return await supabase.from('users').insert(Object[user].keys.map(key => {key, user[key]})).select('*')
    },
    update: async (user) => {
        return await supabase.from('users').update(Object[user].keys.map(key => {key, user[key]})).select('*').eq('id', user.id)
    },
    delete: async (id) => {
        return await supabase.from('users').delete().select('*').eq('id', id)
    }
}

const Channels = {
    getOneById: async (id) => {
        return await supabase.from('channels').select('*').eq('id', id)
    },
    getOneByDiscordId: async (discord_id) => {
        return await supabase.from('channels').select('*').eq('discordId', discord_id)
    },
    getAll: async () => {
        return await supabase.from('channels').select('*')
    },
    create: async (channel) => {
        return await supabase.from('channels').insert(Object[channel].keys.map(key => {key, channel[key]})).select('*')
    },
    update: async (channel) => {
        return await supabase.from('channels').update(Object[channel].keys.map(key => {key, channel[key]})).select('*').eq('id', channel.id)
    },
    delete: async (id) => {
        return await supabase.from('channels').delete().select('*').eq('id', id)
    }
}

module.exports = {
    Users, Channels
}