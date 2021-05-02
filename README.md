![table-sort-js](https://img.shields.io/npm/v/table-sort-js)
![table-sort-js](https://img.shields.io/npm/dt/table-sort-js)
![table-sort-js](https://img.shields.io/github/repo-size/leewannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/license/LeeWannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/workflow/status/leewannacott/table-sort-js/Jest%20CI%20-%20Automated%20testing%20of%20table%20sorting.?label=tests)

## table-sort-js.

- Description: A JavaScript client-side HTML table sorting library with no dependencies required.

- Demo: https://leewannacott.github.io/Portfolio/#/GitHub.

- Download: https://leewannacott.github.io/table-sort-js/table-sort.js

- NPM: https://www.npmjs.com/package/table-sort-js.

#### Instructions: 
- Add `class="table-sort"` to HTML table tags. Click on column headers to sort.

#### Classes:

| table classes  | Description                                      |
| -------------- | ------------------------------------------------ |
| "table-sort"   | Make the table sortable! (Words, numbers, dates) |
| "table-arrows" | Display ascending or descending triangle.        |

| th classes      | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| "order-by-desc" | Order by descending on first click. (default is aescending) |
| "file-size"     | Sort file sizes(B->TiB) uses the binary prefix. (e.g KiB)   |

#### Example using npm and ReactJS:

##### Install :`npm install table-sort-js`

```javascript
import React, { Component } from "react";
import tableSort from "table-sort-js/table-sort.js";
export class App extends Component {
  componentDidMount() {
    tableSort()
    }
    render(){
      return(
      <div>
      <table className="table-sort">
          <thead>
              <tr>
                  <th>Alphabet</th>
                  <th className="order-by-desc">Order</th>
              </tr>
          </thead>
          <tbody className="table-hover">
                  <tr>
                      <td>Alpha</td>
                      <td>1</td>
                  </tr>
                  <tr>
                      <td>Bravo</td>
                      <td>2</td>
                  </tr>
                  <tr>
                      <td>Charlie</td>
                      <td>3</td>
                  </tr>
            </tbody>
        </table>
        </div>
    );
    }
  }
export default App;
```

##### HTML Example:

Download: https://leewannacott.github.io/table-sort-js/table-sort.js
```html
<script src="table-sort.js"></script>
<table class="table-sort">
  <thead>
    <tr>
      <th>Last Name</th>
      <th>First Name</th>
      <th class="order-by-desc">Birth Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Franklin</td>
      <td>Benjamin</td>
      <td>1706/1/17</td>
    </tr>
    <tr>
      <td>Carnegie</td>
      <td>Andew</td>
      <td>1835/11/25</td>
    </tr>
    <tr>
      <td>Twain</td>
      <td>Mark</td>
      <td>1835/11/30</td>
    </tr>
  </tbody>
</table>
```

#### Notes:

- Makes use of natural sorting to sort numerical values correctly.
- If `<thead>` does not exist it will be created by using data from first row. `<tbody>` is optional.
