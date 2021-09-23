"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/profile/image/', methods=["POST"])
def upload_image():
    
    image = request.files['File']

    if image is None:
        return jsonify({"msg": "Error to get image"}), 400
    
    upload_result = cloudinary.uploader.upload(image)

    user = User.query.get(1)

    user.profile_image_url = upload_result['secure_url']

    db.session.commit()

    return jsonify({"msg": "image upload fine"}), 200

