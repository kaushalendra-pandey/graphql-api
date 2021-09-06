const eventResolvers = require("./event")
const userResolver = require("./user")

module.exports = {
    ...eventResolvers,
    ...userResolver
}
