const buffer = require('buffer')
const stream = require('stream')

const typescript = require('typescript')
const PluginError = require('plugin-error')

let Transform = stream.Transform

const PLUGIN_NAME = 'gulp-typescript'

module.exports = gulpTypescript

function gulpTypescript (it) {
    let stream

    stream = new Transform({
        objectMode: true,
        transform (chunk, encoding, callback) {
            let options
            let result
            let source
    
            options = {
                compilerOptions: it,
                fileName: chunk.path,
                reportDiagnostics: true
            }

            if (chunk === null) {
                this.emit('error', new PluginError(PLUGIN_NAME, chunk))
            }
            
            if (chunk.contents instanceof Buffer) {
                source = chunk.contents.toString('utf8')
                result = typescript.transpileModule(source, options)
                
                chunk.contents = Buffer.from(result.outputText)

                callback(null, chunk)
            }

            if (chunk.contents.pipe) {
                this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
            }
        }
    })
    return stream
}