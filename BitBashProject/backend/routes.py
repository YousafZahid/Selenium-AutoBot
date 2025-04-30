from flask import Blueprint, request, jsonify
from models import db, Job

job_routes = Blueprint("job_routes", __name__)

@job_routes.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    return jsonify([job.to_dict() for job in jobs]), 200

@job_routes.route('/jobs', methods=['POST'])
def add_job():
    data = request.json
    job = Job(
        title=data.get('title'),
        company=data.get('company'),
        cities=data.get('cities', ''),
        experience_levels=data.get('experience_levels', ''),
        sectors=data.get('sectors', ''),
        tags=data.get('tags', ''),
        link=data.get('link', ''),
        logo_url=data.get('logo_url', ''),
        company_link=data.get('company_link', ''),
        country=data.get('country', ''),
        posted_on=data.get('posted_on', ''),
        is_featured=data.get('is_featured', False)
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({'message': 'Job added successfully'}), 201

@job_routes.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({'error': 'Job not found'}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({'message': 'Job deleted successfully'}), 200
