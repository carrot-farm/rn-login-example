process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('babel-register');
require('babel-polyfill');
require('./server'); // 비즈니스 로직은 모두 이곳에서 수행
