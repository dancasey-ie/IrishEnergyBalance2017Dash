Interactive Front-End Project: Irish Energy Balance 2019 Dashboard
=========================================================
This is the Milestone Project for the Interactive Front-End module for the Code Institutes Diploma in Software Development.
The project displays clear understanding and capabilities in developing an interactive dashboard built using JavaScript utitising dc.js dimensional charting library.

The dashboard gives visualisation to the key data from the SEAI's Ireland's Energy Balance 2017 report released in December 2018.

The data was downloaded as an Excel spreadsheet. All irrelevent data including in spreadsheet calculations were removed before saving the file as a .csv file. 
After some time trying to get the data I wanted to show apprietly using the .csv format, I switched to a json. 
First convereting the csv file to json using an online tool and then using a python script to organise and group the data more effieciently.
This python script could probably be written in JS and once all is up and running will replace the python script with JS as this project is focused on JS.

Technologies Used
-----------------------
* __JavaScript__ was used for interactive frontend development.
* __D3.js__ (https://d3js.org/) was used to develop graphical visualizations of the data.
* __DC.js__ (https://dc-js.github.io/dc.js/) was to give interactive attributes to D3 charts.
* __VisualStudios2017__ (https://visualstudio.microsoft.com/downloads/) IDE was used in the development of the project.
* __VirtualEnvironment__ (https://docs.python.org/3/library/venv.html) was used to wrap the project.
* __Git__ (https://git-scm.com/) was used for version control.
* __GitHub__ (https://github.com/) was used to share the repository.
* __Python3.6__ (https://docs.python.org/3/) was used to develop all back-end code.
* __HTML5__ (https://www.w3.org/TR/html5/) was used to develop front-end templates.
* __CSS__ (https://www.w3.org/Style/CSS/) was used for styling of front-end templates.
* __Bootstrap 3.3.7__ (https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css) was used for more effective CSS layout styling.
    - __Bootstrap Grid__ system was used for content arrangement and responsive behavior when moving between different screen sizes
    - __Bootstrap Navbar__ was used for the main navigation. Collapsible menu was utilized for lower screen resolutions.
    - __Bootstrap Forms Controls__ were used for the user actions.
* __Font-Awesome 5.3.1__ (https://use.fontawesome.com/releases/v5.3.1/css/all.css) was for the icons in the header, footer and quiz template.
* __FluidUI__ (https://www.fluidui.com) was used to develop wireframes for the initial UI design mockups.
* __json__ (http://www.json.org/) was used to store and access non-database data.
* __CSVJSON__ (https://www.csvjson.com/csv2json) was used to convert CSV formatted data to json.
* __Firefox Developer Edition__ (https://www.mozilla.org/en-US/firefox/developer/) was used for debugging of the running app.


UX
----



__User Stories__


Features and Process
-----------------

__Existing Features__



Testing
-----------------------

__Code Validation__

* __HTML__ was validated using https://validator.w3.org/. Due to the python code embedded in the HTML templates there were a number of errors.
* __CSS__ was validated using https://jigsaw.w3.org/css-validator/. No errors were found.
* __Spelling and Grammar__ was validated using Google Docs.


__Visual Testing__

The dev tool within Firefox Development Edition was used to test that the pages were displaying correctly (alignment, spacing, position etc.) across different screen widths.


__Manual Testing__


__Known Bugs__



Development
------------------------
The project was developed using Visual Studios 2017. Even though this project is primarily a JavaScript HTML project, a virtual envirnment wrapper was still utilised for project.
There are a number of folders included in the wrapper associated with the virtual envirenment not required by the project that should not be included in the git repository. 
A .gitignore file was included so these files would not be commited.

Deployment
------------------------

__Hosting__

IP: 0.0.0.0  
Port: 5000

__Requirements__


__Deployed vs Development__

Running App
------------------------

https://irish-energy-assets.herokuapp.com/

