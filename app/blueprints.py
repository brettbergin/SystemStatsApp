#!/usr/bin/env python3

from flask import request
from flask import Blueprint
from flask import render_template
from flask import abort

from app.extensions import db
from app.models.memory import Memory
from app.models.cpu import CPU
from app.models.disk import Disk
from app.models.process import Process
from app.models.reports import UserReports
from app.models.network import NetworkInfo, NetworkIp
from app.models.system import SystemUser, SystemUptime, SystemOper


BasePrint = Blueprint("base_print", __name__)


@BasePrint.route("/", methods=["GET"])
def home():
    return render_template("index.html", title="Home"), 200


@BasePrint.route("/reports", methods=["GET"])
def reports():
    reports = UserReports.query.all()

    return render_template("reports.html", title="Reports", reports=reports), 200


@BasePrint.route("/memory", methods=["GET"])
def memory():
    memory_stats = Memory.query.all()
    return (
        render_template("memory.html", title="Memory", memory_stats=memory_stats),
        200,
    )


@BasePrint.route("/cpu", methods=["GET"])
def cpu():
    cpu_stats = CPU.query.all()
    return render_template("cpu.html", title="CPU", cpu_stats=cpu_stats), 200


@BasePrint.route("/disk", methods=["GET"])
def disk():
    disk_stats = Disk.query.all()
    return render_template("disk.html", title="Disk", disk_stats=disk_stats), 200


@BasePrint.route("/network", methods=["GET"])
def network():
    network_stats = NetworkInfo.query.all()
    network_ips = NetworkIp.query.all()

    return (
        render_template(
            "network.html",
            title="Network",
            network_stats=network_stats,
            network_ips=network_ips,
        ),
        200,
    )


@BasePrint.route("/system", methods=["GET"])
def system():
    system_users = SystemUser.query.all()
    system_uptime = SystemUptime.query.all()
    system_os = SystemOper.query.all()

    return (
        render_template(
            "system.html",
            title="System",
            system_users=system_users,
            system_uptime=system_uptime,
            system_os=system_os,
        ),
        200,
    )


@BasePrint.route("/report/details", methods=["GET"])
def report_details():
    report_id = request.args["report_id"]

    user_report = UserReports.query.filter_by(report_id=report_id).first()
    if not user_report:
        return abort(404)

    disk_data = Disk.query.filter_by(report_id=report_id).all()
    cpu_data = CPU.query.filter_by(report_id=report_id).all()
    memory_data = Memory.query.filter_by(report_id=report_id).all()
    network_info_data = NetworkInfo.query.filter_by(report_id=report_id).all()
    network_ip_data = NetworkIp.query.filter_by(report_id=report_id).all()
    system_uptime_data = SystemUptime.query.filter_by(report_id=report_id).all()
    system_user_data = SystemUser.query.filter_by(report_id=report_id).all()
    system_os_data = SystemOper.query.filter_by(report_id=report_id).all()
    process_data = Process.query.filter_by(report_id=report_id).all()

    return (
        render_template(
            "report_details.html",
            title="Report Details",
            disk_data=disk_data,
            cpu_data=cpu_data,
            memory_data=memory_data,
            network_info_data=network_info_data,
            network_ip_data=network_ip_data,
            system_uptime_data=system_uptime_data,
            system_user_data=system_user_data,
            system_os_data=system_os_data,
            process_data=process_data,
        ),
        200,
    )
