const bugModel = require('../models/bugModel');
const userController = require('../controllers/userController');
require('dotenv').config();
const Cloudinary = require('../utils/clodinary');
const userModel = require('../models/userModel');

async function postBug(req, res) {
    try {
        const { title, description,userEmail } = req.body;
        const file = req.files.photo;

        console.log('File:', req.files.photo);
        console.log('Body:', req.body);

       // Upload the image to Cloudinary
        Cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if (err) {
                console.error('Error uploading image to Cloudinary:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            const postedBy = await userController.findUserIdByEmail(userEmail);
            console.log('User Id', postedBy)
            // Create a new Bug instance with the uploaded picture URL
            const newBug = new bugModel({
                title,
                description,
                postedBy,
                pictureURL: result.secure_url, // Save the secure URL of the uploaded image
            });

            // Save the bug to the database
          await newBug.save();

            return res.status(201).json({ success: true, message: 'Bug posted successfully', bug: newBug });
        });
    } catch (error) {
        console.error('Error posting bug:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function getAllBugs(req, res) {
    try {
        const bugs = await bugModel.find()
        .populate('postedBy', 'username email') 
        .populate('assignedTo', 'username email');
        return res.json({ bugs });
    } catch (error) {
        console.error('Error getting bugs:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getDetails(req, res) {
    try {
        const bug = await bugModel.findById(req.params.id)
        .populate('postedBy', 'username email') 
        .populate('assignedTo', 'username email');
        return res.json({ bug });
    } catch (error) {
        console.error('Error getting bugs:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function assignBug(req, res) {
    try {
        const bugId = req.params.bug_Id;
        const employeeId = req.params.employee_Id;

        // Check if the project with the given ID exists
        const existingBug = await bugModel.findById(bugId);
        if (!existingBug) {
            return res.status(400).json({ success: false, message: 'Bug not found' });
        }

        // Check if the employee with the given ID exists
        const existingEmployee = await userModel.findById(employeeId);
        if (!existingEmployee) {
            return res.status(400).json({ success: false, message: 'Employee not found' });
        }

        // Assign the project to the employee
        existingBug.assignedTo = employeeId;
        existingBug.status = 'Assigned';
        await existingBug.save();

        return res.json({ success: true, message: 'Bug assigned successfully', bug: existingBug });
    }
    catch (error) {
        console.error('Error assigning bug:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function resolveBug(req, res) {
    try {
        const bugId = req.params.bug_Id;
      
        const existingBug = await bugModel.findById(bugId);
        if (!existingBug) {
            return res.status(400).json({ success: false, message: 'Bug not found' });
        }

        existingBug.status = 'Resolved';
        await existingBug.save();

        return res.json({ success: true, message: 'Bug resolved successfully', bug: existingBug });
    }
    catch (error) {
        console.error('Error resolving bug:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
module.exports = { postBug, getAllBugs, getDetails, assignBug, resolveBug };


/*
const bugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Assigned', 'Resolved'], default: 'Open' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, 
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    pictureURL: { type: String }, 
    resolveMessage: { type: String, default: 'Bug resolved !' }, 
    createdAt: { type: Date, default: Date.now },
});
 */