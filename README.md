# EdNotes

EdNotes allows students to take notes synced with lecture video timestamps. When it is time for review, students can "play back" their notes while their lecture video plays. Students can always keep reviewing their notes

• Simplified studying with automatic note “playback” that aligns with the lecture video for seamless review
• Integrated video storage with annotations, eliminating the need to switch between third-party services like Google Drive.

[Live Demo](https://ednotes.griffinht.com)

I want to add some kind of AI feature

ask chatgpt
- what do i need to study for the test
- make kani cards (those memory quizlet card things)
- make a quizlet for my friends and I
- what are the core themes of the lecture
- what is the main idea of lecture 5


## Development

### Live

```
docker compose up
```
http://localhost:8080

### Build

Build scratch image with static files in `/ednotes`.
```
docker build --tag stzups/ednotes:latest .
```

## Production

Example `Dockerfile` which uses an `nginx` server to serve the static files via HTTP in `/ednotes`.
```
FROM nginx

COPY --from=stzups/ednotes /ednotes /usr/share/nginx/html 
```

## Usage

### Keyboard shortcuts
Open: `Enter`

Close: `Escape`

Add: `/`

Remove: `Delete`

Remove without confirmation: `Shift` + `Delete`
