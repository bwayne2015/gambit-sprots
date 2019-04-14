const Joi = require('joi');

exports.createWallet = Joi.object({
  user_id: Joi
    .number()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('User Id'),
  has_deposited: Joi
    .boolean()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('Has Deposited'),
  wallet_balance: Joi
    .number()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('Wallet Balance'),
  number_of_deposits: Joi
    .number()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('Number of deposits'),
});

exports.updateWallet = Joi.object({
  id: Joi
    .string()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('Id'),
  has_deposited: Joi
    .boolean()
    .label('Has Deposited'),
  wallet_balance: Joi
    .number()
    .label('Wallet Balance'),
  number_of_deposits: Joi
    .number()
    .label('Number of deposits')
});

exports.deleteWallet = Joi.object({
  id: Joi
    .string()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('Id')
});

exports.fetchWallet = Joi.object({
  id: Joi
    .string()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('Id')
});

exports.query = Joi.object({
  user_id: Joi
    .number()
    .required()
    .options({
      language: {
        any: {
          empty: 'is required'
        }
      }
    })
    .label('User id'),
  conditions: Joi
    .object()
    .min(3)
    .max(3)
    .label('Conditions')
});