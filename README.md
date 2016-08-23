# angular-material-event-calendar
A calendar module that is based on material design concepts.
The calendar module was built to run as a standalone component, and alongside of ngMaterial. If you use this component with ngMaterial then it will use the themes you have setup and use the $$dateLocal settings to display and format the dates.

<div style="border: 1px solid #ccc">
  <img src="https://cloud.githubusercontent.com/assets/11681147/17900926/e7068cb8-6926-11e6-88f1-d62279b94df4.png" alt="Angular Material calendar" style="display:block;">
</div>
<br />


Quick Links:
* [Installation](#installaton)
* [Building](#building)
* [Run Tests](#tests)
* [Usage](#usage)
* [Documentation](#documentation)
* [FAQ](#faq)



## <a name="installation"></a> Installation

#### Bower

Change to your project's root directory.

```bash
# To install latest
bower install angular-material-event-calendar

# To install latest and update bower.json
bower install angular-material-event-calendar --save
```


#### Npm

Change to your project's root directory.

```bash
# To install latest
npm install angular-material-event-calendar

# To install latest and update package.json
npm install angular-material-event-calendar --save
```


#### setup

install modules

```bash
# install npm modules
npm install

# install bower components
bower install
```

Include the `material.components.eventCalendar` module as a dependency in your application.

```javascript
// with ngMaterial
angular.module('myApp', ['ngMaterial', 'material.components.eventCalendar']);

// without ngMaterial
angular.module('myApp', ['material.components.eventCalendar']);
```




## <a name="building"></a> Building

You can easily build using gulp.

The built files will be created in the `dist` folder

Run the **gulp** tasks:

```bash
# To run locally. This will kick of the watch process
# navigate to `localhost:8080`
gulp

# To build the js and css files to the `/build` directory
gulp build
```


## <a name="tests"></a> Run Tests

Test using Karma
Run the **gulp** tasks:

```bash
gulp test
```




## <a name="usage"></a> Usage

**Example**

```html
<md-event-calendar
  ng-model="selected"
  md-events="events"
  md-event-click="eventClicked($selectedEvent)"
  md-label="title"
>
</md-event-calendar>
```




## <a name="documentation"></a> Documentation

To add Expansion Panels to you angular-material project, include the `material.components.expansionPanels` module as a dependency in your application.

```javascript
angular.module('myApp', ['ngMaterial', 'material.components.expansionPanels']);
```


#### Directive

```
<md-event-calendar
  [ng-model=""]
  [md-events=""]
  [md-event-click=""]
  [md-label=""]>
...
</md-event-calendar>
```

#### Attributes

| Param | Type | Details |
| :--: | :--: | :--: |
| ng-model | model= | <p>Optional model to hold selected event object</p>  |
| md-events | array | <p>Array of events</p>  |
| md-event-click | function | <p>Function to be called on event click. You can pass in <code>$selectedEvent</code> to get the event object you clicked on</p>  |
| md-label | string=title | <p>Property name for title display</p>  |




#### Event Object

```javascript
{
  title: 'Event Title',
  start: new Date(),
  end: new Date(),
  allDay: false
}
```

#### Attributes

| Param | Type | Details |
| :--: | :--: | :--: |
| title | string | <p>Event Tile</p>  |
| start | date/iso | <p>Start date</p>  |
| end | date/iso= | <p>Optional end date</p>  |
| allDay | boolean | <p>If set to true, no time will be displayed on event</p>  |






## <a name="faq"></a> FAQ

#### Do i need to use ngMaterial?
No, but you will not get the lovely theme colors.


#### Where is my week/day views?
On their way, this component is under active development.

#### Will this support mobile?
Mobile is in the roadmap and will be released in future versions.
