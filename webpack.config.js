module.exports = {
    name: "Server",
    entry: "./src/app.model.ts",
    output: {
        filename: "./src/app.model.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};