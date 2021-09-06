const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const app = express()
const mongoose = require("mongoose")
const graphqlSchema = require("./graphql/schemas/index")
const graphqlResolvers = require("./graphql/resolvers/index")
const { authMiddleware } = require("./graphql/middleware/auth")


app.use(express.json())



mongoose.connect("mongodb+srv://kaushalendra:qwerty123@cluster0.dgbe4.mongodb.net/graphql-events?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(() => {
    console.log("connected DB")
}).catch((e) => {
    console.log(e)
})

app.use(authMiddleware)

app.use("/graphql",graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql:true
}))

app.listen(9999,() => {
    console.log("Listening")
})


