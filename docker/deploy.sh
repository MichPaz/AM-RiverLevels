#!/bin/bash

# usage:
#   ./deploy.sh MODE [prod, test, dev] --build --force-recreate

# first usage:
#   FORCE=true ./deploy.sh MODE --build

POSITIONAL=()
while [[ $# -gt 0 ]]; do
	key="$1"

	case $key in
	-i | --install)
		NPM_INSTALL="true"
		shift # past value
		;;
	-f | --force)
		FORCE="true"
		shift # past value
		;;
	-b | --build)
		HAS_BUILD="--build"
		shift # past value
		;;
	-r | --force-recreate)
		HAS_FORCE="-force-recreate"
		shift # past value
		;;
	*)                  # unknown option
		POSITIONAL+=("$1") # save it in an array for later
		shift              # past argument
		;;
	esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

if [[ -n $1 ]]; then
	export NODE_ENV=$1
fi

echo "ENV        = $1"
echo "FORCE      = ${FORCE}"
echo "HAS_BUILD  = ${HAS_BUILD}"
echo "HAS_FORCE  = ${HAS_FORCE}"

# export HAS_BUILD=$2
# export HAS_FORCE=$3
export PROJ_DIR=$(pwd)/..

export FORCE
export NPM_INSTALL

export PSQL_PATH=$PROJ_DIR/db/$NODE_ENV/psql
export RDM_PATH=$PROJ_DIR/rdm
export STORAGE_PATH=$PROJ_DIR/storage/$NODE_ENV
# echo "RDM_PATH - $RDM_PATH";

$echo cp $NODE_ENV.env .env

# echo "docker-compose up $HAS_BUILD $HAS_FORCE"
$echo docker-compose up $HAS_BUILD $HAS_FORCE
