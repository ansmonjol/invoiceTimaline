#!/usr/bin/env node

pm2 start /var/www/engine/api/bin/www.js --name dev --node-args="--harmony --harmony_proxies --harmony_modules --harmony_array_includes --harmony_regexps --harmony_sloppy --harmony_reflect --harmony_sharedarraybuffer --harmony_atomics --harmony_new_target --harmony_destructuring --harmony_unicode_regexps"
