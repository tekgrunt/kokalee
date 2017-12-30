#!/usr/bin/env python
# -*- coding: utf-8 -*-

###############################
#import controlpanel
# Disabling this import for current development... this file calls pyton libs
# that are only on the pi and for technical reasons I am developing on my
# laptop right now
###############################

# For development we are only using localhost but once we get this thing rolling
# on the device(s) we are going to have to use external IPs which can be
# stored as variables in this file.
masterFlaskURL = "http://127.0.0.1:5000"
slaveFlaskURL= "http://127.0.0.1:5000"

# The polling speed
duration = 3.0

# First number code is a single digit representing which device (ie. 1 || 2)
# Second number code should be two digits and with 00 || 01 being the binary true || false
# Otherwise the second number should represent a percentage
# The third number code should be binary and represent the 3 LEDS from left to right

# This method will poll various system resources and return and appropriate
# status code.
def getStatus():
    return "101001"

# This method is where we will decide how to handle the status code and manipulate
# the control panel accordingly.
def setStatus(statuscode):
    return statuscode
