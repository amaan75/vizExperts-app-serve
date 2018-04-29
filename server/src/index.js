import http from "http";
import express from "express";
import { version } from "../package.json";
import { basics } from "./data/data.json";
import pdf from "html-pdf";
import fs from "fs";
import path from "path";

const PORT = 3000;
const app = express();
app.server = http.createServer(app);

app.get(`/api`, (req, res) => {
  res.json({
    version: version
  });
});

app.get(`/api/all_connection`, (req, res) => {
  createPdfTemplate();
  res.json({
    body: "success"
  });
});

function createPdfTemplate() {
  const result =`
  <html>

  <head>
      <meta charset="utf8">
      <title>Resume</title>
      <style>
          html,
          body {
              margin: 12px;
              padding: 0;
              font-family: 'Sackers Gothic Std';
              font-weight: 500;
              font-size: 12px;
              background: rgb(241, 241, 241);
              -webkit-print-color-adjust: exact;
              box-sizing: border-box;
  
          }
  
          .name {
              font-size: 28px;
              color: darkblue;
          }
  
          .email {
              color: blue;
          }
  
          .sub-heading {
              color: lightseagreen;
              font-size: 20px;
          }
  
          .page {
              position: relative;
              width: 8.27in;
              height: 11.69in;
              display: block;
              margin: 50px;
              overflow: hidden;
          }
  
          @media print {
              body {}
              .page {
                  margin: 0;
                  height: 100%;
                  width: 100%;
              }
          }
  
          .bottom {
              position: absolute;
              left: 5mm;
              right: 5mm;
          }
  
          .group {
              margin-top: 3mm;
          }
  
          .line {
              position: relative;
          }
  
          .center {
              text-align: center;
          }
  
          table {
              width: 100%;
              text-align: center;
          }
  
          thead {
              display: table-header-group;
          }
  
          #customers {
              font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
              border-collapse: collapse;
              width: 100%;
          }
  
          #customers td,
          #customers th {
              border: 1px solid #ddd;
              padding: 8px;
          }
  
  
          #customers th {
              padding-top: 12px;
              padding-bottom: 12px;
              text-align: left;
              background-color: lightseagreen;
              color: white;
          }
      </style>
  </head>
  
  <body>
      <div class="page">
          <div class="top">
              <div class="center">
                  <div class="line name"><b>${basics.name.toUpperCase()}</b></div>
                  <div class="line">${basics.location.address}</div>
                  <div class="line">${basics.location.city}, ${basics.location.region}, ${basics.location.postalCode}</div>
                  <div class="line">${basics.phone}</div>
                  <div class="line email">
                      <u>${basics.email}</u>
                  </div>
                  <br/>
                  <div class="line">
                      <i>${basics.objective}</i>
                  </div>
              </div>
  
              <div class="group">
                  <div class="sub-heading">
                      <b>EDUCATION</b>
                  </div>
                  <table id="customers">
                      <thead>
                          <tr>
                              <th>Course</th>
                              <th>University</th>
                              <th>Year of Passing</th>
                              <th>Percentage</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>${basics.masterDegree}</td>
                              <td>${basics.masterUniversity}</td>
                              <td>${basics.masterYear}</td>
                              <td>${basics.masterMarks}</td>
                          </tr>
                          <tr>
                              <td>${basics.bachelorDegree}</td>
                              <td>${basics.bachelorUniversity}</td>
                              <td>${basics.bachelorYear}</td>
                              <td>${basics.bachelorMarks}</td>
                          </tr>
                          <tr>
                              <td>${basics.highSchoolDegree}</td>
                              <td>${basics.highSchoolUniversity}</td>
                              <td>${basics.highSchoolYear}</td>
                              <td>${basics.highSchoolMarks}</td>
                          </tr>
  
  
                      </tbody>
                  </table>
              </div>
              <div class="group">
                  <div class="line">p: +41 00 000 00 00</div>
                  <div class="line">github: marcbachmann</div>
              </div>
              <div class="group">
                  <div class="line">suitart ag</div>
                  <div class="line">räffelstrasse 25</div>
                  <div class="line">8045 zürich</div>
              </div>
          </div>
      </div>
  
      </div>
  </body>
  
  </html>
  `;
  const template = fs.readFileSync(__dirname+'/html/random.html','utf8');

  // fs.writeFile('./html/pdf.html', result, (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });
  const options = { format: "A4" };

  pdf
    .create(result, options)
    .toFile("./src/html/resume.pdf", function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}
//check the number of people in server every 3 seconds and print their ids

app.server.listen(process.env.PORT || PORT, () => {
  console.log(`App is running on port ${app.server.address().port}`);
});

export default app;
