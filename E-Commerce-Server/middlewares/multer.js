import multer from 'multer';

// Form upload file is stored temporarily in memory
const storage = multer.memoryStorage();
export const singleFileHandler = multer({
    storage
}).single("file");
