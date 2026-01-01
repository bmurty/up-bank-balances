#!/usr/bin/env bash

# Check the installed Deno version is the same as the required version.
#  - Run via: deno task version-check

# Terminal text colour codes

RED='\e[0;31m'
GREEN='\e[0;32m'
YELLOW='\e[0;33m'
END='\e[0m'

# Setup logs

LOG_FILE=$(pwd)"/.deno/version-changes.log"

log_change() {
    LOG_TIME=$(date +"%Y-%m-%d %H:%M:%S")
    echo "$LOG_TIME - ${1}" >> ${LOG_FILE}
}

# Check the installed and required Deno versions

VER_INSTALLED=$(echo "console.log(Deno.version.deno);" | deno run -)

VER_REQUIRED=$(deno task version-required)

if [[ "${VER_INSTALLED}" == "${VER_REQUIRED}" ]]; then
    echo -e "${GREEN}Installed Deno version of ${VER_REQUIRED} is correct.${END}"
    exit 0
else
    echo -e "${YELLOW}Installed Deno version of ${VER_INSTALLED} doesn't match the required version of ${VER_REQUIRED}.${END}"

    read -p "Would you like to install this Deno version now? (y/n) " ANSWER
    if [ "$ANSWER" != "y" ]; then
        echo -e "${RED}Please manually install Deno version ${VER_REQUIRED} from https://deno.com/${END}"
        exit 1
    fi

    if deno upgrade --version ${VER_REQUIRED} ; then
        echo -e "${GREEN}Deno version is now ${VER_REQUIRED}.${END}"
        log_change "Deno version changed from ${VER_INSTALLED} to ${VER_REQUIRED}"
        exit 0
    else
        echo -e "${RED}Please manually install Deno version ${VER_REQUIRED} from https://deno.com/${END}"
        exit 1
    fi
fi
