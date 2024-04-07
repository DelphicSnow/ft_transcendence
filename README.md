# ft_transcendence

We have to copy the static files to our specified directory at settings.py, here’s how we’ll do it,

docker-compose exec web python manage.py collectstatic --no-input

ultimate cleaner, be careful!
docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker volume prune -f && docker network prune -f && docker image prune -af
