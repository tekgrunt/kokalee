#!/usr/bin/env python
# -*- coding: utf-8 -*-
import threading
import RPi.GPIO as GPIO

#######################
# The LED control panel is meant to give users an indication of the system
# health at a glance. The panel has 3 LEDS to indicate health.
# Green = all systems running as expected
# Yellow = something needs attention - please visit the admin panel
# Red = the given device is in a fail state
# There are two Blue LEDs on the front of the control panel and they will
# will light up alternatively to indicate which device they are reporting
# status from.
# There is also the possibility that we can report a complete failure by
# flashing both Blue LEDs and then use up to 8-bits on the other LEDs
# to provide some indication of the failure... the problem here is that
# if it is a total failure we probably will lose access to the panel. FFT.
########################
BLUE2 = 26
BLUE1 = 19
GREEN = 06
YELLOW = 05
RED = 11

# Pin Setup:
GPIO.setmode(GPIO.BCM)   # Broadcom pin-numbering scheme.
GPIO.setwarnings(False)
GPIO.setup(BLUE2, GPIO.OUT)
GPIO.setup(BLUE1, GPIO.OUT)
GPIO.setup(GREEN, GPIO.OUT)
GPIO.setup(YELLOW, GPIO.OUT)
GPIO.setup(RED, GPIO.OUT)

def on(colour):
    t = threading.Timer(3.0, off, [colour])
    t.start()
    GPIO.output(colour, True)

def off(colour):
    GPIO.output(colour, False)

def blink(colour, duration, state):
    if state == True:
        state = False
    else:
        state = True

    t = threading.Timer(duration, blink, [colour, duration, state])
    t.start()
    GPIO.output(colour, state)
