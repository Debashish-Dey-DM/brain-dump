import axios from 'axios'

const API_URL = 'https://brain-dump-backend.onrender.com'

export const getJournals = async () => {
  const response = await axios.get(`${API_URL}/journals`)
  return response.data
}

export const getJournalById = async (id) => {
  const response = await axios.get(`${API_URL}/journals/${id}`)
  return response.data
}

export const createJournal = async (journal) => {
  const response = await axios.post(`${API_URL}/journals`, journal)
  return response.data
}
export const getRelatedJournals = async (journalid, tags) => {
  const tagsString = tags.join(',') // e.g. "First,Vue,Test"
  console.log('tagsString', tagsString)
  const response = await axios.get(`${API_URL}/journals/${journalid}/related`, {
    params: { tags: tagsString },
  })
  return response.data
}
export const getRecentJournals = async () => {
  console.log('Fetching recent ...')
  const response = await axios.get(`${API_URL}/journals/recent`)
  return response.data
}
export const getAllTags = async () => {
  const response = await axios.get(`${API_URL}/journals/tags`)
  return response.data
}
export const getJournalByTag = async (tag) => {
  const response = await axios.get(`${API_URL}/journals/tags/${tag}`)
  return response.data
}
export default {
  getJournals,
  getJournalById,
  createJournal,
  getRelatedJournals,
  getRecentJournals,
  getAllTags,
  getJournalByTag,
}
