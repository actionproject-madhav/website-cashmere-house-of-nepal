from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)

# Update CORS to handle preflight requests properly
CORS(app, 
     origins=["http://localhost:3000", "https://website-cashmere-house-of-nepal-frontend-b3rr.onrender.com"],
     allow_headers=["Content-Type"],
     methods=["GET", "POST", "OPTIONS"])

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'instance', 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
print("Database absolute path:", db_path)


db = SQLAlchemy(app)

# Models
class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    subject = db.Column(db.String(150))
    message = db.Column(db.Text)
    product_interest = db.Column(db.String(100))
    timestamp = db.Column(db.String(50))
    status = db.Column(db.String(20), default='new')

class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    timestamp = db.Column(db.String(50))
    status = db.Column(db.String(20), default='active')

# Initialize database (create tables)
with app.app_context():
    db.create_all()

# API routes

@app.route('/')
def home():
    return "Welcome to the API. Try the endpoints under /api/ ..."


@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        print("Contact endpoint hit!")
        data = request.get_json()
        print("Received data:", data)
        
        required_fields = ['name', 'email', 'subject', 'message']

        if not all(field in data for field in required_fields):
            print("Missing required fields!")
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400

        new_inquiry = Inquiry(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone', ''),
            subject=data['subject'],
            message=data['message'],
            product_interest=data.get('productInterest', ''),
            timestamp=datetime.now().isoformat()
        )

        db.session.add(new_inquiry)
        db.session.commit()
        print("Data saved successfully!")
        print("New inquiry:", new_inquiry)

        return jsonify({
            'success': True,
            'message': 'Thank you for contacting us. We will get back to you shortly.',
            'inquiry_id': new_inquiry.id
        })
        
    except Exception as e:
        print("Error in contact endpoint:", str(e))
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'Server error occurred'
        }), 500

@app.route('/api/newsletter', methods=['POST'])
def subscribe_newsletter():
    print("Database absolute path:", os.path.abspath(app.config['SQLALCHEMY_DATABASE_URI'][10:]))
    data = request.get_json()
    email = data.get('email')
    print(email)

    if not email:
        return jsonify({'success': False, 'message': 'Email is required'}), 400

    existing = Subscriber.query.filter_by(email=email).first()
    if existing:
        return jsonify({'success': False, 'message': 'Email already subscribed'}), 409

    new_subscriber = Subscriber(
        email=email,
        timestamp=datetime.now().isoformat()
    )

    db.session.add(new_subscriber)
    db.session.commit()
    print("commit done")
    print("Database Path:", os.path.join(app.root_path, 'instance', 'database.db'))
    print(new_subscriber.id)


    return jsonify({
        'success': True,
        'message': 'Thank you for subscribing to our newsletter.',
        'subscriber_id': new_subscriber.id
    })

@app.route('/api/inquiries', methods=['GET'])
def get_inquiries():
    inquiries = Inquiry.query.order_by(Inquiry.timestamp.desc()).all()
    inquiry_list = [{
        'id': i.id,
        'name': i.name,
        'email': i.email,
        'phone': i.phone,
        'subject': i.subject,
        'message': i.message,
        'product_interest': i.product_interest,
        'timestamp': i.timestamp,
        'status': i.status
    } for i in inquiries]

    return jsonify({
        'success': True,
        'inquiries': inquiry_list,
        'total': len(inquiry_list)
    })

@app.route('/api/subscribers', methods=['GET'])
def get_subscribers():
    subscribers = Subscriber.query.order_by(Subscriber.timestamp.desc()).all()
    subscriber_list = [{
        'id': s.id,
        'email': s.email,
        'timestamp': s.timestamp,
        'status': s.status
    } for s in subscribers]

    return jsonify({
        'success': True,
        'subscribers': subscriber_list,
        'total': len(subscriber_list)
    })


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
