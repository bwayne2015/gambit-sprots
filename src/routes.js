const express = require('express');
const Joi = require('joi');

const db = require('./db');
const utils = require('./utils.js');
const schema = require('./schema');
const message = require('../message');
const config = require('../config');

const router = express.Router();

const data = require('./data');

const DEFAULT_LANGUAGE = config.const.defaultLanguage;
const ROUTE_PREFIX = '/wallet';

// Fill missing propeties for each language.
const languageJSON = data.languageJSON.map(utils.preProcess);

const getTransformedData = (language = DEFAULT_LANGUAGE) => languageJSON.map(json => json[language] || json[DEFAULT_LANGUAGE]);

/**
 * Get a single wallet
 */

router.get(`${ROUTE_PREFIX}/:id`, async (req, res) => {
  try {
    const validationResult = Joi.validate(Object.assign({}, req.body, req.params), schema.fetchWallet, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const retrievedWallet = await db.wallets.findByPk(req.params.id);

    if (!retrievedWallet) {
      return res.status(404).send(utils.getErrorMessage({}, message.walletNotFound));
    }

    return res.status(200).send(utils.getSuccessMessage(retrievedWallet));

  } catch (error) {
    console.log({ error });
    return res.status(500).send(utils.getErrorMessage());
  }
});

/**
 * Get all wallets
 */

router.get(`${ROUTE_PREFIX}`, async (req, res) => {
  try {
    const fetchedWallets = await db.wallets.findAll({});

    return res.status(200).send(utils.getSuccessMessage(fetchedWallets));
  } catch (error) {
    console.log({ error })
    return res.status(500).send(utils.getErrorMessage());
  }
})

/**
 * Create a new wallet
 */

router.post(`${ROUTE_PREFIX}`, async (req, res) => {
  try {
    const validationResult = Joi.validate(req.body, schema.createWallet, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const createdWallet = await db.wallets.create(req.body);

    return res.status(200).send(utils.getSuccessMessage(createdWallet));
  } catch (error) {
    console.log({ error })
    return res.status(500).send(utils.getErrorMessage());
  }
});

/**
 * Update existing wallet
 */
router.put(`${ROUTE_PREFIX}/:id`, async (req, res) => {
  try {
    const validationResult = Joi.validate(Object.assign({}, req.body, req.params), schema.updateWallet, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const retrievedWallet = await db.wallets.findByPk(req.params.id);

    if (!retrievedWallet) {
      return res.status(404).send(utils.getErrorMessage({}, message.walletNotFound));
    }

    const updatedWallet = await db.wallets.update(
      req.body,
      { where: { id: req.params.id }, returning: true, plain: true },
    );

    return res.status(200).send(utils.getSuccessMessage(updatedWallet));
  } catch (error) {
    console.log({ error });
    return res.status(500).send(utils.getErrorMessage());
  }
});

/**
 * Delete existing wallet
 */
router.delete(`${ROUTE_PREFIX}/:id`, async (req, res) => {
  try {
    const validationResult = Joi.validate(req.params, schema.deleteWallet, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const retrievedWallet = await db.wallets.findByPk(req.params.id);

    if (!retrievedWallet) {
      return res.status(404).send(utils.getErrorMessage({}, message.walletNotFound));
    }

    await db.wallets.destroy({
      where: {
        id: req.params.id
      }
    })

    return res.status(200).send(utils.getSuccessMessage());
  } catch (error) {
    console.log({ error })
    return res.status(500).send(utils.getErrorMessage());
  }
});

router.post(`${ROUTE_PREFIX}/query`, async (req, res) => {
  try {
    const validationResult = Joi.validate(req.body, schema.query, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).send(utils.getErrorMessage(
        validationResult.error, validationResult.error.details[0].message,
      ));
    }

    const query = `select count(*) from wallets where user_id = ${req.body.user_id} AND ${utils.exp2Query(req.body.conditions)}`;
    const result = await db.sequelize.query(query);
    const conditionSatisfied = result[0][0].count == 1 ? true : false;
    
    return res.status(200).send(utils.getSuccessMessage({ conditionSatisfied }));    
  } catch (error) {
    return res.status(500).send(utils.getErrorMessage());
  }
});

router.get(`/transform`, async (req, res) => {
  return res.status(200).send(utils.getSuccessMessage(
    getTransformedData(req.query.lang)
  ));
});

module.exports = router;
