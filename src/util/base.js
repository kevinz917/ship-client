const dotenv = require("dotenv");
const PROD = process.env.REACT_APP_PROD;
const Base = process.env.REACT_APP_BACKEND_URL;
const SENTRY = process.env.SENTRY;

export { PROD, Base, SENTRY };
