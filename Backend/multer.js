import multer from 'multer';


const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const filename = file.originalname.split(".")[0];
        cb(null,filename + "-" + uniqueSuffix + ".png");
    }
});

export const upload = multer({ storage: storage });