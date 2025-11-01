// import api from './api.js'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
  doc,
  where,
  limit,
  getDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'

export const uploadJournalFirebase = async ({ title, content, description, tags }) => {
  try {
    const docRef = await addDoc(collection(db, 'journals'), {
      title,
      content,
      description,
      tags,
      createdAt: serverTimestamp(),
    })

    console.log('✅ Journal added with ID:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('🔥 Error adding journal:', error)
    throw error
  }
}
export const getJournalsFirebase = async () => {
  try {
    const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)

    const journals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null,
    }))

    console.log('✅ Fetched journals:', journals)
    return journals
  } catch (error) {
    console.error('🔥 Error fetching journals:', error)
    throw error
  }
}
export const getJournalByIdFirebase = async (id) => {
  try {
    const docRef = doc(db, 'journals', id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) throw new Error('Journal not found')

    const data = docSnap.data()
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    }
  } catch (error) {
    console.error('🔥 Error fetching journal by ID:', error)
    throw error
  }
}

export const getRelatedJournalsFirebase = async (currentId, tags) => {
  try {
    if (!tags || tags.length === 0) return []

    const q = query(
      collection(db, 'journals'),
      where('tags', 'array-contains-any', tags),
      orderBy('createdAt', 'desc'),
      limit(5),
    )
    const querySnapshot = await getDocs(q)

    const journals = querySnapshot.docs
      .filter((doc) => doc.id !== currentId)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null,
      }))

    return journals
  } catch (error) {
    console.error('🔥 Error fetching related journals:', error)
    return []
  }
}
export const getRecentJournalsFirebase = async () => {
  try {
    // Fetch only the 3 most recent journals
    const q = query(collection(db, 'journals'), orderBy('createdAt', 'desc'), limit(3))
    const querySnapshot = await getDocs(q)

    const journals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null,
    }))

    console.log('✅ Fetched recent 3 journals:', journals)
    return journals
  } catch (error) {
    console.error('🔥 Error fetching recent journals:', error)
    return []
  }
}
// export const uploadJournal = async ({ title, content, tags, description }) => {
//   try {
//     const journal = {
//       title,
//       content,
//       tags,
//       description,
//     }
//     const response = await api.createJournal(journal)
//     return response
//   } catch (error) {
//     console.error('Upload Journal Error:', error)
//     throw error
//   }
// }
// export const getJournals = async () => {
//   try {
//     const response = await api.getJournals()
//     return response
//   } catch (error) {
//     console.error('Get Journals Error:', error)
//     throw error
//   }
// }
// export const getJournalById = async (id) => {
//   try {
//     const response = await api.getJournalById(id)
//     return response
//   } catch (error) {
//     console.error('Get Journal by ID Error:', error)
//     throw error
//   }
// }
// export const getRelatedJournals = async (journalid, tags) => {
//   try {
//     const response = await api.getRelatedJournals(journalid, tags)
//     return response
//   } catch (error) {
//     console.error('Get Related Journals Error:', error)
//     throw error
//   }
// }
// export const getRecentJournals = async () => {
//   try {
//     console.log('Fetching recent journals...')
//     const response = await api.getRecentJournals()
//     return response
//   } catch (error) {
//     console.error('Get Recent Journals Error:', error)
//     throw error
//   }
// }
export const getTagsFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'journals'))
    const allTags = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (Array.isArray(data.tags)) {
        allTags.push(...data.tags)
      }
    })

    // Remove duplicates and sort alphabetically
    const uniqueTags = [...new Set(allTags)].sort((a, b) => a.localeCompare(b))

    console.log('✅ Tags fetched:', uniqueTags)
    return uniqueTags
  } catch (error) {
    console.error('🔥 Error fetching tags:', error)
    throw error
  }
}

// export const getTags = async () => {
//   try {
//     const response = await api.getAllTags()
//     return response
//   } catch (error) {
//     console.error('Get Tags Error:', error)
//     throw error
//   }
// }
// export const getJournalByTag = async (tag) => {
//   try {
//     const response = await api.getJournalByTag(tag)
//     return response
//   } catch (error) {
//     console.error('Get Journal by Tag Error:', error)
//     throw error
//   }
// }
export const getJournalByTagFirebase = async (tag) => {
  try {
    const q = query(
      collection(db, 'journals'),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc'),
    )

    const querySnapshot = await getDocs(q)

    const journals = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null,
    }))

    console.log(`✅ Journals fetched for tag "${tag}":`, journals)
    return journals
  } catch (error) {
    console.error('🔥 Error fetching journals by tag:', error)
    throw error
  }
}
export default {
  getTagsFirebase,
  getJournalByTagFirebase,
  uploadJournalFirebase,
  getJournalsFirebase,
  getJournalByIdFirebase,
  getRelatedJournalsFirebase,
  getRecentJournalsFirebase,
}
