from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os
import csv
from io import StringIO
from flask import render_template_string


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





# Add this import at the top of your file if not already present
from flask import render_template_string

# Keep your existing API routes unchanged
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

# New HTML table routes for business clients
from datetime import datetime
from flask import render_template_string

# New HTML table routes for business clients
@app.route('/inquiries', methods=['GET'])
def view_inquiries():
    try:
        inquiries = Inquiry.query.order_by(Inquiry.timestamp.desc()).all()
        
        # Process timestamps to ensure they're properly formatted
        for inquiry in inquiries:
            if inquiry.timestamp:
                if isinstance(inquiry.timestamp, str):
                    try:
                        # Convert string to datetime if needed
                        inquiry.formatted_timestamp = datetime.strptime(inquiry.timestamp, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d %H:%M')
                    except:
                        inquiry.formatted_timestamp = inquiry.timestamp  # Use as-is if parsing fails
                else:
                    # It's already a datetime object
                    inquiry.formatted_timestamp = inquiry.timestamp.strftime('%Y-%m-%d %H:%M')
            else:
                inquiry.formatted_timestamp = 'N/A'
        
        inquiries_html_template = '''
<!DOCTYPE html>
<html>
<head>
    <title>Customer Inquiries</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px; }
        .stats { background: #007bff; color: white; padding: 15px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #007bff; color: white; padding: 12px 8px; text-align: left; font-weight: bold; }
        td { padding: 10px 8px; border-bottom: 1px solid #ddd; vertical-align: top; }
        tr:nth-child(even) { background-color: #f8f9fa; }
        tr:hover { background-color: #e8f4fd; }
        .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .status-new { background-color: #28a745; color: white; }
        .status-pending { background-color: #ffc107; color: black; }
        .status-completed { background-color: #6c757d; color: white; }
        .message-cell { max-width: 200px; word-wrap: break-word; }
        .timestamp { font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Customer Inquiries Dashboard</h1>
        <div class="stats">
            <strong>Total Inquiries: {{ total_count }}</strong>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Product Interest</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {% for inquiry in inquiries %}
                <tr>
                    <td>{{ inquiry.id }}</td>
                    <td><strong>{{ inquiry.name or 'N/A' }}</strong></td>
                    <td>{{ inquiry.email or 'N/A' }}</td>
                    <td>{{ inquiry.phone or 'N/A' }}</td>
                    <td>{{ inquiry.subject or 'N/A' }}</td>
                    <td class="message-cell">{{ (inquiry.message or 'N/A')[:100] }}{% if inquiry.message and inquiry.message|length > 100 %}...{% endif %}</td>
                    <td>{{ inquiry.product_interest or 'N/A' }}</td>
                    <td class="timestamp">{{ inquiry.formatted_timestamp }}</td>
                    <td><span class="status status-{{ (inquiry.status or 'new')|lower }}">{{ inquiry.status or 'New' }}</span></td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
</body>
</html>
        '''
        
        return render_template_string(inquiries_html_template, inquiries=inquiries, total_count=len(inquiries))
    
    except Exception as e:
        return f"Error loading inquiries: {str(e)}", 500

@app.route('/subscribers', methods=['GET'])
def view_subscribers():
    try:
        subscribers = Subscriber.query.order_by(Subscriber.timestamp.desc()).all()
        
        # Process timestamps to ensure they're properly formatted
        for subscriber in subscribers:
            if subscriber.timestamp:
                if isinstance(subscriber.timestamp, str):
                    try:
                        # Convert string to datetime if needed
                        subscriber.formatted_timestamp = datetime.strptime(subscriber.timestamp, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d %H:%M')
                    except:
                        subscriber.formatted_timestamp = subscriber.timestamp  # Use as-is if parsing fails
                else:
                    # It's already a datetime object
                    subscriber.formatted_timestamp = subscriber.timestamp.strftime('%Y-%m-%d %H:%M')
            else:
                subscriber.formatted_timestamp = 'N/A'
        
        subscribers_html_template = '''
<!DOCTYPE html>
<html>
<head>
    <title>Email Subscribers</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 3px solid #28a745; padding-bottom: 10px; }
        .stats { background: #28a745; color: white; padding: 15px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #28a745; color: white; padding: 12px; text-align: left; font-weight: bold; }
        td { padding: 12px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f8f9fa; }
        tr:hover { background-color: #e8f5e8; }
        .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .status-active { background-color: #28a745; color: white; }
        .status-inactive { background-color: #dc3545; color: white; }
        .timestamp { font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Subscribers Dashboard</h1>
        <div class="stats">
            <strong>Total Subscribers: {{ total_count }}</strong>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email Address</th>
                    <th>Subscription Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {% for subscriber in subscribers %}
                <tr>
                    <td>{{ subscriber.id }}</td>
                    <td><strong>{{ subscriber.email }}</strong></td>
                    <td class="timestamp">{{ subscriber.formatted_timestamp }}</td>
                    <td><span class="status status-{{ (subscriber.status or 'active')|lower }}">{{ subscriber.status or 'Active' }}</span></td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
</body>
</html>
        '''
        
        return render_template_string(subscribers_html_template, subscribers=subscribers, total_count=len(subscribers))
    
    except Exception as e:
        return f"Error loading subscribers: {str(e)}", 500

@app.route('/dashboard', methods=['GET'])
def dashboard():
    try:
        inquiries_count = Inquiry.query.count()
        subscribers_count = Subscriber.query.count()
        recent_inquiries = Inquiry.query.order_by(Inquiry.timestamp.desc()).limit(5).all()
        
        # Process timestamps for recent inquiries
        for inquiry in recent_inquiries:
            if inquiry.timestamp:
                if isinstance(inquiry.timestamp, str):
                    try:
                        # Convert string to datetime if needed
                        inquiry.formatted_timestamp = datetime.strptime(inquiry.timestamp, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d %H:%M')
                    except:
                        inquiry.formatted_timestamp = inquiry.timestamp  # Use as-is if parsing fails
                else:
                    # It's already a datetime object
                    inquiry.formatted_timestamp = inquiry.timestamp.strftime('%Y-%m-%d %H:%M')
            else:
                inquiry.formatted_timestamp = 'N/A'
        
        dashboard_html_template = '''
<!DOCTYPE html>
<html>
<head>
    <title>Business Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; border-bottom: 3px solid #007bff; padding-bottom: 10px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .stat-card { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; }
        .stat-label { font-size: 1.1em; margin-top: 5px; }
        .quick-links { margin: 30px 0; text-align: center; }
        .btn { display: inline-block; padding: 12px 24px; margin: 0 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .btn:hover { background: #0056b3; }
        .recent { margin-top: 30px; }
        .recent h3 { color: #333; border-bottom: 2px solid #28a745; padding-bottom: 5px; }
        .recent-item { padding: 10px; border-left: 4px solid #007bff; margin: 10px 0; background: #f8f9fa; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Business Dashboard</h1>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">{{ inquiries_count }}</div>
                <div class="stat-label">Total Inquiries</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{{ subscribers_count }}</div>
                <div class="stat-label">Email Subscribers</div>
            </div>
        </div>
        
        <div class="quick-links">
            <a href="/inquiries" class="btn">View All Inquiries</a>
            <a href="/subscribers" class="btn">View All Subscribers</a>
        </div>
        
        <div class="recent">
            <h3>Recent Inquiries</h3>
            {% for inquiry in recent_inquiries %}
            <div class="recent-item">
                <strong>{{ inquiry.name or 'Anonymous' }}</strong> - {{ inquiry.subject or 'No subject' }}<br>
                <small>{{ inquiry.formatted_timestamp }}</small>
            </div>
            {% endfor %}
        </div>
    </div>
</body>
</html>
        '''
        
        return render_template_string(dashboard_html_template, 
                                    inquiries_count=inquiries_count,
                                    subscribers_count=subscribers_count,
                                    recent_inquiries=recent_inquiries)
    
    except Exception as e:
        return f"Error loading dashboard: {str(e)}", 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
