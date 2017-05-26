const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		trim: true
	},
	tags: [String],
	slug: String
});

storeSchema.pre('save', function(next) {
	if (!this.isModified('name')) {
		next(); //skip it
		return next(); //stop this function from running
	}
	this.slug = slug(this.name);
	next();
	// TODO make more resiliant so slugs are unique
})

module.exports = mongoose.model('Store', storeSchema);