import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default {
	Query: {
		user: async (parent, { id }, { models: { userModel }, me }, info) => {
			if (!me) {
				throw new AuthenticationError('You are not authenticated');
			}
			const user = await userModel.findById({ _id: id }).exec();
			return user;
		},
		login: async (parent, { username, password }, { models: { userModel } }, info) => {
			const user = await userModel.findOne({ username }).exec();

			if (!user) {
				throw new AuthenticationError('Invalid credentials');
			}

			const matchPasswords = bcrypt.compareSync(password, user.password);

			if (!matchPasswords) {
				throw new AuthenticationError('Invalid credentials'); 
			}

			const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });

			return {
				token,
			};
		},
	}, 
	Mutation: {
		createUser: async (parent, { username, password, age, sex, consent }, { models: { userModel } }, info) => {
			const user = await userModel.create({ username, password, sex, consent });
			return user;
		},
		addUserSymptom: async (parent, { date, good, note }, {models: {usersSymptomModel}, me}, info) => {
			const symptom = await usersSymptomModel.create({user: me.id, date, good, note});
			return symptom;
		},
		addUserLocation: async (parent, { title, date, lat, lng }, {models: {usersLocationModel}, me}, info) => {
			const _location = await usersLocationModel.create({user: me.id, title, date, lat, lng});
			return _location;
		},
		addUserDDCPreScreen: async (parent, { 
			date, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, genAction, specAction, riskLevel, riskIndex
			}, {models: {usersDDCPreScreenModel}, me}, info) => {
			const preScreen = await usersDDCPreScreenModel.create({
				user: me.id, date, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, genAction, specAction, riskLevel, riskIndex
			});
			return preScreen;
		},	
	},
	User: {

		ddcPreScreens: async ({ id }, args, { models: { usersDDCPreScreenModel } }, info) => {
		  const ddcPreScreens = await usersDDCPreScreenModel.find({ user: id }).exec();
		  return ddcPreScreens;
		},
		locations: async ({ id }, args, { models: { usersLocationModel } }, info) => {
		  const locations = await usersLocationModel.find({ user: id }).exec();
		  return locations;
		},
		symptom: async ({ id }, args, { models: { usersSymptomModel } }, info) => {
		  const symptom = await usersSymptomModel.find({ user: id }).exec();
		  return symptom;
		},
	},
	UsersSymptom: {
		user: async ({ user }, args, { models: { userModel } }, info) => {
		  const userS = await userModel.findById({ _id: user }).exec();
		  return userS;
		},
	},
	UsersLocation: {
		user: async ({ user }, args, { models: { userModel } }, info) => {
		  const userL = await userModel.findById({ _id: user }).exec();
		  return userL;	
		},		  
	},
	UsersDDCPreScreen: {
		user: async ({ user }, args, { models: { userModel } }, info) => {
		  const userD = await userModel.findById({ _id: user }).exec();
		  return userD;	
		},		  
	},
};
