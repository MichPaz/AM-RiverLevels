$echo cp $NODE_ENV.env .env

# export $(xargs <.env)

# $echo json -I -f package.json -e "this.homepage='$WEB_BASE'"


# echo "NODE_ENV    = ${NODE_ENV}"
# echo "VIEW_PORT   = ${VIEW_PORT}"
# echo "NPM_INSTALL = ${NPM_INSTALL}"

if [[ "$NPM_INSTALL" = "true" ]]; then
    $echo npm install
fi

$echo npm run $NODE_ENV
