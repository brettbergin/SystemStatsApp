#!/usr/bin/env python3

import uuid

from app.extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String(36), default=lambda: str(uuid.uuid4()), primary_key=True)

    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    jwt_issue_count = db.Column(db.Integer, default=False)
    email_verified = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<User {self.id}>"
