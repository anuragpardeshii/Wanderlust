const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js"); 
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router
.route("/")
.get(
    wrapAsync(ListingController.index),
)
// .post(
//     isLoggedIn,
//     validateListing,
//     wrapAsync(ListingController.createListing)
// )
.post( upload.single('listing[image]'), (req, res) => {
    res.send(req.file);
})

//New Route
router.get(
    "/new", 
    isLoggedIn, 
    wrapAsync( ListingController.renderNewForm),
);

router.
route("/:id")
.get(
    wrapAsync(ListingController.showListing)
)
.put( 
    isLoggedIn,
    isOwner,
    validateListing, 
    wrapAsync(ListingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(ListingController.destroyListing)
)

//edit route
router.get(
    "/:id/edit",
    isLoggedIn,  
    isOwner,
    wrapAsync(ListingController.editListing)
);

module.exports = router;