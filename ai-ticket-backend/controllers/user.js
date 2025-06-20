import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { inngest} from '../inngest/client.js';


export const signup = async (req,res)=>{
    const { email, password,skills=[] } = req.body;

    try{
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            skills
        });

        //Fire inngest event 

        await inngest.send({
            name: 'user.signup',
            data: {
                email: email,
            }
        });

        const token = jwt.sign({
            _id: user._id,
            role : user.role,
        },
        process.env.JWT_SECRET)


        res.json({
            user,token
        })

       
    }catch(error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });

    }
}


export const login = async (req,res)=>{
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email }); // Changed to findOne
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.json({
            user,
            token
        });
    }catch(error) {
        console.error('Error during login:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            res.json({
                message: 'User logged out successfully',
                userId: decoded._id
            });
        });

    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
        
    }
}


export const updateUser = async (req, res) => {
   const {email, skills=[], role} = req.body;
   try{
       if(req.user?.role !== 'admin') {
           return res.status(403).json({
               message: 'Forbidden: Only admins can update users'
           });
       }
    // Fix findById to findOne
    const user = await User.findOne({email});
    if(!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    await User.updateOne(
      { email },  // query criteria
      {  // update document
        skills: skills.length ? skills : user.skills,
        role,
      }
    );

    return res.status(200).json({
        message: 'User updated successfully'
    });
        
   }catch(error) {
       console.error('Error during user update:', error);
       res.status(500).json({
           message: 'Internal server error',
           error: error.message
       });
   }
}


export const getUser = async (req, res) => {
    try {
        console.log("User requesting access:", req.user);
        
        if(req.user?.role !== 'admin') {
            return res.status(403).json({
                message: 'Forbidden: Only admins can access user details'
            });
        } 
        
        const users = await User.find().select('-password');
        return res.status(200).json(users);  // Add status code and return
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}