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
* __DC.js v.2.1.8__ (https://dc-js.github.io/dc.js/) was the JavaScript charting library used.
* __D3.js v.3__ (https://d3js.org/) is the data processing library used by DC.js.
. __crossfilter__ (https://github.com/crossfilter/crossfilter) is used by D3.js to filter data across a data set.
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

* As a user I should have a clear understandinig of what the dashboard is showing me straight away.
* As a user I should be able to see all charts in one view while using a desktop.
* As a user I should be able to see all charts on my mobile, scrolling between each chart but not haveing to zoom.
* As a user I should see clear seperation of data groups.
* As a user I should continuation of styles and colors across the charts, using common colours for common data.
* As a user I should be given information on the source of the data.
* As a user I should be given information on the technologies used in developing the charts.
* As a user I should be given information on how to best use the charts.
* As a user I should be given information on the developer, their background and autority on the subject matter.
* As a user I should be able to filter data across charts to explore the data more efficently.
* As a user I should be able to reset all filters whithout having to reload the page.
* As a user I should be able to access further details on the data by hovering over the data groups on the charts.

Features
--------

__Existing Features__

__Features to Develop__


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
* Transformation charts section padding not the same as rest of sections, presume its due to the number of bootstrap grid classes used
* Transformation bar charts does not fit into div on xs screen
* Transformation bar charts labels not aligned properly in smaller screens.
* Nav bar hover should change color
* Nav collapsed should pull right
* Pie chart slices should be labeled
* Crossfilter across data sets not working properly
* 


Development
------------------------
The project was developed using Visual Studios 2017. Even though this project is primarily a JavaScript HTML project, a virtual envirnment wrapper was still utilised for project.
There are a number of folders included in the wrapper associated with the virtual envirenment not required by the project that should not be included in the git repository. 
A .gitignore file was included so these files would not be commited.

A wireframe was devloped outlining that I wanted row charts, bar charts, pie charts and back to back row charts and their arrangments on the screen.

The energy balance data I downloaded from the SEAI site was in .xlsx format. I converted this to .csv and began trying to work with the data. Since a lot of the columns where calculated 
totals of other columns and some rows were calculated totals of other rows, working with .csv was proving difficult to extract useful groupings. The data was converted to .json using an
online converting tool and a Python script was developed to seperate out categories allowing for more managibal data extraction.

The first charts developed read the data from one .json file and used functions to chooce the data to display in the different charts. The crossfilter was not working correctly and a number of the D3
calculations were in correct. The Python script was updated to seperate out the .json file into a number of seperate files, thus seperate crossfilteres.

Since the fuels and consumers were seperated into sub-groups I wanted to develop sunburst style pie charts to breakdown these sub-groups. Dc.js v.5 has the sunburst style charts built in but I had been using DC.js v.2.  
Time was spent trying to migrate to Dc.js v.5, but it required migrating to D3 v.3, this was proving more work than was benificial and decided to stay with dc.js v.2 and develop custom sunburst charts with the inner and outer 
charts filtering seperatly so that a sub-group specifics could be explored in more detail once selected.

For the transformation Input/ Output chart I first used back to back rowCharts from the DC.js, but as the rowCharts are self sorting the input and output row groupings did not line up approprietly.
As an alternative I developed two seperate bar charts using domain(...) to set my desired arrangment and using .css rotated the charts 90deg and -90deg and positioned them back to back.

As fuels were common across all charts and data sets I wanted to standardise the colors across the charts. Using the same colors used on the SEAI website, extracting them using Mozila Eyedropper tool,
I developed color scales. The hex value for the base color for a grouping was put into a color selector tool and the next 10 lighter shades of that color were added to the color scale list. 
A script was writen that set the colors of the outer rings of the sunburst charts based on there parent group.

The charts were re-arranged and re-sized a number of times so that all charts fit nicely into a laptop screen, for efficient data comparison, without loosing effect in mobile screens.

Modals were included accessed from the navbar to give context to the charts data, explain how to use the interactive functionality and give a background to my own interests in the data and technologies.

A reset button was also added to the navbar to reset the charts after they have been filtered.

A welcome modal was developed to introduce the user to the charts when the page first loaded. This was added to remove confusion for the user. 

Deployment
------------------------

The dashboard is hosted on GitHub Pages https://pages.github.com/ and can be accessed at https://dcasey720.github.io/IrishEnergyBalance2017Dash/.
