import { collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, creatingNewNote, deleteNoteById, setActiveNote, SetNotes, SetPhotosActiveNote, setSaving, updateNote } from './journalSlice'
import { loadNotes } from '../../helpers/loadNotes'
import { fileUpload } from '../../helpers/fileUpload'

export const startNewNote = ()=>{
    return async(dispatch,getState)=>{

        dispatch(creatingNewNote())
        const {uid }=  getState().auth

        const newNote ={
            title:'',
            body:'',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc( collection(FirebaseDB,`${uid}/journal/notas`))
        const setDocRespo = await setDoc(newDoc,newNote)

        console.log({newDoc,setDocRespo})

        newNote.id=newDoc.id

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        

    }
}
export const startLoadingNotes = ()=>{
    return async (dispatch, getState) =>{
        const { uid} = getState().auth
        if(!uid) throw new Error('uid  del usuario no existe')
        
        const notes = await loadNotes(uid)
    
        dispatch(SetNotes(notes))
    }
}

export const startSaveNote = ()=>{
    
    return async(dispatch, getState)=>{

    dispatch(setSaving())
    const {uid} = getState().auth
    const {active:note}= getState().journal

    const noteToFireStore = {...note}
    delete noteToFireStore.id

    const docRef = doc(FirebaseDB,`${uid}/journal/notas/${note.id}`)//aqui debe de ir tu ruta de la base de datos de firebase
    await setDoc(docRef,noteToFireStore,{merge:true})
    
    dispatch(updateNote(note))

    }
}

export const startUploandingFiles = (files = [])=>{
    return async (dispatch)=>{
        dispatch(setSaving())
        
        /* await fileUpload (files[0]) */
        const fileUploadPromise =[]
        for( const file of files){
            fileUploadPromise.push(fileUpload(file))
        }

        const photoUrls = await Promise.all(fileUploadPromise)
        dispatch( SetPhotosActiveNote(photoUrls))

    }
}

export const startDeletetingNote = ()=>{
    return async(dispatch, getState)=>{

        const {uid}= getState().auth
        const {active:note} = getState().journal

        const docRef =doc(FirebaseDB,`${uid}/journal/notas/${note.id}}`)
        const  res = await deleteDoc(docRef)

        console.log({res})

        dispatch(deleteNoteById(note.id))
    }
}