const dotenv = require("dotenv");
const PROD = process.env.REACT_APP_PROD;
const Base = process.env.REACT_APP_BACKEND_URL;
const SENTRY = process.env.REACT_APP_SENTRY;
const AMPLITUDE = process.env.REACT_APP_AMPLITUDE;
const COOKIE_DOMAIN = process.env.REACT_APP_COOKIE_DOMAIN;

export { PROD, Base, SENTRY, AMPLITUDE, COOKIE_DOMAIN };
