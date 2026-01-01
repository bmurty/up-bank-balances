#!/usr/bin/env bash

# Check the installed Deno version is the same as the required version.
#  - Run via: deno task version-check

RED='\e[0;31m'
GREEN='\e[0;32m'
YELLOW='\e[0;33m'
END='\e[0m'

deno_version_current=$(echo "console.log(Deno.version.deno);" | deno run -)

deno_version_required=$(deno task version-required)

if [[ "${deno_version_current}" == "${deno_version_required}" ]]; then
    echo -e "${GREEN}Installed Deno version of ${deno_version_required} is correct.${END}"
    exit 0
else
    echo -e "${YELLOW}Installed Deno version of ${deno_version_current} doesn't match the required version of ${deno_version_required}.${END}"

    read -p "Would you like to install this Deno version now? (y/n) " ANSWER
    if [ "$ANSWER" != "y" ]; then
        echo -e "${RED}Please manually upgrade to Deno version ${deno_version_required} from https://deno.com/${END}"
        exit 1
    fi

    if deno upgrade --version ${deno_version_required} ; then
        echo -e "${GREEN}Deno version is now ${deno_version_required}.${END}"
        exit 0
    else
        echo -e "${RED}Please manually install Deno version ${deno_version_required} from https://deno.com/${END}"
        exit 1
    fi
fi
