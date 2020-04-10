import bcrypt from 'bcrypt';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {type: String, required: true,},
	age: {type: Number, },
	sex: {type: String, },
	consent: {type: Boolean, required: true,},
	ddcPreScreens: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'usersDDCPreScreen', 
		},
	],
	locations: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'usersLocation', 	  
		},
	],
	symptom:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'usersSymptom', 		  
		},
	],
});

userSchema.pre('save', function() {
	const hashedPassword = bcrypt.hashSync(this.password, 12);
	this.password = hashedPassword;
});

const usersDDCPreScreenSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true,
	},
	date: {type: Date, required: true,},
	q1: {type: Number, },
	q2: {type: Boolean,},
	q3: {type: Boolean,},
	q4: {type: Boolean,},
	q5: {type: Boolean,},
	q6: {type: Boolean,},
	q7: {type: Boolean,},
	q8: {type: Boolean,},
	specAction: {type: String,},
	riskLevel: {type: Number, },
	riskIndex: {type: Number, },
});

const usersLocationSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true,
	},
	title: {type: String, },
	date: {type: Date, required:true, },
	lat: {type: Number, required:true, },
	lng: {type: Number, required:true, },
});

const usersSymptomSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user', 
		required: true,
	},	
	date: {type: Date, required:true, },
	good: {type: Boolean, required:true, },
	note: {type: String, },
});

export const userModel = mongoose.model('user', userSchema);
export const usersDDCPreScreenModel = mongoose.model('usersDDCPreScreen', usersDDCPreScreenSchema);
export const usersLocationModel = mongoose.model('usersLocation', usersLocationSchema);
export const usersSymptomModel = mongoose.model('usersSymptom', usersSymptomSchema);
export default {userModel, usersDDCPreScreenModel, usersLocationModel, usersSymptomModel};
