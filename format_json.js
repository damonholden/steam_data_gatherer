const { argv } = require('node:process');
try {
    const json_input = argv[2]
    const parsed_json_input = JSON.parse(json_input)

    console.dir(parsed_json_input, { colors: true, depth: null });
    console.log(parsed_json_input)
} catch (error) {
    console.error(new Error("failed to parse json", { cause: error }))
    console.log(json_input)
    console.log(argv)
}