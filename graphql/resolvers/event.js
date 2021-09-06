const eventSchema = require("../../models/event")
const userSchema = require("../../models/user")

module.exports = {
    events: async (args,req,res) => {
        console.log(req.isAuth)
        const events = await eventSchema.find({}).populate("creator")
        return events
    },
   
    createEvent: async (args) => {
        const event = new eventSchema({
            name:args?.eventInput?.name,
            place:args?.eventInput?.place,
            cost:args?.eventInput?.cost,
            creator:"613651b6d91a247a79c0e03d"
        })
        try {
            await event.save()
            await event.populate("creator")
            const event_id = event._id
            let user = await userSchema.findById("613651b6d91a247a79c0e03d")
            console.log(user)
            user.createdEvent.push(event_id)
            await user.save()
            return event
            
        } catch (error) {
            console.log(error)
            throw new Error("Something went wrong!")
        }
        
    },

}
