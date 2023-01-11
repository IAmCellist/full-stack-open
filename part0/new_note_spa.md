```mermaid
  sequenceDiagram
    participant browser
    participant server
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server->>browser: status 201
    
    Note over browser: browser executes js-code to send the form data

  
```
