import { useEffect, useMemo, useRef } from 'react';

import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks/useform';
import { ImagesGallery } from '../components/ImagesGallery'
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletetingNote, startSaveNote, startUploandingFiles } from '../../store/journal/thunks';

export const NoteView = () => {

    const dispatch = useDispatch()
    const { active:note,messageSaved, isSaving} = useSelector(state => state.journal)
     const {body, title, date, onInputChange,formState} = useForm(note)

     useEffect(() => {
        dispatch(setActiveNote(formState))
     }, [formState])
     useEffect(() => {
        if(messageSaved.length > 0){
            Swal.fire('nota actualizada',messageSaved,'success')
        }
     }, [messageSaved])
     

     const dateString = useMemo(()=>{
        const newDate = new Date(date)
        return newDate.toDateString()
     },[date])

    const fileInpuntRef = useRef()
     
     const onSaveNote = ()=>{
        dispatch(startSaveNote())
     } 
     const onFileInputChange = ({target})=>{
        if(target.files ===0) return
        dispatch(startUploandingFiles(target.files))
     }
     const onDelete = ()=>{
        dispatch(startDeletetingNote())
     }
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
        </Grid>
        <Grid item>
            <input  
                type='file'
                multiple
                onChange={onFileInputChange}
                style={{display:'none'}}
                ref={fileInpuntRef}
            />

            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={ ()=> fileInpuntRef.current.click()}
            >
                <UploadFileOutlined />
            </IconButton>

            <Button 
                disabled={isSaving}
                color="primary"
                sx={{ padding: 2 }}
                onClick={onSaveNote}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                value={title}
                name='title'
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                name='body'
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                value={body}
                onChange={onInputChange}
            />
        </Grid>
        <Grid container justifyContent='end' >
            <Button 
                onClick={onDelete}
                sx={{mt:2}}
                color='error'
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>
        <ImagesGallery images={note.imageUrls} />
        

    </Grid>
  )
}