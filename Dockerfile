FROM node:6.11.4
EXPOSE 8080
COPY example.js .
CMD node example.js
