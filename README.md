![npm version](https://img.shields.io/npm/v/table-sort-js)
![npm downloads](https://img.shields.io/npm/dm/table-sort-js)
[![jsDeliver downloads](https://data.jsdelivr.com/v1/package/npm/table-sort-js/badge)](https://www.jsdelivr.com/package/npm/table-sort-js)
![repo size](https://img.shields.io/github/repo-size/leewannacott/table-sort-js)
![MIT licence](https://img.shields.io/github/license/LeeWannacott/table-sort-js)
![build status](https://img.shields.io/github/actions/workflow/status/leewannacott/table-sort-js/jest.yml?branch=master)

# TABLE-SORT-JS.

- Description: HTML table sorting library with sort type inference builtin and browser extension available. [#VanillaJS](http://vanilla-js.com/)

- [Demo](https://leewannacott.github.io/Portfolio/#/GitHub)
- [Documentation.](https://leewannacott.github.io/table-sort-js/docs/about.html)
  (work in progress)
- [npm package.](https://www.npmjs.com/package/table-sort-js) and [jsDelivr](https://www.jsdelivr.com/package/npm/table-sort-js)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/table-sort-js/) and [Chrome](https://chrome.google.com/webstore/detail/table-sort-js/dioemkojkjhlhmfiocgniipejgkbfibb) browser extensions: Tables of any website you visit become sortable!

## Install instructions.

- <b>Option 1:</b> Install from npm:

```javascript
npm install table-sort-js
```

```javascript
import tableSort from "table-sort-js/table-sort.js";
```

Examples on using table-sort-js with frontend frameworks such as [React.js](https://leewannacott.github.io/table-sort-js/docs/react.html) and [Vue.js](https://leewannacott.github.io/table-sort-js/docs/vue.html)

- <b>Option 2</b>: Load as script from a Content Delivery Network (CDN):

```javascript
<script src="https://cdn.jsdelivr.net/npm/table-sort-js/table-sort.js"></script>
```

Or Minified (smaller size, but harder to debug!):

```javascript
<script src="https://cdn.jsdelivr.net/npm/table-sort-js/table-sort.min.js"></script>
```

Refer to the documenation for examples on how to use table-sort-js with [HTML](https://leewannacott.github.io/table-sort-js/docs/html5.html)

- <b>Option 3:</b> Download [table-sort.js](https://cdn.jsdelivr.net/npm/table-sort-js/table-sort.js) (Select save as.), or download a [minified version](https://cdn.jsdelivr.net/npm/table-sort-js/table-sort.min.js) (~5kB)

Then rename and add the following script before your HTML table:

```html
<script src="table-sort.js"></script>
```

## To make tables sortable:

- Add `class="table-sort"` to HTML &lt;table&gt; tags.
- Click on table headers to sort columns.

#### Classes:

| &lt;table&gt; classes | Description                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| "table-sort"          | Make the table sortable! (Words, numbers, dates, file sizes)...                                               |
| "no-class-infer"      | Turns off inference for adding sort classes automatically i.e (file-size-sort, runtime-sort, dates-dmy-sort). |
| "table-arrows"        | Display ascending or descending triangles.                                                                    |
| "remember-sort"       | If clicking on different columns remembers sort of the original column.                                       |
| "cells-sort"          | sort cells (td) rather than table rows (tr); useful for keeping table rows with classes/attributes in place.  |

<br>

| &lt;th&gt; classes | Description                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| "data-sort"        | Sort by [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), e.g &lt;td data-sort="42"&gt;  |
| "dates-mdy-sort"   | Sorts dates in US style mm/dd/yyyy format;. e.g (12/28/2023). Can use "/" or "-" as separator. Overides inferred "dates-dmy-sort" class. |
| "onload-sort"      | Sort column on loading of the page. Simulates a click from the user. (can only sort onload for one column)                               |
| "disable-sort"     | Disallow sorting the table by this specific column.                                                                                      |

<br>

| &lt;th&gt; Inferred Classes. | Description                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| "numeric-sort"               | Sorts numbers including decimals - Positive, Negative (in both minus and parenthesis representations)                               |
| "dates-dmy-sort"             | Sorts dates in dd/mm/yyyy format. e.g (18/10/1995). Can use "/" or "-" as separator.                                                |
| "dates-ymd-sort"             | Sorts dates in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) yyyy/mm/dd format. e.g (2021/10/28). Use "/" or "-" as separator. |
| "file-size-sort"             | Sorts file sizes(B->TiB) uses the binary prefix. (e.g 10 B, 100 KiB, 1 MiB); optional space between number and prefix.              |
| "runtime-sort"               | Sorts runtime in hours minutes and seconds e.g (10h 1m 20s). Useful for sorting the GitHub actions Run time column...               |

<br>

| &lt;th&gt; Classes that change defaults. | Description                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| "order-by-desc"                          | Order by descending on first click. (default is aescending)                                                         |
| "alpha-sort"                             | Sort alphabetically (z11,z2); default is [natural sort](https://en.wikipedia.org/wiki/Natural_sort_order) (z2,z11). |
| "punct-sort"                             | Sort punctuation; default ignores punctuation.                                                                      |

## Development:

If you wish to contribute, install instructions can be found [here.](https://leewannacott.github.io/table-sort-js/docs/development.html)
