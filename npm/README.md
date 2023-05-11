![table-sort-js](https://img.shields.io/npm/v/table-sort-js)
![table-sort-js](https://img.shields.io/npm/dm/table-sort-js)
![table-sort-js](https://img.shields.io/github/repo-size/leewannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/license/LeeWannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/actions/workflow/status/leewannacott/table-sort-js/jest.yml?branch=master)

## TABLE-SORT-JS.

- Description: A JavaScript client-side HTML table sorting library with no dependencies required.

- [Demo](https://leewannacott.github.io/Portfolio/#/GitHub)
- [Documentation.](https://leewannacott.github.io/table-sort-js/docs/about.html)
  (work in progress)
- [npm package.](https://www.npmjs.com/package/table-sort-js)
- [firefox browser extension](https://addons.mozilla.org/en-US/firefox/addon/table-sort-js/)

## Install instructions.

<b>Option 1.</b> Install from npm: ` npm install table-sort-js`

```javascript
import tableSort from "table-sort-js/table-sort.js";
```

Refer to the documentation for examples on using table-sort-js with frontend frameworks such as
[React.js](https://leewannacott.github.io/table-sort-js/docs/react.html) and [Vue.js](https://leewannacott.github.io/table-sort-js/docs/vue.html)

<b>Option 2.</b> Download [table-sort.js](https://leewannacott.github.io/table-sort-js/table-sort.js) (Select save as.), or download a [minified version](https://cdn.jsdelivr.net/npm/table-sort-js) (~5kB)

Then add the following script before your HTML table:

```html
<script src="table-sort.js"></script>
```

Refer to the documenation for examples on how to use table-sort-js with [HTML](https://leewannacott.github.io/table-sort-js/docs/html5.html)

#### To make tables sortable:

- Add `class="table-sort"` to HTML &lt;table&gt; tags.
- Click on table headers to sort columns.

#### Classes:

| &lt;table&gt; classes | Description                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| "table-sort"          | Make the table sortable! (Words, numbers, dates, file sizes)...                                               |
| "table-arrows"        | Display ascending or descending triangles.                                                                    |
| "no-class-infer"      | Turns off inference for adding sort classes automatically i.e (file-size-sort, runtime-sort, dates-dmy-sort). |
| "remember-sort"       | If clicking on different columns remembers sort of the original column.                                       |

| &lt;th&gt; classes | Description                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| "data-sort"        | Sort by [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), e.g &lt;td data-sort="42"&gt; |
| "onload-sort"      | Sort column on loading of the page. Simulates a click from the user. (can only sort onload for one column)                              |
| "disable-sort"     | Disallow sorting the table by this specific column.                                                                                     |
| "dates-mdy-sort"   | Sorts dates in mm/dd/yyyy format. e.g (12/28/2023). Can use "/" or "-" or "." as separator. Overides inferred "dates-dmy-sort" class.   |

| &lt;th&gt; Inferred Classes. | Description                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| "dates-dmy-sort"             | Sorts dates in dd/mm/yyyy format. e.g (18/10/1995). Can use "/" or "-" or "." as separator.                           |
| "runtime-sort"               | Sorts runtime in hours minutes and seconds e.g (10h 1m 20s). Useful for sorting the GitHub actions Run time column... |
| "file-size-sort"             | Sorts file sizes(B->TiB) uses the binary prefix. (e.g KiB). Input data ideally in Bytes e.g (10b or 10B)              |

| &lt;th&gt; Classes that change defaults. | Description                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| "order-by-desc"                          | Order by descending on first click. (default is aescending)                                                         |
| "alpha-sort"                             | Sort alphabetically (z11,z2); default is [natural sort](https://en.wikipedia.org/wiki/Natural_sort_order) (z2,z11). |
| "punct-sort"                             | Sort punctuation; default ignores punctuation.                                                                      |

#### Development:

If you wish to contribute, install instructions can be found [here.](https://leewannacott.github.io/table-sort-js/docs/development.html)
