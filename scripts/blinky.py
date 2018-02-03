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

Status1 = True
Status2 = False

def on(colour):
    t = threading.Timer(3.0, off, [colour])
    t.start()
    GPIO.output(colour, True)

def on(colour, duration):
    t = threading.Timer(duration, off, [colour])
    t.start()
    GPIO.output(colour, True)

def justOn(colour):
    GPIO.output(colour, True)

def off(colour):
    GPIO.output(colour, False)

def delay(colour, delay):
        t = threading.Timer(delay, on, [colour])
        t.start()

def chain(colourOne, colourTwo, duration, cont):
        t = threading.Timer(1.0, chain, [colourOne, colourTwo, duration, cont])
        t.start()
        GPIO.output(colourOne, True)
        GPIO.output(colourOne, False)

def blink(colour, duration, state):
    if state == True:
        state = False
    else:
        state = True

    print("Looping blink...")

    t = threading.Timer(duration, blink, [colour, duration, state])
    t.start()
    GPIO.output(colour, state)

def blinkControl(duration, state):
    if state == True:
        state = False
    else:
        state = True

    print("Looping blink...")

    t = threading.Timer(duration, blinkControl, [duration, state])
    t.start()

    GPIO.output(BLUE1, state)
    GPIO.output(BLUE2, not state)
    GPIO.output(GREEN, False)

    t2 = threading.Timer(1.0, on, [GREEN])
    t2.start()

    t3 = threading.Timer(2.0, on, [YELLOW])
    t3.start()

    t4 = threading.Timer(3.0, on, [RED])
    t4.start()

    t5 = threading.Timer(3.0, on, [RED])
    t5.start()# t5.start()
    #


def main():
    try:
        blinkControl(20.0, True)
        # blink(BLUE1, 2.0, True)

       #    GPIO.output(YELLOW, True)
       #    GPIO.output(GREEN, True)
       #    GPIO.output(RED, True)
       #    GPIO.output(BLUE1, True)
       #    GPIO.output(BLUE2, True)
    except KeyboardInterrupt:
        print "Good bye"
        GPIO.output(YELLOW, False)
        GPIO.output(GREEN, False)
        GPIO.output(RED, False)
        GPIO.output(BLUE1, False)
        GPIO.output(BLUE2, False)


if __name__ == "__main__": main()
