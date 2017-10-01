#!/usr/bin/env python
# to use with Pi Traffic Light

import RPi.GPIO as GPIO

YELLOW = 26
GREEN = 19
RED = 13
WHITE = 06
BLUE = 05

# Pin Setup:
GPIO.setmode(GPIO.BCM)   # Broadcom pin-numbering scheme.
GPIO.setwarnings(False)
GPIO.setup(YELLOW, GPIO.OUT)
GPIO.setup(GREEN, GPIO.OUT)
GPIO.setup(RED, GPIO.OUT)
GPIO.setup(WHITE, GPIO.OUT)
GPIO.setup(BLUE, GPIO.OUT)

try:
   while (1):
      GPIO.output(YELLOW, True)
      GPIO.output(GREEN, True)
      GPIO.output(RED, True)
      GPIO.output(WHITE, True)
      GPIO.output(BLUE, True)
except KeyboardInterrupt:
    print "Good bye"
    GPIO.output(YELLOW, False)
    GPIO.output(GREEN, False)
    GPIO.output(RED, False)
    GPIO.output(WHITE, False)
    GPIO.output(BLUE, False)
