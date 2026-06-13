import smtplib

EMAIL = "christaboban460@gmail.com"
PASSWORD = "cHri$2407"
TO_EMAIL = "christaboban460@gmail.com"

server = smtplib.SMTP("smtp.gmail.com", 587)
server.starttls()
server.login(EMAIL, PASSWORD)

subject = "Test Email (Safe Check)"
body = "This is a safe test email from GitHub Actions setup."

msg = f"Subject: {subject}\n\n{body}"

server.sendmail(EMAIL, TO_EMAIL, msg)
server.quit()

print("Email sent successfully")
