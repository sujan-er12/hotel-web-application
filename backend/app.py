from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)




def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT", 3306))
    )


# REGISTER
@app.route("/api/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    role = data.get("role")

    if not name or not email or not password or not role:
        return jsonify({
            "message": "All required fields are required"
        }), 400

    if role not in ["admin", "owner", "user"]:
        return jsonify({
            "message": "Invalid role"
        }), 400

    db = get_db()
    cursor = db.cursor()

    # Check email
    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    if cursor.fetchone():
        cursor.close()
        db.close()

        return jsonify({
            "message": "Email already registered"
        }), 409

    # Hash password
    hashed_password = generate_password_hash(password)

    cursor.execute(
        """
        INSERT INTO users
        (name, email, phone, password, role)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (
            name,
            email,
            phone,
            hashed_password,
            role
        )
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Registration successful"
    }), 201


# LOGIN
@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not email or not password or not role:
        return jsonify({
            "message": "Email, password and role are required"
        }), 400

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE email = %s AND role = %s
        """,
        (email, role)
    )

    user = cursor.fetchone()

    cursor.close()
    db.close()

    if not user:
        return jsonify({
            "message": "Invalid email, password or role"
        }), 401

    if not check_password_hash(
        user["password"],
        password
    ):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "phone": user["phone"],
            "role": user["role"]
        }
    }), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))