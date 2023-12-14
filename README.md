# Flurry

[![View it live](https://img.shields.io/badge/Live-flurry.zyrrus.dev-81A1C1)](https://flurry.zyrrus.dev/)

A Duolingo alternative for language learners who seek a more personalized and efficient journey to fluency.

Built with [`create-t3-app`](https://create.t3.gg/).

## Development guide

### Clerk + Webhooks

1. Start the dev server with `npm run dev`
2. Request a tunnel with `npx lt --port 3000`
3. Copy the link from that command
4. Go to Clerk Dashboard > Webhooks > [end point]
5. Edit the endpoint URL to use the copied link + `/api/webhooks/your-route-name`
