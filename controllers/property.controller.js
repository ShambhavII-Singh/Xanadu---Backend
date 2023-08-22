import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";

const getAllProperty = async (req, res) => {

};

const getPropertyDetails = async (req, res) => {

};

const createProperty = async (req, res) => {
    try {
        const {title, description, propertyType, price, location, photo, creator } = req.body;
        const session = await mongoose.startSession();
        session.startSession();
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        
    } catch(error) {

    }
};

const updateProperty = async (req, res) => {

};

const deleteProperty = async (req, res) => {

};

export {
    getAllProperty,
    getPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty,
};