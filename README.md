table-sort-js

A JavaScript client-side HTML table sorting library with no dependencies required. 

Instructions:
```
1. Use: <script src="https://leewannacott.github.io/table-sort-js/table-sort.js"></script>
Or download file e.g <script src="table-sort.js"></script>.

2. Add class="table-sort"(className for React) to table tag; to make table column headers sort on click.

3. Add class="order-by-desc" to <th> if sorting data in descending order on first click.
```
Example:
```
<table class="table-sort">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th class='order-by-desc'>Birth Date</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Smith</td>
            <td>John</td>
            <td>10-11-1976</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Bach</td>
            <td>Frank</td>
            <td>9-2-1976</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Doe</td>
            <td>Jason</td>
            <td>10-4-1998</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
```

If `<thead>` does not exist it will be created by using data from first row. `<tbody>` is optional.
