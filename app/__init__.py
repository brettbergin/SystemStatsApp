#!/usr/bin/env python3

from datetime import timedelta

from flask import Flask

from app.config import Config
from app.extensions import db
from app.blueprints import BasePrint


class InitApp(object):

    def __init__(self):
        self.config = Config()
        
        self.db_url = f"mysql://{self.config.db_username}:{self.config.db_password}@{self.config.db_host}:{self.config.db_port}/{self.config.db_name}"
        
        self.this_app_secret = self.config.flask_app_secret
        
        self.rate_limit_strategy = "fixed-window-elastic-expiry"
        self.rate_limit_frequency = "50000/day;2500/hour;100/minute"

        self._internal_app = None

    def _register_extensions(self):
        db.init_app(self._internal_app)

    def _register_blue_prints(self):
        self._internal_app.register_blueprint(BasePrint)

    def create_app(self):
        self._internal_app = Flask(__name__)
        self._internal_app.config.from_object(self.config)

        self._internal_app.config["SECRET_KEY"] = self.this_app_secret

        self._internal_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        self._internal_app.config['SQLALCHEMY_DATABASE_URI'] = self.db_url

        self._register_extensions()
        self._register_blue_prints()

        return self._internal_app