module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "class-property"
    ],
    "rules": {
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "jsx-a11y/href-no-hash": 0,
        "react/jsx-filename-extension": 0,
        "react/prop-types": 0
    },
    "env": {
        "browser": true,
        "node": true
    }
};