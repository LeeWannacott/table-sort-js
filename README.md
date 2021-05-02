![table-sort-js](https://img.shields.io/npm/v/table-sort-js) 
![table-sort-js](https://img.shields.io/npm/dt/table-sort-js)
![table-sort-js](https://img.shields.io/github/repo-size/leewannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/license/LeeWannacott/table-sort-js)
![table-sort-js](https://img.shields.io/github/workflow/status/leewannacott/table-sort-js/Jest%20CI%20-%20Automated%20testing%20of%20table%20sorting.?label=tests)

## table-sort-js.

* Description: A JavaScript client-side HTML table sorting library with no dependencies required. 

* Demo: https://leewannacott.github.io/Portfolio/#/GitHub.

* Download: https://leewannacott.github.io/table-sort-js/table-sort.js

* NPM: https://www.npmjs.com/package/table-sort-js.

* Script: `<script src="table-sort.js"></script>`

* Instructions: Add `class="table-sort"` to HTML table tags. Click on column headers to sort.

#### Documentation:

| table classes   | Description                                                       |
| -------------   | -------------                                                     |
| "table-sort"    | Make the table sortable!  (Words, numbers, dates)                 |
| "table-arrows"  | Display ascending or descending triangle.                         |

| th classes      | Description                                                       |
| -------------   | -------------                                                     |
| "order-by-desc" | Order by descending on first click. (default is aescending)        |
| "file-size"     | Sort file sizes(B->TiB) uses the binary prefix. (e.g KiB)         |

#### Example using npm and ReactJS:
##### Install :`npm i table-sort-js`

```javascript
import tableSortJs from "table-sort-js/table-sort.js";
export class App extends Component {
  componentDidMount() {
    tableSortJs()
    }
    render(){
      <table className="table table-sort table-hover">
          <thead className="cw-light">
              <tr>
                  <th>Repository Name</th>
                  <th>Language</th>
                  <th className="order-by-desc">Created</th>
                  <th>Description</th>
                  <th className="order-by-desc">Forks</th>
                  <th className="order-by-desc">
                      Open issues
                  </th>
                  <th className="order-by-desc">Watchers</th>
                  <th className="order-by-desc">Stars</th>
                  <th className="file-size">Size</th>
              </tr>
          </thead>
          <tbody className="table-hover">
              {this.state.repos.map((repo) => (
                  <tr>
                      <td>
                          <a href={repo.html_url}>
                              {repo.name}
                          </a>
                      </td>
                      <td> {repo.language}</td>
                      <td>
                          {" "}
                          {repo.created_at.split("-")[0] +
                              "-" +
                              repo.created_at.split("-")[1]}
                      </td>
                      <td> {repo.description}</td>
                      <td> {repo.forks}</td>
                      <td> {repo.open_issues}</td>
                      <td> <center>{repo.watchers}</center></td>
                      <td> {repo.stargazers_count}</td>
                      <td> {`${repo.size}KB`}</td>
                  </tr>
              ))}
          </tbody>
      </table>
    }
export default App;
```

##### Example:

```html

<-- Download: "https://leewannacott.github.io/table-sort-js/table-sort.js" -->
<script src="table-sort.js"></script>
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

#### Notes:

* Makes use of natural sorting to sort numerical values correctly. 
* If `<thead>` does not exist it will be created by using data from first row. `<tbody>` is optional.
