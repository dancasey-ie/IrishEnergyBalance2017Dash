Irish Energy Balance 2017 Dashboard
=========================================================
This is the Milestone Project for the Interactive Front-End module for the Code Institutes Diploma in Software Development.
The project displays clear understanding and capabilities in developing an interactive dashboard built using JavaScript utilizing dc.js dimensional charting library.

The dashboard gives visualization to the key data from [SEAI's'](https://www.seai.ie) [Ireland Energy 2018](https://www.seai.ie/resources/publications/Energy-in-Ireland-2018.pdf) report released in December 2018.

Technologies Used
-----------------------
* __[JavaScript](https://www.javascript.com/)__ was used for interactive frontend development.
* __[jQuery.js](https://jquery.com/)__ was used for simplified HTML manipulation.
* __[DC.js v.2.1.8](https://dc-js.github.io/dc.js/)__ was the JavaScript charting library used.
* __[D3.js v.3](https://d3js.org/)__ is the data processing library used by DC.js.
* __[crossfilter.js](https://github.com/crossfilter/crossfilter)__ is used by D3.js to filter data across a data set.
* __[VisualStudios2017](https://visualstudio.microsoft.com/downloads/)__ IDE was used in the development of the project.
* __[VirtualEnvironment](https://docs.python.org/3/library/venv.html)__ was used to wrap the project.
* __[Git](https://git-scm.com/)__ was used for version control.
* __[GitHub](https://github.com/)__ was used to share the repository.
* __[Python3.6](https://docs.python.org/3/)__ was used for regrouping the data.
* __[HTML5](https://www.w3.org/TR/html5/)__ was used to develop front-end templates.
* __[CSS](https://www.w3.org/Style/CSS/)__ was used for styling of front-end templates.
* __[Bootstrap 3.3.7](https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css)__ was used for more effective CSS layout styling.
* __[FluidUI](https://www.fluidui.com)__ was used to develop wireframes for the initial UI design mockups.
* __[CSVJSON](https://www.csvjson.com/csv2json)__ was used to convert CSV formatted data to json.
* __[Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)__ was used for debugging of the running app.


UX
----
The dashboard was designed to be a tool for the public and academics to explore Ireland Energy Balance in easy to use visualizations.

__User Stories__

* As a user I should have a clear understanding of what the dashboard is showing me straight away.
* As a user I should be able to see all charts in one view while using a desktop.
* As a user I should be able to see all charts on my mobile, scrolling between each chart but not having to zoom.
* As a user I should see clear separation of data groups.
* As a user I should continuation of styles and colors across the charts, using common colors for common data.
* As a user I should be given information on the source of the data.
* As a user I should be given information on the technologies used in developing the charts.
* As a user I should be given information on how to best use the charts.
* As a user I should be given information on the developer, their background and authority on the subject matter.
* As a user I should be able to filter data across charts to explore the data more efficiently.
* As a user I should be able to reset all filters without having to reload the page.
* As a user I should be able to access further details on the data by hovering over the data groups on the charts.


Features
--------

__Existing Features__

* Welcome pop up on first load, explaining to the user the source of the data and how to use the interactive functionality.
* Final Energy Consumption by Fuel Type row chart, color coded and self-sorting.
* Final Energy Consumption by Fuel custom sunburst chart, to explore the breakdown of fuels in the fuel types, including legend. Color coding of fuels in fuel types related.
* Final Energy Consumption by Consumer Type bar chart, stacked by fuel type, commonly color coded.
* Final Energy Consumption by Consumer custom sunburst chart, to explore the breakdown of consumers in the consumer types, including legend. Color coding of consumers in consumer types related.
* Primary Energy Requirements by Source bar chart, stacked fueled types, commonly color coded.
* Primary Energy Requirements by Fuel custom sunburst chart, to explore the breakdown of fuels in the fuel types, including legend. Color coding of fuels in fuel types related.
* Transformation Input-Output bar chart, stacked fuel types, commonly colored. 
* Transformation Input by fuel donut chart, commonly colored.
* Transformation Output by fuel donut chart, commonly colored.
* How to Use popup, explaining how to use the interactive functions, accessible from the nav menu.
* About the Charts popup, explaining the source of the data and the technologies used in the development, accessible from the nav menu.
* About the Developer popup, giving a background to the developers experience, technology interests and contact details.
* Charts are filterable per data set.
* Additional information on a data group displayed on mouse hover.
* Resetting of chart filters resettable from nav-menu button.
* Tool tip gives details of the chart groups when hovered with the mouse.


__Features to Develop__
* Develop the same charts but with using fuel CO2 emmission data to show the share of emmissions realeased per consumer and fuel.
* Incorperate historic data the visualise Ireland energy transision over the years.
* Include a data analysis sectio, giving the user a text description of what the data shows. i.e. if you combine 'Residential' and 'Road Private Cars', this makes up 40% of 
Irelands energy consumption, so each of us as individuals have a strong part to play in a more sustainible future.


Testing
-----------------------

__Code Validation__

* __HTML__ was validated using https://validator.w3.org/.
* __JavaScript__ (charts.js) was validated using https://codebeautify.org/jsvalidate. There are a number of errors due to functions being called from other called .js files.
* __Python__ was validated using https:http://pep8online.com.
* __CSS__ was validated using https://jigsaw.w3.org/css-validator/. No errors were found.
* __Spelling and Grammar__ was validated using Google Docs.


__Visual Testing__

The dev tool within Firefox Development Edition was used to test that the pages were displaying correctly (alignment, spacing, position etc.) across different screen widths.

|                                                     | Galaxy S5 | Pixel 2 | Pixel 2XL | iPhone 5/SE |	iPhone 6/7/8 | iPhone 6/7/8 + | iPhone X | iPad  | iPad Pro   | Responsive 1366 x 768 | Responsive 1680 x 1050 |  
| --------------------------------------------------- | --------- | ------- | --------- | ----------- | -------------- | -------------- | -------- | ------| ---------- | --------------------- | ---------------------- |
| Welcome Pop Up                                      | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Nav-menu                                            | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Footer                                              | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| How to Use Pop Up                                   | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| About Charts Pop Up                                 | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| About Developer Pop Up                              | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Final Energy Consumption by Fuel Type Row Chart     | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     |                 
| Final Energy Consumption by Fuel Sunburst Chart     | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Final Energy Consumption by Consumer Type Row Chart | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Final Energy Consumption by Consumer Sunburst Chart | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Primary Energy Requirement by Fuel Type Row Chart   | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Primary Energy Requirement by Fuel Sunburst Chart   | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Transformation Bar charts                            | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Transformation Input Donut Chart                    | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 
| Transformation Output Donut Chart                   | OK        | OK      | OK        | OK          | OK             | OK             | OK       | OK    | OK         | OK                    | OK                     | 


__Manual Testing__

The charts were filtered and the values compared against the calculations on the original excel document.

__Known Bugs__
* Tranformation bar chart labels are not centered above chart.
* Filtering the consumption charts for oil, the consumer breakdown outer should be all shade of purple, but there are a few yellow slices.
* Still items in legend with 0 value even with script correcting most of them.




Development
------------------------
The project was developed using Visual Studios 2017. Even though this project is primarily a JavaScript HTML project, a virtual environment wrapper was still utilized for project.
There are a number of folders included in the wrapper associated with the virtual environment not required by the project that should not be included in the git repository. 
A .gitignore file was included so these files would not be committed.

A wireframe was developed, using FluidUI, outlining that I wanted row charts, bar charts, pie charts and back to back row charts and their arrangements on the screen. Wireframe can be found [here](https://github.com/dcasey720/IrishEnergyBalance2017Dash/blob/master/dev_folder/wireframes/wireframe.JPG)

The energy balance data I downloaded from the SEAI site was in .xlsx format ([Energy-Balance-2017.xlsx](https://github.com/dcasey720/IrishEnergyBalance2017Dash/blob/master/dev_folder/data/Energy-Balance-2017.xlsx).
I converted this to .csv and began trying to work with the data. Since a lot of the columns where calculated 
totals of other columns and some rows were calculated totals of other rows, working with .csv was proving difficult to extract useful groupings. The data was converted to .json using an
online converting tool and a Python  script was developed to separate out categories allowing for more manageable data extraction.

The first charts developed read the data from one .json file and used functions to choose the data to display in the different charts. The cross filter was not working correctly and a number of the D3
calculations were in correct. The Python script ([restruct_json.py](https://github.com/dcasey720/IrishEnergyBalance2017Dash/blob/master/dev_folder/data/restruct_json.py) was updated to separate out the .json file into a number of separate files, thus separate cross filter.

Since the fuels and consumers were separated into sub-groups I wanted to develop sunburst style pie charts to breakdown these sub-groups. Dc.js v.5 has the sunburst style charts built in but I had been using DC.js v.2.  
Time was spent trying to migrate to Dc.js v.5, but it required migrating to D3 v.3, this was proving more work than was beneficial and decided to stay with dc.js v.2 and develop custom sunburst charts with the inner and outer 
charts filtering separately so that a sub-group specifics could be explored in more detail once selected.

For the transformation Input/ Output chart I first used back to back row Charts from the DC.js, but as the row Charts are self-sorting the input and output row groupings did not line up appropriately.
As an alternative I developed two separate bar charts using domain(...) to set my desired arrangement and using .css rotated the charts 90deg and -90deg and positioned them back to back. I positioned labels over the charts 
in a seperate div in the html. I was unable to center the labels effectivily on these charts.

As fuels were common across all charts and data sets I wanted to standardize the colors across the charts. Using the same colors used on the SEAI website, extracting them using Mozila Eyedropper tool,
I developed color scales. The hex value for the base color for a grouping was put into a color selector tool and the next 10 lighter shades of that color were added to the color scale list. 
A script was written that set the colors of the outer rings of the sunburst charts based on their parent group.

The charts were re-arranged and re-sized a number of times so that all charts fit nicely into a laptop screen, for efficient data comparison, without losing effect in mobile screens.

Modals were included accessed from the navbar to give context to the charts data, explain how to use the interactive functionality and give a background to my own interests in the data and technologies.

A reset button was also added to the navbar to reset the charts after they have been filtered.

A welcome modal was developed to introduce the user to the charts when the page first loaded. This was added to remove confusion for the user. 

Deployment
------------------------

The dashboard is hosted on [GitHub Pages] (https://pages.github.com/) and can be accessed at https://dcasey720.github.io/IrishEnergyBalance2017Dash/.
