const log = (args) => {
    return console.log(args);
}

const error = (args) => {
    return console.error(args);
}

export const logger = { log, error }
