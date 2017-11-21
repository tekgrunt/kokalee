from threading import Thread
from time import sleep

# Function to be called when the timer expires
def myFunction():i
    myThread = Thread(target
    print 'Did anyone call me?'

# Function with the timer
def myTimer(seconds):
    sleep(seconds)
    myFunction()

# Thread that will sleep in background and call your function
# when the timer expires.
myThread = Thread(target=myTimer, args=(4,))
myThread.start()
