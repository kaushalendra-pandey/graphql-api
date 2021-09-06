const {buildSchema} = require("graphql")

module.exports = buildSchema(`

type Event {
    _id:ID!,
    name: String!,
    place:String!,
    cost:Float!,
    creator:User!
}

type AuthData {
    userID:ID!,
    token:String!,
    expires:Int!
}

type User {
    _id:ID!,
    name:String!,
    email:String,
    createdEvent:[Event]!
}

input EventInput {
    name: String!,
    place:String!,
    cost:Float!
}

input UserInput {
    name:String!,
    email:String!,
    password:String!
}

type RootQuery {
    events: [Event!]!,
    hotels:[String!]!,
    user(email:String!): User! ,
    login(email:String!,password:String!): AuthData!
}

type RootMutation {
    createEvent(eventInput:EventInput!): Event!
    createUser(userInput:UserInput!):User!
}

schema{
    query : RootQuery
    mutation:RootMutation
}
`)