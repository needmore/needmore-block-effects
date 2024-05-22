const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
    ...defaultConfig,
    entry: {
        'block-editor': './src/block-editor.js',
        'frontend': './src/frontend.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build',
    },
};
