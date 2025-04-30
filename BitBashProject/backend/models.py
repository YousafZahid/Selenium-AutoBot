from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(255), nullable=True)
    logo_url = db.Column(db.String(255), nullable=True)  
    company_link = db.Column(db.String(255), nullable=True)  
    country = db.Column(db.String(150), nullable=True) 
    posted_on = db.Column(db.String(150), nullable=True)  
    is_featured = db.Column(db.Boolean, default=False)  
    cities = db.Column(db.String(1000), nullable=True)  
    experience_levels = db.Column(db.String(1000), nullable=True) 
    sectors = db.Column(db.String(1000), nullable=True)  
    tags = db.Column(db.String(1000), nullable=True)  

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'link': self.link,
            'logo_url': self.logo_url,
            'company_link': self.company_link,
            'country': self.country,
            'posted_on': self.posted_on,
            'is_featured': self.is_featured,
            'cities': self.cities,
            'experience_levels': self.experience_levels,
            'sectors': self.sectors,
            'tags': self.tags,
        }
