const userSchema = require("../../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
   
    user: async (args) => {
        const {email} = args
        const user = await userSchema.findOne({email:email}).populate("createdEvent")
        return user
    },

    createUser: async (args) => {
        const {userInput} = args
        const hashedPassword = await bcrypt.hash(userInput.password,12) 
        const user = new userSchema({
            name:userInput.name,
            email:userInput.email,
            password:hashedPassword
        })
        await user.save()
        return user
    },

    login: async ({email,password}) => {
        const user = await userSchema.findOne({email})
        if(!user){
            throw new Error("No such user exist")
        }
        const isCorrect = await bcrypt.compare(password,user?.password)
        if(!isCorrect){
            throw new Error("Email and password doesnt match!")
        }

        const token = jwt.sign({userID:user.id,email:user?.email},"bcacbacbnqucuqeqcn993993ncjajc",{
            expiresIn:"1h"
        })

        return {userID:user.id,token,expires:"1"}
    }
}
