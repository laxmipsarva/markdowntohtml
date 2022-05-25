# Markdown to HTML

# Install

## Clone Repository

```
git clone https://github.com/laxmipsarva/markdowntohtml.git

```

```
npm install
```
# Start Server

```
npm start
```

# Implementation

Make a REST api call to http://localhost:4000 with content type as plan text and mardown as body to get output in html format

### example

```
curl --location --request POST 'http://localhost:4000' \
--header 'Content-Type: text/plain' \
--data-raw '# Header one

Hello there

How are you?
What'\''s going on?
...

## Another Header

This is a paragraph [with an inline link](http://google.com). Neat, eh?

## This is a header [with a link](http://yahoo.com)
```
