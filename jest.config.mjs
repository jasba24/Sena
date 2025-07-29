export default {
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: ['.jsx'],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",  
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "jsx"],
  extensionsToTreatAsEsm: [".jsx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
}
