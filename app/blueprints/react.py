#!/usr/bin/env python3

from pydoc import cli
from flask import request
from flask import Blueprint
from flask import render_template
from flask import abort

from app.extensions import db

# from app.models.memory import Memory
# from app.models.cpu import CPU
# from app.models.disk import Disk
# from app.models.process import Process
# from app.models.reports import UserReports
# from app.models.network import NetworkInfo, NetworkIp
# from app.models.system import SystemUser, SystemUptime, SystemOper

ReactPrint = Blueprint("react_print", __name__)


@ReactPrint.route("/", methods=["GET"])
def home():
    return render_template("index.html", title="Home"), 200
