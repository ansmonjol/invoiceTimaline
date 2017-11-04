const locale = require('./../../../config/locale');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();

class CoreCache {

  static async set(key, value) {
    if (locale.DISABLED_CACHE !== true) {
      return await client.setAsync(key, JSON.stringify(value));
    }
    return null;
  }

  static async get(key) {
    if (locale.DISABLED_CACHE === true) {
      return null;
    }
    const data = await client.getAsync(key);
    return await Promise.resolve(JSON.parse(data));
  }
}

module.exports = CoreCache;
