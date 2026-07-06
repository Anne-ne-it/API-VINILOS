import upload from "../config/multer.js"

router.post("/", upload.single("image"), createProduct)