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
export default {
  uploadJournal,
}
