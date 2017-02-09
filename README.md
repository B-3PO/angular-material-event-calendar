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
* [Colors](#colors)
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
  md-label="title",
  md-show-create-link="true"
  md-create-event-click="eventCreatea($date)"
  md-create-disabled="true"
  auto-height=""
  class="md-primary"
>
  <md-event-calendar-header class="md-center">
    <md-event-calendar-prev></md-event-calendar-prev>
    <md-event-calendar-title></md-event-calendar-title>
    <md-event-calendar-next></md-event-calendar-next>
  </md-event-calendar-header>
</md-event-calendar>
```



## <a name="colors"></a> Colors

**With Angular Material**

If you want to have the header and selected elements use the primary color for their backgrounds the just add the `md-primary` class
```html
<md-event-calendar
  class="md-primary"
>
</md-event-calendar>
```


**Without Angular Material**

If you want to change the header and selected event background colors you add this [scss](https://github.com/B-3PO/angular-material-event-calendar/blob/master/app/eventCalendar-primary.scss) file after the `angular-material-event-calendar.css` file

Primary Color scss: [Click Here](https://github.com/B-3PO/angular-material-event-calendar/blob/master/app/eventCalendar-primary.scss)


## <a name="documentation"></a> Documentation

To add eventCalendar to you angular-material project, include the `material.components.eventCalendar` module as a dependency in your application.

```javascript
angular.module('myApp', ['ngMaterial', 'material.components.eventCalendar']);
```


* [Event Object](#eventobject)
* [mdEventCalendar](#mdEventCalendar)
* [mdEventCalendarHeader](#mdEventCalendarHeader)
* [mdEventCalendarNext](#mdEventCalendarNext)
* [mdEventCalendarPrev](#mdEventCalendarPrev)
* [mdEventCalendarTitle](#mdEventCalendarTitle)
* [mdEventCalendarToday](#mdEventCalendarToday)




### Event Object

## <a name="eventobject"></a> Event Object

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



### Directives


## <a name="mdEventCalendar"></a> mdEventCalendar

```html
<md-event-calendar
  [ng-model=""]
  [md-events=""]
  [md-label=""]
  [md-event-click=""]
  [md-create-event-click=""]
  [md-show-click-link=""]
  [md-create-disabled=""]
  [auto-height=""]
>
...
</md-event-calendar>
```

#### Attributes

| Param | Type | Details |
| :--: | :--: | :--: |
| ng-model | model= | <p>Optional model to hold selected event object</p>  |
| md-events | array | <p>Array of events</p>  |
| md-label | string=title | <p>Property name for title display</p>  |
| md-event-click | function | <p>Function to be called on event click. You can pass in <code>$selectedEvent</code> to get the event object you clicked on</p>  |
| md-create-event-click | function | <p>Function to be called when empty area of day is clicked. You can pass in <code>$date</code> to get the days date you clicked on</p>  |
| md-show-create-link | boolean | <p>Show `Create` in the top right corner when cell is hovered over</p>  |
| md-create-disabled | boolean | <p>Hides create link and disabled create click event</p>  |
| auto-height | number | <p>Calendar will fill to the bottom of the window. You can pass it a number(pixels) as an offset</p>  |




## <a name="mdEventCalendarHeader"></a> mdEventCalendarHeader

The header is a container for the previous, next, and title directives. You can also add other elements to this.
```html
<md-event-calendar-header>
...
</md-event-calendar-header>
```

#### Classes

| Param | Type | Details |
| :--: | :--: | :--: |
| md-center | css | <p>Center content inside of header</p>  |


## <a name="mdEventCalendarNext"></a> mdEventCalendarNext

This is the next arrow that will advance the current view by month/week/day. You can add this the header in any order
```html
<md-event-calendar-next>
</md-event-calendar-next>
```


## <a name="mdEventCalendarPrev"></a> mdEventCalendarPrev

This is the prev arrow that will change the current view by month/week/day. You can add this the header in any order
```html
<md-event-calendar-prev>
</md-event-calendar-prev>
```


## <a name="mdEventCalendarTitle"></a> mdEventCalendarTitle

This title will show the appropriate title for the calendar view
```html
<md-event-calendar-title>
</md-event-calendar-title>
```

## <a name="mdEventCalendarToday"></a> mdEventCalendarToday

A button that can be clicked to take the month to the current month. This button is disabled if you are already on the current month
```html
<md-event-calendar-today>
</md-event-calendar-today>
```





# <a name="faq"></a> FAQ

#### Do i need to use ngMaterial?
No, but you will not get the lovely theme colors.


#### Where is my week/day views?
On their way, this component is under active development.

#### Will this support mobile?
Mobile is in the roadmap and will be released in future versions.
