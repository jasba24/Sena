export default {
  presets: [
    ["@babel/preset-env", { "targets": "> 1%", "modules": false }],
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
