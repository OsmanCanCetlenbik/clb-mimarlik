from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
import json
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'clb-yapi-secret-key-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///clb_yapi.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

# Database Models
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)  # architecture, engineering, construction
    image_path = db.Column(db.String(200))
    client = db.Column(db.String(100))
    location = db.Column(db.String(100))
    completion_date = db.Column(db.Date)
    status = db.Column(db.String(20), default='completed')  # completed, ongoing, planned
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
def admin_login():
    if 'admin_logged_in' in session:
        return redirect(url_for('admin_dashboard'))
    return render_template('admin/login.html')

@app.route('/admin/login', methods=['POST'])
def admin_login_post():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    admin = Admin.query.filter_by(username=username).first()
    
    if admin and check_password_hash(admin.password_hash, password):
        session['admin_logged_in'] = True
        session['admin_id'] = admin.id
        return jsonify({'success': True, 'redirect': url_for('admin_dashboard')})
    else:
        return jsonify({'success': False, 'message': 'Kullanıcı adı veya şifre hatalı'})

@app.route('/admin/dashboard')
def admin_dashboard():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return render_template('admin/dashboard.html', projects=projects)

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    return redirect(url_for('admin_login'))

@app.route('/admin/projects')
def admin_projects():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return render_template('admin/projects.html', projects=projects)

@app.route('/admin/projects/new', methods=['GET', 'POST'])
def new_project():
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        try:
            data = request.form
            image_file = request.files.get('image')
            
            # Handle image upload
            image_path = None
            if image_file and image_file.filename:
                filename = secure_filename(image_file.filename)
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"{timestamp}_{filename}"
                image_path = f"uploads/{filename}"
                image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            # Create new project
            project = Project(
                title=data['title'],
                description=data['description'],
                category=data['category'],
                image_path=image_path,
                client=data.get('client', ''),
                location=data.get('location', ''),
                status=data.get('status', 'completed')
            )
            
            if data.get('completion_date'):
                project.completion_date = datetime.strptime(data['completion_date'], '%Y-%m-%d').date()
            
            db.session.add(project)
            db.session.commit()
            
            return jsonify({'success': True, 'message': 'Proje başarıyla eklendi'})
            
        except Exception as e:
            return jsonify({'success': False, 'message': f'Hata: {str(e)}'})
    
    return render_template('admin/new_project.html')

@app.route('/admin/projects/<int:project_id>/edit', methods=['GET', 'POST'])
def edit_project(project_id):
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin_login'))
    
    project = Project.query.get_or_404(project_id)
    
    if request.method == 'POST':
        try:
            data = request.form
            image_file = request.files.get('image')
            
            # Handle image upload
            if image_file and image_file.filename:
                filename = secure_filename(image_file.filename)
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"{timestamp}_{filename}"
                image_path = f"uploads/{filename}"
                image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                
                # Delete old image if exists
                if project.image_path:
                    old_image_path = os.path.join('static', project.image_path)
                    if os.path.exists(old_image_path):
                        os.remove(old_image_path)
                
                project.image_path = image_path
            
            # Update project data
            project.title = data['title']
            project.description = data['description']
            project.category = data['category']
            project.client = data.get('client', '')
            project.location = data.get('location', '')
            project.status = data.get('status', 'completed')
            
            if data.get('completion_date'):
                project.completion_date = datetime.strptime(data['completion_date'], '%Y-%m-%d').date()
            
            db.session.commit()
            
            return jsonify({'success': True, 'message': 'Proje başarıyla güncellendi'})
            
        except Exception as e:
            return jsonify({'success': False, 'message': f'Hata: {str(e)}'})
    
    return render_template('admin/edit_project.html', project=project)

@app.route('/admin/projects/<int:project_id>/delete', methods=['POST'])
def delete_project(project_id):
    if 'admin_logged_in' not in session:
        return jsonify({'success': False, 'message': 'Yetkisiz erişim'})
    
    try:
        project = Project.query.get_or_404(project_id)
        
        # Delete image file if exists
        if project.image_path:
            image_path = os.path.join('static', project.image_path)
            if os.path.exists(image_path):
                os.remove(image_path)
        
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Proje başarıyla silindi'})
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Hata: {str(e)}'})

# API Routes for frontend
@app.route('/api/projects')
def api_projects():
    category = request.args.get('category', 'all')
    
    if category == 'all':
        projects = Project.query.filter_by(status='completed').order_by(Project.created_at.desc()).all()
    else:
        projects = Project.query.filter_by(category=category, status='completed').order_by(Project.created_at.desc()).all()
    
    projects_data = []
    for project in projects:
        projects_data.append({
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'category': project.category,
            'image_path': project.image_path,
            'client': project.client,
            'location': project.location,
            'completion_date': project.completion_date.isoformat() if project.completion_date else None,
            'created_at': project.created_at.isoformat()
        })
    
    return jsonify(projects_data)

@app.route('/api/projects/<int:project_id>')
def api_project_detail(project_id):
    project = Project.query.get_or_404(project_id)
    
    project_data = {
        'id': project.id,
        'title': project.title,
        'description': project.description,
        'category': project.category,
        'image_path': project.image_path,
        'client': project.client,
        'location': project.location,
        'completion_date': project.completion_date.isoformat() if project.completion_date else None,
        'status': project.status,
        'created_at': project.created_at.isoformat()
    }
    
    return jsonify(project_data)

# Initialize database and create admin user
@app.cli.command('init-db')
def init_db():
    db.create_all()
    
    # Create default admin user if not exists
    admin = Admin.query.filter_by(username='admin').first()
    if not admin:
        admin = Admin(
            username='admin',
            password_hash=generate_password_hash('CLB2024Secure!'),
            email='admin@clbyapi.com'
        )
        db.session.add(admin)
        db.session.commit()
        print('Default admin user created: admin/CLB2024Secure!')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Create default admin user if not exists
        admin = Admin.query.filter_by(username='admin').first()
        if not admin:
            admin = Admin(
                username='admin',
                password_hash=generate_password_hash('CLB2024Secure!'),
                email='admin@clbyapi.com'
            )
            db.session.add(admin)
            db.session.commit()
            print('Default admin user created: admin/CLB2024Secure!')
    
    # Development server
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5001))) 