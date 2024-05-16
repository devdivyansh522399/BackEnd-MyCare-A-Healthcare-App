import Review from '../models/ReviewSchema.js';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';


export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, message: 'Successful', data: reviews });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Internal Server Error' });
    }
};

export const createReview = async (req, res) => {
   const user = await User.findOne({"_id" : req.body.user})
   const doctor = await Doctor.findOne({"_id": req.body.doctor})
   if(!user || !doctor){
      res.status(200).json({
        success: false,
        message : "user or doctor are not found in database"
      })
   }
    try {
        console.log(req.body)
        const newReview = new Review(req.body);

        const savedReview = await newReview.save();
        await Doctor.findByIdAndUpdate(doctor._id, {
            $push: {
                reviews: savedReview._id,
            },
        });
        res.status(200).json({
            success: true,
            message: 'Review Successfully Submitted',
            data: savedReview,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
