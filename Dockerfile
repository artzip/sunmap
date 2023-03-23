FROM node:14-alpine as react-build
ARG WEATHER_API_KEY
ARG GOOGLE_API_KEY
WORKDIR /app
COPY . ./
ENV REACT_APP_WEATHER_API_KEY=$WEATHER_API_KEY
ENV REACT_APP_GOOGLE_API_KEY=$GOOGLE_API_KEY
RUN npm ci
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]