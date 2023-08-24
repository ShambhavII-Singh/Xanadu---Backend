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
    try {
        const properties = await Property.find({}).limit(req.query.end);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPropertyDetails = async (req, res) => {

};

const createProperty = async (req, res) => {
    try {
        const {title, description, propertyType, price, location, photo, email } = req.body;
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
        res.status(304).json("Property creaed !!!");
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