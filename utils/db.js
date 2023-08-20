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
    create: async ({discord_id}) => {
        return await supabase.from('users').insert([{discord_id}]).select('*')
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
    create: async ({discord_id, user}) => {
        return await supabase.from('channels').insert([{discord_id, owner_id: user.discord_id}]).select('*')
    },
    delete: async ({discord_id, user}) => {
        return await supabase.from('channels').delete().select('*').eq('id', id).eq('owner_id', user.id)
    }
}

module.exports = {
    Users, Channels
}