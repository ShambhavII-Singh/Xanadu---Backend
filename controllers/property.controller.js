import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
    const { _start, _end, _order, _sort, title_like = "", propertyType = "" } = req.query;
    const query = {};
    if (propertyType !== "") {query.propertyType = propertyType};
    if (title_like) {query.title = {$regex: title_like, $options: "i" }};
    try {
        const count = await Property.countDocuments({ query });
        const properties = await Property.find(query).limit(_end).skip(_start).sort({ [_sort]: _order });
        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPropertyDetails = async (req, res) => {

};

const createProperty = async (req, res) => {
    try {
        const { title, description, propertyType, price, location, photo, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const photoURL = await cloudinary.uploader.upload(photo);
        const newProperty = await Property.create({
            title,
            description,
            propertyType,
            price,
            location,
            photo: photoURL.url,
            creator: user._id,
        });
        user.allProperties.push(newProperty._id);
        res.status(304).json("Property created !!!");
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProperty = async (req, res) => {

};

const deleteProperty = async (req, res) => {

};

export {
    getAllProperties,
    getPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty,
};