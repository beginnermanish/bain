const express = require('express');
const provider = require('./provider');
const router = new express.Router();

router.route("/providers")
    .get(provider.getProviders);

module.exports = router;