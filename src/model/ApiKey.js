const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	apiKey: { type: String, unique: true },
	createdAt: { type: Date, default: Date.now },
});

const APIKeyModel = mongoose.model('APIKey', apiKeySchema);

module.exports = APIKeyModel;
