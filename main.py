#!/usr/bin/env python3

from app import InitApp
from app.config import Config

config = Config()
init = InitApp()

app = init.create_app()


if __name__ == "__main__":
    app.run(host=config.flask_host, port=config.flask_port, debug=config.flask_debug)
