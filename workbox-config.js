module.exports = {
	globDirectory: 'web-build/',
	globPatterns: [
		'**/*.{json,html,js,txt}'
	],
	swDest: 'web-build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};