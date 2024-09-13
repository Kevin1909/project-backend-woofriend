

export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    
    if ( !file ) return callback( new Error('File is empty'), false );

    console.log({file})
    const fileExptension = file.originalname.split(".")[1];
    console.log(fileExptension)
    const validExtensions = ['jpg','jpeg','png','gif'];

    if (  validExtensions.includes( fileExptension ) ) {
        return callback( null, true )
        
    }
    
    callback(null, false );

}
