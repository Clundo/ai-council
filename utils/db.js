const {createClient} = require('@supabase/supabase-js')

const supabaseUrl = process.env.DB_URI
const supabaseKey = process.env.DB_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const Users = {
    getOneById: async (id) => {
        return await supabase.from('users').select('*').eq('id', id)
    },
    getOneByDiscordId: async (discordId) => {
        return await supabase.from('users').select('*').eq('discordId', discordId)
    },
    getAll: async () => {
        return await supabase.from('users').select('*')
    },
    create: async (user) => {
        return await supabase.from('users').insert(user).select('*')
    },
    update: async (user) => {
        return await supabase.from('users').update(user).select('*').eq('id', user.id)
    },
    delete: async (id) => {
        return await supabase.from('users').delete().select('*').eq('id', id)
    }
}

const Channels = {
    getOneById: async (id) => {
        return await supabase.from('channels').select('*').eq('id', id)
    },
    getOneByDiscordId: async (discordId) => {
        return await supabase.from('channels').select('*').eq('discordId', discordId)
    },
    getAll: async () => {
        return await supabase.from('channels').select('*')
    },
    create: async (channel) => {
        return await supabase.from('channels').insert(channel).select('*')
    },
    update: async (channel) => {
        return await supabase.from('channels').update(channel).select('*').eq('id', channel.id)
    },
    delete: async (id) => {
        return await supabase.from('channels').delete().select('*').eq('id', id)
    }
}

module.exports = {
    Users, Channels
}