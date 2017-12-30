#!/usr/bin/env python
# -*- coding: utf-8 -*-
import threading
import requests
import util

def poll(duration):

    print "Polling..."

    # We ask the util methof for the status and make some decisions
    get = requests.get(util.masterFlaskURL+"/status")

    # Then we can set the status if needed
    post = requests.post(util.masterFlaskURL+"/status", data=get.content)

    print post.content
    print post.status_code
    print post.headers['content-type']

    t = threading.Timer(util.duration, poll, [util.duration])
    t.start()

def main():
    print "Launching main method..."
    poll(util.duration)


if __name__ == "__main__": main()
