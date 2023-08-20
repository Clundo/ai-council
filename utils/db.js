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
        const toInsert = []
        Object.keys(user).forEach(key => {
            toInsert.push({key, user[key]})
        })
        return await supabase.from('users').insert(toInsert).select('*')
    },
    update: async (user) => {
        const toInsert = []
        Object.keys(user).forEach(key => {
            key !== 'id'&& toInsert.push({key, user[key]})
        })
        return await supabase.from('users').update(toInsert).select('*').eq('id', user.id)
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
        const toInsert = []
        Object.keys(channel).forEach(key => {
            toInsert.push({key, channel[key]})
        })
        return await supabase.from('channels').insert(toInsert).select('*')
    },
    update: async (channel) => {
        const toInsert = []
        Object.keys(channel).forEach(key => {
            key !== 'id'&& toInsert.push({key, channel[key]})
        })
        return await supabase.from('channels').update(toInsert).select('*').eq('id', channel.id)
    },
    delete: async (id) => {
        return await supabase.from('channels').delete().select('*').eq('id', id)
    }
}

module.exports = {
    Users, Channels
}