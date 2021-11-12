import React from "react";
import GridComponent from "./Grid";

class URLFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      shortUrl: "",
      isLoaded: false,
      items: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch("https://abid-shorten-url-api.herokuapp.com/api/url/list")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: "Something went wrong. Please contact administrator.",
          });
        }
      );
  }

  handleInputChanged(event) {
    this.setState({
      url: event.target.value,
    });
  }

  handleButtonClicked = async (e) => {
    e.preventDefault();

    var url = this.state.url;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl: url }),
    };
    const response = await fetch(
      "https://abid-shorten-url-api.herokuapp.com/api/url/shorten",
      requestOptions
    );
    const data = await response.json();
    let urlList = this.state.items;
    const list = addUrlToList(urlList, data);
    this.setState({ shortUrl: data.shortUrl, items: list });
  };

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <form id="userForm" className="form-inline">
              <div className="row w-100">
                <div className="col-md-10">
                  <div className="form-group">
                    <input
                      type="url"
                      onChange={this.handleInputChanged.bind(this)}
                      value={this.state.url}
                      name="exampleInputURL"
                      placeholder="Enter URL"
                      className="form-control w-100"
                      id="exampleInputURL"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <button
                    onClick={this.handleButtonClicked.bind(this)}
                    type="btn"
                    className="btn btn-primary"
                    id="submitForm"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>

            <div className="row w-100 ml-1 mt-2">
              <label>Short URL</label>
              <a href={this.state.shortUrl}> {this.state.shortUrl}</a>
            </div>
          </div>
        </div>
        <GridComponent
          isLoaded={this.state.isLoaded}
          items={this.state.items}
          error={this.state.error}
        />
      </div>
    );
  }
}

function addUrlToList(urlList, data) {
  let found = false;
  urlList.forEach(function (child) {
    if (child.shortUrl === data.shortUrl) {
      found = true;
      return;
    }
  });
  if (!found) urlList.push(data);
  return urlList;
}
export default URLFormComponent;
