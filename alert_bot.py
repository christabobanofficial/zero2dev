import requests
import smtplib

API_KEY = "30d038c0511cc734017d7c85f50df2a9"
CITY = "Thrissur,IN"

EMAIL = "your_email@gmail.com"
PASSWORD = "your_app_password"  # IMPORTANT (not normal password)
TO_EMAIL = "your_email@gmail.com"

def get_weather():
    url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric"
    data = requests.get(url).json()

    print(data)  # debug

    cod = str(data.get("cod"))  # convert to string safely

    if cod != "200":
        print("API Error:", data.get("message"))
        return None, None

    temp = data["main"]["temp"]
    weather = data["weather"][0]["main"]

    return temp, weather


def send_email(message):
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(EMAIL, PASSWORD)

    subject = "Weather Alert 🚨"
    body = message
    msg = f"Subject: {subject}\n\n{body}"

    server.sendmail(EMAIL, TO_EMAIL, msg)
    server.quit()


temp, weather = get_weather()

if temp > 35 or "Rain" in weather:
    send_email(f"Alert! Weather in {CITY}: {temp}°C, Condition: {weather}")
    print("Email sent!")
else:
    print("Weather normal")
