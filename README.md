[![Build Status](https://travis-ci.org/strong-roots-capital/docker-secrets-nodejs.svg?branch=master)](https://travis-ci.org/strong-roots-capital/docker-secrets-nodejs)
[![npm version](https://badge.fury.io/js/@strong-roots-capital/docker-secrets-nodejs.svg)](https://badge.fury.io/js/@strong-roots-capital/docker-secrets-nodejs)

## Install

``` shell
npm install @strong-roots-capital/docker-secrets-nodejs
```

## Use

Note that docker-secrets take precedence over environment variables.

``` typescript
import * as secrets from 'docker-secrets-nodejs'

secrets.setupSecretsDir('/dir')  // optional, default directory is '/run/secrets'
secrets.get('env_variable_a')    // will try to get
                                 // - `env_variable_a` from /run/secrets/env_variable_a, or
	                             // - $ENV_VARIABLE_A from environment variables
```

## Conventions

Several conventions for this library:

	* the secret name has to always be in lowercase from secrets of docker.
	* the environment variable name has to be in uppercase.
	* it doesn't matter whether you pass the parameter in 'secrets.get()' using lowercase or uppercase, it converts accordingly.

Any suggestion is welcome!
