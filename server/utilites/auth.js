const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { User } = require("../models/User");


const signUp = async (name, email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            throw "Already a user"
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        const savedUser = await newUser.save();
        return savedUser;
    } catch (e) {
        return Promise.reject(e);
    }
};

const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw "Invalid Email"
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw "Invalid Password";
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1y' } );
        return { token };
    } catch (e) {
        return Promise.reject(e);
    }
};

module.exports = { signUp , login };