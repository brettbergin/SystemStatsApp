#!/usr/bin/env python3

from flask import Blueprint
from flask import render_template

from app.models.memory import Memory
from app.models.cpu import CPU
from app.models.disk import Disk
from app.models.network import NetworkInfo, NetworkIp
from app.models.system import SystemUser, SystemUptime, SystemOper


BasePrint = Blueprint("base_print", __name__)


@BasePrint.route("/", methods=["GET"])
def home():
    return render_template("index.html", title="Home"), 200


@BasePrint.route("/memory", methods=["GET"])
def memory():
    memory_stats = Memory.query.all() 
    return render_template(
        "memory.html", title="Memory", memory_stats=memory_stats), 200


@BasePrint.route("/cpu", methods=["GET"])
def cpu():
    cpu_stats = CPU.query.all() 
    return render_template(
        "cpu.html", title="CPU", cpu_stats=cpu_stats), 200


@BasePrint.route("/disk", methods=["GET"])
def disk():
    disk_stats = Disk.query.all() 
    return render_template(
        "disk.html", title="Disk", disk_stats=disk_stats), 200


@BasePrint.route("/network", methods=["GET"])
def network():
    network_stats = NetworkInfo.query.all()
    network_ips = NetworkIp.query.all()

    return render_template(
        "network.html", title="Network", 
        network_stats=network_stats, network_ips=network_ips), 200


@BasePrint.route("/system", methods=["GET"])
def system():
    system_users = SystemUser.query.all() 
    system_uptime = SystemUptime.query.all()
    system_os = SystemOper.query.all()

    return render_template(
        "system.html", title="System", 
        system_users=system_users, system_uptime=system_uptime,
        system_os=system_os), 200
