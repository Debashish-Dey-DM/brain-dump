import api from './api.js'

export const uploadJournal = async ({ title, content, tags, description }) => {
  try {
    const journal = {
      title,
      content,
      tags,
      description,
    }
    const response = await api.createJournal(journal)
    return response
  } catch (error) {
    console.error('Upload Journal Error:', error)
    throw error
  }
}
export const getJournals = async () => {
  try {
    const response = await api.getJournals()
    return response
  } catch (error) {
    console.error('Get Journals Error:', error)
    throw error
  }
}
export const getJournalById = async (id) => {
  try {
    const response = await api.getJournalById(id)
    return response
  } catch (error) {
    console.error('Get Journal by ID Error:', error)
    throw error
  }
}
export const getRelatedJournals = async (journalid, tags) => {
  try {
    const response = await api.getRelatedJournals(journalid, tags)
    return response
  } catch (error) {
    console.error('Get Related Journals Error:', error)
    throw error
  }
}
export const getRecentJournals = async () => {
  try {
    console.log('Fetching recent journals...')
    const response = await api.getRecentJournals()
    return response
  } catch (error) {
    console.error('Get Recent Journals Error:', error)
    throw error
  }
}
export const getTags = async () => {
  try {
    const response = await api.getAllTags()
    return response
  } catch (error) {
    console.error('Get Tags Error:', error)
    throw error
  }
}
export const getJournalByTag = async (tag) => {
  try {
    const response = await api.getJournalByTag(tag)
    return response
  } catch (error) {
    console.error('Get Journal by Tag Error:', error)
    throw error
  }
}
export default {
  uploadJournal,
}
