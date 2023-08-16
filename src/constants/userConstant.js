import React from 'react'
import { useSelector } from 'react-redux'

export const USER_CONSTANT = () => useSelector(state => state?.getLogindata?.loginData[0])


