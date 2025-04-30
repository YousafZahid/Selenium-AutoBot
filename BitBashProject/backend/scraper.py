from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import logging
from models import db, Job  
from app import app

logging.basicConfig(filename="scraper.log", level=logging.INFO)
logging.info("Scraper script started.")

def init_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def scrape_jobs():
    logging.info("Scraping started...")
    driver = init_driver()
    driver.get("https://www.actuarylist.com/")
    sleep(5)

   
    with app.app_context():  
        while True:
            
            WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "Job_job-card__YgDAV"))
            )

            
            jobs = driver.find_elements(By.CLASS_NAME, "Job_job-card__YgDAV")
            logging.info(f"Found {len(jobs)} job listings on the current page.")

            
            for job in jobs:
                try:
                    title_tag = job.find_element(By.CLASS_NAME, "Job_job-card__position__ic1rc")
                    title = title_tag.text.strip()

                    is_featured = False
                    try:
                        job.find_element(By.CLASS_NAME, "Job_job-card__pin__N5sZd")
                        is_featured = True
                    except:
                        pass

                    company = job.find_element(By.CLASS_NAME, "Job_job-card__company__7T9qY").text.strip()

                    logo_img = job.find_element(By.TAG_NAME, "img")
                    logo_url = logo_img.get_attribute("src")

                    job_link = job.find_element(By.CLASS_NAME, "Job_job-page-link__a5I5g").get_attribute("href")
                    company_link = job.find_element(By.CLASS_NAME, "Job_job-card__logo__cdF2_").find_element(By.TAG_NAME, "a").get_attribute("href")

                    country = job.find_element(By.CLASS_NAME, "Job_job-card__country__GRVhK").text.strip()

                    
                    elements = job.find_elements(By.CLASS_NAME, "Job_job-card__location__bq7jX")

                    cities = [el.text.strip() for el in elements if "cities" in el.get_attribute("href")]
                    experience_levels = [el.text.strip() for el in elements if "experience-levels" in el.get_attribute("href")]
                    sectors = [
                        el.get_attribute("textContent").strip()
                        for el in elements
                        if "sectors" in el.get_attribute("href")
                        and el.get_attribute("textContent").strip()
                    ]

                    tags = [
                        el.get_attribute("textContent").strip()
                        for el in elements
                        if "keywords" in el.get_attribute("href")
                        and el.get_attribute("textContent").strip()
                    ]
                    
                    posted_on = job.find_element(By.CLASS_NAME, "Job_job-card__posted-on__NCZaJ").text.strip()

                    
                    existing_job = Job.query.filter_by(title=title, company=company, cities=", ".join(cities)).first()
                    if not existing_job:
                        new_job = Job(
                            title=title,
                            company=company,
                            link=job_link,
                            logo_url=logo_url,
                            company_link=company_link,
                            country=country,
                            posted_on=posted_on,
                            is_featured=is_featured,
                            cities=", ".join(cities),
                            experience_levels=", ".join(experience_levels),
                            sectors=", ".join(sectors),
                            tags=", ".join(tags)
                        )
                        db.session.add(new_job)
                        db.session.commit()
                        logging.info(f"Job added: {title} at {company}")
                except Exception as e:
                    logging.error(f"Error parsing job: {e}")
            try:
                next_button = driver.find_element(By.XPATH, "//button[contains(text(),'Next')]")
                if next_button.is_enabled():
                    next_button.click()
                    logging.info("Clicked on Next button to load the next page.")
                    sleep(5)  
                else:
                    logging.info("No more pages to scrape. Exiting.")
                    break
            except Exception as e:
                logging.error(f"Error clicking Next button: {e}")
                break

    driver.quit()
    logging.info("Scraping completed.")
