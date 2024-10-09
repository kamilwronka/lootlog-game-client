echo "Copying entrypoint to dist";

default_env="develop"
env=${ENVIRONMENT:-$default_env}

echo "Using environment: $env";

echo "const env = '$env';" | cat - src/templates/entrypoint.js > dist/entrypoint.js