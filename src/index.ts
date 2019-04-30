/**
 * docker-secrets
 */

namespace debug {
    export const secrets = require('debug')('secrets')
}

import * as fs from 'fs'
import * as path from 'path'

import ow from 'ow'


interface Secrets {
    [key: string]: string;
}


let SECRETS_DIR = '/run/secrets'
let config: Secrets | null = null


/**
 *
 */
function init(): Secrets {

    debug.secrets(`initializing secrets`)

    if (!fs.existsSync(SECRETS_DIR)) {
        debug.secrets(`secrets-directory ${SECRETS_DIR} does not exist`)
        return {}
    }

    const keys = fs.readdirSync(SECRETS_DIR)

    const secrets: Secrets = {}
    for (const key of keys) {
        let file = path.join(SECRETS_DIR, key)
        if (fs.statSync(file).isFile()) {
            secrets[key] = fs.readFileSync(file, 'utf8').trim();
        }
    }

    return secrets
}

/**
 * Configure directory from which to parse secrets.
 */
export function setupSecretsDir(url: string): void {

    ow(url, ow.string)

    SECRETS_DIR = url
    init()
}

/**
 * De-reference `key` into secret value.
 *
 * @remarks
 * - only lowercase secrets can be parsed from docker-secrets
 * - only uppercase secrets can be read from environment variables
 *
 * @param key - Key describing secret value to obtain
 * @returns Secret value
 */
export function get(key: string): string | undefined {

    ow(key, ow.string)

    if (config === null) {
        config = init()
    }

    return config[key.toLowerCase()] || process.env[key.toUpperCase()]
}
