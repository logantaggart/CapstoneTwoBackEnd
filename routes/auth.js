const express = require('express')
const jsonschema = require('jsonschema')

const router = new express.Router()

const User = require('../models/user.js')
const userAuthSchema = require('../schemas/userAuth.json')
const userRegisterSchema = require('../schemas/userRegister.json')
const { createToken } = require('../helpers/tokens')

const { BadRequestError } = require('../expressError')

router.post('/register', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }

        const newUser = await User.register({ ...req.body })
        const token = createToken(newUser)

        return res.status(201).json({ token })
    }
    catch (err) {
        return next(err)
    }
})

router.post('/token', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userAuthSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack)
            throw new BadRequestError(errs)
        }

        const { username, password } = req.body
        const user = await User.authenticate(username, password)
        const token = createToken(user)

        return res.json({ token })
    }
    catch (err) {
        return next(err)
    }
})

module.exports = router