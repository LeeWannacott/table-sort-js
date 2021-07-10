![table-sort-js](https://img.shields.io/npm/v/table-sort-js)
![table-sort-js](https://img.shields.io/npm/dw/table-sort-js)
![table-sort-js](https://img.shields.io/github/repo-size/leewannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/license/LeeWannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/workflow/status/leewannacott/table-sort-js/Jest%20CI%20-%20Automated%20testing%20of%20table%20sorting.?label=tests)

## TABLE-SORT-JS.

- Description: A JavaScript client-side HTML table sorting library with no dependencies required.

- [Demo](https://leewannacott.github.io/Portfolio/#/GitHub)
- [Documentation.](https://leewannacott.github.io/table-sort-js/docs/about.html)
  (work in progress)
- [npm package.](https://www.npmjs.com/package/table-sort-js)
## Install instructions - pick one option.

1. Install from npm: ` npm install table-sort-js` 

```javascript
import tableSort from "table-sort-js/table-sort.js";
```
Refer to the documentation for examples on using table-sort-js with frontend frameworks such as
[ReactJS.](https://leewannacott.github.io/table-sort-js/docs/react.html)

2. [Download table-sort.js](https://leewannacott.github.io/table-sort-js/table-sort.js) (Select save as.)

Then add the following script before your HTML table: 
```html
<script src="table-sort.js"></script>
```
Refer to the documenation for examples how to use table-sort-js with [HTML.](https://leewannacott.github.io/table-sort-js/docs/html5.html)
#### To make a table sortable: 
- Add `class="table-sort"` to HTML &lt;table&gt; tags. Click on the columns heads to sort.

#### Classes:

| table classes  | Description                                                                             |
| -------------- | ------------------------------------------------                                        |
| "table-sort"   | Make the table sortable! (Words, numbers, dates)                                        |
| "table-arrows" | Display ascending or descending triangles.                                              |
| "remember-sort"| If clicking on different columns remembers sort of the original column.                 |

| th classes      | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| "order-by-desc" | Order by descending on first click. (default is aescending) |
| "file-size"     | Sort file sizes(B->TiB) uses the binary prefix. (e.g KiB)   |
| "data-sort"     | Sort by [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), e.g &lt;td data-sort="42"&gt; |

#### Notes:

- Makes use of natural sorting to sort numerical values correctly.
- If `<thead>` does not exist it will be created by using data from first row. `<tbody>` is optional.

#### Development:
If you wish to contribute, install instructions can be found [here.](https://leewannacott.github.io/table-sort-js/docs/development.html)
