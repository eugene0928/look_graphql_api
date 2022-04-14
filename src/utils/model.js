import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export default {
    read : fileName => {
        const data = readFileSync(join(process.cwd(), 'src', 'database', fileName + '.json'), 'utf-8')
        return  JSON.parse(data) || []
    },
    write : (fileName, data) => {
        writeFileSync(join(process.cwd(), 'src', 'database', fileName + '.json'), JSON.stringify(data, null, 4))
    }
}