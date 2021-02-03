const dotenv = require("dotenv");
const PROD = process.env.REACT_APP_PROD;
const Base = process.env.REACT_APP_BACKEND_URL;
const SENTRY = process.env.REACT_APP_SENTRY;
const AMPLITUDE = process.env.REACT_APP_AMPLITUDE;

export { PROD, Base, SENTRY, AMPLITUDE };
