import http from "http";
import express from "express";
import { version } from "../package.json";
import pdf from "html-pdf";
import fs from "fs";
import path from "path";

const PORT = 3000;
const app = express();
var file = null;
app.server = http.createServer(app);

app.get(`/api`, (req, res) => {
  res.json({
    version: version
  });
});

app.get(`/api/fetch/:id`, (req, res) => {
  const id = req.params.id;
  const temp = fs.readFileSync(__dirname + `/data/${id}.json`);
  
  file = JSON.parse(temp);
  console.log(`request recieved ${file.basics.name}`);
  // createPdfTemplate();
  res.json(file);
  //const template = fs.readFileSync(__dirname + "/html/random.html", "utf8")
});

app.get(`/api/all_connection`, (req, res) => {
  createPdfTemplate();
  res.json({
    body: "success"
  });
});

function createPdfTemplate() {
  const result = `
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
            height: 9.69in;
            display: block;
            margin: 50px;
            overflow: hidden;
        }

        @media print {

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

        .declaration-signature {
            text-align: right;
        }

        table {
            width: 100%;
            text-align: center;
        }

        thead {
            display: table-header-group;
        }

        .skill-item {
            text-transform: capitalize;
        }


        #education-table {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #education-table td,
        #education-table th {
            border: 1px solid #ddd;
            padding: 8px;
        }


        #education-table th {
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
                <div class="line name">
                    <b>${file.basics.name.toUpperCase()}</b>
                </div>
                <div class="line">${file.basics.location.address}</div>
                <div class="line">${file.basics.location.city}, ${
    file.basics.location.region
  }, ${file.basics.location.postalCode}</div>
                <div class="line">${file.basics.phone}</div>
                <div class="line email">
                    <u>${file.basics.email}</u>
                </div>
                <br/>
                <div class="line">
                    <i>${file.basics.objective}</i>
                </div>
            </div>

            <div class="group">
                <div class="sub-heading">
                    <b>EDUCATION</b>
                </div>
                <br/>
                <table id="education-table">
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
                            <td>${file.basics.masterDegree}</td>
                            <td>${file.basics.masterUniversity}</td>
                            <td>${file.basics.masterYear}</td>
                            <td>${file.basics.masterMarks}%</td>
                        </tr>
                        <tr>
                            <td>${file.basics.bachelorDegree}</td>
                            <td>${file.basics.bachelorUniversity}</td>
                            <td>${file.basics.bachelorYear}</td>
                            <td>${file.basics.bachelorMarks}%</td>
                        </tr>
                        <tr>
                            <td>${file.basics.highSchoolDegree}</td>
                            <td>${file.basics.highSchoolUniversity}</td>
                            <td>${file.basics.highSchoolYear}</td>
                            <td>${file.basics.highSchoolMarks}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <div class="group">
                <div class="sub-heading">
                    <b>SKILLS</b>
                </div>
                <ul>
                    ${getSkills(file.basics.skills)}
                </ul>
            </div>
            <br/>
            <div class="group">
                <div class="sub-heading">
                    <b>DECLARATION</b>
                </div>
                <div class="line">I here by declare that the information furnished above is true to the best of my knowledge.

                </div>
                <br/>
                <div class="declaration-signature">(${file.basics.name})</div>

            </div>
        </div>
    </div>


</body>

</html>
  `;
  //const template = fs.readFileSync(__dirname + "/html/random.html", "utf8");

  // fs.writeFile('./html/pdf.html', result, (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });
  const options = {
    height: "9.69in", // allowed units: mm, cm, in, px
    width: "8.27in"
  };

  pdf
    .create(result, options)
    .toFile("./src/html/resume.pdf", function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}

function getSkills(skillArray) {
  if (skillArray.legth) {
    return "Sadly The Person has No Skills";
  }
  var res = "";
  skillArray.forEach(element => {
    res = res + `<span class="line skill-item"><li>${element}</li></span>`;
  });

  //console.log(res);
  return res;
}

app.server.listen(process.env.PORT || PORT, () => {
  console.log(`App is running on port ${app.server.address().port}`);
});

export default app;
