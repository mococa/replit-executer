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
