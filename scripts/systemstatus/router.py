#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
from flask import request
import util

app = Flask(__name__)

@app.route('/status', methods=['GET', 'POST'])
def status():
    if request.method == 'POST':
        return util.setStatus(request.data)
    elif request.method == 'GET':
        return util.getStatus()
