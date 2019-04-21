import { composeRule, isMatchRegex } from '../../validation/rules';

export const composedEmailRule = composeRule(
    isMatchRegex,
    `not a valid email`,
    [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ]
)
