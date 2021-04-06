![table-sort-js](https://img.shields.io/npm/v/table-sort-js)(https://www.npmjs.com/package/table-sort-js)

* Description: A JavaScript client-side HTML table sorting library with no dependencies required. 

* Demo: https://leewannacott.github.io/Portfolio/#/GitHub

* Backend: `npm install table-sort-js` and `require("../node_modules/table-sort-js/table-sort.js")`

* Frontend: `<script src="https://leewannacott.github.io/table-sort-js/table-sort.js"></script>`

* Instructions: Add class "table-sort" to HTML table tags. Click on column headers to sort.

Example:
```html
<script src="https://leewannacott.github.io/table-sort-js/table-sort.js"></script>
<table class="table-sort">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th class="order-by-desc">Birth Date</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Smith</td>
            <td>John</td>
            <td>1977/12/4</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Bach</td>
            <td>Frank</td>
            <td>1976/10/27</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Doe</td>
            <td>Jason</td>
            <td>1978/4/6</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Michael</td>
            <td>Jackson</td>
            <td>1958/8/29</td>
            <td>54</td>
          </tr>

          <tr>
            <td>Ben</td>
            <td>Tenison</td>
            <td>1994/7/21</td>
            <td>134</td>
          </tr>
        </tbody>
</table>
```
Notes:
* Makes use of natural sorting to sort numerical values correctly. Sorts numbers, Dates, alphanumeric, etc.

* `class="order-by-desc"` on `<th>` to change default sort to descending order on first click.
 
* If `<thead>` does not exist it will be created by using data from first row. `<tbody>` is optional.

* Example of use: https://www.cssscript.com/minimal-table-sorter/

* Add `table-arrows` class to display ascending or descending triangle.
