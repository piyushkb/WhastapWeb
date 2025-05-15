### Headless Multi Session Whatsapp Gateway NodeJS

Easy Setup Headless Multi Session Whatsapp Gateway With NodeJs

- Support Multi device
- Support Multi Session / Multi Phone Number
- Send Text Message
- Send Image
- Send Document

### Install and Running

### 1. Clone The Project

```bash
  git clone https://github.com/xshmrz/app-WaApi.git
```

### 2. Go To The Project Directory

```bash
  cd app-WaApi
```

### 3. Install Dependencies

```bash
  npm install
```

### 4. Start The Server

```bash
  npm run start
```

 

http://localHost:5001/message/send-image  

{
    "session": "DEMO1",
    "to": "91xxxxxxxx",
    "message": "Hello! This is a text message.",
     "image": "https://filesamples.com/samples/image/jpeg/sample_640%C3%97426.jpeg"
}


http://localHost:5001/message/send-document

{
    "session": "DEMO1",
    "to": "91xxxxxxxx",
    "message": "Hello! This is a text message.",
    "document": "https://pdfobject.com/pdf/sample.pdf",
    "document_name": "PDF"
}

http://localHost:5001/message/send-text

{ "session": "mysessionid", "to": "6281234567890", "message": "Hello! This is a text message." }



or start session http://localHost:5001/session/start?session=DEMO1

for logout - (Same as previos) http://localHost:5001/session/logout?session=DEMO1 


for check is The Qr code scanned or not . ->.  basicaly to show connected or not connected text - >.  http://localHost:5001/session/get-session?session=DEMO1


here use isScanned key
