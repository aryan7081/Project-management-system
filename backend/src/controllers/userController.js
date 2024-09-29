const prisma = require('../models/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const {username, email, password} = req.body;
    if (!email || !password || !username){
        return res.status(400).json({error: 'Invalid credentials'})
    }

    try {
        const existingUser = await prisma.user.findUnique({where: {email}})
        if (existingUser){
            return res.status(400).json({error:"User already exist"})

        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        });
        res.status(200).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });
    } catch (error){
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await prisma.user.findUnique({where: {email}})
        if (!user) return res.status(400).json({error: "User not found"})
        const validPassword = await bcrypt.compare(password,user.password)
        if (!validPassword) return res.status(400).json({error: "Invalid Password"})

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.json({accessToken: token})


    } catch (error) {
        res.status(500).json({error: "Server error"})    
    }
}