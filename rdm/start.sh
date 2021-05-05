# $echo npm install --no-optional --no-shrinkwrap

# echo "NPM_INSTALL = $NPM_INSTALL"
# echo "FORCE       = $FORCE"

$echo export PORT="$RDM_PORT"

if [[ "$NPM_INSTALL" = "true" ]]; then
    $echo npm install
fi

$echo npm run $NODE_ENV
