module.exports = {
	"extends": "airbnb",

	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},

	"rules": {
		"indent": [2, "tab", { "SwitchCase": 1, "VariableDeclarator": 1 }],
		"no-tabs": 0,
		"arrow-body-style": [2, "always"],
		"react/prop-types": 0,
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"]
	},

	"globals": {
		"document": false,
		"suite": true,
		"escape": false,
		"navigator": false,
		"unescape": false,
		"window": false,
		"describe": true,
		"before": true,
		"it": true,
		"expect": true,
		"sinon": true
	},

	"parserOptions": {
		"ecmaVersion": 7,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"parser": "babel-eslint"
};