from app import app  
from scraper import scrape_jobs  
import schedule
import time
import logging


logging.basicConfig(filename="scraper.log", level=logging.INFO)
logging.info("Scraper Runner started.")

def run_scraper():
    with app.app_context(): 
        scrape_jobs()

run_scraper()

schedule.every(3).minutes.do(run_scraper)


while True:
    schedule.run_pending()
    time.sleep(1)
