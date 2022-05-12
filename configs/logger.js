const {createLogger,transports,format} = require('winston')

const logger=createLogger({
    
    transports:[
        new transports.Console({
            level:'http',
            format:format.combine(format.timestamp())
        })
    ]
})
module.exports = logger