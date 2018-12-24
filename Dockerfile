FROM node:6.11.4
EXPOSE 8000
COPY host_status.js .
CMD ["node", "host_status.js"]
