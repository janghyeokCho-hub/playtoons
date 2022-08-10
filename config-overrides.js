const {
	override,
	addWebpackAlias,
	addWebpackPlugin
} = require("customize-cra");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
	webpack: override(
		addWebpackAlias({
			"~": path.resolve(__dirname, "src")
		}),
		addWebpackPlugin(new Dotenv({ path: `./config/${NODE_ENV}.env` }))
	)
};
