const models = require('./../../graph/models');

class TokenHelper {

  /**
   * [isTokenRight description]
   * @param  {[type]}  request [description]
   * @param  {[type]}  accountId [description]
   * @return {Boolean}         [description]
   */
  static async isTokenRight(request, accountId) {
    if (!TokenHelper.hasRequest(request)) {
      return false;
    }

    const { oAuthToken, oAuthOwnerKey } = TokenHelper.decodeAuthorization(request.headers.authorization);
    if (!oAuthToken || !oAuthOwnerKey) {
      return false;
    }

    const record = await models.OAuthToken.find({ where: { id: oAuthToken, status: 100 }, include: models.OAuthToken.include });
    if (record === null) {
      return false;
    }

    if (!TokenHelper.isRealOwner(record, oAuthOwnerKey, accountId)) {
      return false;
    }
    return true;
  }
  /**
   * [getToken return token of request]
   * @param  {[type]} request [description]
   * @return {[type]}         [description]
   */
  static async getToken(request) {
    const { oAuthToken } = TokenHelper.decodeAuthorization(request.headers.authorization);
    const record = await models.OAuthToken.find({ where: { id: oAuthToken, status: 100 }, include: models.OAuthToken.include });
    return record;
  }

  /**
   * [hasRequest description]
   * @param  {[type]}  request [description]
   * @return {Boolean}         [description]
   */
  static hasRequest(request) {
    if (!request.headers.authorization) {
      return false;
    }
    return true;
  }

  /**
   * [isRealOwner description]
   * @param  {[type]}  record          [description]
   * @param  {[type]}  oAuthOwnerKey [description]
   * @param  {[type]}  accountId [description]
   * @return {Boolean}                 [description]
   */
  static isRealOwner(record, oAuthOwnerKey, accountId) {
    if ((record.owner === oAuthOwnerKey) && (record.account.id === accountId)) {
      return true;
    }
    return false;
  }

  /**
   * [decodeAuthorization description]
   * @param  {[type]} authorization [description]
   * @return {[type]}               [description]
   */
  static decodeAuthorization(authorization) {
    const authorizations = authorization.split(',');
    let headerAccountId = null;
    let headerUserId = null;
    if (authorizations.length === 2) {
      for (let i = 0; i < authorizations.length; i++) {
        const key = authorizations[i].split('=');
        if (key[0].trim() === 'account_id') {
          headerAccountId = key[1].trim();
        }
        if (key[0].trim() === 'user_id') {
          headerUserId = key[1].trim();
        }
      }
    }
    return { headerAccountId, headerUserId };
  }
}

module.exports = TokenHelper;
