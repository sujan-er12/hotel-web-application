from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from database import get_db

app = Flask(__name__)
CORS(app)


# =========================
# USER REGISTER
# =========================

@app.route("/api/user/register", methods=["POST"])
def user_register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    if cursor.fetchone():
        cursor.close()
        db.close()

        return jsonify({
            "message": "User email already exists"
        }), 409

    hashed_password = generate_password_hash(password)

    cursor.execute(
        """
        INSERT INTO users
        (name, email, phone, password)
        VALUES (%s, %s, %s, %s)
        """,
        (name, email, phone, hashed_password)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "User registration successful"
    }), 201


# =========================
# USER LOGIN
# =========================

@app.route("/api/user/login", methods=["POST"])
def user_login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()
    db.close()

    if not user:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        user["password"],
        password
    ):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "message": "User login successful",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    })


# =========================
# OWNER REGISTER
# =========================

@app.route("/api/owner/register", methods=["POST"])
def owner_register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM owners WHERE email = %s",
        (email,)
    )

    if cursor.fetchone():
        cursor.close()
        db.close()

        return jsonify({
            "message": "Owner email already exists"
        }), 409

    hashed_password = generate_password_hash(password)

    cursor.execute(
        """
        INSERT INTO owners
        (name, email, phone, password)
        VALUES (%s, %s, %s, %s)
        """,
        (name, email, phone, hashed_password)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message": "Owner registration successful"
    }), 201


# =========================
# OWNER LOGIN
# =========================

@app.route("/api/owner/login", methods=["POST"])
def owner_login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM owners WHERE email = %s",
        (email,)
    )

    owner = cursor.fetchone()

    cursor.close()
    db.close()

    if not owner:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if not check_password_hash(
        owner["password"],
        password
    ):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "message": "Owner login successful",
        "owner": {
            "id": owner["id"],
            "name": owner["name"],
            "email": owner["email"]
        }
    })


# =========================
# ADMIN LOGIN
# =========================

@app.route("/api/admin/login", methods=["POST"])
def admin_login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM admins WHERE email = %s",
        (email,)
    )

    admin = cursor.fetchone()

    cursor.close()
    db.close()

    if not admin:
        return jsonify({
            "message": "Invalid admin credentials"
        }), 401

    if not check_password_hash(
        admin["password"],
        password
    ):
        return jsonify({
            "message": "Invalid admin credentials"
        }), 401

    return jsonify({
        "message": "Admin login successful",
        "admin": {
            "id": admin["id"],
            "name": admin["name"],
            "email": admin["email"]
        }
    })



# =========================
# TEST
# =========================

@app.route("/")
def home():
    return "Hotel Backend is Running!"


if __name__ == "__main__":
    app.run(debug=True, port=5000)