

export const fileUpload = async(file)=>{

    if(!file) throw new Error('no tenemos ninfun archivo')

    const cloudUrl = import.meta.env.VITE_CLOUD_URL

    const formData = new FormData()

    formData.append('upload_preset','react-journal')
    formData.append('file',file)

    try {
        const resp = await fetch(cloudUrl,{
            method:'POST',
            body:formData
        })
        
        if(!resp.ok) throw new Error('no se  pudo subir la imagen')

        const cloudResp = await resp.json()
        return cloudResp.secure_url
        
    } catch (error) {
        console.log(error)
        throw new Error(error.message) 
    }

}