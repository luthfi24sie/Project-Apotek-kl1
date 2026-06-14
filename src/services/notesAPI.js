import { supabase } from '../lib/supabaseClient'

// Nama tabel sesuai dengan Supabase Anda!
const TABLE_NAME = 'Catatan' 

export const notesAPI = {
    async fetchNotes() {
        console.log(`[NotesAPI] Fetching from table: ${TABLE_NAME}`)
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) {
            console.error('[NotesAPI] Fetch Error:', error)
            throw new Error(`Tidak bisa mengambil data: ${error.message}. Pastikan tabel '${TABLE_NAME}' ada di Supabase dan RLS dimatikan.`)
        }
        return data
    },

    async createNote(data) {
        console.log(`[NotesAPI] Creating note in table: ${TABLE_NAME}`, data)
        const { data: insertedData, error } = await supabase
            .from(TABLE_NAME)
            .insert(data)
            .select()
        
        if (error) {
            console.error('[NotesAPI] Create Error:', error)
            throw new Error(`Tidak bisa menambah data: ${error.message}`)
        }
        return insertedData
    },

    async updateNote(id, data) {
        const { error } = await supabase
            .from(TABLE_NAME)
            .update(data)
            .eq('id', id)
        
        if (error) throw error
    },

    async deleteNote(id) {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id)
        
        if (error) throw error
    }
}
