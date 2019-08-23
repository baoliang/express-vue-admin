'use strict';

const _ = require('lodash');
const joi = require('joi');

const RestController = require('../rest');
class WholesaleController extends RestController {
  constructor() {
    super('Wholesale');
    this.restRules = {
      create: {
        names: joi.string(),
        email: joi.string(),
        telephone: joi.string(),
        messages: joi.string(),
        country: joi.string(),
      }
    };
  }

  /**
   * 分页返回所有对象
   */
  index(req, res) {
    const params = req.query || {};
    const data = {
      offset: +params.offset || 0,
      limit: +params.limit || 10
    };
    if (params.where && _.isObject(params.where)) {
      data.where = params.where;
    }
    // data.distinct = 'id';
    res.reply(this.model.findAndCount(data));
  }

  /**
   * 创建对象
   */


  /**
  * 删除单个对象
  */
  destroy(req, res) {
    if (!req.params || !req.params.id) {
      return res.replyError('missing id parameter');
    }

    this.model.findById(req.params.id).then((obj) => {
      if (obj) {
        if (obj.name === 'admin') {
          res.replyError('Admin can\'t be deleted!');
        } else {
          res.reply(obj.destroy());
        }
      } else {
        res.replyError(this.modelName + ' not found');
      }
    });
  }
}

module.exports = new WholesaleController();
