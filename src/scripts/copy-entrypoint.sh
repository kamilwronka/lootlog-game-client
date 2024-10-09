echo "Copying entrypoint to dist";

default_env="develop"
env=${ENVIRONMENT:-$default_env}

echo "Using environment: $env";

cp src/templates/entrypoint.js dist/entrypoint.js;

ls dist;

cat dist/entrypoint.js;

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' -e '23i\
   const env = "'$env'";
   ' dist/entrypoint.js
else
  sed -i -e '23i\
    const env = "'$env'";
   ' dist/entrypoint.js
fi

# sed -i '' '23i\
# const env = "'$env'";
# ' dist/entrypoint.js
