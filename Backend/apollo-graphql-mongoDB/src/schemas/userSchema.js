import { gql } from 'apollo-server';

export default gql`
scalar Date

type User{
	id: ID! 
	username: String!
	age: Int
	sex: String
	consent: Boolean!
	ddcPreScreens: [UsersDDCPreScreen]
	locations: [UsersLocation]
	symptom: [UsersSymptom]
}

type UsersSymptom{
	id: ID! 
	user: User!
	date: Date!
	good: Boolean!
	note: String
}

type UsersLocation{
	id: ID! 
	user: User!
	title: String
	date: Date!
	lat: Float!
	lng: Float!
}

type Token {
    token: String!
}


type UsersDDCPreScreen{
	id: ID! 
	user: User!
	date: Date!
	Q1 : Float
	Q2 : Boolean
	Q3 : Boolean
	Q4 : Boolean
	Q5 : Boolean
	Q6 : Boolean
	Q7 : Boolean
	Q8 : Boolean
	genAction: String
	specAction: String
	riskLevel: Int!
	riskIndex: Int!
}

  
extend type Query {
	user(id: ID!): User!
	login(username: String!, password: String!): Token!

}

extend type Mutation {
    createUser(
		username: String!, 
		password: String!, 
		age: Int,
		sex: String,
		consent: Boolean!,
	): User!
	
	addUserSymptom(
		date: Date!
		good: Boolean!
		note: String
	): UsersSymptom!
	
	addUserLocation(
		title: String
		date: Date!
		lat: Float!
		lng: Float!
	): UsersLocation!
	
	addUserDDCPreScreen(
		date: Date!
		Q1 : Float
		Q2 : Boolean
		Q3 : Boolean
		Q4 : Boolean
		Q5 : Boolean
		Q6 : Boolean
		Q7 : Boolean
		Q8 : Boolean
		genAction: String
		specAction: String
		riskLevel: Int!
		riskIndex: Int!
	): UsersDDCPreScreen!
  }
`;
