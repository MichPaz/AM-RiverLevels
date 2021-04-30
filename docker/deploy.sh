#!/bin/bash

# usage:
#   ./deploy.sh MODE [prod, test, dev] --build --force-recreate

# first usage:
#   PSQL_FORCE=true ./deploy.sh MODE --build

if [[ -n $1 ]];
then
	if [[ "$1" = "dev:local" ]];
	then
		export NODE_ENV="dev";
		export ENV_SERVER="local";
		echo "DEV LOCAL";
	else
		export NODE_ENV=$1;
		export ENV_SERVER="online";
		echo "$NODE_ENV ONLINE";
	fi
else
	export NODE_ENV="dev";
	export ENV_SERVER="local";
	echo "DEV LOCAL";
fi

export HAS_BUILD=$2
export HAS_FORCE=$3
export PROJ_DIR=`pwd`/..

export PSQL_PATH=$PROJ_DIR/db/$NODE_ENV/psql
export RDM_PATH=$PROJ_DIR/rdm
export STORAGE_PATH=$PROJ_DIR/storage/$NODE_ENV
# echo "RDM_PATH - $RDM_PATH";

$echo cp $NODE_ENV.env .env

$echo docker-compose up $HAS_BUILD $HAS_FORCE