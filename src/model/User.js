const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		apiKeyId: { type: Schema.Types.ObjectId, ref: 'APIKey' },
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
