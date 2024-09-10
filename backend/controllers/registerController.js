import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { name, email, mobile, companyName, city, domainURL, ipAddress, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            mobile,
            companyName,
            city,
            domainURL,
            ipAddress,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ script: user.script, eid: user.eid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getDomain = async (req, res) => {
    try {
        const eid = req.params.eid;
        const user = await User.findOne({ eid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ domainURL: user.domainURL });
    } catch (error) {
        console.error('Error fetching domain URL:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
