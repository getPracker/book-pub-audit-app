import pino from 'pino'

const isProd = process.env.NODE_ENV === 'production'

const targets: pino.TransportTargetOptions[] = []

// Console (pretty) for dev
if (!isProd) {
    targets.push({
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        }
    })
}

// File logs
targets.push({
    target: 'pino/file',
    options: {
        destination: 'logs/app.log',
        mkdir: true
    }
})

// Elasticsearch
if (process.env.ELASTIC_URL) {
    targets.push({
        target: 'pino-elasticsearch',
        options: {
            node: process.env.ELASTIC_URL,
            index: process.env.ELASTIC_INDEX || 'app-logs'
        }
    })
}

// Logtail (Better Stack)
if (process.env.LOGTAIL_TOKEN) {
    targets.push({
        target: '@logtail/pino',
        options: {
            sourceToken: process.env.LOGTAIL_TOKEN
        }
    })
}

export const loggerConfig: pino.LoggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
    transport: { targets }
}
