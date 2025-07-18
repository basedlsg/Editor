import os
import requests
from bs4 import BeautifulSoup

# URL of the Wikipedia page
WIKI_URL = "https://en.wikipedia.org/wiki/List_of_sigils_of_demons"
# Directory to save the sigils
SIGIL_DIR = "public/sigils"

def get_soup(url):
    """Fetches the content of a URL and returns a BeautifulSoup object."""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'}
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        return BeautifulSoup(response.text, 'html.parser')
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

def download_file(url, dest_path):
    """Downloads a file from a URL to a destination path."""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'}
        response = requests.get(url, stream=True, headers=headers)
        response.raise_for_status()
        with open(dest_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Successfully downloaded {dest_path}")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading {url}: {e}")

def scrape_sigils():
    """Scrapes the Goetic sigils from Wikipedia."""
    print("Starting sigil scraping process...")

    # Create the sigil directory if it doesn't exist
    if not os.path.exists(SIGIL_DIR):
        os.makedirs(SIGIL_DIR)
        print(f"Created directory: {SIGIL_DIR}")

    # Get the main page soup
    main_soup = get_soup(WIKI_URL)
    if not main_soup:
        print("Failed to fetch the main Wikipedia page. Aborting.")
        return

    # Find the main table containing the list of demons
    table = main_soup.find('table', {'class': 'wikitable'})
    if not table:
        print("Could not find the main demon table on the page. Aborting.")
        return

    # Iterate over each row in the table body
    for row in table.tbody.find_all('tr')[1:]:  # Skip the header row
        columns = row.find_all('td')
        if len(columns) > 1:
            # Get the demon name from the first column
            demon_name_tag = columns[0].find('a')
            demon_name = demon_name_tag.text.strip() if demon_name_tag else "Unknown"

            # Find the link to the sigil file page in the second column
            sigil_link_tag = columns[1].find('a', class_='mw-file-description')

            if sigil_link_tag:
                # Extract demon number from the image filename in the href
                try:
                    # e.g., href="/wiki/File:01-Bael_seal.png"
                    filename = sigil_link_tag['href'].split('/')[-1]
                    # filename is "File:01-Bael_seal.png"
                    number_part = filename.split('-')[0]
                    demon_number = ''.join(filter(str.isdigit, number_part))
                    if not demon_number:
                        print(f"Could not parse demon number for {demon_name}")
                        continue
                except (IndexError, ValueError):
                    print(f"Could not parse demon number for {demon_name}")
                    continue

                file_page_url = "https://en.wikipedia.org" + sigil_link_tag['href']
                
                # Get the soup for the file page
                file_page_soup = get_soup(file_page_url)
                if file_page_soup:
                    # Find the link to the original SVG file
                    original_file_link = file_page_soup.find('a', string="Original file")
                    if original_file_link:
                        image_url = "https:" + original_file_link['href']
                        extension = "svg"
                    else:
                        # If no SVG, find the full-resolution PNG
                        full_image_link = file_page_soup.find('div', {'class': 'fullImageLink'}).find('a')
                        if full_image_link:
                            image_url = "https:" + full_image_link['href']
                            extension = "png"
                        else:
                            print(f"Could not find any image link on {file_page_url} for {demon_name}")
                            continue

                    # Define the destination path
                    dest_path = os.path.join(SIGIL_DIR, f"{demon_number}.{extension}")
                    
                    # Download the file
                    print(f"Downloading sigil for demon #{demon_number} ({demon_name}) from {image_url}...")
                    download_file(image_url, dest_path)
            else:
                print(f"Could not find sigil link for demon {demon_name}")

    print("Sigil scraping process finished.")

if __name__ == "__main__":
    scrape_sigils()