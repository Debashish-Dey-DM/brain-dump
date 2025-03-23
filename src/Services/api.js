import axios from 'axios'

const API_URL = 'http://localhost:3000'

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
export default {
  getJournals,
  getJournalById,
  createJournal,
}
