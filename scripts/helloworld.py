#!/usr/bin/env python
# to use with Pi Traffic Light

import RPi.GPIO as GPIO

YELLOW = 26
GREEN = 16
RED = 25

# Pin Setup:
GPIO.setmode(GPIO.BCM)   # Broadcom pin-numbering scheme.
GPIO.setwarnings(False)
GPIO.setup(YELLOW, GPIO.OUT)
GPIO.setup(GREEN, GPIO.OUT)
GPIO.setup(RED, GPIO.OUT)

try:
   while (1):
      GPIO.output(YELLOW, True)
      GPIO.output(GREEN, True)
      GPIO.output(RED, True)
except KeyboardInterrupt:
    print "Good bye"
    GPIO.output(YELLOW, False)
    GPIO.output(GREEN, False)
    GPIO.output(RED, False)
