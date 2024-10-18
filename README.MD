# pdfjs-node-app

This is very basic app that uses _pdfjs-dist_ to parse a PDF and return the text.

## Getting Started

### Installation steps

1. Clone the repo

```bash
git clone https://github.com/andvirga/pdfjs-node-app
```

2. Install the dependencies

```bash
cd pdfjs-node-app

npm install
# or
yarn install
```

3. Run project

```bash
npm run dev
# or
yarn dev
```

### Running steps

1. Copy a document into `/samples` folder
2. Execute the following CURL command:

```bash
curl --location 'localhost:8848/pdf' \
--header 'Content-Type: application/json' \
--data '{
    "file": "samples/file.pdf"
}'
```
