module.exports = {
	apps: [
		{
			name: "stargaze",
			script: "build/index.js",
			node_args: "-r dotenv/config"
		}
	]
}
