const path = require('path');

module.exports = function override(config, env) {
    // Ensure fallback object exists
    config.resolve.fallback = config.resolve.fallback || {};

    // Fallback for 'path' module
    config.resolve.fallback['path'] = require.resolve('path-browserify');

    // Fallback for 'crypto' module
    config.resolve.fallback['crypto'] = require.resolve('crypto-browserify');

    // Fallback for 'stream' module
    config.resolve.fallback['stream'] = require.resolve('stream-browserify');

    // Fallback for 'assert' module
    config.resolve.fallback['assert'] = require.resolve('assert');
    
    // Fallback for 'buffer' module
    config.resolve.fallback['buffer'] = require.resolve('buffer');

    // Fallback for 'util' module
    config.resolve.fallback['util'] = require.resolve('util');

    // Fallback for 'vm' module
    config.resolve.fallback['vm'] = require.resolve('vm-browserify');

    return config;
};
