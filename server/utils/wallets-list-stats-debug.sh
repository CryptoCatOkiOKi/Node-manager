#!/bin/bash

COUNTER=0
COUNTER_ACTIVE=0
COUNTER_NOT_ACTIVE=0
COUNTERJSON=""

MNACTIVE=""
MNSTATUS=""
MNSTATUSJSON="["

WALLETBLOCKS=""
WALLETSTATUS=""

for PID in `ps -ef | grep daemon | grep -v grep | awk '{printf "%d\n", $2}'`; do
   echo "PID=${PID}"
   PSFULL=$(echo `ps -f -p ${PID} | grep daemon | grep -v grep`)
   echo "PSFULL=${PSFULL}"
   WALLET=$(echo ${PSFULL} | awk '{printf "%s\n", $8}')
   WALLET=$(echo "${WALLET}" | sed -r 's/.$/-cli/g')
   WALLETNAME=$(echo "${WALLET}" | cut -d"-" -f1)
   WALLETDATADIR=$(echo ${PSFULL} | awk '{printf "%s\n", $11}')

   if [[ $WALLETDATADIR == *"_"* ]]; then
      WALLETALIAS=$(echo ${WALLETDATADIR} | cut -d"_" -f2)
   else
      WALLETALIAS="no-alias"
   fi

   WALLET=$(echo ${WALLET} $(echo ${PSFULL} | awk '{printf "%s\n", $9}'))
   WALLET=$(echo ${WALLET} $(echo ${PSFULL} | awk '{printf "%s\n", $10}'))
   WALLET=$(echo ${WALLET} $(echo ${PSFULL} | awk '{printf "%s\n", $11}'))
   echo "WALLET=${WALLET}"

   WALLETSTATUS=""
   WALLETBLOCKS=""
   WALLETBLOCKS=$(echo `${WALLET} getinfo | jq -r ".blocks"`) 
   echo "WALLETBLOCKS=${WALLETBLOCKS}"  

   if [ -z "$WALLETBLOCKS" ]; then
      WALLETSTATUS="NOTWALLET"
      echo "WALLETSTATUS=${WALLETSTATUS}"
   elif  [ $WALLETBLOCKS -gt 0 ]; then
      WALLETSTATUS="OK"
      echo "WALLETSTATUS=${WALLETSTATUS}"
   else
      WALLETSTATUS="ERROR"
      echo "WALLETSTATUS=${WALLETSTATUS}"
   fi   

   if [ "$WALLETSTATUS" == "OK" ]; then
      MNSTATUS=""
      MNSTATUS=$(echo `${WALLET} masternode status | jq -r ".status"`)

      if [ -z "$MNSTATUS" ]; then
         MNACTIVE="false"
         COUNTER_NOT_ACTIVE=$[COUNTER_NOT_ACTIVE + 1]
         echo "WALLET=${WALLET}"
         echo "MNSTATUS=${MNSTATUS}"
      elif  [ "$MNSTATUS" == "4" ]; then
         MNACTIVE="true"
         COUNTER_ACTIVE=$[COUNTER_ACTIVE + 1]   
      elif  [ "$MNSTATUS" == "Masternode successfully started" ]; then
         MNACTIVE="true"
         COUNTER_ACTIVE=$[COUNTER_ACTIVE + 1]
      else
         MNACTIVE="false"
         COUNTER_NOT_ACTIVE=$[COUNTER_NOT_ACTIVE + 1]
         echo "WALLET=${WALLET}"
         echo "MNSTATUS=${MNSTATUS}"
      fi

      if  [ $COUNTER == 0 ]; then
         MNSTATUSJSON=${MNSTATUSJSON}"{ \"name\": \"${WALLETNAME}\", \"alias\": \"${WALLETALIAS}\", \"command\": \"${WALLET}\", \"status\": ${MNACTIVE}}"
      else
         MNSTATUSJSON=${MNSTATUSJSON}",{ \"name\": \"${WALLETNAME}\", \"alias\": \"${WALLETALIAS}\", \"command\": \"${WALLET}\", \"status\": ${MNACTIVE}}"
      fi

      COUNTER=$[COUNTER + 1]
   fi
done

COUNTERJSON="[ { \"total\": ${COUNTER}, \"active\": ${COUNTER_ACTIVE}, \"notactive\": ${COUNTER_NOT_ACTIVE}  } ]"

MNSTATUSJSON=${MNSTATUSJSON}"]"

if [ "$1" == "list" ]; then
   echo "${MNSTATUSJSON}"
else
   echo "${COUNTERJSON}"
fi