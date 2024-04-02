#!/bin/sh

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Start Gunicorn server
echo "Starting Gunicorn server..."
exec gunicorn app.wsgi:application --bind 0.0.0.0:8000