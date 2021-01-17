![table-sort-js](https://img.shields.io/npm/v/table-sort-js) https://www.npmjs.com/package/table-sort-js `npm install table-sort-js`

Description: A JavaScript client-side HTML table sorting library with no dependencies required. 

Example of table using table-sort-js client side:
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
            <td>1977</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Bach</td>
            <td>Frank</td>
            <td>1976</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Doe</td>
            <td>Jason</td>
            <td>1978</td>
            <td>100</td>
          </tr>
        </tbody>
</table>
```
Notes:

`class="order-by-desc"`for `<th>` to change default sort to descending order on first click.

If `<thead>` does not exist it will be created by using data from first row. `<tbody>` is optional.
