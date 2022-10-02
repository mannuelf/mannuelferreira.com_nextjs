---
title: 'FactBook Explorer'
excerpt: 'Factbook Explorer is a web app designed to help navigate statistics from the OECD iLibrary'
coverImage: 'https://res.cloudinary.com/mannuel/image/upload/v1664734063/mfcom/factbook-explorer.png'
date: '2022-10-04T07:18:00.322Z'
author:
  name: M Ferreira
  picture: 'https://res.cloudinary.com/mannuel/image/upload/f_auto/v1604067445/images/mee.jpg'
ogImage:
  url: 'https://res.cloudinary.com/mannuel/image/upload/v1664734063/mfcom/factbook-explorer.png'
---

Facbook Explorer is a web app designed to make navigating statistics data made available from the OECD iLibrary in a user friendly way. 

You can expect to find data for Population levels and Gross GDP statistics for each country broken down by year. 
## Frontend

> [Click here](https://factbookexplorers.netlify.app) for demo
- Click on country labels to see the country data.
- The API is hosted on a free plan on heroku, so expect a small delay on data fetch.

![FactbookExplorers](https://res.cloudinary.com/mannuel/image/upload/v1664734063/mfcom/factbook-explorer.png)

## Architecture

![architecture-diagram](https://res.cloudinary.com/mannuel/image/upload/v1664738017/mfcom/factbook-explorer-diagram.png)

- get data in spreadsheet format from www.oecd.com
- flask server cleans spreadsheet data using python pandas library
- flask and sqlite 3 creates a relational table for each given data set
    - population levels growth
    - gross gdp
- flask creates and exposes JSON endpoints for each given data set
- frontend renders a map using MapBox
- frontend fetches data from JSON endpoint on click 
- frontend renders a table 

The project was completed as part of a submission to the Bachelor in Data Science I  was studying towards at Noroff University. 

It was a group collaboration and you may see all commits and documentation here on [github](https://github.com/mannuelf/nuc-studio-1-project-frontend) and the backend [here](https://github.com/mannuelf/nuc-studio-1-project-backend).


[Read Frontend](https://github.com/mannuelf/nuc-studio-1-project-frontend) code here.

[Read Backend](https://github.com/mannuelf/nuc-studio-1-project-backend) code here.
