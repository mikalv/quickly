import {require} from './dependencies'
import path from 'path'
import fs from 'fs'

export class BaseFile {
    dependencies = []

    constructor(filename, {bundle, out_filename, useBabel, usePolyfills} = {}) {
        this.bundle = bundle
        this.useBabel = useBabel !== undefined ? useBabel : bundle.useBabel
        this.usePolyfills = usePolyfills !== undefined ? usePolyfills : bundle.usePolyfills

        this.filename = path.relative(bundle.src_dirname, filename)

        this.basename = path.basename(this.filename)
        this.local_dirname = path.dirname(this.filename)

        this.src_filename = path.resolve('', filename)
        this.src_dirname = path.dirname(this.src_filename)

        this.out_filename = out_filename ? out_filename
                                         : bundle.out_dirname ? path.resolve(bundle.out_dirname, this.filename)
                                                              : null
        this.out_dirname = this.out_filename ? path.dirname(this.out_filename) : null
    }

    relative(filename) {
        return path.relative(this.out_dirname, filename)
    }

    resolve(localFilename) {
        return path.resolve(this.src_dirname, localFilename)
    }

    require(importPath) {
        return require(importPath, this)
    }

    build() {
        this.text = fs.readFileSync(this.src_filename, 'utf8')
        this.transform()
    }

    save() {
        throw new Error('Method not implemented!')
    }

    dump() {
        console.log(this.text)
    }

    transform() {
        throw new Error('Method not implemented!')
    }
}