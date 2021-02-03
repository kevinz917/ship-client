import amplitude from "amplitude-js";
import { AMPLITUDE } from "../util/base";

export const initAmplitude = () => {
  amplitude.getInstance().init(AMPLITUDE);
};

export const setAmplitudeUserDevice = (installationToken) => {
  amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = (userId) => {
  amplitude.getInstance().setUserId(userId);
};

export const setAmplitudeUserProperties = (properties) => {
  amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeData = (eventType) => {
  amplitude.getInstance().logEvent(eventType);
};
