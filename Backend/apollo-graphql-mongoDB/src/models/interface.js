import mongoose from 'mongoose';

export interface DDCPreScreen extends mongoose.Document {
	Q1? : number
	Q2? : boolean
	Q3? : boolean
	Q4? : boolean
	Q5? : boolean
	Q6? : boolean
	Q7? : boolean
	Q8? : boolean
	riskLevel: number
};

export interface Location extends mongoose.Document {
	lat: number
	lng: number
}
