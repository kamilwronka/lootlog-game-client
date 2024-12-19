echo "Copying entrypoint to dist";

default_env="prod"
env=${ENVIRONMENT:-$default_env}

echo "Using environment: $env";

cp src/templates/entrypoint.js dist/entrypoint.user.js;

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' -e '23i\
   const env = "'$env'";
   ' dist/entrypoint.user.js
else
  sed -i -e '23i\
    const env = "'$env'";
   ' dist/entrypoint.user.js
fi