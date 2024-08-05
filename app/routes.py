from flask import Blueprint, request, jsonify
from . import db
from .models import FireIncident, Agency
from datetime import datetime

# Create a Blueprint for incidents
incidents_bp = Blueprint('incidents', __name__)

@incidents_bp.route('/incidents', methods=['GET', 'POST'])
def manage_incidents():
    if request.method == 'POST':
        data = request.json
        incident = FireIncident(
            location=data['location'],
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            description=data['description'],
            agency_id=data['agency_id']
        )
        db.session.add(incident)
        db.session.commit()
        return jsonify({'message': 'Incident created successfully'}), 201

    elif request.method == 'GET':
        incidents = FireIncident.query.all()
        return jsonify([{
            'id': incident.id,
            'location': incident.location,
            'date': incident.date.strftime('%Y-%m-%d'),
            'description': incident.description,
            'agency_id': incident.agency_id
        } for incident in incidents]), 200
