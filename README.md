## Replit API

You can run bash scripts from a HTTP request, for example via cURL.

Though you'll need to know a few things before using it:

  - Your Replit Session ID. This corresponds to your Replit "connection.sid" cookie value
  - You can destroy your repl with this. Please, use it carefully.
  - Your Repl ID. You can check it by running: `printenv | grep "REPL_ID" | cut -d '=' -f2` on shell

Great. For testing, make a request to:
```
/REPL-ID?sid=REPLIT-SID&command=ls
```

You can use this for basics DevOps operations, like running a script that will do something like:
### Replit
#### Node:
```bash
FOLDER=`echo $(find . -maxdepth 1 -type d | cut -c 3- | grep -v '\.' | grep -v "node_modules")`
cd $FOLDER
git pull && cd .. && busybox reboot
cd ../
```

#### React:
```bash
BUILD_URL="$1"
TRANSFER_BASE="https://transfer.sh"
ID=`echo $BUILD_URL | cut -d'/' -f 4`
NAME=`echo $BUILD_URL | cut -d'/' -f 5`
URL=$TRANSFER_BASE/get/$ID/$NAME
curl -L -o build.zip -O --silent $URL
[ -d build ] && rm -rf build
unzip build
rm build.zip 
```

### Local
#### Node
```bash
getEnv(){
    echo $(grep $1 .env | cut -d '=' -f2)
}
## Config
SID=$(getEnv SID)
REPL_ID=$(getEnv REPL_ID)
COMMAND="sh%20./pull.sh"
REPLIT_API=$(getEnv REPLIT_API)
echo $SID $REPL_ID $COMMAND $REPLIT_API
## Execution
URL="$REPLIT_API/$REPL_ID?sid=$SID&command=$COMMAND"
echo $URL
echo "$(curl $URL)"
exit 1

```

#### React
```bash
getEnv(){
    echo $(grep $1 deploy.env | cut -d '=' -f2)
}

echo "Initiating build"
yarn build
clear
echo "Preparing deploy.."

zip -r -qq build.zip build

URL_REQUEST="https://transfer.sh/build"
URL="$(curl -s --upload-file ./build.zip $URL_REQUEST)"
rm ./build.zip

SID=$(getEnv SID)
REPL_ID=$(getEnv REPL_ID)
REPLIT_API=$(getEnv REPLIT_API)
COMMAND="sh%20./get-build.sh%20$URL"

API_URL="$REPLIT_API/$REPL_ID?sid=$SID&command=$COMMAND"

echo "Deploying replit..."

curl -s $API_URL > /dev/null

echo "Done! Check the result here: $(getEnv HOME_PAGE)"

#echo "If deploy has failed, please, visit $API_URL to re-run it."
```
(Update your repl and then restart it, to apply changes)
