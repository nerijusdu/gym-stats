module.exports = {
  extends: ["blitz"],
  rules: {
    indent: ["warn", 2],
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 1,
        "when": "multiline"
      }
    ],
  },
}
